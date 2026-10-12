import { Router } from "express";
import { homeController } from "./home.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { NewsletterSchema } from "./home.schema";

const router = Router();

// 1. Lấy danh sách dự án trang chủ (hỗ trợ search, filter category, tech, sort, page)
router.get("/projects", homeController.getProjects);

// 2. Lấy chi tiết 1 dự án
router.get("/projects/:id", homeController.getProjectById);

// 3. Thao tác Like / Thả tim dự án
router.post("/projects/:id/like", homeController.toggleLike);

// 4. Lấy số liệu thống kê (Stats)
router.get("/stats", homeController.getStats);

// 5. Đăng ký nhận bản tin Newsletter
router.post(
  "/newsletter",
  validateBody(NewsletterSchema),
  homeController.subscribeNewsletter
);

export const homeRoutes: Router = router;