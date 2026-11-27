import { Request } from "express"
import { UserRole } from "../../users/interfaces/user.interface"

export interface AuthenticatedUserPayload {
    id: string
    role: UserRole
}

export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUserPayload
}