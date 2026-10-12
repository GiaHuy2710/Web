import { Router } from "express";
import { contactController } from "./contact.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { ContactFormSchema } from "./contact.schema";

const router = Router();

// 1. Gửi form liên hệ (Kiểm tra validate đầy đủ trước khi xử lý)
router.post(
  "/submit",
  validateBody(ContactFormSchema),
  contactController.submit
);

// 2. Lấy thông tin liên hệ của chủ trang (email, mạng xã hội, địa chỉ)
router.get("/info", contactController.getInfo);

// 3. Lấy danh sách FAQ (Câu hỏi thường gặp về quy trình làm việc)
router.get("/faqs", contactController.getFaqs);

// 4. Lấy danh sách các tùy chọn cho dropdown của Form
router.get("/form-options", contactController.getFormOptions);

export const contactRoutes: Router = router;