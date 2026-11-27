import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import mongoose from "mongoose"
import { AppError } from "../sahred/errors/app-error"
import { logger } from "../sahred/utils/logger"

export const errorMiddleware = ( error: unknown, req: Request, res: Response, next: NextFunction):void => {
    if(res.headersSent){
        next(error)
        return
    }

    let statusCode = 500
    let message = "Erro interno del servidor"

    if(error instanceof AppError) {
        statusCode = error.statusCode
        message: error.message
    } else if (error instanceof ZodError){
        statusCode = 400
        message = "error de validación"
    }else if(error instanceof mongoose.Error.CastError){
        statusCode = 400
        message = "Identificacion no valida"
    } else if(error instanceof mongoose.Error.ValidationError) {
        statusCode = 400
        message = "Erro de validacion en base de datos" 
    } else if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
        statusCode = 409
        message = "revise que en realidad exista" 
    }

    logger.error({
        err: error,
        method: req.method,
        path: req.originalUrl,
        statusCode
    },
    "error en la petición"
    )
    res.status(statusCode).json({
        success: false,
        message
    })
}