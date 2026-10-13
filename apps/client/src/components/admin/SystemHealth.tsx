import React from 'react';
import { Server } from 'lucide-react';

export const SystemHealth: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-[#0b101a] border border-white/[0.06]">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          <h2 className="font-bold text-white text-sm">
            Sức khỏe Hạ tầng & Server Nodes
          </h2>
        </div>
        <span className="px-2.5 py-0.8 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          All Systems Normal
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {/* Node 1: Cloudflare R2 */}
        <div className="p-4 rounded-xl bg-[#0e1422] border border-white/[0.05]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Cloudflare R2 Edge Node</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-2 text-sm font-bold text-white flex items-baseline gap-2">
            <span>42 ms</span>
            <span className="text-emerald-400 text-xs font-medium">Bình thường</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Singapore & Tokyo edge points kết nối mượt mà.
          </div>
        </div>

        {/* Node 2: CI/CD GitHub Actions */}
        <div className="p-4 rounded-xl bg-[#0e1422] border border-white/[0.05]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>CI/CD GitHub Actions</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-2 text-sm font-bold text-white flex items-baseline gap-2">
            <span>14 builds</span>
            <span className="text-emerald-400 text-xs font-medium">100% Pass</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Quy trình lint, unit test và Docker push hoàn tất.
          </div>
        </div>

        {/* Node 3: PostgreSQL 16 Engine */}
        <div className="p-4 rounded-xl bg-[#0e1422] border border-white/[0.05]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>PostgreSQL 16 Engine</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-2 text-sm font-bold text-white flex items-baseline gap-2">
            <span>12 / 50</span>
            <span className="text-cyan-400 text-xs font-medium">Pool conns</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Tải CPU DB ở mức 6.4%, bộ nhớ đệm cache 1.2GB.
          </div>
        </div>
      </div>
    </div>
  );
};
