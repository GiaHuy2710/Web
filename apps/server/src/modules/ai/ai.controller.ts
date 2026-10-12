import { Request, Response, NextFunction } from "express";
import { aiService } from "./ai.service";

export class AiController {
  // POST /api/ai/ask
  async ask(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await aiService.askAi(req.body);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/ai/quick-questions
  async getQuickQuestions(_req: Request, res: Response, next: NextFunction) {
    try {
      const questions = await aiService.getQuickQuestions();
      return res.status(200).json({
        success: true,
        data: questions,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/ai/modes
  async getModes(_req: Request, res: Response, next: NextFunction) {
    try {
      const modes = await aiService.getModes();
      return res.status(200).json({
        success: true,
        data: modes,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export const aiController = new AiController();