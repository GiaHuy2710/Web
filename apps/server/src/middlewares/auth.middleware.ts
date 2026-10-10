import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export interface AuthUserPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

// Giữ lại alias để tương thích ngược nếu cần
export type AuthenticatedRequest = Request;

/**
 * Middleware kiểm tra Bearer JWT Token ở Header Authorization.
 * Dùng để bảo vệ các API bắt buộc phải đăng nhập (như /api/auth/me).
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Bạn chưa đăng nhập hoặc thiếu Bearer Token",
      },
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };
    req.user = decoded;
    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: {
          code: "TOKEN_EXPIRED",
          message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
        },
      });
    }

    return res.status(403).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "Token không hợp lệ",
      },
    });
  }
};