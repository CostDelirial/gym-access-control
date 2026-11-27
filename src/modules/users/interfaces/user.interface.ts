export type UserRole = "employee" | "admin" | "user";

export interface IUser {
    _id: string
    name: string
    email: string
    password: string
    status: boolean
    role: UserRole
    createdAt: Date
}