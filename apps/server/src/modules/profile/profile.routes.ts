import { Router, Request, Response, NextFunction } from "express";
import { db } from "@repo/database";
import { UpdateProfileSchema, ERROR_CODES } from "@repo/shared";

const router = Router();

router.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const profile = await db.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            avatarUrl: true,
            role: true,
          },
        },
        experiences: true,
        educations: true,
        projects: true,
      },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: ERROR_CODES.NOT_FOUND,
          message: "Không tìm thấy hồ sơ người dùng",
        },
      });
    }

    return res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return next(error);
  }
});

router.put("/:userId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const validatedData = UpdateProfileSchema.parse(req.body);

    const updatedProfile = await db.profile.update({
      where: { userId },
      data: {
        title: validatedData.title,
        bio: validatedData.bio,
        phone: validatedData.phone,
        address: validatedData.address,
        website: validatedData.website,
        githubUrl: validatedData.githubUrl,
        linkedinUrl: validatedData.linkedinUrl,
        skills: validatedData.skills,
      },
    });

    return res.json({
      success: true,
      message: "Cập nhật hồ sơ thành công",
      data: updatedProfile,
    });
  } catch (error) {
    return next(error);
  }
});

export const profileRoutes: Router = router;
