# 🗺️ Hướng Dẫn Cấu Trúc Mã Nguồn Frontend (Developer Quick Guide)

Tài liệu này giúp các lập trình viên (Developers) dễ dàng **tìm kiếm file, sửa lỗi (bug fix) và mở rộng tính năng mới** một cách nhanh chóng nhất.

---

## 📂 1. Sơ Đồ Cây Thư Mục (Folder Tree)

```text
apps/client/src/
├── assets/                 # Tài nguyên tĩnh: hình ảnh, icon SVG, fonts
├── components/             # Các khối giao diện tái sử dụng
│   ├── layout/             # Khung sườn chung: Header, Sidebar, Footer
│   ├── ui/                 # Nguyên tử giao diện cơ bản: Button, Input, Modal
│   ├── modals/             # Các hộp thoại nghiệp vụ: AuthModal, CvModal, CommandPalette
│   ├── sections/           # Các phần trang chủ: HeroSection, StatsSection, Newsletter
│   ├── projects/           # Card dự án, toolbar lọc, phân trang
│   ├── admin/              # Module Admin Studio (chia module gọn gàng)
│   │   ├── layout/         # Header & Sidebar của Admin
│   │   ├── widgets/        # Các widget: KpiMetrics, TrafficChart, SystemHealth, v.v.
│   │   ├── modals/         # Hộp thoại tạo tool, token invite, log stream
│   │   ├── types.ts        # Toàn bộ TypeScript interfaces cho Admin
│   │   └── AdminDashboard.tsx # Component trang chính ráp nối widget
│   ├── ai-assistant/       # Khối trò chuyện với AI chatbot
│   ├── contact/            # Form gửi liên hệ, FAQ, thông tin liên lạc
│   └── docs/               # Danh mục tài liệu kỹ thuật & blog
├── context/                # Quản lý State toàn cục (AppContext)
├── data/                   # Dữ liệu tĩnh / Mock data (projectsData, mockData)
├── hooks/                  # Custom React Hooks tách biệt logic (useAuth, useFetch)
├── pages/                  # Điểm tập hợp toàn bộ các màn hình (Pages)
│   ├── HomePage.tsx        # Màn hình Trang chủ
│   ├── ProjectDetailPage.tsx # Màn hình Chi tiết dự án
│   ├── AiAssistantPage.tsx # Màn hình Trợ lý AI
│   ├── ContactPage.tsx     # Màn hình Liên hệ
│   ├── DocsPage.tsx        # Màn hình Tài liệu & Blog
│   └── AdminPage.tsx       # Màn hình Admin Studio Dashboard
├── services/               # Xử lý nghiệp vụ logic dữ liệu (projectService)
├── shared/                 # [GIỮ NGUYÊN] Quản lý cấu hình API và interceptors
│   └── api/                # axios client, auth.api, home.api, v.v.
├── types/                  # Định nghĩa kiểu dữ liệu TypeScript (*.ts)
├── utils/                  # Hàm tiện ích thuần túy (cn, formatNumber, formatDate)
├── App.tsx                 # Điều hướng và hiển thị các trang
└── main.tsx                # Khởi động ứng dụng React (Vite entry)
```

---

## 🔍 2. Bảng Tra Cứu Nhanh (Cheatsheet: Cần sửa gì -> Tìm ở đâu?)

| Khi bạn cần sửa / nâng cấp | Đường dẫn thư mục & File cần mở |
| :--- | :--- |
| **Giao diện Trang chủ (Hero, Banner, Thống kê)** | `@/pages/HomePage.tsx` và `@/components/sections/` |
| **Danh sách Dự án, Thẻ Project, Bộ lọc danh mục** | `@/components/projects/` (`ProjectCard.tsx`, `ProjectsToolbar.tsx`) |
| **Admin Dashboard (Biểu đồ, Thẻ KPI, Sức khỏe Server)** | `@/components/admin/` (mỗi widget là 1 file độc lập) |
| **Hàng đợi kiểm duyệt / Duyệt bài Admin** | `@/components/admin/ModerationQueue.tsx` |
| **Hộp thoại Đăng nhập / Đăng ký (Auth)** | `@/components/modals/AuthModal.tsx` và `@/components/auth/` |
| **Lưu phiên đăng nhập / Token JWT** | `@/shared/api/auth.api.ts` và `@/hooks/useAuth.ts` |
| **Trang Trợ lý AI Chatbot** | `@/pages/AiAssistantPage.tsx` hoặc `@/components/ai-assistant/` |
| **Trang Liên hệ (Contact Form, FAQ, Email)** | `@/pages/ContactPage.tsx` hoặc `@/components/contact/` |
| **Thanh Menu đầu trang / Chân trang** | `@/components/layout/Header.tsx` & `@/components/layout/Footer.tsx` |
| **Các nút bấm (Button), Ô nhập (Input), Hộp thoại (Modal)** | `@/components/ui/` (`Button.tsx`, `Input.tsx`, `Modal.tsx`) |
| **Dữ liệu mẫu / Mock data hiển thị** | `@/data/projectsData.ts` & `@/data/mockData.ts` |
| **State toàn cục (Chuyển trang, Giỏ hàng, Modal mở/đóng)** | `@/context/AppContext.tsx` |

---

## 💡 3. Các Quy Tắc Chuẩn Để Viết Code Sạch (Clean Code Principles)

1. **Sử dụng Path Alias `@/` thay vì đường dẫn tương đối dài:**
   ```typescript
   // Khuyên dùng:
   import { Button } from '@/components/ui';
   import { useAuth } from '@/hooks';
   import { cn } from '@/utils';

   // Tránh dùng:
   import { Button } from '../../../components/ui/Button';
   ```

2. **Nguyên tắc "Mỗi file chỉ làm một việc" (Single Responsibility):**
   - Không dồn toàn bộ UI phức tạp vào một file lớn hơn 300 dòng.
   - Hãy tách các widget nhỏ ra thành component riêng trong cùng thư mục tính năng.

3. **Tách biệt Logic và Giao diện:**
   - Logic gọi API / fetch dữ liệu -> Đặt trong `@/hooks/` hoặc `@/services/`.
   - Giao diện JSX -> Đặt trong `@/components/` hoặc `@/pages/`.
