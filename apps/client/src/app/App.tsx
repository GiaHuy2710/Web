import React, { useState, useEffect } from "react";
import { 
  Layers, 
  Database, 
  Server, 
  Laptop, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Box,
  FileCode2
} from "lucide-react";

export const App: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<string>("Checking...");
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "docs">("overview");

  useEffect(() => {
    fetch("/health")
      .then((res) => res.json())
      .then((data) => setHealthStatus(`Online (${data.status})`))
      .catch(() => setHealthStatus("Backend Offline (Run `pnpm dev`)"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Profile Monorepo
              </span>
              <span className="ml-2 px-2 py-0.5 text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                Turborepo + pnpm
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
              <span className={`w-2 h-2 rounded-full ${healthStatus.includes("Online") ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-slate-300">API Status: {healthStatus}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Kiến trúc chuẩn hoá từ hệ thống plot-farm
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Nền tảng Monorepo Hiện đại <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Turborepo • pnpm • Feature-Sliced
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Được cấu hình đầy đủ ứng dụng Client (React + Vite), Backend (Express + TypeScript), 
            và các Packages dùng chung (Database Prisma, Zod Shared, Tsconfig, ESLint, Husky).
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-slate-800">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 px-4 text-sm font-medium transition-all ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Tổng quan cấu trúc
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`pb-3 px-4 text-sm font-medium transition-all ${
                activeTab === "architecture"
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Hệ thống Packages & Apps
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`pb-3 px-4 text-sm font-medium transition-all ${
                activeTab === "docs"
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Lệnh điều khiển & Quy chuẩn
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Laptop className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">apps/client</h2>
              <p className="text-sm text-slate-400 mb-4">
                Single Page Application xây dựng bằng React 18, Vite 5, Tailwind CSS, Lucide icons, tổ chức theo Feature-Sliced Design.
              </p>
              <div className="text-xs font-mono text-slate-500 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                Port: 3000 • Proxy: /api
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Server className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">apps/server</h2>
              <p className="text-sm text-slate-400 mb-4">
                RESTful API Server sử dụng Express, TypeScript, TSX live watch, tích hợp JWT Auth, phân quyền Role và Zod Validation.
              </p>
              <div className="text-xs font-mono text-slate-500 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                Port: 5000 • Health: /health
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">packages/database</h2>
              <p className="text-sm text-slate-400 mb-4">
                Tầng dữ liệu tập trung với Prisma ORM, cấu hình PostgreSQL, mô hình User, Profile, Experience, Education và Project.
              </p>
              <div className="text-xs font-mono text-slate-500 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                Shared ORM Instance • db:generate
              </div>
            </div>
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <Box className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white">packages/shared</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Thư viện mã nguồn dùng chung giữa Frontend và Backend: Zod schemas xác thực dữ liệu, TypeScript types, hằng số lỗi và phản hồi chuẩn.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                  import &#123; LoginSchema, ApiResponse &#125; from "@repo/shared";
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <FileCode2 className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white">packages/tsconfig & eslint-config</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Cấu hình TypeScript Base, Node, React kế thừa toàn bộ monorepo và bộ quy chuẩn ESLint thống nhất chất lượng code.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                  "extends": ["@repo/tsconfig/node.json", "@repo/eslint-config"]
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white">Git Hooks & CI/CD Pipeline</h3>
              </div>
              <p className="text-sm text-slate-400">
                Tích hợp Husky 9, Commitlint kiểm tra thông điệp theo chuẩn Conventional Commits (<code>feat:</code>, <code>fix:</code>, ...), 
                lint-staged tự động format và GitHub Actions CI pipeline kiểm tra lint + build trước khi merge.
              </p>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              Các lệnh thông dụng trong Monorepo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans font-semibold">Cài đặt dependencies:</div>
                <div className="text-emerald-400">pnpm install</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans font-semibold">Chạy toàn bộ môi trường Dev (FE + BE):</div>
                <div className="text-emerald-400">pnpm dev</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans font-semibold">Sinh mã Prisma Client:</div>
                <div className="text-emerald-400">pnpm --filter @repo/database db:generate</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans font-semibold">Kiểm tra Lint toàn dự án:</div>
                <div className="text-emerald-400">pnpm lint</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans font-semibold">Build toàn bộ Monorepo với Turbo:</div>
                <div className="text-emerald-400">pnpm build</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans font-semibold">Dọn dẹp cache:</div>
                <div className="text-emerald-400">pnpm clean</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        Profile Monorepo Architecture • Replicated from plot-farm system
      </footer>
    </div>
  );
};
export default App;
