import React from 'react';
import { Boxes, Download, Users, Server } from 'lucide-react';

export const KpiMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Tổng sản phẩm & Tools */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-emerald-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Tổng sản phẩm & Tools
          </span>
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400">
            <Boxes className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">48</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/[0.06] text-slate-400 border border-white/[0.08]">
            -3 kỳ này
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] text-slate-400 flex items-center gap-2">
          <span className="text-emerald-400 font-medium">22 Web Apps</span>
          <span>•</span>
          <span>16 Tools</span>
          <span>•</span>
          <span>10 Games</span>
        </div>
      </div>

      {/* Card 2: Lượt tải & Demo Live */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-cyan-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Lượt tải & Demo Live
          </span>
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
            <Download className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">142.8k</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            +18.4%
          </span>
        </div>

        {/* Sparkline curve */}
        <div className="mt-2 h-5 w-full flex items-end">
          <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
            <path
              d="M0,15 Q15,18 30,12 T60,8 T80,4 T100,2"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="mt-2 pt-2 border-t border-white/[0.05] text-[11px] flex items-center justify-between">
          <span className="text-slate-400">30 ngày qua</span>
          <span className="text-emerald-400 font-medium">+22.4k lượt mới</span>
        </div>
      </div>

      {/* Card 3: Người dùng & Đăng ký */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-emerald-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Người dùng & Đăng ký
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">2,490</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            +128 tuần này
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] flex items-center justify-between">
          <span className="text-slate-400">Tỷ lệ hoạt động (Active)</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-3/4 h-full bg-emerald-400 rounded-full" />
            </div>
            <span className="text-white font-semibold">74%</span>
          </div>
        </div>
      </div>

      {/* Card 4: CDN Edge & Băng thông */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-blue-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            CDN Edge & Băng thông
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
            <Server className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">18.4</span>
          <span className="text-sm text-slate-400 font-semibold">/ 100 GB</span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400">
            <div className="w-10 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-[18%] h-full bg-cyan-400 rounded-full" />
            </div>
            <span>18% quota</span>
          </div>
          <span className="text-emerald-400 font-medium">Zero Egress Fees</span>
        </div>
      </div>
    </div>
  );
};
