import React, { useState, useMemo } from 'react';
import { Download, Plus } from 'lucide-react';
import { AdminSidebar, AdminHeader } from '../layout';
import { ProductRegistryItem, ProductCategory, AdminProductsPageProps } from './types';
import { ProductKpiCards } from './ProductKpiCards';
import { ProductToolbar } from './ProductToolbar';
import { ProductTable } from './ProductTable';
import { CdnStorageWidget } from './CdnStorageWidget';
import { ShaAuditWidget } from './ShaAuditWidget';

// 6 Sản phẩm mẫu chuẩn theo thiết kế Stitch
export const INITIAL_PRODUCTS: ProductRegistryItem[] = [
  {
    id: 'prod-01',
    code: 'crt_bin_728',
    indexTag: '#01',
    name: 'RustPulse CLI Monitor',
    slug: 'rustpulse-cli',
    category: 'cli',
    categoryLabel: 'CLI / Terminal',
    categoryIcon: 'terminal',
    techStack: ['Rust', 'Tokio'],
    version: 'v1.0.0-rc.2',
    versionType: 'rc',
    downloads: '14,250',
    subStats: '+342 hôm nay • 1.4 GB pkg',
    status: 'active',
    statusLabel: 'Đang hoạt động (Live)',
  },
  {
    id: 'prod-02',
    code: 'app_prod_962',
    indexTag: '#02',
    name: 'Synapse AI Studio',
    slug: 'synapse-ai-studio',
    category: 'web',
    categoryLabel: 'Web App / SaaS',
    categoryIcon: 'web',
    techStack: ['Next.js', 'PyTorch', 'Tailwind'],
    version: 'v2.4.1',
    versionType: 'stable',
    downloads: '38,900',
    subStats: 'Active MAU • 99.9% uptime',
    status: 'active',
    statusLabel: 'Đang hoạt động (Live)',
  },
  {
    id: 'prod-03',
    code: 'wasm_pkg_108',
    indexTag: '#03',
    name: 'PixelDrift 3D Arena',
    slug: 'pixeldrift-wasm',
    category: 'game',
    categoryLabel: 'Game / WebGL',
    categoryIcon: 'game',
    techStack: ['Godot 4', 'WASM'],
    version: 'v0.9.8-beta',
    versionType: 'beta',
    downloads: '8,420',
    subStats: 'Session plays • 4.8 ★',
    status: 'active',
    statusLabel: 'Đang hoạt động (Live)',
  },
  {
    id: 'prod-04',
    code: 'pkg_dft_004',
    indexTag: '#04',
    name: 'DevMetrics Agent',
    slug: 'devmetrics-daemon',
    category: 'cli',
    categoryLabel: 'Developer Tool',
    categoryIcon: 'tool',
    techStack: ['Go', 'eBPF'],
    version: 'v1.1.0',
    versionType: 'stable',
    downloads: '6,120',
    subStats: 'Nội bộ & Test',
    status: 'draft',
    statusLabel: 'Bản nháp (Draft)',
  },
  {
    id: 'prod-05',
    code: 'app_desk_312',
    indexTag: '#05',
    name: 'CyberDeck Matrix HUD',
    slug: 'cyberdeck-hud',
    category: 'cli',
    categoryLabel: 'Open Source Tool',
    categoryIcon: 'window',
    techStack: ['Electron', 'TypeScript'],
    version: 'v3.0.0',
    versionType: 'stable',
    downloads: '21,300',
    subStats: '+1.1k sao GitHub',
    status: 'pending',
    statusLabel: 'Chờ duyệt và...',
  },
  {
    id: 'prod-06',
    code: 'sim_wgpu_042',
    indexTag: '#06',
    name: 'NeuralVoxel Sandbox',
    slug: 'neuralvoxel',
    category: 'game',
    categoryLabel: 'Game Sandbox',
    categoryIcon: 'game',
    techStack: ['Three.js', 'WebGPU'],
    version: 'v0.4.2',
    versionType: 'beta',
    downloads: '3,150',
    subStats: '60 FPS avg • High WebGPU',
    status: 'active',
    statusLabel: 'Đang hoạt động (Live)',
  },
];

export const AdminProductsPage: React.FC<AdminProductsPageProps> = ({
  onBackToHome,
  onNavigateToUpload,
  currentUser,
}) => {
  const [products] = useState<ProductRegistryItem[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchStatus =
        statusFilter === 'all' || item.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, searchQuery, selectedCategory, statusFilter]);

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setStatusFilter('all');
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex font-sans antialiased">
      {/* 1. Sidebar menu */}
      <AdminSidebar
        activeMenu="products"
        onSelectMenu={() => {}}
        onOpenNewToolModal={onNavigateToUpload}
        pendingModerationCount={5}
      />

      {/* 2. Cột nội dung bên phải */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader
          onBackToHome={onBackToHome || (() => {})}
          onOpenNewToolModal={onNavigateToUpload || (() => {})}
          onShowNotification={() => {}}
          pendingCount={5}
          currentUser={currentUser}
        />

        <main className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Tiêu đề Trang */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              <div className="text-[11px] font-mono font-semibold tracking-wider text-emerald-400 uppercase flex items-center gap-2">
                <span>● CATALOG_REGISTRY // 0X48</span>
                <span className="text-slate-400">| Cloudflare R2 Edge Network</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Quản trị Sản phẩm & Kho tải
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#141d2b] border border-white/[0.08] text-emerald-400">
                  ● Tổng số 48 sản phẩm
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141e30] border border-white/[0.08] text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Xuất CSV / JSON</span>
              </button>

              <button
                type="button"
                onClick={onNavigateToUpload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Thêm sản phẩm mới</span>
              </button>
            </div>
          </div>

          {/* 4 KPI Top Cards */}
          <ProductKpiCards />

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
        </main>
      </div>
    </div>
  );
};