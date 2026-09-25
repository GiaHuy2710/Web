# 🔍 Hướng Dẫn Quy Tắc ESLint (ESLint Rules Guide)

Monorepo sử dụng package cấu hình chung `@repo/eslint-config` nhằm chuẩn hóa tiêu chuẩn code trên toàn bộ ứng dụng Client, Server và Shared packages.

---

## 1. ⚙️ Quy Tắc Cốt Lõi (Core Principles)

- **TypeScript Strict Mode**: Khuyến khích định kiểu rõ ràng, hạn chế tối đa sử dụng kiểu `any`.
- **Unused Variables**: Các biến không sử dụng sẽ bị cảnh báo hoặc báo lỗi trừ khi có tiền tố gạch dưới `_` (ví dụ: `_req`, `_next`).
- **No Console trong Production**: Các dòng `console.log` chỉ nên sử dụng tạm thời cho mục đích debug local và hạn chế đưa vào production.
- **Pure Functions & Modularity**: Tách biệt logic kinh doanh (Business Logic) và tầng giao diện (Presentation).

---

## 2. 🧪 Chạy Kiểm Tra Linter

```bash
# Kiểm tra lint toàn bộ monorepo
pnpm lint

# Tự động sửa lỗi có thể tự fix
npx eslint . --fix
```
