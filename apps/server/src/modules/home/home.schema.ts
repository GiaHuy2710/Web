import { z } from "zod";

//Schema kiểm tra tham số lọc/tìm kiếm danh sách dự án 
export const ProjectQuerySchema = z.object({
  category: z.string().optional().default("all"),
  tech: z.string().optional(),
  sort: z.enum(["newest", "popular", "name"]).optional().default("newest"),
  search: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(50).optional().default(6),
});

//Schema kiểm tra đăng ký nhận bản tin Newsletter
export const NewsletterSchema = z.object({
  email: z
  .string({ required_error: "Vui lòng nhập địa chỉ email" })
  .email("Định dạng email không hợp lệ (VD: develop@devfolio,io"),
});

