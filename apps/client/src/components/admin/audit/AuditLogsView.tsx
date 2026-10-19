import React, { useState } from 'react';
import { FileCode2, RefreshCw, Search, Download, ShieldCheck } from 'lucide-react';
import { AuditLog } from '../widgets';
import { AuditLogItem } from '../types';

export interface AuditLogsViewProps {
  onShowToast: (msg: string) => void;
}

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ onShowToast }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const [auditLogs] = useState<AuditLogItem[]>([
    {
      id: 1,
      time: '14:32:05',
      actor: 'Super Admin',
      action: 'cập nhật bản build Synapse AI v2.4.0',
      detail: 'Deploy to edge SNG-1 (SHA: e8f41c2a)',
    },
    {
      id: 2,
      time: '13:15:40',
      actor: 'Hệ thống AI',
      action: 'Đã phê duyệt 4 bình luận của dự án CyberRogue',
      detail: 'Batch moderation approved (Spam Score < 10%)',
    },
    {
      id: 3,
      time: '11:40:12',
      actor: 'CDN Sync Worker',
      action: 'Đồng bộ hóa CDN Singapore hoàn tất',
      detail: 'Cloudflare R2 sync: 100% OK across 12 PoPs',
    },
    {
      id: 4,
      time: '09:12:55',
      actor: 'Security Gate',
      action: 'Tạo mã mời Admin cho kỹ sư DevOps',
      detail: 'Token #ADM-98441 generated with 7d expiration',
    },
    {
      id: 5,
      time: '08:05:21',
      actor: 'AI Security Guard',
      action: 'Chặn địa chỉ IP nghi vấn từ Tor Exit Node',
      detail: 'IP: 185.220.101.4 (Phát hiện 18 bình luận phishing)',
    },
    {
      id: 6,
      time: '07:30:00',
      actor: 'Cron Backup',
      action: 'Tự động sao lưu dữ liệu toàn hệ thống',
      detail: 'Snapshot: daily_backup_20261019.sql.gz (142 MB)',
    },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onShowToast('Đã đồng bộ nhật ký kiểm toán mới nhất từ Cloudflare & DB.');
    }, 600);
  };

  const handleExport = () => {
    onShowToast('Đang kết xuất nhật ký kiểm toán audit_logs.json... Tải về hoàn tất!');
  };

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.actor.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.action.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.detail.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="pb-2 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileCode2 className="w-6 h-6 text-emerald-400" />
            <span>Nhật ký hoạt động hệ thống (Audit Logs)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Truy vết toàn bộ hành vi quản trị, cập nhật phân quyền RBAC và lệnh CLI trên cluster theo thời gian thực.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất JSON</span>
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0c121e] border border-white/[0.06]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Tìm theo tác nhân, hành động, ID..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#111724] border border-white/[0.06] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="text-xs text-slate-400 ml-auto hidden sm:block">
          Hiển thị <span className="text-white font-semibold">{filteredLogs.length}</span> / {auditLogs.length} bản ghi
        </div>
      </div>

      {/* Main Logs Table */}
      <div className="rounded-2xl bg-[#0c121e] border border-white/[0.07] overflow-hidden">
        <div className="p-4 border-b border-white/[0.05] flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MÃ HÓA SHA-256 TAMPER-PROOF AUDIT TRAIL</span>
          </span>
          <span className="text-emerald-400 font-bold">100% VERIFIED</span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-3.5 hover:bg-white/[0.02] transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <span className="font-mono text-[11px] text-slate-500 shrink-0 bg-white/[0.03] px-2 py-0.5 rounded">
                  {log.time}
                </span>
                <span className="font-semibold text-cyan-400 shrink-0">
                  [{log.actor}]
                </span>
                <span className="text-slate-200 truncate">
                  {log.action}
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 shrink-0 sm:text-right">
                {log.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reusable Audit Log Widget */}
      <AuditLog logs={filteredLogs} isRefreshing={isRefreshing} onRefresh={handleRefresh} />
    </div>
  );
};
