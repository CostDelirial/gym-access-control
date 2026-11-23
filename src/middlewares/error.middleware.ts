import {ErrorRequestHandler} from "express";
import { logger } from "../sahred/utils/logger";
import { env } from "../conifg/env";


export const errorMiddleware: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = 
     typeof err.status === "number" &&
     err.status >= 400 &&
     err.status <= 599
     ? err.status : 500;

     logger.error({
        err, method: req.method,
        path: req.originalUrl
     },
    
    "Request Error"
);
res.status(statusCode).json({
    success: false,
    message:
    statusCode === 500 ? "Internal server Error" : err.message,
    ...(env?.NODE_ENV === "development" && statusCode === 500 ? { detail: err.message } : {}),
    })
};
