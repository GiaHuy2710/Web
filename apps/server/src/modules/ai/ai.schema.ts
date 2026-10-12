import { z } from "zod";

export const AskAiSchema = z.object({
  question: z
    .string({ required_error: "Vui lòng nhập câu hỏi" })
    .min(1, "Vui lòng nhập câu hỏi")
    .max(1000, "Câu hỏi không được vượt quá 1000 ký tự"),
  mode: z
    .enum(["beginner", "basic", "expert"])
    .optional()
    .default("beginner"),
});

export type AskAiInput = z.infer<typeof AskAiSchema>;
export type AskAiSchema = AskAiInput;