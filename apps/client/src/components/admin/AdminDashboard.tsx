import React, { useState } from 'react';
import { Download, Rocket, X } from 'lucide-react';
import { AdminHeader, AdminSidebar } from './layout';
import {
  AuditLog,
  KpiMetrics,
  ModerationQueue,
  QuickActions,
  RecentUploadsTable,
  SystemHealth,
  TrafficChart,
} from './widgets';
import { AdminModals } from './modals';
import { AdminDashboardProps, AuditLogItem, ModerationItem } from './types';
import { getAuditLogs } from './audit';

export { type AdminDashboardProps };

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToHome,
  currentUser,
  onNavigateTab,
}) => {
  // Navigation & Filter states
  const [activeMenu, setActiveMenu] = useState<string>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'year'>('30d');
  const [isRefreshingAudit, setIsRefreshingAudit] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isNewToolModalOpen, setIsNewToolModalOpen] = useState(false);
  const [isAdminInviteModalOpen, setIsAdminInviteModalOpen] = useState(false);
  const [isRealtimeLogsOpen, setIsRealtimeLogsOpen] = useState(false);
  const [generatedInviteToken, setGeneratedInviteToken] = useState<string | null>(null);

  // Moderation Queue state - Mặc định trống
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([]);

  // Audit Logs - Lấy từ kho nhật ký thực tế
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const raw = getAuditLogs();
    return raw.slice(0, 5).map((l, index) => ({
      id: index + 1,
      time: l.timeFormatted,
      actor: l.actor,
      action: l.action,
      detail: l.details,
    }));
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveModeration = (id: string, name: string) => {
    setModerationItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Đã phê duyệt: ${name}`);
  };

  const handleRejectModeration = (id: string) => {
    setModerationItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa bỏ mục kiểm duyệt.');
  };

  const handleRefreshAudit = () => {
    setIsRefreshingAudit(true);
    setTimeout(() => {
      const raw = getAuditLogs();
      setAuditLogs(
        raw.slice(0, 5).map((l, index) => ({
          id: index + 1,
          time: l.timeFormatted,
          actor: l.actor,
          action: l.action,
          detail: l.details,
        }))
      );
      setIsRefreshingAudit(false);
      showToast('Đã đồng bộ nhật ký kiểm toán mới nhất từ Cloudflare & DB.');
    }, 700);
  };

  const handlePurgeCdnCache = () => {
    showToast('Đang phát lệnh Purge Cache đến 12 CDN Edges... Hoàn tất 100%!');
  };

  const handleGenerateInviteToken = () => {
    const token = `ADM-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    setGeneratedInviteToken(token);
    setIsAdminInviteModalOpen(true);
    showToast(`Đã tạo token quản trị: ${token}`);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e1624] border border-emerald-500/40 text-emerald-300 text-xs shadow-2xl shadow-emerald-950/50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex w-full">
        <AdminSidebar 
          activeMenu={activeMenu}
          onSelectMenu={(menu) => {
            if (menu === 'users' && onNavigateTab) {
              onNavigateTab('users');
            } else if (menu === 'upload' && onNavigateTab) {
              onNavigateTab('upload');
            } else {
              setActiveMenu(menu);
            }
          }}
          onOpenNewToolModal={() => {
            if (onNavigateTab) {
              onNavigateTab('upload');
            } else {
              setIsNewToolModalOpen(true);
            }
          }}
          pendingModerationCount={moderationItems.length}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader 
            onBackToHome={onBackToHome}
            onOpenNewToolModal={() => {
              if (onNavigateTab) {
                onNavigateTab('upload');
              } else {
                setIsNewToolModalOpen(true);
              }
            }}
            onShowNotification={() => showToast(`Bạn có ${moderationItems.length} mục kiểm duyệt đang chờ.`)}
            pendingCount={moderationItems.length}
            currentUser={currentUser}
          />

          <main className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            {/* Top Greeting & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Xin chào, Alex
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Super Admin
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span>Hệ thống ổn định • 99.98% Uptime</span>
                  </div>
                  <p className="text-xs text-slate-400 hidden sm:inline">
                    Tổng quan vận hành trung tâm dữ liệu, tiến độ kho công cụ & hàng đợi kiểm duyệt hôm nay.
                  </p>
                </div>
              </div>

              {/* Time Filters & Export */}
              <div className="flex items-center gap-2.5 self-start md:self-auto">
                <div className="p-1 rounded-xl bg-[#0d131f] border border-white/[0.08] flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setTimeRange('7d')}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      timeRange === '7d' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    7 ngày qua
                  </button>
                  <button
                    onClick={() => setTimeRange('30d')}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      timeRange === '30d' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    30 ngày qua
                  </button>
                  <button
                    onClick={() => setTimeRange('year')}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      timeRange === 'year' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Năm nay
                  </button>
                </div>

                <button
                  onClick={() => showToast('Đang xuất báo cáo tổng quan CSV/PDF...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d131f] hover:bg-[#131b2c] border border-white/[0.08] text-slate-300 hover:text-white text-xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất báo cáo</span>
                </button>

                <button
                  onClick={() => showToast('Đã kích hoạt tạo bản build mới v2.4.1 trên GitHub Actions!')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs transition shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer"
                >
                  <Rocket className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Tạo bản build mới</span>
                </button>
              </div>
            </div>

            {/* 4 KPI Metrics */}
            <KpiMetrics />

            {/* 2 Columns Body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2/3) */}
              <div className="lg:col-span-2 space-y-6">
                <TrafficChart />
                <RecentUploadsTable onShowToast={showToast} />
                <SystemHealth />
              </div>

              {/* Right Column (1/3) */}
              <div className="space-y-6">
                <ModerationQueue 
                  items={moderationItems}
                  onApprove={handleApproveModeration}
                  onReject={handleRejectModeration}
                  onTestSandbox={() => showToast('Đang chạy sandbox cho ChromaPalette CLI...')}
                  onViewProfile={(name) => showToast(`Xem hồ sơ của ${name}`)}
                />

                <QuickActions 
                  onOpenNewTool={() => {
                    if (onNavigateTab) {
                      onNavigateTab('upload');
                    } else {
                      setIsNewToolModalOpen(true);
                    }
                  }}
                  onPurgeCdn={handlePurgeCdnCache}
                  onOpenAdminInvite={handleGenerateInviteToken}
                  onOpenRealtimeLogs={() => setIsRealtimeLogsOpen(true)}
                />

                <AuditLog 
                  logs={auditLogs}
                  isRefreshing={isRefreshingAudit}
                  onRefresh={handleRefreshAudit}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Admin Action Modals */}
      <AdminModals 
        isNewToolOpen={isNewToolModalOpen}
        onCloseNewTool={() => setIsNewToolModalOpen(false)}
        onSubmitNewTool={() => {
          setIsNewToolModalOpen(false);
          showToast('Đã tạo artifact mới thành công!');
        }}
        isAdminInviteOpen={isAdminInviteModalOpen}
        onCloseAdminInvite={() => setIsAdminInviteModalOpen(false)}
        inviteToken={generatedInviteToken}
        onCopyInviteToken={() => {
          navigator.clipboard.writeText(generatedInviteToken || '');
          showToast('Đã sao chép Invite Token!');
        }}
        isRealtimeLogsOpen={isRealtimeLogsOpen}
        onCloseRealtimeLogs={() => setIsRealtimeLogsOpen(false)}
      />

    </div>
  );
};
