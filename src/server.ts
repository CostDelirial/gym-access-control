import app from "./index";
import { env } from "./conifg/env"
import { connectDatabase, disconnectDatabase } from "./conifg/database"
import { logger } from "./sahred/utils/logger"

const bootstrap = async ():Promise<void> => {
  try{
    //conectar MongoDB
    await connectDatabase()

    //iniciar express
    const server = app.listen(env.PORT, () => {
      logger.info({
        port: env.PORT,
        environment: env.NODE_ENV
      },
      "Server started successfully"
      )
    })
    //apagar servidor
    let isShuttingDown = false
    const shutdown = async (signal: string):Promise<void> => {
      if(isShuttingDown) return

      isShuttingDown = true

      logger.info({signal}, "Se inicio el apagado")

      server.close(async(error) => {
        if(error) {
          logger.error({err:error}, "Error al cerrar el servidor HTTP")
          process.exitCode = 1
        }
        try{
          await disconnectDatabase()
        }catch {
          process.exitCode = 1
        }

        logger.info("La aplicacion se cerro satisfactoriamente")
      })
    }

    process.once("SIGTERM", () => {
      void shutdown("SIGTERM")
    })

    process.once("SIGINT", () => {
      void shutdown("SIGINT")
    })

  } catch(error){ 
    logger.fatal({err: error}, "La aplicacion fallo al abrirce")
    process.exitCode = 1
  }
}

void bootstrap