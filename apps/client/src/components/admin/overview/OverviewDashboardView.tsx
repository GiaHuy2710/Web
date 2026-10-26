import React, { useState } from 'react';
import { Download, Rocket } from 'lucide-react';
import {
  AuditLog,
  KpiMetrics,
  ModerationQueue,
  QuickActions,
  RecentUploadsTable,
  SystemHealth,
  TrafficChart,
} from '../widgets';
import { AuditLogItem, ModerationItem } from '../types';
import { getAuditLogs } from '../audit';

export interface OverviewDashboardViewProps {
  onShowToast: (msg: string) => void;
  onNavigateTab: (tab: string) => void;
  onPurgeCdn?: () => void;
  onOpenCli?: () => void;
  onOpenInvite?: () => void;
}

export const OverviewDashboardView: React.FC<OverviewDashboardViewProps> = ({
  onShowToast,
  onNavigateTab,
  onPurgeCdn,
  onOpenCli,
  onOpenInvite,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'year'>('30d');
  const [isRefreshingAudit, setIsRefreshingAudit] = useState(false);

  // Moderation items - Mặc định trống
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([]);

  // Audit Logs - Đọc trực tiếp từ kho nhật ký thực tế
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

  const handleApproveModeration = (id: string, name: string) => {
    setModerationItems((prev) => prev.filter((item) => item.id !== id));
    onShowToast(`Đã phê duyệt: ${name}`);
  };

  const handleRejectModeration = (id: string) => {
    setModerationItems((prev) => prev.filter((item) => item.id !== id));
    onShowToast('Đã xóa bỏ mục kiểm duyệt.');
  };

  const handleRefreshAudit = () => {
    setIsRefreshingAudit(true);
    setTimeout(() => {
      const raw = getAuditLogs();
      setAuditLogs(raw.slice(0, 5).map((l, index) => ({
        id: index + 1,
        time: l.timeFormatted,
        actor: l.actor,
        action: l.action,
        detail: l.details,
      })));
      setIsRefreshingAudit(false);
      onShowToast('Đã đồng bộ nhật ký kiểm toán mới nhất từ Cloudflare & DB.');
    }, 700);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
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
              type="button"
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                timeRange === '7d' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              7 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                timeRange === '30d' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              30 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                timeRange === 'year' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Năm nay
            </button>
          </div>

          <button
            type="button"
            onClick={() => onShowToast('Đang xuất báo cáo tổng quan CSV/PDF...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d131f] hover:bg-[#131b2c] border border-white/[0.08] text-slate-300 hover:text-white text-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất báo cáo</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigateTab('upload');
              onShowToast('Chuyển tới giao diện tạo bản build & sản phẩm mới!');
            }}
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
          <RecentUploadsTable onShowToast={onShowToast} />
          <SystemHealth />
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          <ModerationQueue 
            items={moderationItems}
            onApprove={handleApproveModeration}
            onReject={handleRejectModeration}
            onTestSandbox={() => onShowToast('Đang chạy sandbox cho ChromaPalette CLI...')}
            onViewProfile={(name) => onShowToast(`Xem hồ sơ của ${name}`)}
          />

          <QuickActions 
            onOpenNewTool={() => onNavigateTab('upload')}
            onPurgeCdn={onPurgeCdn || (() => onShowToast('Đã phát lệnh Purge CDN Cache thành công!'))}
            onOpenAdminInvite={onOpenInvite || (() => onShowToast('Mở hộp thoại tạo mã mời Admin'))}
            onOpenRealtimeLogs={onOpenCli || (() => onShowToast('Mở bảng điều khiển thời gian thực'))}
          />

          <AuditLog 
            logs={auditLogs}
            isRefreshing={isRefreshingAudit}
            onRefresh={handleRefreshAudit}
          />
        </div>
      </div>
    </div>
  );
};
