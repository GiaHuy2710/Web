import { ERROR_CODES } from "@repo/shared";
import { AppError } from "../../middlewares/errorHandler";
import { ProjectQueryInput, NewsletterInput } from "./home.schema";

export interface ProjectItem {
  id: string;
  title: string;
  badge?: string;
  badgeType?: "featured" | "popular" | "breadcrumb";
  likes: number;
  views?: string;
  isLiked?: boolean;
  category: string;
  techStack: string[];
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  details: {
    longDescription: string;
    highlights: string[];
    architecture: string;
    version: string;
    stars: string;
  };
}

// Kho dữ liệu dự án mẫu phục vụ trang chủ
const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "synapse-ai",
    title: "Synapse AI",
    badge: "★ Featured",
    badgeType: "featured",
    likes: 89,
    views: "1.4k",
    category: "AI Tools",
    techStack: ["AI Tools", "Next.js", "OpenAI"],
    description: "Trợ lý tóm tắt kiến trúc codebase và tra cứu logic AI thông minh sử dụng RAG đa tầng siêu tốc.",
    image: "/images/synapse-ai.jpg",
    demoUrl: "https://synapse-ai.devfolio.io",
    githubUrl: "https://github.com/alexdev/synapse-ai",
    details: {
      longDescription: "Synapse AI được phát triển nhằm giải quyết bài toán onboarding vào codebase khổng lồ. Ứng dụng tự động lập chỉ mục AST, trích xuất quan hệ phụ thuộc và triển khai Vector Search kết hợp hybrid BM25 + pgvector.",
      highlights: [
        "Multi-vector indexing với Tree-sitter AST parser",
        "Hybrid Search (pgvector + BM25 keyword matching)",
        "Streaming UI với Server-Sent Events và WebSockets",
      ],
      architecture: "Next.js 14, PostgreSQL, pgvector, LangChain, TailwindCSS, Redis Cache",
      version: "v2.4.0",
      stars: "4.2k",
    },
  },
  {
    id: "devpulse",
    title: "DevPulse",
    badge: "TRANG CHỦ — KHO DỰ ÁN & PORTFOLIO",
    badgeType: "breadcrumb",
    likes: 920,
    category: "Web App",
    techStack: ["Web App", "Go", "Svelte", "Docker"],
    description: "Hệ thống Realtime Performance & Uptime Monitor cảnh báo độ trễ microsecond cho microservices.",
    image: "/images/devpulse.jpg",
    demoUrl: "https://devpulse.devfolio.io",
    githubUrl: "https://github.com/alexdev/devpulse",
    details: {
      longDescription: "DevPulse theo dõi sức khỏe hệ thống phân tán thời gian thực, tổng hợp số liệu từ Prometheus, Jaeger trace và phân tích bất thường bằng thuật toán exponential smoothing.",
      highlights: [
        "Cảnh báo qua Slack, Telegram & Webhook với thời gian trễ dưới 200ms",
        "Giao diện Svelte 5 siêu nhẹ, tiêu thụ RAM trình duyệt cực thấp",
        "Backend Go hiệu năng cao xử lý 50.000 events/giây trên node đơn",
      ],
      architecture: "Golang, SvelteKit, InfluxDB, Docker Compose, WebSocket",
      version: "v3.1.2",
      stars: "3.8k",
    },
  },
  {
    id: "chromapalette",
    title: "ChromaPalette",
    badge: "89 Lưu",
    likes: 340,
    category: "Developer Tools",
    techStack: ["Developer Tools", "React", "TailwindCSS"],
    description: "Bộ trích xuất bảng màu thông minh từ hình ảnh và kiểm tra độ tương phản WCAG 2.1 AAA.",
    image: "/images/chroma.jpg",
    demoUrl: "https://chroma.devfolio.io",
    githubUrl: "https://github.com/alexdev/chroma",
    details: {
      longDescription: "Công cụ hỗ trợ nhà thiết kế và frontend dev chọn bảng màu hài hòa, tính toán ma trận tương phản trực tiếp trên canvas WebGL.",
      highlights: [
        "Phân cụm màu sắc K-Means trên nền WebAssembly",
        "Tự động xuất biến màu CSS, SCSS, Tailwind và Figma Token",
      ],
      architecture: "React 18, Vite, TypeScript, WebAssembly, TailwindCSS",
      version: "v1.2.0",
      stars: "1.1k",
    },
  },
];

export class HomeService {
  private projects: ProjectItem[] = [...INITIAL_PROJECTS];
  private newsletterSubscribers: Set<string> = new Set();

  /**
   * 1. Lấy danh sách dự án kèm bộ lọc, tìm kiếm, sắp xếp và phân trang
   */
  async getProjects(query: ProjectQueryInput) {
    let result = [...this.projects];

    // Lọc theo danh mục
    if (query.category && query.category !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === query.category.toLowerCase()
      );
    }

    // Lọc theo Tech Stack
    if (query.tech) {
      const techLower = query.tech.toLowerCase();
      result = result.filter((p) =>
        p.techStack.some((t) => t.toLowerCase() === techLower)
      );
    }

    // Tìm kiếm theo từ khóa (Tiêu đề hoặc mô tả)
    if (query.search && query.search.trim()) {
      const keyword = query.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword) ||
          p.techStack.some((t) => t.toLowerCase().includes(keyword))
      );
    }

    // Sắp xếp
    if (query.sort === "popular") {
      result.sort((a, b) => b.likes - a.likes);
    } else if (query.sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Phân trang
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / query.limit) || 1;
    const startIndex = (query.page - 1) * query.limit;
    const paginatedItems = result.slice(startIndex, startIndex + query.limit);

    // Danh sách categories thống kê số lượng
    const categories = [
      { id: "all", label: "Tất cả", count: this.projects.length },
      { id: "AI Tools", label: "AI Tools", count: this.projects.filter(p => p.category === "AI Tools").length },
      { id: "Web App", label: "Web App", count: this.projects.filter(p => p.category === "Web App").length },
      { id: "Developer Tools", label: "Dev Tools", count: this.projects.filter(p => p.category === "Developer Tools").length },
    ];

    return {
      items: paginatedItems,
      pagination: {
        page: query.page,
        limit: query.limit,
        totalItems,
        totalPages,
      },
      categories,
    };
  }

  /**
   * 2. Lấy thông tin chi tiết 1 dự án
   */
  async getProjectById(id: string) {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new AppError("Không tìm thấy dự án", 404, ERROR_CODES.NOT_FOUND);
    }
    return project;
  }

  /**
   * 3. Thao tác Thả tim / Like dự án
   */
  async toggleLikeProject(id: string) {
    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      throw new AppError("Không tìm thấy dự án để thích", 404, ERROR_CODES.NOT_FOUND);
    }

    // Đảo ngược trạng thái like
    project.isLiked = !project.isLiked;
    project.likes += project.isLiked ? 1 : -1;

    return {
      id: project.id,
      likes: project.likes,
      isLiked: project.isLiked,
    };
  }

  /**
   * 4. Lấy số liệu thống kê (Stats Section)
   */
  async getStats() {
    return [
      {
        label: "HỆ SINH THÁI",
        value: `${this.projects.length}+`,
        desc: "Dự án đã build",
        valueColor: "text-emerald-400",
      },
      {
        label: "LƯỢT TIẾP CẬN",
        value: "148.2k",
        desc: "Lượt xem",
        valueColor: "text-sky-400",
      },
      {
        label: "MÃ NGUỒN MỞ",
        value: "12.4k",
        desc: "Lượt sao GitHub",
        valueColor: "text-slate-100",
      },
    ];
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