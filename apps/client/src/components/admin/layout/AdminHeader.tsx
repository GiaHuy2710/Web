import React from 'react';
import { ChevronRight, Search, PlusCircle, Bell } from 'lucide-react';
import { AdminHeaderProps } from '../types';

export { type AdminHeaderProps };

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onBackToHome,
  onOpenNewToolModal,
  onShowNotification,
  pendingCount,
  currentUser,
}) => {
  return (
    <header className="h-16 px-6 bg-[#090d16]/90 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Breadcrumb & Environment Status */}
      <div className="flex items-center gap-3 text-xs">
        <button 
          onClick={onBackToHome}
          className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer"
        >
          <span>Portal</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-400">Quản trị</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-white font-semibold">Dashboard Tổng quan</span>

        <div className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Production</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm tài nguyên, người dùng..."
            className="w-64 pl-9 pr-14 py-1.5 rounded-xl bg-[#0e1420] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] border border-white/[0.08] text-slate-400">
            Ctrl+K
          </kbd>
        </div>

        {/* Add Project Button */}
        <button
          onClick={onOpenNewToolModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs transition shadow-[0_0_18px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Thêm dự án/tool</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onShowNotification}
          className="relative p-2 rounded-xl bg-[#0e1420] border border-white/[0.08] text-slate-300 hover:text-white transition cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {pendingCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          )}
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-white/[0.08]">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500/40 bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-300">
            {currentUser?.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              'SA'
            )}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">
              {currentUser?.fullName || 'Super Admin'}
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">
              {currentUser?.email || 'admin@devfolio.io'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
