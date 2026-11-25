import { Request, Response, NextFunction } from "express"

import { authService } from "../services/auth.service"
import { loginSchema, registerSchema } from "../validators/auth.validator"

class AuthController { async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const input = registerSchema.parse(req.body)
        const result = await authService.register(input)
        res.status(201).json({
            success: true,
            data: result
        })
    } catch(error) {
        next(error)
    }
}

async login( req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
        const input = loginSchema.parse(req.body)
        const result = await authService.login(input)

        res.status(200).json({
            success: true,
            data: result
        })
    } catch(error) {
        next(error)
    }
}
}

export const authControler = new AuthController()