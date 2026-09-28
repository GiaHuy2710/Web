# 📘 Hướng Dẫn Cấu Trúc & Tra Cứu Nhanh — DevFolio Landing Page

Tài liệu này tổng hợp toàn bộ vị trí các file thành phần (components), dữ liệu mẫu (data), định nghĩa kiểu (types) và hướng dẫn cách sửa chữa, nâng cấp trang web khi cần.

---

## ⚡ Bảng Tra Cứu Nhanh: "Muốn Sửa Gì -> Mở File Nào"

| Chức năng cần can thiệp | Đường dẫn File | Mô tả chi tiết |
| :--- | :--- | :--- |
| **Thanh Menu trên cùng (Header)** | `apps/client/src/components/layout/Header.tsx` | Logo DevFolio, các link menu, nút tìm kiếm, Avatar & Dropdown người dùng Alex Nguyen |
| **Chân trang (Footer)** | `apps/client/src/components/layout/Footer.tsx` | Bản quyền, các link GitHub/Twitter/LinkedIn/RSS, đèn trạng thái `All systems operational` |
| **Banner đầu trang (Hero)** | `apps/client/src/components/sections/HeroSection.tsx` | Tag `Available for contract`, tiêu đề lớn, đoạn mô tả giới thiệu, nút *Khám phá dự án* & *Nhận tài liệu/CV* |
| **Khối thống kê (Stats)** | `apps/client/src/components/sections/StatsSection.tsx` | 3 thẻ số liệu: `24+ Dự án đã build`, `148.2k Lượt xem`, `12.4k Sao GitHub` |
| **Giao diện thẻ dự án (Card)** | `apps/client/src/components/projects/ProjectCard.tsx` | Ảnh preview, tag Featured/Popular, nút thả tim ❤️, danh sách công nghệ, nút *Xem chi tiết* |
| **Bộ lọc & Sắp xếp (Toolbar)** | `apps/client/src/components/projects/ProjectsToolbar.tsx` | Các nút tab danh mục (Tất cả, Web App...), nút lọc Tech (React, Go...), dropdown sắp xếp |
| **Thanh phân trang (Pagination)** | `apps/client/src/components/projects/Pagination.tsx` | Nút `< Trước`, số trang `1, 2, 3, 4`, nút `Tiếp >`, dòng chữ `Hiển thị 1-6 trên 24` |
| **Hộp đăng ký Email (Newsletter)** | `apps/client/src/components/sections/NewsletterSection.tsx` | Khung nhập email, nút *Đăng ký*, bộ 3 nút mô phỏng (*1. Mặc định \| 2. Thành công \| 3. Lỗi email*) |
| **Popup xem chi tiết dự án** | `apps/client/src/components/modals/ProjectDetailModal.tsx` | Cửa sổ pop-up hiển thị kiến trúc kỹ thuật, điểm nổi bật, link GitHub và link Demo |
| **Popup tìm kiếm nhanh (Ctrl + K)** | `apps/client/src/components/modals/CommandPaletteModal.tsx` | Cửa sổ tìm kiếm nhanh mở khi nhấn thanh search hoặc phím tắt `Ctrl + K` |
| **Popup xem hồ sơ & tải CV** | `apps/client/src/components/modals/CvModal.tsx` | Cửa sổ pop-up tóm tắt kinh nghiệm làm việc, kỹ năng frontend/backend và nút tải file CV |
| **Dữ liệu danh sách dự án** | `apps/client/src/data/projectsData.ts` | Nơi khai báo thông tin các dự án, danh mục phân loại và danh sách công nghệ lọc |
| **Định nghĩa kiểu dữ liệu (Types)** | `apps/client/src/types/project.ts` | Kiểu dữ liệu `ProjectItem`, `ProjectCategory`, `CategoryItem` |
| **Điều phối logic toàn trang** | `apps/client/src/app/App.tsx` | Component gốc xử lý state lọc, phân trang, mở pop-up và kết hợp các sections |

---

## 🗂️ Sơ Đồ Cấu Trúc Thư Mục `apps/client/src`

```text
apps/client/src/
├── app/
│   ├── App.tsx                     <-- Component gốc ráp nối các phần
│   └── main.tsx                    <-- Mount React vào index.html
│
├── components/                     <-- Tất cả components được chia nhóm gọn gàng
│   │
│   ├── layout/                     <-- Khung sườn chung
│   │   ├── Header.tsx              <-- Header + User menu
│   │   ├── Footer.tsx              <-- Footer
│   │   └── index.ts                <-- Barrel export
│   │
│   ├── sections/                   <-- Các khối nội dung của trang
│   │   ├── HeroSection.tsx         <-- Banner mở đầu + 2 nút CTA
│   │   ├── StatsSection.tsx        <-- 3 thẻ thông số thống kê
│   │   ├── NewsletterSection.tsx   <-- Hộp email newsletter
│   │   └── index.ts                <-- Barrel export
│   │
│   ├── projects/                   <-- Khu vực dự án
│   │   ├── ProjectCard.tsx         <-- Thẻ bài viết/dự án đơn lẻ
│   │   ├── ProjectsToolbar.tsx     <-- Thanh filter (Category, Tech, Sort)
│   │   ├── Pagination.tsx          <-- Thanh phân trang
│   │   └── index.ts                <-- Barrel export
│   │
│   ├── modals/                     <-- Các cửa sổ pop-up tương tác
│   │   ├── ProjectDetailModal.tsx  <-- Modal xem chi tiết dự án
│   │   ├── CommandPaletteModal.tsx <-- Modal tìm kiếm nhanh (Ctrl + K)
│   │   ├── CvModal.tsx             <-- Modal xem hồ sơ năng lực & tải CV
│   │   └── index.ts                <-- Barrel export
│   │
│   └── index.ts                    <-- File xuất khẩu trung tâm (export tất cả)
│
├── types/
│   └── project.ts                  <-- TypeScript interfaces chuẩn
│
├── data/
│   └── projectsData.ts             <-- Data mẫu 6 dự án đầy đủ hình ảnh & mô tả
│
├── public/
│   └── images/                     <-- Toàn bộ hình ảnh demo độ phân giải cao
│       ├── synapse-ai.jpg
│       ├── devpulse.jpg
│       ├── chromapalette.jpg
│       ├── pixelforge.jpg
│       ├── markdownx.jpg
│       ├── docuflow.jpg
│       └── alex-avatar.jpg
│
└── index.css                       <-- Styles nền tối, hiệu ứng kính mờ (glassmorphism)
```

---

## 🛠️ Hướng Dẫn Thao Tác Thường Dùng

### 1. Thêm một dự án mới
Mở file `apps/client/src/data/projectsData.ts`, thêm một object vào mảng `PROJECTS_DATA`:

```ts
{
  id: 'ten-du-an-moi',
  title: 'Tên Dự Án Mới',
  badge: '★ Featured', // hoặc '★ Popular', hoặc bỏ trống
  badgeType: 'featured', // 'featured' | 'popular' | 'breadcrumb'
  likes: 120,
  views: '2.5k',
  category: 'Web App', // 'Web App' | 'AI Tools' | 'Developer Tools' | 'Games & Creative'
  techStack: ['Next.js', 'TypeScript', 'TailwindCSS'],
  description: 'Mô tả ngắn gọn về dự án...',
  image: '/images/ten-anh.jpg',
  demoUrl: 'https://demo-link.com',
  githubUrl: 'https://github.com/alexdev/repo',
  details: {
    longDescription: 'Mô tả chuyên sâu kiến trúc...',
    highlights: ['Điểm nổi bật 1', 'Điểm nổi bật 2'],
    architecture: 'Tech stack chi tiết...',
    version: 'v1.0.0',
    stars: '1.2k'
  }
}
```

### 2. Thêm thẻ công nghệ lọc mới
Trong file `apps/client/src/data/projectsData.ts`:
```ts
export const TECH_FILTERS = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'TailwindCSS',
  'Rust',
  'Go',         // <-- Thêm công nghệ mới tại đây
  'Docker'
];
```

### 3. Đổi số điện thoại / Email / Tên tác giả
- **Tên & Avatar góc phải Header**: sửa tại `apps/client/src/components/layout/Header.tsx`.
- **Hồ sơ năng lực & CV**: sửa tại `apps/client/src/components/modals/CvModal.tsx`.
- **Thông tin liên hệ mạng xã hội ở chân trang**: sửa tại `apps/client/src/components/layout/Footer.tsx`.

---

## 🚀 Các Lệnh Chạy Ứng Dụng

| Mục đích | Lệnh chạy (từ thư mục gốc) |
| :--- | :--- |
| **Khởi chạy môi trường Dev** | `pnpm --filter client dev` |
| **Kiểm tra biên dịch & Build thử** | `pnpm --filter client build` |
| **Xem trước bản build (Preview)** | `pnpm --filter client preview` |
