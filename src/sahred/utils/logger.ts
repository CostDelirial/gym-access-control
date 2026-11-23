import pino from "pino"
import { env } from "../../conifg/env";


export const logger = pino({
  level: env?.NODE_ENV === "development" ? "debug" : "info",

  redact: {
    paths: [
      "req.headers.authorization",
      "password",
      "*.password",
      "token",
      "*.token",
      "accessToken",
      "*.accessToken",
    ],
    censor: "[REDACTED]",
  },

  ...(env?.NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }
    : {}),
});