import { z } from "zod";
import { USER_ROLES } from "../constants/common.constants";

export const RoleEnum = z.enum([
  USER_ROLES.ADMIN,
  USER_ROLES.USER,
  USER_ROLES.MANAGER,
]);

export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  role: RoleEnum.default(USER_ROLES.USER),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  role: RoleEnum,
  avatarUrl: z.string().nullable().optional(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: AuthUserSchema,
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
