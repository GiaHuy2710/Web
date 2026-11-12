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

export type ProjectQueryInput = z.infer<typeof ProjectQuerySchema>;

//Schema kiểm tra đăng ký nhận bản tin Newsletter
export const NewsletterSchema = z.object({
  email: z
  .string({ required_error: "Vui lòng nhập địa chỉ email" })
  .email("Định dạng email không hợp lệ (VD: develop@devfolio.io)"),
});

export type NewsletterInput = z.infer<typeof NewsletterSchema>;

export const CreateProjectCommentSchema = z.object({
  author: z.string().trim().min(1).max(80),
  handle: z.string().trim().max(80).optional(),
  content: z.string().trim().min(1).max(5000),
});

export type CreateProjectCommentInput = z.infer<typeof CreateProjectCommentSchema>;

export const ProjectSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(150),
  category: z.enum(["web", "cli", "game"]),
  version: z.string().trim().min(1).max(40),
  techStack: z.array(z.string().trim().min(1)).max(30),
  description: z.string().trim().min(1).max(5000),
  authorName: z.string().trim().min(1).max(100),
  authorEmail: z.string().email().optional(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
});

export type ProjectSubmissionInput = z.infer<typeof ProjectSubmissionSchema>;