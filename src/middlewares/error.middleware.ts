import {ErrorRequestHandler} from "express"
import { ZodError} from "zod"
import { logger } from "../sahred/utils/logger"
import { env } from "../conifg/env"


export const errorMiddleware: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    if (res.headersSent) {
        return next(err);
    }
    //valid error
    if(err instanceof ZodError){
        return res.status(400).json({
            success: false,
            message: "Validación error",
            errors: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        })
    }

    // duplicate Key
    if(err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Ya existe"
        })
    }


    const statusCode = typeof err.status === "number" && err.status >= 400 && err.status <= 599 ? err.status : 500

    logger.error({
        err,
        method: req.method,
        path: req.originalUrl
    }, "Request error")

    return res.status(statusCode).json({
        success: false,
        message:
            statusCode >= 500 ? "" : err.message,
            ...(env.NODE_ENV === "development" && statusCode >= 500 ? {detail: err.message } : {})
    })

};
