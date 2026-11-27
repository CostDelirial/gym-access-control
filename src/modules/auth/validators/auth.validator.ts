import { z } from "zod"

export const registerSchema = z.object({
    
    name: z.string().trim().min(2).max(80),
    
    email: z.string().trim().max(200),

    password: z.string().min(8).max(72)
}).strict()

export const loginSchema = z.object({
    email: z.string().trim().email().max(200),

    password: z.string().min(8).max(72)
}).strict()

export type RegisterDTO = z.infer<typeof registerSchema>
export type LoginDTO = z.infer<typeof loginSchema>