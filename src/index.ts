import express from "express";
import helmet from "helmet";
import cors from "cors";

import { env } from "./config/env";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use( cors({ origin: env.CORS_ORIGIN, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"],}));

// Request body parsing
app.use( express.json({ limit: "10kb", }));


// API routes
app.use("/api/v1", routes);
// 404 handler
app.use(notFoundMiddleware)
// Global error handler
app.use(errorMiddleware);

export default app;