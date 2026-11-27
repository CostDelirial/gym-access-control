import { Request, Response, NextFunction } from "express"
import { AppError } from "../sahred/errors/app-error"

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    next( new AppError( `Route ${req.method} ${req.originalUrl} not found`, 404))
}