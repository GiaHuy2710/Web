import React, { useState } from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import { AdminSidebar, AdminHeader } from '../layout';
import { ProductKind, AdminNewProductPageProps } from './types';
import { UploadStepper } from './UploadStepper';
import { ProductTypeSelector } from './ProductTypeSelector';
import { BasicMetadataForm } from './BasicMetadataForm';
import { MarkdownEditorSection } from './MarkdownEditorSection';

export const AdminNewProductPage: React.FC<AdminNewProductPageProps> = ({
  onBackToHome,
  currentUser,
  onNavigateTab,
}) => {
  // Form State tổng hợp
  const [kind, setKind] = useState<ProductKind>('cli');
  const [name, setName] = useState('RustPulse CLI Monitor');
  const [version, setVersion] = useState('v1.0.0-rc.2');
  const [slug, setSlug] = useState('rustpulse-cli-monitor');
  const [summary, setSummary] = useState(
    'Công cụ giám sát hiệu năng I/O & Thread CPU viết hoàn toàn bằng Rust siêu nhẹ, hỗ trợ giao diện Terminal TUI trực quan.'
  );
  const [techStacks, setTechStacks] = useState<string[]>([
    'Rust',
    'Tokio Async',
    'TUI Terminal',
    'Linux/macOS',
    'Cross-platform',
  ]);
  const [markdownContent, setMarkdownContent] = useState<string>(
`### Tổng quan ứng dụng
RustPulse cung cấp cơ chế non-blocking monitoring trực tiếp từ \`/proc\` stats trên Linux kernel và dynamic Darwin telemetry trên macOS.

#### 🚀 Hướng dẫn cài đặt nhanh</main></div></body></html>`
  );

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex font-sans antialiased">
      {/* 1. Sidebar bên trái (Dùng lại layout chuẩn AdminSidebar) */}
      <AdminSidebar
        activeMenu="upload"
        onSelectMenu={(menu) => {
          if ((menu === 'overview' || menu === 'users') && onNavigateTab) {
            onNavigateTab(menu);
          }
        }}
        onOpenNewToolModal={() => {
          if (onNavigateTab) {
            onNavigateTab('upload');
          }
        }}
        pendingModerationCount={5}
      />

      {/* 2. Cột nội dung bên phải */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header trên cùng */}
        <AdminHeader
          onBackToHome={onBackToHome || (() => {})}
          onOpenNewToolModal={() => {}}
          onShowNotification={() => {}}
          pendingCount={5}
          currentUser={currentUser}
        />

        {/* Nội dung form */}
        <main className="p-6 lg:p-8 space-y-6 max-w-6xl mx-auto w-full">
          {/* Tiêu đề trang & Nút chuyển bước */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <span>ADMIN</span>
                <span>/</span>
                <span>QUẢN TRỊ KHO</span>
                <span>/</span>
                <span className="text-emerald-400">THÊM MỚI SẢN PHẨM</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Đăng tải sản phẩm mới{' '}
                  <span className="text-slate-400 text-lg font-normal">
                    (Tool / Web / Game)
                  </span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#141d2b] border border-white/[0.08] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Schema v3.2-app-manifest
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Hệ sinh thái phân phối phần mềm mã nguồn mở, web apps & indie games cho cộng đồng lập trình viên DevFolio.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e1522] hover:bg-[#141e30] border border-white/[0.08] text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                <span>Lưu bản nháp (Draft)</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_20px_rgba(52,211,153,0.35)] cursor-pointer"
              >
                <span>Tiếp tục: Bước 2</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Stepper 4 bước */}
          <UploadStepper />

          {/* Phần 1: Chọn loại sản phẩm */}
          <ProductTypeSelector selectedKind={kind} onSelectKind={setKind} />

          {/* Phần 2: Cấu hình cơ bản */}
          <BasicMetadataForm
            name={name}
            setName={setName}
            version={version}
            setVersion={setVersion}
            slug={slug}
            setSlug={setSlug}
            summary={summary}
            setSummary={setSummary}
            techStacks={techStacks}
            setTechStacks={setTechStacks}
          />

          {/* Phần 3: Trình soạn thảo Markdown */}
          <MarkdownEditorSection
            content={markdownContent}
            setContent={setMarkdownContent}
          />
        </main>
      </div>
    </div>
  );
};