
export interface RegisterInput {
    name: string
    email: string
    password: string
}


export interface LoginInput {
    email: string
    password: string
}

export interface AuthenticatedUser {
    id: string
    name: string
    email: string
    role: "user" | "admin"
}

export interface AuthResponse {
    user: AuthenticatedUser
    accessToken: string
    tokenType: "Bearer"
    expiresIn: string
}