export type UserRole = "employee" | "admin" | "user";

export interface IUser {
    name: string
    email: string
    passwordHash: string
    status: boolean
    role: UserRole
    createdAt: Date
}