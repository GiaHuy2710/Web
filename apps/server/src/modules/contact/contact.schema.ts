import { z } from "zod";

export const ContactFormSchema = z.object({
    name: z.string({ required_error: "Vui lòng nhập tên" })
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(50, "Tên không được vượt quá 50 ký tự"),
    email: z
        .string({ required_error: "Vui lòng nhập email" })
        .email("Định dạng email không hợp lệ (VD: alex@gmail.com)"),
    projectType: z
        .string({ required_error: "Vui lòng chọn loại dự án" })
        .min(1, "Vui lòng chọn loại dự án"),
    budget: z
        .string({ required_error: "Vui lòng chọn ngân sách dự kiến" })
        .min(1, "Vui lòng chọn ngân sách dự kiến" ),
    message: z
        .string({ required_error: "Vui lòng nhập nội dung tin nhắn"})
        .min(10, "Nội dung ít nhất 10 ký tự" )
        .max(5000, "Nội dung không được vượt quá 5000 ký tự"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;