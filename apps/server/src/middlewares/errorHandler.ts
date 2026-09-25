import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ERROR_CODES } from "@repo/shared";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.error("[ServerError]:", err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: "Dữ liệu yêu cầu không hợp lệ",
        details: err.errors,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: err.message || "Lỗi máy chủ nội bộ",
    },
  });
};
