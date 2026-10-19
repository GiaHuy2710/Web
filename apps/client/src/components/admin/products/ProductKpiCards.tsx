import React from 'react';
import { Download, Layers, Box, Zap } from 'lucide-react';

export const ProductKpiCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Tổng lượt cài đặt */}
      <div className="p-4 rounded-2xl bg-[#090e17] border border-white/[0.06] flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
            TỔNG LƯỢT CÀI ĐẶT
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">92,450+</div>
          <div className="text-[11px] text-emerald-400 font-mono">↗ +18.4% tuần này</div>
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
          <div className="text-2xl font-bold text-white tracking-tight">3 Phân hệ</div>
          <div className="text-[11px] text-slate-400 font-mono">CLI • Web • Game WASM</div>
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
          <div className="text-2xl font-bold text-white tracking-tight">124 Builds</div>
          <div className="text-[11px] text-emerald-400 font-mono">● 99.98% Healthy</div>
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
          <div className="text-2xl font-bold text-white tracking-tight">1.2 TB</div>
          <div className="text-[11px] text-slate-400 font-mono">32 PoPs toàn cầu</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
          <Zap className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};