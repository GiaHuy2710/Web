export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "DevFolio Studio API Documentation",
    version: "2.4.0",
    description:
      "Tài liệu và hệ thống kiểm thử API tương tác cho nền tảng DevFolio (Bao gồm Client Portal và Admin Studio).",
    contact: {
      name: "DevFolio Engineering Team",
      email: "admin@devfolio.io",
      url: "https://devfolio.io",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Nhập mã JWT Token theo cú pháp: Bearer <token>",
      },
    },
    schemas: {
      // Schema phản hồi lỗi chuẩn
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          error: {
            type: "object",
            properties: {
              code: { type: "string", example: "VALIDATION_ERROR" },
              message: { type: "string", example: "Dữ liệu nhập vào không hợp lệ" },
            },
          },
        },
      },
      // Schema phản hồi thành công chung
      SuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Thao tác thành công" },
          data: { type: "object" },
        },
      },
    },
  },
  paths: {
    // ==========================================
    // 1. NHÓM XÁC THỰC (AUTH)
    // ==========================================
    "/api/auth/login": {
      post: {
        tags: ["1. Xác thực (Auth)"],
        summary: "Đăng nhập tài khoản",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "admin@devfolio.io" },
                  password: { type: "string", example: "Admin@123456" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Đăng nhập thành công, trả về JWT Token và thông tin user" },
          401: { description: "Email hoặc mật khẩu không chính xác" },
        },
      },
    },
    "/api/auth/register": {
      post: {
        tags: ["1. Xác thực (Auth)"],
        summary: "Đăng ký tài khoản người dùng mới",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["fullName", "email", "password"],
                properties: {
                  fullName: { type: "string", example: "Alex Nguyen" },
                  email: { type: "string", example: "user@devfolio.io" },
                  password: { type: "string", example: "User@123456" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Tạo tài khoản thành công" },
          409: { description: "Email đã tồn tại trên hệ thống" },
        },
      },
    },
    "/api/auth/forgot-password": {
      post: {
        tags: ["1. Xác thực (Auth)"],
        summary: "Yêu cầu khôi phục mật khẩu qua email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", example: "admin@devfolio.io" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Gửi yêu cầu reset mật khẩu thành công" },
        },
      },
    },
    "/api/auth/reset-password": {
      post: {
        tags: ["1. Xác thực (Auth)"],
        summary: "Đặt lại mật khẩu mới",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["token", "newPassword"],
                properties: {
                  token: { type: "string", example: "eyJhbGci..." },
                  newPassword: { type: "string", example: "NewPass@123456" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Đổi mật khẩu thành công" },
          400: { description: "Token không hợp lệ hoặc đã hết hạn" },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["1. Xác thực (Auth)"],
        summary: "Lấy thông tin tài khoản hiện tại từ Token",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Trả về thông tin hồ sơ của user" },
          401: { description: "Chưa đăng nhập hoặc token không hợp lệ" },
        },
      },
    },

    // ==========================================
    // 2. NHÓM QUẢN TRỊ HỆ THỐNG (ADMIN STUDIO) ⭐
    // ==========================================
    "/api/admin/products": {
      post: {
        tags: ["2. Quản trị hệ thống (Admin)"],
        summary: "Đăng tải sản phẩm mới (Tool / Web / Game)",
        description: "Phục vụ cho màn hình Đăng tải mới với bộ soạn thảo Markdown và phân loại.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "kind", "version", "slug", "summary"],
                properties: {
                  kind: { type: "string", enum: ["cli", "web", "game"], example: "cli" },
                  name: { type: "string", example: "RustPulse CLI Monitor" },
                  version: { type: "string", example: "v1.0.0-rc.2" },
                  slug: { type: "string", example: "rustpulse-cli-monitor" },
                  summary: {
                    type: "string",
                    example: "Công cụ giám sát hiệu năng I/O & Thread CPU viết bằng Rust siêu nhẹ.",
                  },
                  techStacks: {
                    type: "array",
                    items: { type: "string" },
                    example: ["Rust", "Tokio Async", "TUI Terminal", "Linux/macOS"],
                  },
                  markdownContent: {
                    type: "string",
                    example: "### Hướng dẫn cài đặt\n`cargo install rustpulse`",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Đăng tải sản phẩm mới thành công" },
          400: { description: "Lỗi validate dữ liệu hoặc slug bị trùng lặp" },
        },
      },
      get: {
        tags: ["2. Quản trị hệ thống (Admin)"],
        summary: "Lấy danh sách sản phẩm quản trị kho tải (Catalog Registry)",
        description: "Trả về danh sách 48 sản phẩm kèm thống kê CDN R2, SemVer, lượt tải.",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "category", in: "query", schema: { type: "string", enum: ["all", "cli", "web", "game"] } },
          { name: "status", in: "query", schema: { type: "string", enum: ["all", "active", "draft", "pending"] } },
          { name: "search", in: "query", schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Danh sách sản phẩm kho tải và thông số CDN" },
        },
      },
    },
    "/api/admin/products/{id}": {
      delete: {
        tags: ["2. Quản trị hệ thống (Admin)"],
        summary: "Xóa sản phẩm khỏi kho lưu trữ",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Xóa sản phẩm thành công" },
          404: { description: "Không tìm thấy sản phẩm" },
        },
      },
    },
    "/api/admin/users": {
      get: {
        tags: ["2. Quản trị hệ thống (Admin)"],
        summary: "Lấy danh sách người dùng cho trang Admin Studio",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "role", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string" } },
          { name: "search", in: "query", schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Danh sách người dùng kèm lịch sử hoạt động" },
        },
      },
    },
    "/api/admin/users/{id}/role": {
      put: {
        tags: ["2. Quản trị hệ thống (Admin)"],
        summary: "Cập nhật phân quyền người dùng (Role-Based Access Control)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["role"],
                properties: {
                  role: { type: "string", enum: ["ADMIN", "USER", "MANAGER"], example: "ADMIN" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Cập nhật quyền thành công" },
        },
      },
    },
    "/api/admin/users/{id}/ban": {
      post: {
        tags: ["2. Quản trị hệ thống (Admin)"],
        summary: "Khóa / Mở khóa tài khoản người dùng vi phạm",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Cập nhật trạng thái khóa tài khoản thành công" },
        },
      },
    },

    // ==========================================
    // 3. NHÓM TRANG CHỦ & DỰ ÁN (HOME & PROJECTS)
    // ==========================================
    "/api/home/projects": {
      get: {
        tags: ["3. Trang chủ & Dự án (Home)"],
        summary: "Lấy danh sách dự án (tìm kiếm, lọc danh mục, công nghệ, phân trang)",
        parameters: [
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "category", in: "query", schema: { type: "string" } },
          { name: "tech", in: "query", schema: { type: "string" } },
          { name: "sort", in: "query", schema: { type: "string", enum: ["newest", "popular", "name"] } },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 6 } },
        ],
        responses: {
          200: { description: "Danh sách dự án và thông tin phân trang" },
        },
      },
    },
    "/api/home/projects/{id}": {
      get: {
        tags: ["3. Trang chủ & Dự án (Home)"],
        summary: "Lấy chi tiết 1 dự án",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Chi tiết dự án" },
          404: { description: "Không tìm thấy dự án" },
        },
      },
    },
    "/api/home/projects/{id}/like": {
      post: {
        tags: ["3. Trang chủ & Dự án (Home)"],
        summary: "Thả tim / Bỏ tim dự án",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Cập nhật lượt tim thành công" },
        },
      },
    },
    "/api/home/stats": {
      get: {
        tags: ["3. Trang chủ & Dự án (Home)"],
        summary: "Lấy số liệu thống kê tổng quan (Kpi, dự án, đóng góp)",
        responses: {
          200: { description: "Dữ liệu thống kê" },
        },
      },
    },
    "/api/home/newsletter": {
      post: {
        tags: ["3. Trang chủ & Dự án (Home)"],
        summary: "Đăng ký nhận bản tin Newsletter qua email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", example: "user@domain.com" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Đăng ký nhận bản tin thành công" },
        },
      },
    },

    // ==========================================
    // 4. NHÓM TRỢ LÝ AI (AI ASSISTANT)
    // ==========================================
    "/api/ai/ask": {
      post: {
        tags: ["4. Trợ lý AI (AI Assistant)"],
        summary: "Gửi câu hỏi kỹ thuật cho Trợ lý AI",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["question"],
                properties: {
                  question: { type: "string", example: "API là gì và hoạt động ra sao?" },
                  mode: { type: "string", enum: ["beginner", "basic", "expert"], default: "basic" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Câu trả lời của AI kèm mô hình giải thích ẩn dụ (Metaphor Boxes)" },
        },
      },
    },
    "/api/ai/quick-questions": {
      get: {
        tags: ["4. Trợ lý AI (AI Assistant)"],
        summary: "Lấy danh sách các câu hỏi gợi ý nhanh cho AI",
        responses: {
          200: { description: "Danh sách câu hỏi gợi ý" },
        },
      },
    },
    "/api/ai/modes": {
      get: {
        tags: ["4. Trợ lý AI (AI Assistant)"],
        summary: "Lấy danh sách các chế độ giải thích của AI (Mới bắt đầu, Cơ bản, Chuyên sâu)",
        responses: {
          200: { description: "Danh sách chế độ" },
        },
      },
    },

    // ==========================================
    // 5. NHÓM LIÊN HỆ (CONTACT)
    // ==========================================
    "/api/contact/submit": {
      post: {
        tags: ["5. Liên hệ & Hợp tác (Contact)"],
        summary: "Gửi form liên hệ dự án mới",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["fullName", "email", "projectType", "budget", "message"],
                properties: {
                  fullName: { type: "string", example: "Nguyễn Văn A" },
                  email: { type: "string", example: "nguyenvana@gmail.com" },
                  projectType: { type: "string", example: "Thuê làm dự án (Project Development / MVP)" },
                  budget: { type: "string", example: "$2,000 - $5,000" },
                  message: { type: "string", example: "Tôi muốn xây dựng một ứng dụng SaaS quản lý kho hàng." },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Tin nhắn đã được gửi thành công" },
        },
      },
    },
    "/api/contact/info": {
      get: {
        tags: ["5. Liên hệ & Hợp tác (Contact)"],
        summary: "Lấy thông tin liên hệ của chủ trang (email, địa chỉ, giờ làm việc)",
        responses: {
          200: { description: "Thông tin liên hệ" },
        },
      },
    },
    "/api/contact/faqs": {
      get: {
        tags: ["5. Liên hệ & Hợp tác (Contact)"],
        summary: "Lấy các câu hỏi thường gặp (Quy trình làm việc, thanh toán, bảo hành)",
        responses: {
          200: { description: "Danh sách câu hỏi FAQ" },
        },
      },
    },
    "/api/contact/form-options": {
      get: {
        tags: ["5. Liên hệ & Hợp tác (Contact)"],
        summary: "Lấy danh sách tùy chọn loại dự án và ngân sách cho dropdown",
        responses: {
          200: { description: "Các tùy chọn form" },
        },
      },
    },

    // ==========================================
    // 6. NHÓM HỒ SƠ CÁ NHÂN (PROFILES)
    // ==========================================
    "/api/profiles/{userId}": {
      get: {
        tags: ["6. Hồ sơ cá nhân (Profiles)"],
        summary: "Lấy hồ sơ cá nhân đầy đủ (kèm kinh nghiệm, học vấn, dự án)",
        parameters: [
          { name: "userId", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Dữ liệu hồ sơ" },
          404: { description: "Không tìm thấy hồ sơ" },
        },
      },
      put: {
        tags: ["6. Hồ sơ cá nhân (Profiles)"],
        summary: "Cập nhật hồ sơ cá nhân",
        parameters: [
          { name: "userId", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Senior Full-Stack & AI Engineer" },
                  bio: { type: "string", example: "Đam mê xây dựng sản phẩm chất lượng cao." },
                  phone: { type: "string", example: "+84 912 345 678" },
                  address: { type: "string", example: "TP. Hồ Chí Minh, Việt Nam" },
                  skills: { type: "array", items: { type: "string" }, example: ["React", "Node.js", "Docker"] },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Cập nhật thành công" },
        },
      },
    },
  },
};

export const swaggerSpec = swaggerDocument;
export default swaggerDocument;