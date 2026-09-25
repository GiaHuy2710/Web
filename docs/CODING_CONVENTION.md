# 📋 Quy Chuẩn Lập Trình (Coding Conventions)

Tài liệu này định nghĩa quy chuẩn code, quy trình làm việc với Git, cấu trúc commit message và kiểm tra chất lượng cho dự án Monorepo.

---

## 1. 🌿 Quy Chuẩn Đặt Tên Nhánh (Branch Naming)

Mỗi nhánh công việc (Feature, Bugfix, Refactor) cần tuân theo định dạng:

```text
<type>/<issue-or-task-id>-<short-description>
```

### Ví dụ:
- `feat/us-01-user-authentication`
- `fix/us-05-profile-avatar-upload`
- `refactor/us-12-database-indexing`
- `chore/update-dependencies`

---

## 2. 📝 Quy Chuẩn Commit Message (Commitlint / Conventional Commits)

Toàn bộ commit message bắt buộc tuân theo quy tắc:
```text
<type>(<scope>): <subject>
```

### Các tiền tố Type hợp lệ:
- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Cập nhật tài liệu
- `style`: Định dạng code (whitespace, formatting, không ảnh hưởng logic)
- `refactor`: Tái cấu trúc code (không thêm tính năng mới hoặc sửa bug)
- `perf`: Tối ưu hiệu năng
- `test`: Thêm hoặc sửa unit test
- `build`: Thay đổi hệ thống build hoặc dependencies
- `ci`: Thay đổi file cấu hình CI/CD
- `chore`: Các công việc bảo trì nhỏ

### Ví dụ Commit Hợp Lệ:
```bash
git commit -m "feat(auth): add register and login endpoints with jwt"
git commit -m "fix(client): fix broken proxy path in vite config"
```

---

## 3. 🛡️ Git Hooks & Kiểm Soát Tự Động (Husky)

Dự án đã tích hợp Husky:
1. **`pre-commit`**: Tự động kích hoạt:
   - `lint-staged`: format và fix linter các file đã stage
   - `pnpm lint`: kiểm tra nghiêm ngặt không phát sinh warning/error
   - `pnpm build`: đảm bảo toàn bộ packages và apps build thành công
2. **`commit-msg`**: Tự động kiểm tra cú pháp commit message với `@commitlint`.
