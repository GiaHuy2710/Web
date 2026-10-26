import React, { useState } from 'react';
import {
  FileCode2,
  X,
  Copy,
  Check,
  ShieldCheck,
  Globe,
  Clock,
  User,
} from 'lucide-react';
import { AuditLogEntry } from './types';

interface AuditLogDetailModalProps {
  log: AuditLogEntry | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AuditLogDetailModal: React.FC<AuditLogDetailModalProps> = ({
  log,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!log) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(log.payloadRaw);
    setCopied(true);
    onShowToast('Đã sao chép chi tiết sự kiện JSON vào bộ nhớ tạm!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0e1624] border border-white/[0.09] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 text-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">
                  Chi tiết bản ghi kiểm toán #{log.id}
                </h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                    log.severity === 'critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : log.severity === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {log.severity}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Chữ ký mật mã SHA-256 xác thực bởi Merkle Tree Audit Trail.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1 text-xs">
          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.06] space-y-1">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                <User className="w-3 h-3 text-cyan-400" />
                <span>TÁC NHÂN (ACTOR)</span>
              </div>
              <div className="text-white font-bold">{log.actor}</div>
              <div className="text-slate-400 font-mono text-[11px]">{log.actorRole}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.06] space-y-1">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>THỜI ĐIỂM SỰ KIỆN (UTC)</span>
              </div>
              <div className="text-white font-mono">{log.timestamp}</div>
              <div className="text-emerald-400 font-mono text-[11px]">{log.timeFormatted} Live</div>
            </div>

            <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.06] space-y-1">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-purple-400" />
                <span>ĐỊA CHỈ IP & VỊ TRÍ</span>
              </div>
              <div className="text-white font-mono">{log.ipAddress}</div>
              <div className="text-slate-400 text-[11px]">{log.location}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.06] space-y-1">
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>TÀI NGUYÊN TÁC ĐỘNG</span>
              </div>
              <div className="text-cyan-300 font-mono truncate">{log.targetResource}</div>
              <div className="text-slate-400 capitalize text-[11px]">Nhóm: {log.category}</div>
            </div>
          </div>

          {/* Action description */}
          <div className="p-3.5 rounded-xl bg-[#090e17] border border-white/[0.06] space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              HÀNH ĐỘNG CHI TIẾT
            </div>
            <div className="text-white font-semibold leading-relaxed">{log.action}</div>
            <p className="text-slate-400 text-[11px] leading-relaxed pt-1">{log.details}</p>
          </div>

          {/* SHA-256 Hash box */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CHỮ KÝ MÃ HÓA TAMPER-PROOF (SHA-256)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">
                100% MATCH
              </span>
            </div>
            <div className="font-mono text-[11px] text-emerald-200/90 break-all bg-black/40 p-2 rounded-lg border border-emerald-500/20 select-all">
              {log.sha256Hash}
            </div>
          </div>

          {/* User Agent */}
          <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.06] space-y-1 font-mono text-[11px]">
            <div className="text-[10px] text-slate-400 uppercase">USER AGENT CLIENT</div>
            <div className="text-slate-300 break-all">{log.userAgent}</div>
          </div>

          {/* JSON Payload */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <span>RAW EVENT PAYLOAD (JSON)</span>
              <button
                type="button"
                onClick={handleCopyJson}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 capitalize cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Đã chép' : 'Sao chép JSON'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-[#05080f] border border-white/[0.08] text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-48">
              {log.payloadRaw}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="font-mono text-[11px]">DevFolio Immutable Ledger Node #01</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
