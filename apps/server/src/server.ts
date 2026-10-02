import "./config/env";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { profileRoutes } from "./modules/profile/profile.routes";

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

// Centralized Global Error Handler Middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };
