import React from 'react';
import { History, X, RotateCcw, CheckCircle2, User, Clock, ShieldCheck } from 'lucide-react';
import { VersionHistoryItem } from './types';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  histories: VersionHistoryItem[];
  onRollback: (version: VersionHistoryItem) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  histories,
  onRollback,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0e1624] border border-white/[0.09] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 text-slate-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span>Lịch sử phiên bản cấu hình</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  DevFolio Studio
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Xem lại các lần thay đổi tham số SEO, Domain, Header bảo mật và khôi phục khi cần.
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

        {/* Timeline list */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1">
          {histories.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <History className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-white font-bold text-sm">Chưa có lịch sử phiên bản nào</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Khi bạn chỉnh sửa và nhấn "Lưu tất cả thay đổi", hệ thống sẽ tự động tạo snapshot phiên bản mới tại đây.
              </p>
            </div>
          ) : (
            histories.map((hist) => (
            <div
              key={hist.id}
              className={`p-4 rounded-xl border transition ${
                hist.isCurrent
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.08)]'
                  : 'bg-[#090e17] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      hist.isCurrent
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/[0.06] text-slate-300'
                    }`}
                  >
                    {hist.version}
                  </span>
                  {hist.isCurrent && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đang áp dụng</span>
                    </span>
                  )}
                </div>

                {!hist.isCurrent && (
                  <button
                    type="button"
                    onClick={() => onRollback(hist)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111c2e] hover:bg-emerald-500/10 hover:text-emerald-300 border border-white/[0.08] text-[11px] font-semibold text-slate-300 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Khôi phục bản này</span>
                  </button>
                )}
              </div>

              <div className="mt-2.5">
                <div className="text-white text-xs font-semibold">{hist.summary}</div>
                <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
                  {hist.changes.map((change, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{hist.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{hist.timestamp}</span>
                </div>
              </div>
            </div>
          )))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Mỗi bản commit được ký điện tử và lưu trữ tự động trên Git Ops</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-white transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
