import jwt, { SignOptions } from "jsonwebtoken"

import { env } from "../../../conifg/env"
import { userRepository } from "../../users/repositories/user.repository"
import { userService } from "../../users/services/user.service"
import { DataHasher } from "../../../sahred/utils/hasher"

import { AuthResponse, AuthenticatedUser, LoginInput, RegisterInput } from "../interfaces/auth.interface"

const createAccessToken = (user: AuthenticatedUser): string => {
    return jwt.sign({ role: user.role }, env.JWT_ACCESS_SECRET, {
        subject: user.id,
        expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]
    })
}

const buildAuthResponse = ( user: AuthenticatedUser): AuthResponse => ({
    user,
    accessToken: createAccessToken(user),
    tokenType: "Bearer",
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
})

class AuthService {
    async register(input: RegisterInput): Promise<AuthResponse> {
        const createdUser = await userService.createUser({
            name: input.name,
            email: input.email.toLowerCase(),
            password: input.password
        })
        const user: AuthenticatedUser = {
            id: createdUser._id.toString(),
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role === "admin" ? "admin" : "user",
        }
        return buildAuthResponse(user)
    }

    async login(input: LoginInput): Promise<AuthResponse> {
        const email = input.email.toLowerCase()

        const user = await userRepository.findByEmail(email)
console.log("----------",user)
        if(!user || !user.status){
            throw Object.assign(new Error("Usuario o password incorrectos"), {
                status: 401,
            })
        }

        console.info("antes de validar hash", user.password)
    const passwordisValid = await DataHasher.comparePassword(input.password, user.password)
        console.info("despues de validar hash",passwordisValid)
    if(!passwordisValid){
        throw Object.assign(new Error("Usuario o contraseña incorrectos"), { status: 401 }) 
    }

    const authenticatedUser: AuthenticatedUser = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role === "admin" ? "admin" : "user"
    }

    return buildAuthResponse(authenticatedUser)
    }
}


export const authService = new AuthService()