import React from 'react';
import { PlusCircle, RefreshCw, Key, Terminal } from 'lucide-react';

export interface QuickActionsProps {
  onOpenNewTool: () => void;
  onPurgeCdn: () => void;
  onOpenAdminInvite: () => void;
  onOpenRealtimeLogs: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onOpenNewTool,
  onPurgeCdn,
  onOpenAdminInvite,
  onOpenRealtimeLogs,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-[#0b101a] border border-white/[0.06]">
      <h2 className="font-bold text-white text-sm pb-4 border-b border-white/[0.05]">
        Lối tắt thao tác nhanh
      </h2>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {/* Thao tác 1: Đăng Tool mới */}
        <button
          onClick={onOpenNewTool}
          className="p-4 rounded-xl bg-[#0e1422] border border-white/[0.05] hover:border-emerald-500/40 hover:bg-[#121c2e] transition text-center group cursor-pointer"
        >
          <div className="w-9 h-9 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <PlusCircle className="w-4 h-4" />
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
            Đăng Tool mới
          </div>
        </button>

        {/* Thao tác 2: Xóa Cache CDN */}
        <button
          onClick={onPurgeCdn}
          className="p-4 rounded-xl bg-[#0e1422] border border-white/[0.05] hover:border-cyan-500/40 hover:bg-[#121c2e] transition text-center group cursor-pointer"
        >
          <div className="w-9 h-9 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
            Xóa Cache CDN
          </div>
        </button>

        {/* Thao tác 3: Tạo mã mới Admin */}
        <button
          onClick={onOpenAdminInvite}
          className="p-4 rounded-xl bg-[#0e1422] border border-white/[0.05] hover:border-emerald-500/40 hover:bg-[#121c2e] transition text-center group cursor-pointer"
        >
          <div className="w-9 h-9 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Key className="w-4 h-4" />
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
            Tạo mã mới Admin
          </div>
        </button>

        {/* Thao tác 4: Xem Logs Realtime */}
        <button
          onClick={onOpenRealtimeLogs}
          className="p-4 rounded-xl bg-[#0e1422] border border-white/[0.05] hover:border-white/20 hover:bg-[#121c2e] transition text-center group cursor-pointer"
        >
          <div className="w-9 h-9 mx-auto rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="mt-2 text-xs font-semibold text-slate-200 group-hover:text-white">
            Xem Logs Realtime
          </div>
        </button>
      </div>
    </div>
  );
};
