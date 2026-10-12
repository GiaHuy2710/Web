import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ERROR_CODES } from "@repo/shared";

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export class AppError extends Error implements CustomError {
  statusCode: number;
  code?: string;
  details?: unknown;

  constructor(message: string, statusCode = 500, code?: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}


export const errorHandler = (
  err: CustomError,
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

  const statusCode = err.statusCode || 500;
  const message = err.message || "Lỗi máy chủ nội bộ";
  const code = err.code || ERROR_CODES.INTERNAL_SERVER_ERROR;

  console.error(`[Error] ${code} (${statusCode}): ${message}`);

  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  });
};

