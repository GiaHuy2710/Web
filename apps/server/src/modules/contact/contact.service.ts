import { ContactFormInput } from "./contact.schema";

// Định nghĩa kiểu dữ liệu cho một tin nhắn liên hệ đã được lưu
export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
  status: "new" | "read" | "replied";
}

export class ContactService {
  // Kho lưu trữ tin nhắn tạm thời (thay bằng Prisma khi có Database)
  private messages: ContactMessage[] = [];

  /**
   * 1. Xử lý gửi form liên hệ
   */
  async submitContactForm(input: ContactFormInput) {
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      fullName: input.name.trim(),
      email: input.email.toLowerCase().trim(),
      projectType: input.projectType,
      budget: input.budget,
      message: input.message.trim(),
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    this.messages.push(newMessage);

    // Ghi log khi nhận tin nhắn mới (thay bằng gửi email thật qua Nodemailer sau)
    console.log(`[Contact] Tin nhắn mới từ: ${newMessage.fullName} <${newMessage.email}>`);
    console.log(`  Loại dự án: ${newMessage.projectType}`);
    console.log(`  Ngân sách:  ${newMessage.budget}`);

    return {
      id: newMessage.id,
      submittedAt: newMessage.submittedAt,
      message: "Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi lại qua email trong vòng dưới 12 tiếng.",
    };
  }

  /**
   * 2. Lấy thông tin liên hệ của chủ trang (hiển thị ở cột phải)
   */
  async getContactInfo() {
    return {
      name: "Alex Nguyen",
      title: "Senior Full-Stack & AI Engineer",
      availability: {
        status: "available",
        label: "Đang nhận dự án mới",
        note: "Available for Q2/Q3 2025",
      },
      email: "alex.nguyen@techcorp.io",
      responseTime: "Dưới 12 tiếng",
      location: "Hà Nội, Việt Nam (UTC+7)",
      workingHours: "09:00 – 18:00 (Thứ 2 – Thứ 6)",
      socialLinks: [
        {
          platform: "GitHub",
          url: "https://github.com/alexdev",
          handle: "@alexdev",
        },
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/in/alexnguyen",
          handle: "Alex Nguyen",
        },
      ],
      expertise: [
        "React / Next.js / TypeScript",
        "Node.js / Golang / Rust",
        "Kiến trúc Microservices",
        "AI Integration & RAG Pipeline",
      ],
    };
  }

  /**
   * 3. Lấy danh sách câu hỏi thường gặp (FAQ)
   */
  async getFaqs() {
    return [
      {
        id: 1,
        question: "Quy trình làm việc thường diễn ra như thế nào?",
        answer:
          "Quy trình gồm 4 giai đoạn chuẩn Agile: " +
          "1. Khảo sát nhu cầu kỹ thuật & ký thỏa thuận bảo mật NDA → " +
          "2. Thiết kế kiến trúc giải pháp & lập kế hoạch chi tiết → " +
          "3. Triển khai theo từng Sprint 1-2 tuần kèm demo liên tục → " +
          "4. Kiểm thử bảo mật, triển khai hạ tầng CI/CD và bàn giao toàn bộ mã nguồn.",
      },
      {
        id: 2,
        question: "Bạn nhận thanh toán và hợp đồng theo hình thức nào?",
        answer:
          "Linh hoạt theo hợp đồng pháp nhân công ty hoặc cá nhân. " +
          "Thanh toán chia đều theo 3 mốc bàn giao (Milestones): " +
          "30% khởi động – 40% hoàn thiện tính năng cốt lõi – 30% nghiệm thu & chuyển giao. " +
          "Hỗ trợ chuyển khoản ngân hàng hoặc thanh toán quốc tế.",
      },
      {
        id: 3,
        question: "Có hỗ trợ bảo trì sau khi bàn giao không?",
        answer:
          "Tất cả sản phẩm được bảo hành kỹ thuật, vá lỗi bảo mật và theo dõi uptime miễn phí " +
          "từ 1 đến 3 tháng sau ngày bàn giao chính thức. " +
          "Sau thời gian trên, tôi cung cấp gói Service Level Agreement (SLA) định kỳ theo yêu cầu.",
      },
    ];
  }

  /**
   * 4. Lấy các lựa chọn cho dropdown Form (Loại dự án & Ngân sách)
   */
  async getFormOptions() {
    return {
      projectTypes: [
        "Thuê làm dự án (Project Development / MVP)",
        "Hợp tác kỹ thuật (Technical Partnership)",
        "Tư vấn kiến trúc phần mềm (Architecture Consulting)",
        "Tích hợp AI / LLM vào sản phẩm sẵn có",
        "Khác (Other)",
      ],
      budgetOptions: [
        "< $2,000",
        "$2,000 - $5,000",
        "$5,000 - $10,000",
        "Thỏa thuận",
      ],
    };
  }
}

export const contactService = new ContactService();