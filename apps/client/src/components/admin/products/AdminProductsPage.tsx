import React, { useState, useMemo, useEffect } from 'react';
import { Download, Plus } from 'lucide-react';
import { ProductRegistryItem, ProductCategory, AdminProductsPageProps } from './types';
import { ProductKpiCards } from './ProductKpiCards';
import { ProductToolbar } from './ProductToolbar';
import { ProductTable } from './ProductTable';
import { CdnStorageWidget } from './CdnStorageWidget';
import { ShaAuditWidget } from './ShaAuditWidget';

// Danh sách sản phẩm mặc định trống - khi đăng tải sẽ tự động lưu và hiển thị
export const INITIAL_PRODUCTS: ProductRegistryItem[] = [];

export const AdminProductsPage: React.FC<AdminProductsPageProps> = ({
  onNavigateToUpload,
  onNavigateTab,
}) => {
  const [products, setProducts] = useState<ProductRegistryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('devfolio_products');
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const raw = localStorage.getItem('devfolio_products');
        if (raw) setProducts(JSON.parse(raw));
      } catch {
        // ignore
      }
    };
    window.addEventListener('devfolio_products_updated', handleUpdate);
    return () => window.removeEventListener('devfolio_products_updated', handleUpdate);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.techStack?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && item.status === 'active') ||
        (statusFilter === 'draft' && item.status === 'draft') ||
        (statusFilter === 'pending' && item.status === 'pending');

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, searchQuery, selectedCategory, statusFilter]);

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setStatusFilter('all');
  };

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(products, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'devfolio_products_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
        <div>
          <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
            <span>ADMIN</span>
            <span>/</span>
            <span className="text-emerald-400">QUẢN TRỊ SẢN PHẨM & ARTIFACTS</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Kho Lưu Trữ Sản Phẩm
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#141d2b] border border-white/[0.08] text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {products.length} Items Live
            </span>
          </div>

          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Quản lý danh mục tools, web apps và indie games. Giám sát tình trạng phát hành, lượt tải về và luồng phân phối CDN toàn cầu.
          </p>
        </div>

        {/* Nút hành động */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141e30] border border-white/[0.08] text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Xuất CSV / JSON</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab('upload');
              } else if (onNavigateToUpload) {
                onNavigateToUpload();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Thêm sản phẩm mới</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Top Cards */}
      <ProductKpiCards products={products} />

      {/* Thanh Toolbar lọc & tìm kiếm */}
      <ProductToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onResetFilter={handleResetFilter}
      />

      {/* Bảng dữ liệu sản phẩm */}
      <ProductTable products={filteredProducts} />

      {/* 2 Khung giám sát CDN & SHA Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CdnStorageWidget />
        <ShaAuditWidget />
      </div>
    </div>
  );
};
