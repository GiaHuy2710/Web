# 🌐 Profile Monorepo Platform

Hệ thống quản lý **Profile** được xây dựng theo kiến trúc Monorepo hiện đại với **Turborepo** và **pnpm Workspaces**, chuẩn hóa theo cấu trúc của dự án `plot-farm`.

---

## 🏛️ Cấu Trúc Dự Án (Project Architecture)

```text
Profile/
├── apps/
│   ├── client/                  # FRONTEND: React 18 + Vite + Tailwind CSS + TypeScript
│   └── server/                  # BACKEND: Express.js + TypeScript + RESTful APIs
│
├── packages/                    # TẦNG PACKAGES DÙNG CHUNG
│   ├── database/                # Prisma ORM, PostgreSQL schema & DB client
│   ├── shared/                  # Zod Schemas & TypeScript Types dùng chung (FE + BE)
│   ├── eslint-config/           # Cấu hình ESLint chung cho toàn bộ monorepo
│   └── tsconfig/                # Cấu hình TypeScript base, react, node
│
├── docs/                        # TÀI LIỆU DỰ ÁN
│   ├── CODING_CONVENTION.md     # Quy chuẩn nhánh, commitlint, PR workflow & Husky
│   ├── ESLINT_RULES.md          # Diễn giải các luật ESLint cho team
│   └── CI_CD_GUIDE.md           # Hướng dẫn CI/CD Pipeline với GitHub Actions
│
├── .github/workflows/           # CI/CD Workflows (GitHub Actions)
├── .husky/                      # Git Hooks tự động hóa local (pre-commit, commit-msg)
├── package.json                 # Monorepo Root Package
├── pnpm-workspace.yaml          # Định nghĩa không gian làm việc pnpm
└── turbo.json                   # Cấu hình Turborepo Pipeline
```

---

## 📚 Tài Liệu Hướng Dẫn (Documentation Links)

| Tài liệu | Mô tả |
| :--- | :--- |
| **[Quy Chuẩn Lập Trình](docs/CODING_CONVENTION.md)** | Quy định đặt tên nhánh, commit message Conventional Commits, PR workflow & Husky |
| **[Hướng Dẫn Luật ESLint](docs/ESLINT_RULES.md)** | Diễn giải quy tắc linter, TypeScript strict & React Hooks rules |
| **[Hướng Dẫn CI/CD Pipeline](docs/CI_CD_GUIDE.md)** | Hướng dẫn vận hành GitHub Actions Pipeline |

---

## 🚀 Khởi Động Dự Án (Quick Start)

### 1. Cài đặt Dependencies
```bash
pnpm install
```

### 2. Sinh mã Prisma Client
```bash
pnpm --filter @repo/database db:generate
```

### 3. Chạy môi trường Development (FE + BE song song)
```bash
pnpm dev
```
- **Client**: [http://localhost:3000](http://localhost:3000)
- **API Server**: [http://localhost:5000](http://localhost:5000)
- **Health check**: [http://localhost:5000/health](http://localhost:5000/health)

### 4. Kiểm tra Linter & Chạy Tests
```bash
pnpm lint
pnpm test
```

### 5. Build toàn bộ Monorepo với Turborepo
```bash
pnpm build
```
