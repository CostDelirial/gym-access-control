import app from "./index";
import { env } from "./conifg/env";
import { logger } from "./sahred/utils/logger";

const server = app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
      environment: env.NODE_ENV,
    },
    "Server started successfully"
  );
});

// Graceful shutdown
const shutdown = (signal: string) => {
  logger.info({ signal }, "Shutdown signal received");

  server.close((error) => {
    if (error) {
      logger.error(error, "Error closing server");
      process.exit(1);
    }

    logger.info("Server closed successfully");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));