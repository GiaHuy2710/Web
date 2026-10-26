import React, { useState, useEffect } from 'react';
import {
  Users,
  Terminal,
  X,
  ArrowLeft,
  Settings,
  BarChart3,
  MessageSquare,
  Activity,
  Boxes,
  PlusCircle,
  ChevronDown,
  FileCode2,
  LogOut,
} from 'lucide-react';
import { AdminStudioPageProps } from './types';
import { OverviewDashboardView } from './overview';
import { UserManagementView } from './users';
import { AdminProductsPage } from './products';
import { AdminNewProductPage } from './new-product';
import { CommentModerationView } from './comments';
import { AnalyticsDashboardView } from './analytics';
import { SystemSettingsView } from './settings';
import { AuditLogsView } from './audit';
import { CliQuickActionsModal } from './modals';

export const AdminStudioPage: React.FC<AdminStudioPageProps> = ({
  onBackToHome,
  currentUser: _currentUser,
  defaultTab = 'stats',
  onNavigateTab: _onNavigateTab,
}) => {
  // Navigation active tab
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>(defaultTab);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState<boolean>(true);

  // Global modals and notifications
  const [isCliModalOpen, setIsCliModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile Dropdown & Logout
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Dynamic products count
  const [productsCount, setProductsCount] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('devfolio_products');
      if (raw) return JSON.parse(raw).length;
    } catch {
      // ignore
    }
    return 0;
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const raw = localStorage.getItem('devfolio_products');
        setProductsCount(raw ? JSON.parse(raw).length : 0);
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('devfolio_products_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('devfolio_products_updated', handleSync);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setIsUserDropdownOpen(false);
    if (isUserDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isUserDropdownOpen]);

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
    showToast('Đang đăng xuất khỏi hệ thống Studio Admin...');
    try {
      localStorage.removeItem('devfolio_auth');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState(null, '', '/');
    }
    setTimeout(() => {
      if (onBackToHome) {
        onBackToHome();
      } else {
        window.location.href = '/';
      }
    }, 400);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e1624] border border-emerald-500/40 text-emerald-300 text-xs shadow-2xl shadow-emerald-950/50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* LEFT ADMIN SIDEBAR */}
      <aside className="w-64 shrink-0 bg-[#090d16] border-r border-white/[0.06] flex flex-col justify-between hidden lg:flex select-none">
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 border-b border-white/[0.05] flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="font-bold text-white text-base tracking-tight">
                  DevFolio
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/50">
                  Studio
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            {/* 1. Tổng quan */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarItem('overview');
                showToast('Chuyển tới Tổng quan số liệu hệ thống.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'overview'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${activeSidebarItem === 'overview' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className={activeSidebarItem === 'overview' ? 'font-semibold text-white' : ''}>Tổng quan</span>
            </button>

            {/* 2. Sản phẩm & Kho tải (Menu thả xuống / Accordion Dropdown) */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                  activeSidebarItem === 'products' || activeSidebarItem === 'upload' || activeSidebarItem === 'projects'
                    ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Boxes className={`w-4 h-4 ${activeSidebarItem === 'products' || activeSidebarItem === 'upload' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className={activeSidebarItem === 'products' || activeSidebarItem === 'upload' ? 'font-semibold text-white' : ''}>
                    Sản phẩm & Kho tải
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isProductsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Sub-menu items */}
              {isProductsDropdownOpen && (
                <div className="pl-6 pr-1 py-1 space-y-1 border-l border-white/[0.06] ml-4 my-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarItem('products');
                      showToast('Chuyển tới danh mục Tất cả sản phẩm & Artifacts.');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      activeSidebarItem === 'products' || activeSidebarItem === 'projects'
                        ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.12)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    <span>Tất cả sản phẩm</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400">
                      {productsCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarItem('upload');
                      showToast('Mở trình tạo sản phẩm & bản build mới.');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      activeSidebarItem === 'upload'
                        ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_14px_rgba(52,211,153,0.35)]'
                        : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PlusCircle className={`w-3.5 h-3.5 ${activeSidebarItem === 'upload' ? 'text-slate-950 stroke-[2.5]' : 'text-emerald-400'}`} />
                      <span>Đăng tải mới</span>
                    </div>
                    <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                      activeSidebarItem === 'upload'
                        ? 'bg-slate-950 text-emerald-400'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      +Up
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Quản lý người dùng */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarItem('users');
                showToast('Chuyển tới Quản lý người dùng & Thành viên.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'users'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Users className={`w-4 h-4 ${activeSidebarItem === 'users' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className={activeSidebarItem === 'users' ? 'font-semibold text-white' : ''}>Quản lý người dùng</span>
            </button>

            {/* 4. Kiểm duyệt bình luận */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarItem('comments');
                showToast('Chuyển tới hàng đợi Kiểm duyệt bình luận.');
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'comments'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className={`w-4 h-4 ${activeSidebarItem === 'comments' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className={activeSidebarItem === 'comments' ? 'font-semibold text-white' : ''}>Kiểm duyệt bình luận</span>
              </div>
            </button>

            {/* 5. Thống kê chi tiết */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarItem('stats');
                showToast('Chuyển tới Thống kê chi tiết & Phân tích chuyên sâu.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'stats'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Activity className={`w-4 h-4 ${activeSidebarItem === 'stats' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className={activeSidebarItem === 'stats' ? 'font-semibold text-white' : ''}>Thống kê chi tiết</span>
            </button>

            {/* 6. Cài đặt hệ thống */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarItem('settings');
                showToast('Chuyển tới Cài đặt hệ thống.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'settings'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Settings className={`w-4 h-4 ${activeSidebarItem === 'settings' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className={activeSidebarItem === 'settings' ? 'font-semibold text-white' : ''}>Cài đặt hệ thống</span>
            </button>

            {/* 7. Nhật ký hoạt động */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarItem('audit');
                showToast('Chuyển tới Nhật ký hoạt động (Audit logs).');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'audit'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <FileCode2 className={`w-4 h-4 ${activeSidebarItem === 'audit' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className={activeSidebarItem === 'audit' ? 'font-semibold text-white' : ''}>Nhật ký hoạt động</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/[0.05] space-y-3">
          <div>
            <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">
              Môi trường
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Production v2.4</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToHome}
            className="w-full flex items-center gap-2 pt-2 text-xs text-slate-400 hover:text-emerald-400 transition cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Về trang chủ</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP BREADCRUMB & HEADER */}
        <header className="h-14 px-6 border-b border-white/[0.06] bg-[#080d16]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">workspace</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-semibold">admin-studio</span>
            {activeSidebarItem && (
              <>
                <span className="text-slate-600">/</span>
                <span className="text-cyan-400 font-semibold">
                  {activeSidebarItem === 'overview' && 'overview'}
                  {activeSidebarItem === 'users' && 'users'}
                  {activeSidebarItem === 'upload' && 'new-product'}
                  {activeSidebarItem === 'products' && 'products'}
                  {activeSidebarItem === 'comments' && 'moderation'}
                  {activeSidebarItem === 'stats' && 'analytics'}
                  {activeSidebarItem === 'settings' && 'settings'}
                  {activeSidebarItem === 'audit' && 'audit-logs'}
                </span>
              </>
            )}
          </div>

          {/* Right Header: CLI Quick Actions & User Avatar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCliModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111724] hover:bg-[#172133] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono transition cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI Quick Actions</span>
            </button>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.05] transition cursor-pointer group border border-transparent hover:border-white/[0.08]"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500/40 bg-emerald-500/20">
                    <img
                      src="/images/alex-avatar.jpg"
                      alt="Alex Nguyen"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#070b12] rounded-full" />
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200 ${
                    isUserDropdownOpen ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#0d131f] border border-white/[0.08] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl"
                >
                  <div className="px-3 py-2.5 border-b border-white/[0.05]">
                    <div className="font-bold text-white text-xs">Alex Nguyen</div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">admin@devfolio.io</div>
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Super Admin
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        setActiveSidebarItem('settings');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] transition cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Cài đặt hệ thống</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        if (onBackToHome) onBackToHome();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] transition cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                      <span>Về trang chủ</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-white/[0.05]">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition cursor-pointer font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE BODY - CLEAN MODULAR MOUNT */}
        <main className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* TAB 1: TỔNG QUAN HỆ THỐNG */}
          {activeSidebarItem === 'overview' && (
            <OverviewDashboardView
              onShowToast={showToast}
              onNavigateTab={(tab) => setActiveSidebarItem(tab)}
              onOpenCli={() => setIsCliModalOpen(true)}
            />
          )}

          {/* TAB 2: QUẢN LÝ NGƯỜI DÙNG & THÀNH VIÊN (Stitch 75e5c2e602a5486b9fbb11e71d953473) */}
          {activeSidebarItem === 'users' && (
            <UserManagementView onShowToast={showToast} />
          )}

          {/* TAB 3: ĐĂNG TẢI MỚI */}
          {activeSidebarItem === 'upload' && (
            <div className="space-y-6 max-w-6xl mx-auto w-full animate-in fade-in duration-200">
              <AdminNewProductPage
                onBackToHome={onBackToHome}
                onNavigateTab={(tab: string) => setActiveSidebarItem(tab)}
              />
            </div>
          )}

          {/* TAB 4: SẢN PHẨM & KHO TẢI */}
          {activeSidebarItem === 'products' && (
            <AdminProductsPage
              onBackToHome={onBackToHome}
              onNavigateTab={(tab: string) => setActiveSidebarItem(tab)}
            />
          )}

          {/* TAB 5: KIỂM DUYỆT BÌNH LUẬN & ĐÁNH GIÁ (Stitch a607e2f5f47a4f7eb1c7d8a13d637711) */}
          {activeSidebarItem === 'comments' && (
            <CommentModerationView onShowToast={showToast} />
          )}

          {/* TAB 6: NHẬT KÝ HOẠT ĐỘNG (AUDIT LOGS) */}
          {activeSidebarItem === 'audit' && (
            <AuditLogsView onShowToast={showToast} />
          )}

          {/* TAB 7: THỐNG KÊ CHI TIẾT & PHÂN TÍCH CHUYÊN SÂU (Stitch 08edd69ed3784bfe9cd5bb11894aa588) */}
          {activeSidebarItem === 'stats' && (
            <AnalyticsDashboardView onShowToast={showToast} />
          )}

          {/* TAB 8: CÀI ĐẶT HỆ THỐNG */}
          {activeSidebarItem === 'settings' && (
            <SystemSettingsView onShowToast={showToast} />
          )}

        </main>
      </div>

      {/* GLOBAL MODALS */}
      <CliQuickActionsModal
        isOpen={isCliModalOpen}
        onClose={() => setIsCliModalOpen(false)}
        onShowToast={showToast}
      />

    </div>
  );
};
