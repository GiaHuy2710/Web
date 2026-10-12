import { Request, Response, NextFunction } from "express";
import { contactService } from "./contact.service";

export class ContactController {
  // POST /api/contact/submit
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await contactService.submitContactForm(req.body);
      return res.status(201).json({
        success: true,
        message: result.message,
        data: {
          id: result.id,
          submittedAt: result.submittedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/contact/info
  async getInfo(_req: Request, res: Response, next: NextFunction) {
    try {
      const info = await contactService.getContactInfo();
      return res.status(200).json({
        success: true,
        data: info,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/contact/faqs
  async getFaqs(_req: Request, res: Response, next: NextFunction) {
    try {
      const faqs = await contactService.getFaqs();
      return res.status(200).json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      return next(error);
    }
  }

  // GET /api/contact/form-options
  async getFormOptions(_req: Request, res: Response, next: NextFunction) {
    try {
      const options = await contactService.getFormOptions();
      return res.status(200).json({
        success: true,
        data: options,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export const contactController = new ContactController();