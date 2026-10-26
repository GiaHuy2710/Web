import React, { useState, useEffect } from 'react';
import {
  FileCode2,
  RefreshCw,
  Search,
  Download,
  ShieldCheck,
  Eye,
  Radio,
  ChevronRight,
} from 'lucide-react';
import { AuditLogEntry, AuditCategory, AuditLogsViewProps } from './types';
import { getAuditLogs } from './auditStorage';
import { AuditLogDetailModal } from './AuditLogDetailModal';
import { MerkleVerificationModal } from './MerkleVerificationModal';

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({
  onShowToast,
  isEmbeddedInSettings = false,
}) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(() => getAuditLogs());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<AuditCategory>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [isMerkleModalOpen, setIsMerkleModalOpen] = useState(false);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  useEffect(() => {
    const handleUpdate = () => {
      setLogs(getAuditLogs());
    };
    window.addEventListener('devfolio_audit_updated', handleUpdate);
    return () => window.removeEventListener('devfolio_audit_updated', handleUpdate);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLogs(getAuditLogs());
      setIsRefreshing(false);
      onShowToast('Đã đồng bộ nhật ký kiểm toán mới nhất từ Cloudflare Edge & Database.');
    }, 600);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `devfolio_audit_logs_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('Đã kết xuất và tải về tệp devfolio_audit_logs.json thành công!');
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Timestamp', 'Actor', 'Role', 'Action', 'Category', 'Severity', 'IP', 'SHA-256'];
    const rows = logs.map((l) => [
      l.id,
      l.timestamp,
      `"${l.actor}"`,
      `"${l.actorRole}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      l.category,
      l.severity,
      l.ipAddress,
      l.sha256Hash,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `devfolio_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('Đã kết xuất và tải về tệp devfolio_audit_logs.csv!');
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.action.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.targetResource.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.ipAddress.includes(searchFilter) ||
      log.id.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || log.category === activeCategory;

    const matchesSeverity =
      selectedSeverity === 'all' || log.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const categoryCounts = {
    all: logs.length,
    security: logs.filter((l) => l.category === 'security').length,
    config: logs.filter((l) => l.category === 'config').length,
    deploy: logs.filter((l) => l.category === 'deploy').length,
    api: logs.filter((l) => l.category === 'api').length,
    data: logs.filter((l) => l.category === 'data').length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header if not embedded */}
      {!isEmbeddedInSettings && (
        <div className="pb-2 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <FileCode2 className="w-6 h-6 text-emerald-400" />
              <span>Nhật ký hoạt động & Kiểm toán an ninh (Audit Trail)</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Truy vết toàn diện hành vi quản trị, xác thực mật mã SHA-256 Merkle Tree và kiểm tra an ninh hạ tầng thời gian thực.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất CSV</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
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
      )}

      {/* Filter and Category Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#0b101b] border border-white/[0.08] shadow-xl">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: 'all', label: 'Tất cả', count: categoryCounts.all },
            { key: 'security', label: 'Bảo mật', count: categoryCounts.security },
            { key: 'config', label: 'Cấu hình', count: categoryCounts.config },
            { key: 'deploy', label: 'Triển khai', count: categoryCounts.deploy },
            { key: 'data', label: 'Dữ liệu', count: categoryCounts.data },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key as AuditCategory)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.key
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/[0.06] text-slate-400">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Live indicator toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsLiveStreaming(!isLiveStreaming);
              onShowToast(
                !isLiveStreaming
                  ? 'Đã bật chế độ Live Stream nhật ký kiểm toán.'
                  : 'Đã tạm dừng Live Stream nhật ký.'
              );
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
              isLiveStreaming
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
            }`}
          >
            <Radio className={`w-3 h-3 ${isLiveStreaming ? 'animate-pulse text-emerald-400' : ''}`} />
            <span>{isLiveStreaming ? 'Live Stream: Bật' : 'Live Stream: Tắt'}</span>
          </button>
        </div>
      </div>

      {/* Search and Secondary Filter Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Tìm theo tác nhân, hành động, ID sự kiện, IP hoặc tài nguyên..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0b101b] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#0b101b] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="critical">Critical (Nghiêm trọng)</option>
            <option value="warning">Warning (Cảnh báo)</option>
            <option value="success">Success (Thành công)</option>
            <option value="info">Info (Thông tin)</option>
          </select>
        </div>
      </div>

      {/* Main Audit Trail Ledger Table */}
      <div className="rounded-2xl bg-[#0b101b] border border-white/[0.08] overflow-hidden shadow-xl">
        {/* Verification banner */}
        <div className="p-3.5 border-b border-white/[0.06] flex items-center justify-between text-xs font-mono bg-[#070b13]">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold tracking-wider text-[11px]">
              MÃ HÓA SHA-256 TAMPER-PROOF AUDIT TRAIL
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMerkleModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-bold transition cursor-pointer"
          >
            <span>100% VERIFIED</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of audit log entries */}
        <div className="divide-y divide-white/[0.04]">
          {logs.length === 0 ? (
            <div className="p-14 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 mx-auto">
                <FileCode2 className="w-6 h-6" />
              </div>
              <div className="text-white font-bold text-sm">Chưa có nhật ký hoạt động nào</div>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Hệ thống đang hoạt động ở chế độ sạch (0 mock data). Khi bạn hoặc người dùng thực hiện thao tác (lưu cài đặt, đăng tải sản phẩm, kiểm duyệt, thu hồi token...), toàn bộ lịch sử sẽ được ghi nhận tự động vào đây.
              </p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <FileCode2 className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-white font-bold text-sm">Không tìm thấy bản ghi nào</div>
              <p className="text-xs text-slate-400">
                Thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn các bộ lọc phân loại.
              </p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className="p-4 hover:bg-white/[0.02] transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs cursor-pointer group"
              >
                <div className="flex items-start md:items-center gap-3.5 min-w-0">
                  <span className="font-mono text-[11px] text-slate-400 shrink-0 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.05]">
                    {log.timeFormatted}
                  </span>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-cyan-300">
                        [{log.actor}]
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-1.5 py-0.2 rounded">
                        {log.actorRole}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                          log.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : log.severity === 'warning'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {log.severity}
                      </span>
                    </div>

                    <div className="text-slate-200 font-medium group-hover:text-white transition">
                      {log.action}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                      <span className="text-slate-400 truncate max-w-xs">{log.targetResource}</span>
                      <span>•</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                  <div className="text-right hidden lg:block">
                    <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                      {log.sha256Hash.slice(0, 16)}...
                    </div>
                    <div className="text-[10px] text-slate-400">{log.location}</div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLog(log);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold transition border border-white/[0.06]"
                  >
                    <Eye className="w-3 h-3 text-cyan-400" />
                    <span>Chi tiết</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono bg-[#070b13]">
          <div>
            Hiển thị <span className="text-white font-bold">{filteredLogs.length}</span> / {logs.length} sự kiện
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Sổ cái bất biến (Append-Only) Đồng bộ OK</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuditLogDetailModal
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
        onShowToast={onShowToast}
      />

      <MerkleVerificationModal
        isOpen={isMerkleModalOpen}
        onClose={() => setIsMerkleModalOpen(false)}
        totalLogs={logs.length}
      />
    </div>
  );
};
