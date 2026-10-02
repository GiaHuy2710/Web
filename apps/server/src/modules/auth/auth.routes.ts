import { Router } from "express";
import { authController } from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { authenticateToken } from "../../middlewares/auth.middleware";
import {
  LoginSchema,
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "./auth.schema";

const router = Router();

// 1. Endpoint Đăng nhập
router.post(
  "/login",
  validateBody(LoginSchema),
  authController.login
);

// 2. Endpoint Đăng ký
router.post(
  "/register",
  validateBody(RegisterSchema),
  authController.register
);

// 3. Endpoint Yêu cầu Quên mật khẩu
router.post(
  "/forgot-password",
  validateBody(ForgotPasswordSchema),
  authController.forgotPassword
);

// 4. Endpoint Đặt lại mật khẩu mới
router.post(
  "/reset-password",
  validateBody(ResetPasswordSchema),
  authController.resetPassword
);

// 5. Endpoint Xem thông tin tài khoản hiện tại (Yêu cầu có token)
router.get(
  "/me",
  authenticateToken,
  authController.getMe
);

export const authRoutes: Router = router;