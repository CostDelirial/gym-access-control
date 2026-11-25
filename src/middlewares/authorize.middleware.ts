import { Request, Response, NextFunction } from "express"
import { AuthenticatedRequest } from "../modules/auth/interfaces/auth-request.ineterface"
import { UserRole } from "../modules/users/interfaces/user.interface"

export const authorize = (...allowedRoles: UserRole[]) => {
    return ( req: Request, res: Response, next: NextFunction): void => {
        const authenticatedReq = req as AuthenticatedRequest
        if(!authenticatedReq.user){
            res.status(401).json({
                success: false,
                message: "Se requiere autenticacion"
            })
            return 
        }
        if(!allowedRoles.includes(authenticatedReq.user.role)){
            res.status(403).json({
                success: false,
                message: "No tienes permisos para esta accion"
            })
            return
        }
        next()
    }
}