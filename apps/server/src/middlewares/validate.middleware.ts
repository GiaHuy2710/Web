import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ERROR_CODES } from "@repo/shared";

export const validateBody = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      return next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: ERROR_CODES.VALIDATION_ERROR || "VALIDATION_ERROR",
            message: "Dữ liệu gửi lên không đúng định dạng",
            details: error.errors.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
        });
      }
      return next(error);
    }
  };
};