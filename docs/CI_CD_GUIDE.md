# 🚀 Hướng Dẫn Vận Hành CI/CD Pipeline (CI/CD Guide)

Dự án áp dụng GitHub Actions để tự động hóa quy trình kiểm thử (CI) và đảm bảo tính toàn vẹn của mã nguồn trước khi merge vào nhánh chính.

---

## 1. 🔄 Luồng Hoạt Động (Pipeline Flow)

Mỗi khi tạo Pull Request hoặc Push code lên bất kỳ nhánh nào, GitHub Actions sẽ kích hoạt luồng kiểm thử:

1. **Checkout Repository**: Kéo mã nguồn mới nhất.
2. **Setup Node.js & pnpm**: Cài đặt môi trường runtime và cache dependencies.
3. **Install Dependencies**: `pnpm install --no-frozen-lockfile`.
4. **Generate Prisma Client**: `pnpm --filter @repo/database db:generate`.
5. **Run Linter**: `pnpm lint` (đảm bảo không còn warning/error).
6. **Run Build**: `pnpm build` (build tất cả packages và apps qua Turborepo).
7. **Run Unit Tests**: `pnpm test`.

---

## 2. 🛡️ Branch Protection Rules

Nên thiết lập bảo vệ cho nhánh `main` / `develop`:
- Bắt buộc vượt qua pipeline `🔍 Lint & Typecheck` và `🧪 Unit Tests`.
- Yêu cầu ít nhất 1 Code Reviewer phê duyệt trước khi Merge.
- Bắt buộc rebase hoặc squash merge để giữ git history tinh gọn.
