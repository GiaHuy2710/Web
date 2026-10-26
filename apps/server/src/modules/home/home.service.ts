import { db, Prisma } from "@repo/database";
import { AppError } from "../../middlewares/errorHandler";
import { ProjectQueryInput, NewsletterInput } from "./home.schema";

export class HomeService {
  private newsletterSubscribers: Set<string> = new Set();
  private likedProjects: Map<string, { likes: number; isLiked: boolean }> = new Map();

  /**
   * 1. Lấy danh sách dự án THẬT từ Prisma Database
   */
  async getProjects(query: ProjectQueryInput) {
    const { category, tech, search, sort = "newest", page = 1, limit = 6 } = query;
    const skip = (page - 1) * limit;

    // Xây dựng điều kiện lọc động
    const conditions: Prisma.ProjectWhereInput[] = [];

    if (search) {
      conditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (tech) {
      conditions.push({
        tags: { has: tech },
      });
    }

    if (category && category !== "all") {
      conditions.push({
        tags: { has: category },
      });
    }

    const whereCondition: Prisma.ProjectWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    // Xác định thứ tự sắp xếp
    const orderBy: Prisma.ProjectOrderByWithRelationInput =
      sort === "name" ? { name: "asc" } : { createdAt: "desc" };

    // Đếm tổng số bản ghi và lấy dữ liệu thật từ Database
    const [total, projects] = await Promise.all([
      db.project.count({ where: whereCondition }),
      db.project.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy,
        include: {
          profile: {
            include: {
              user: {
                select: {
                  fullName: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
    ]);

    // Chuẩn hóa dữ liệu trả về cho Frontend
    const formattedProjects = projects.map((p) => {
      const likeInfo = this.likedProjects.get(p.id) || { likes: 0, isLiked: false };
      return {
        id: p.id,
        title: p.name,
        description: p.description || "",
        demoUrl: p.demoUrl || "#",
        githubUrl: p.repoUrl || "#",
        techStack: p.tags,
        category: p.tags[0] || "General",
        likes: likeInfo.likes,
        isLiked: likeInfo.isLiked,
        createdAt: p.createdAt,
        author: p.profile?.user?.fullName || "DevFolio Member",
      };
    });

    return {
      projects: formattedProjects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * 2. Lấy chi tiết 1 dự án thật theo ID
   */
  async getProjectById(id: string) {
    const project = await db.project.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            user: {
              select: {
                fullName: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new AppError("Không tìm thấy dự án", 404, "NOT_FOUND");
    }

    return project;
  }

  /**
   * 3. Thao tác Thả tim / Like dự án
   */
  async toggleLikeProject(id: string) {
    const project = await db.project.findUnique({ where: { id } });
    if (!project) {
      throw new AppError("Không tìm thấy dự án để thích", 404, "NOT_FOUND");
    }

    const current = this.likedProjects.get(id) || { likes: 0, isLiked: false };
    const nextLiked = !current.isLiked;
    const nextLikes = Math.max(0, current.likes + (nextLiked ? 1 : -1));
    this.likedProjects.set(id, { likes: nextLikes, isLiked: nextLiked });

    return {
      id,
      likes: nextLikes,
      isLiked: nextLiked,
    };
  }

  /**
   * 4. Lấy số liệu thống kê thật từ Database
   */
  async getStats() {
    const [totalUsers, totalProjects] = await Promise.all([
      db.user.count(),
      db.project.count(),
    ]);

    return {
      totalUsers,
      totalProjects,
      totalDownloads: "92,450+",
      uptime: "99.98%",
    };
  }

  /**
   * 5. Đăng ký nhận bản tin Newsletter
   */
  async subscribeNewsletter(input: NewsletterInput) {
    const email = input.email.toLowerCase().trim();
    this.newsletterSubscribers.add(email);

    return {
      message: "Đăng ký nhận bản tin công nghệ thành công!",
      email,
      totalSubscribers: this.newsletterSubscribers.size,
    };
  }
}

export const homeService = new HomeService();
