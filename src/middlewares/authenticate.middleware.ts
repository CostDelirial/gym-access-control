import { Request, Response, NextFunction} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

import { env } from "../conifg/env"
import { AuthenticatedRequest } from "../modules/auth/interfaces/auth-request.ineterface"
import { UserRole } from "../modules/users/interfaces/user.interface"


interface AccessTokenPayload extends JwtPayload {
    role: UserRole
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try{
        const authorization = req.headers.authorization
        if(!authorization?.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Se requiere autenticacion por token"
            })
            return
        }

        const token = authorization.split(" ")[1]

        if(!token){
            res.status(401).json({
                success: false, 
                message: "Token incorrecto"
            })
            return
        }

        const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload

        if( typeof decoded.sub !== "string" || !["user","admin"].includes(decoded.role)) {
            res.status(401).json({
                success: false,
                message: "Se requiere autenticacion por token"
            })
            return
        }

        (req as AuthenticatedRequest).user = {
            id: decoded.sub,
            role: decoded.role
        }

        next()

    }catch(error){
        res.status(401).json({
            success: false,
            message: "Incorrecto o expiro el token"
        })
    }
}
