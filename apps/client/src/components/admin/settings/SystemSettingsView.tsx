import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Server,
  Zap,
  RefreshCw,
  Check,
} from 'lucide-react';
import { SystemHealth } from '../widgets';

export interface SystemSettingsViewProps {
  onShowToast: (msg: string) => void;
  onOpenAiRules?: () => void;
}

export const SystemSettingsView: React.FC<SystemSettingsViewProps> = ({
  onShowToast,
  onOpenAiRules,
}) => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugLogging, setDebugLogging] = useState(false);
  const [cdnEdgeSync, setCdnEdgeSync] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handlePurgeAllCaches = () => {
    onShowToast('Đang phát tín hiệu Purge Cache đến 12 PoPs toàn cầu... Đã dọn dẹp 100%!');
  };

  const handleSaveSettings = () => {
    onShowToast('Đã lưu cấu hình hệ thống thành công và đồng bộ tới Edge Worker!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-emerald-400" />
            <span>Cài đặt hệ thống & AI Security</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cấu hình quy tắc bảo mật chống bot, phân quyền quản trị và kết nối CDN toàn cầu.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {onOpenAiRules && (
            <button
              type="button"
              onClick={onOpenAiRules}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-slate-200 text-xs font-semibold transition"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Quy tắc AI Security</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveSettings}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)]"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Lưu cài đặt</span>
          </button>
        </div>
      </div>

      {/* Settings Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Vận hành & Bảo trì */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.05]">
            <Server className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Vận hành & Trạng thái</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
              <div>
                <div className="font-semibold text-white">Chế độ bảo trì hệ thống (Maintenance Mode)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Tạm dừng tiếp nhận đánh giá mới và hiển thị thông báo bảo trì</div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 mt-1 cursor-pointer"
              />
            </label>

            <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
              <div>
                <div className="font-semibold text-white">Ghi log nâng cao (Debug Trace Logging)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Lưu vết payload chi tiết của tất cả requests qua API Gateway</div>
              </div>
              <input
                type="checkbox"
                checked={debugLogging}
                onChange={(e) => setDebugLogging(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 mt-1 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Card 2: CDN & Bộ nhớ đệm */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.05]">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Cloudflare CDN & Cache Edge</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
              <div>
                <div className="font-semibold text-white">Đồng bộ tự động CDN Edge (Automatic Purge)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Xóa cache tự động khi có dự án mới được publish hoặc cập nhật</div>
              </div>
              <input
                type="checkbox"
                checked={cdnEdgeSync}
                onChange={(e) => setCdnEdgeSync(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-1 cursor-pointer"
              />
            </label>

            <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
              <div>
                <div className="font-semibold text-white">Sao lưu cơ sở dữ liệu tự động (Daily Snapshot)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Sao lưu định kỳ lúc 02:00 AM UTC lên kho lưu trữ R2 bảo mật</div>
              </div>
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-1 cursor-pointer"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handlePurgeAllCaches}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-xs font-semibold text-cyan-300 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Xóa sạch toàn bộ CDN Cache (Purge All Edge)</span>
          </button>
        </div>
      </div>

      {/* System Health Status Widget */}
      <SystemHealth />
    </div>
  );
};
