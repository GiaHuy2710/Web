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

---

## 3. 📢 Cấu Hình Thông Báo Tự Động Vào Kênh Discord `#commit-code`

Có 2 cách tích hợp Discord tùy theo nhu cầu:

### Cách 1: Tích hợp trực tiếp từ GitHub Repository (Khuyên dùng - Đơn giản nhất)
Mỗi khi có commit hoặc push lên bất kỳ nhánh nào, GitHub sẽ tự động gửi thông báo chi tiết (Tác giả, Commit message, danh sách file thay đổi, diff link) vào kênh Discord.

1. **Lấy Webhook URL từ Discord:**
   - Trong màn hình Discord của bạn (kênh `#commit-code` -> Tích hợp -> Webhooks), bấm nút xanh **"Tạo Webhook"**.
   - Đặt tên cho bot (ví dụ: `GitHub Commit Bot`).
   - Bấm **"Sao chép URL Webhook"**. URL có dạng: `https://discord.com/api/webhooks/123456/abcdef...`
2. **Thêm vào GitHub Webhook:**
   - Truy cập vào Repository trên GitHub -> chọn tab **Settings** -> mục **Webhooks** -> bấm **Add webhook**.
   - Tại ô **Payload URL**: Dán URL vừa copy và **thêm `/github` vào cuối cùng**.
     - Ví dụ: `https://discord.com/api/webhooks/123456/abcdef.../github`
   - Tại ô **Content type**: Chọn `application/json`.
   - Tại phần **Which events would you like to trigger this webhook?**: Chọn `Just the push event` (hoặc `Send me everything` nếu muốn cả PR/Issues).
   - Bấm **Add webhook**.

---

### Cách 2: Thông Báo Kết Quả CI/CD Pipeline (Giống Plot Farm)
Mỗi khi push code hoặc mở PR, GitHub Actions chạy build/test xong sẽ bắn kết quả (✅ BUILD PASSED / ❌ BUILD FAILED) kèm embed thông tin vào Discord.

1. Bấm **"Tạo Webhook"** trên Discord và **Sao chép URL Webhook**.
2. Trên GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
3. Bấm **New repository secret**:
   - **Name**: `DISCORD_WEBHOOK`
   - **Secret**: Dán URL Webhook của Discord.
4. Bấm **Add secret**.

