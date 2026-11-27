import { z } from "zod"

export const updateMyProfileSchema = z.object({
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email().max(254).optional(),
    password: z.string().min(8).max(72).optional()
})
.strict()
.refine( (data) => Object.keys(data).length > 0, {message: "al menos un elemento es requerido"})

export const createUserSchema = z.object({
    name: z.string().trim().min(3).max(50),
    email: z.string().trim().email().max(254),
    password: z.string().min(8).max(72).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"),
    status: z.boolean().optional(),
    role: z.enum(["employee", "admin", "user"]).optional()
})

export const updateUserSchema = z.object({
    name: z.string().trim().min(3).max(50).optional(),
    email: z.string().trim().email().max(254).optional(),
    password: z.string().min(8).max(72).optional(),
    status: z.boolean().optional(),
    role: z.enum(["employee", "admin", "user"]).optional()
}).strict().refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Se debe proporcionar al menos un campo para actualizar.",
    }
)

export const userIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Formato de ID de usuario inválido"),
})