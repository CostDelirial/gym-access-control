
import { config } from "dotenv";

config();
import  { z } from "zod";

const envSchema = z.object({

    NODE_ENV: z.enum(["development","production","test"]).default("development"),

    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    
    CORS_ORIGIN: z.string().default("http://localhost:5173"),

    MONGO_URI: z.string().min(1,"MONGO_URI is required").refine(
        (value) =>
            value.startsWith("mongodb://") ||
            value.startsWith("mongodb+srv://"),
            "Conecion no valida paar MongoDB" 
    ),

    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environment configuration")
    console.error(parsedEnv.error.flatten().fieldErrors);

    process.exit(1);
}

export const env = parsedEnv.data;