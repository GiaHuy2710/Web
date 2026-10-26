import React, { useState } from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import { ProductKind, AdminNewProductPageProps } from './types';
import { ProductRegistryItem } from '../products/types';
import { UploadStepper } from './UploadStepper';
import { ProductTypeSelector } from './ProductTypeSelector';
import { BasicMetadataForm } from './BasicMetadataForm';
import { MarkdownEditorSection } from './MarkdownEditorSection';
import { addAuditLog } from '../audit';

export const AdminNewProductPage: React.FC<AdminNewProductPageProps> = ({
  onNavigateTab,
}) => {
  // Form State tổng hợp - Mặc định để trống chờ người dùng nhập
  const [kind, setKind] = useState<ProductKind>('cli');
  const [name, setName] = useState('');
  const [version, setVersion] = useState('v1.0.0');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveProduct = (status: 'active' | 'draft') => {
    if (!name.trim()) {
      alert('Vui lòng nhập tên sản phẩm trước khi lưu.');
      return;
    }

    setIsSubmitting(true);
    const finalSlug = slug.trim() || name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct: ProductRegistryItem = {
      id: `prod_${Date.now()}`,
      code: `PKG-${Date.now().toString().slice(-4)}`,
      indexTag: 'LATEST',
      name: name.trim(),
      slug: finalSlug,
      category: kind === 'cli' ? 'cli' : kind === 'web' ? 'web' : 'game',
      categoryLabel: kind === 'cli' ? 'CLI Tool' : kind === 'web' ? 'Web Application' : 'Indie Game',
      categoryIcon: kind === 'cli' ? 'terminal' : kind === 'web' ? 'web' : 'game',
      techStack: techStacks.length > 0 ? techStacks : ['TypeScript', 'Release'],
      version: version.trim() || 'v1.0.0',
      versionType: 'stable',
      downloads: '0',
      subStats: '0 demo clicks',
      status,
      statusLabel: status === 'active' ? 'Active' : 'Draft',
    };

    try {
      const existingRaw = localStorage.getItem('devfolio_products');
      const existingList = existingRaw ? JSON.parse(existingRaw) : [];
      const updatedList = [newProduct, ...existingList];
      localStorage.setItem('devfolio_products', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('devfolio_products_updated'));
    } catch {
      // ignore
    }

    addAuditLog({
      action: `${status === 'active' ? 'Đăng tải sản phẩm mới' : 'Lưu bản nháp sản phẩm'}: ${newProduct.name}`,
      category: 'deploy',
      severity: 'success',
      details: `Phiên bản: ${newProduct.version}. Danh mục: ${newProduct.categoryLabel}. Mô tả: ${summary.slice(0, 80)}`,
      targetResource: `pkg://products/${newProduct.slug}`,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      if (onNavigateTab) {
        onNavigateTab('products');
      }
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full animate-in fade-in duration-200">
      {/* Tiêu đề trang & Nút chuyển bước */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
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

          <p className="mt-1 text-xs text-slate-400">
            Khởi tạo manifest, cấu hình phân phối CDN R2 và tạo bản build phát hành trên toàn hệ thống.
          </p>
        </div>

        {/* Nút lưu bản nháp & Đăng */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSaveProduct('draft')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141e30] border border-white/[0.08] text-xs font-semibold text-slate-200 transition cursor-pointer disabled:opacity-50"
          >
            <Bookmark className="w-3.5 h-3.5 text-slate-400" />
            <span>Lưu bản nháp</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSaveProduct('active')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_16px_rgba(52,211,153,0.35)] cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Đang lưu...</span>
            ) : (
              <>
                <span>Đăng sản phẩm ngay</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </>
            )}
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
    </div>
  );
};
