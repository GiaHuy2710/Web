import React from 'react';
import {
  Terminal,
  BarChart3,
  Users,
  Boxes,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
  HardDrive
} from 'lucide-react';

export interface AdminSidebarProps {
  activeMenu: string;
  onSelectMenu: (menu: string) => void;
  onOpenNewToolModal: () => void;
  pendingModerationCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeMenu,
  onSelectMenu,
  onOpenNewToolModal,
  pendingModerationCount,
}) => {
  return (
    <aside className="w-64 shrink-0 bg-[#0a0f19] border-r border-white/[0.06] flex flex-col justify-between hidden lg:flex">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <Terminal className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight flex items-center gap-1">
                Dev<span className="text-emerald-400">Folio</span>
              </div>
              <div className="text-[10px] font-semibold text-emerald-400/90 tracking-wider">
                STUDIO ADMIN
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-3 py-5">
          <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Quản trị hệ thống
          </div>
          
          <nav className="space-y-1 text-xs">
            {/* 1. Tổng quan */}
            <button
              onClick={() => onSelectMenu('overview')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeMenu === 'overview'
                  ? 'bg-[#121c2c] text-white border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.12)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className={`w-4 h-4 ${activeMenu === 'overview' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>Tổng quan</span>
              </div>
            </button>

            {/* 2. Quản lý Người dùng */}
            <button
              onClick={() => onSelectMenu('users')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeMenu === 'users'
                  ? 'bg-[#121c2c] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-slate-400" />
                <span>Quản lý Người dùng</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                2,490
              </span>
            </button>

            {/* 3. Sản phẩm & Kho tải */}
            <button
              onClick={() => onSelectMenu('products')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeMenu === 'products'
                  ? 'bg-[#121c2c] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes className="w-4 h-4 text-slate-400" />
                <span>Sản phẩm & Kho tải</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                48
              </span>
            </button>

            {/* 4. Đăng tải mới */}
            <button
              onClick={onOpenNewToolModal}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/5 transition group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Đăng tải mới</span>
              </div>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                +Up
              </span>
            </button>

            {/* 5. Kiểm duyệt & Đánh giá */}
            <button
              onClick={() => onSelectMenu('moderation')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeMenu === 'moderation'
                  ? 'bg-[#121c2c] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Kiểm duyệt & Đánh giá</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {pendingModerationCount}
                </span>
              </div>
            </button>

            {/* 6. Thống kê & Phân tích */}
            <button
              onClick={() => onSelectMenu('analytics')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeMenu === 'analytics'
                  ? 'bg-[#121c2c] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span>Thống kê & Phân tích</span>
              </div>
            </button>

            {/* 7. Cài đặt hệ thống */}
            <button
              onClick={() => onSelectMenu('settings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeMenu === 'settings'
                  ? 'bg-[#121c2c] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <HardDrive className="w-4 h-4 text-slate-400" />
                <span>Cài đặt hệ thống</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Engine Status Tag */}
      <div className="p-4 m-3 rounded-2xl bg-[#0d1421] border border-white/[0.06] flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-slate-400 font-mono">v2.4.0 Engine</span>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          OK
        </span>
      </div>
    </aside>
  );
};
