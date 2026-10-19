import React from 'react';
import { Search, RotateCcw, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ProductCategory } from './types';

interface Props {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  statusFilter: string;
  setStatusFilter: (st: string) => void;
  onResetFilter: () => void;
}

export const ProductToolbar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter,
  onResetFilter,
}) => {
  return (
    <div className="space-y-3">
      {/* Hàng trên: Input tìm kiếm & Tab phân loại */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên sản phẩm, slug, tech stack..."
            className="w-full pl-10 pr-16 py-2 rounded-xl bg-[#0b101b] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition font-sans"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] border border-white/[0.08] text-slate-400">
            Ctrl /
          </kbd>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-[#0b101b] border border-white/[0.08] text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-[#152033] text-white font-bold border border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Tất cả</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.08]">48</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('cli')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'cli'
                ? 'bg-[#152033] text-emerald-400 font-bold border border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Công cụ & CLI</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.08]">18</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('web')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'web'
                ? 'bg-[#152033] text-cyan-400 font-bold border border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Website & SaaS</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.08]">21</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('game')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'game'
                ? 'bg-[#152033] text-purple-400 font-bold border border-white/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Game & WASM</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.08]">9</span>
          </button>
        </div>
      </div>

      {/* Hàng dưới: Dropdown bộ lọc & Sắp xếp */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Dropdown Trạng thái */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#0b101b] border border-white/[0.08] rounded-xl px-3.5 py-1.5 pr-8 text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái (48)</option>
              <option value="active">Đang hoạt động (Live)</option>
              <option value="draft">Bản nháp (Draft)</option>
              <option value="pending">Chờ duyệt</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Tech Stack filter */}
          <button
            type="button"
            className="flex items-center gap-2 bg-[#0b101b] border border-white/[0.08] rounded-xl px-3.5 py-1.5 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-slate-400" />
            <span>Tech Stack: Mọi nền tảng</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Reset filter */}
          <button
            type="button"
            onClick={onResetFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>

        {/* Sort by */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">SẮP XẾP:</span>
          <div className="relative">
            <select className="appearance-none bg-[#0b101b] border border-white/[0.08] rounded-xl px-3 py-1.5 pr-7 text-xs text-slate-200 focus:outline-none cursor-pointer">
              <option>Mới cập nhật nhất</option>
              <option>Lượt tải nhiều nhất</option>
              <option>Tên A - Z</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};