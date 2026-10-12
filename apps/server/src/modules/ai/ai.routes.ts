import { Router } from "express";
import { aiController } from "./ai.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { AskAiSchema } from "./ai.schema";

const router = Router();

// 1. Gửi câu hỏi cho AI (hỗ trợ các mode: beginner, basic, expert)
router.post(
  "/ask",
  validateBody(AskAiSchema),
  aiController.ask
);

// 2. Lấy danh sách các câu hỏi gợi ý nhanh
router.get("/quick-questions", aiController.getQuickQuestions);

// 3. Lấy danh sách các chế độ giải thích
router.get("/modes", aiController.getModes);

export const aiRoutes: Router = router;