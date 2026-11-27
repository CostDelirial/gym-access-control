import mongoose from "mongoose"
import { env } from "./env"
import { logger } from "../sahred/utils/logger"


export const connectDatabase = async ():Promise<void> => {
    try{

        logger.info("empezando al conexion")
        await mongoose.connect(env.MONGO_URI, {serverSelectionTimeoutMS: 5000,})
        logger.info({
            database: mongoose.connection.name,
            host: mongoose.connection.host
        },
            "MongoDB esta conectado"
        )
    } catch(error){
        logger.error({ err: error}, "MongoDB no se conecto")
        throw error
    }
    
}

export const disconnectDatabase = async():Promise<void> => {
    try {
        await mongoose.disconnect()
        logger.info("MongoDb se desconecto con exito")
    } catch(error) {
        logger.error({ err: error }, "Error de desconecion a MongoDB")
        throw error
    }
}