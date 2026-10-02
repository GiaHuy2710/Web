import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";

export class AuthController {
  // POST /api/auth/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/auth/register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json({
        success: true,
        message: "Đăng ký tài khoản thành công",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/auth/forgot-password
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.forgotPassword(req.body);
      return res.status(200).json({
        success: true,
        message: result.message,
        resetToken: result.resetToken,
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/auth/reset-password
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.resetPassword(req.body);
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/auth/me
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.getMe(req.user!.id);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export const authController = new AuthController();