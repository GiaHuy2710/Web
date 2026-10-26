import React from 'react';
import { Download, Layers, Box, Zap } from 'lucide-react';
import { ProductRegistryItem } from './types';

interface ProductKpiCardsProps {
  products?: ProductRegistryItem[];
}

export const ProductKpiCards: React.FC<ProductKpiCardsProps> = ({ products = [] }) => {
  const totalCount = products.length;
  const activeCount = products.filter((p) => p.status === 'active').length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Tổng lượt cài đặt */}
      <div className="p-4 rounded-2xl bg-[#090e17] border border-white/[0.06] flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
            TỔNG SẢN PHẨM TRONG KHO
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {totalCount}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            {totalCount > 0 ? `${activeCount} đang hoạt động` : 'Kho lưu trữ sạch'}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
          <Download className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {/* 2. Phân loại active */}
      <div className="p-4 rounded-2xl bg-[#090e17] border border-white/[0.06] flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
            PHÂN LOẠI ACTIVE
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {categoriesCount} Phân hệ
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            CLI • Web • Game WASM
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
          <Layers className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {/* 3. Build releases */}
      <div className="p-4 rounded-2xl bg-[#090e17] border border-white/[0.06] flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
            BUILD RELEASES
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {totalCount} Builds
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            ● 100% Sẵn sàng
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
          <Box className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {/* 4. Băng thông CDN */}
      <div className="p-4 rounded-2xl bg-[#090e17] border border-white/[0.06] flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
            BĂNG THÔNG CDN
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {totalCount > 0 ? '0.1 GB' : '0 B'}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Edge Cloudflare</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
          <Zap className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};
