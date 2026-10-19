import "./config/env";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { profileRoutes } from "./modules/profile/profile.routes";
import { homeRoutes } from "./modules/home/home.routes";
import { aiRoutes } from "./modules/ai/ai.routes";
import { contactRoutes } from "./modules/contact/contact.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Health Check Endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "profile-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/home", homeRoutes);
app.use("/api", homeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/contact", contactRoutes);

// Centralized Global Error Handler Middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { app };
