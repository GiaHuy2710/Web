import { Request, Response, NextFunction } from "express";
import { homeService } from "./home.service";
import { ProjectQuerySchema } from "./home.schema";

export class HomeController {
  // GET /api/projects
  async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const query = ProjectQuerySchema.parse(req.query);
      const result = await homeService.getProjects(query);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/projects/:id
  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await homeService.getProjectById(id);
      return res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/projects/:id/like
  async toggleLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await homeService.toggleLikeProject(id);
      return res.status(200).json({
        success: true,
        message: result.isLiked ? "Đã thích dự án" : "Đã bỏ thích dự án",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/home/stats
  async getStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await homeService.getStats();
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      return next(error);
    }
  }

  // POST /api/home/newsletter
  async subscribeNewsletter(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await homeService.subscribeNewsletter(req.body);
      return res.status(201).json({
        success: true,
        message: result.message,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export const homeController = new HomeController();