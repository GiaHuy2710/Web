import { z } from "zod";

// Schema kiểm tra dữ liệu Đăng nhập
export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email" })
    .email("Định dạng email không hợp lệ (VD: user@domain.com)"),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự"),
});

// Schema kiểm tra dữ liệu Đăng ký
export const RegisterSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email" })
    .email("Định dạng email không hợp lệ"),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu cần tối thiểu 6 ký tự"),
  fullName: z
    .string({ required_error: "Vui lòng nhập họ tên" })
    .min(2, "Họ tên phải từ 2 ký tự trở lên"),
  role: z.enum(["USER", "ADMIN", "MANAGER"]).optional().default("USER"),
});

// Schema kiểm tra dữ liệu Quên mật khẩu
export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng cung cấp email" })
    .email("Định dạng email không hợp lệ"),
});

// Schema kiểm tra dữ liệu Đặt lại mật khẩu mới
export const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Mã khôi phục (token) không được để trống"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có tối thiểu 6 ký tự"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;