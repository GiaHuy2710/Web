import React, { useState } from 'react';
import { Trash2, AlertTriangle, X, Check, Loader2, Globe } from 'lucide-react';

interface PurgeCacheConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const PurgeCacheConfirmModal: React.FC<PurgeCacheConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'confirm' | 'purging' | 'done'>('confirm');

  if (!isOpen) return null;

  const handleExecutePurge = () => {
    setIsProcessing(true);
    setStep('purging');
    setTimeout(() => {
      setStep('done');
      setIsProcessing(false);
      setTimeout(() => {
        onConfirm();
        setStep('confirm');
        onClose();
      }, 1000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#0e1624] border border-rose-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 text-slate-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Xác nhận Xóa toàn bộ CDN Cache?
              </h3>
              <p className="text-xs text-rose-400/90 font-mono mt-0.5">
                Purge Everywhere • 280+ Cloudflare Edge PoPs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'confirm' && (
          <>
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/30 text-xs text-rose-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Cảnh báo hiệu năng tức thời</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Hành động này sẽ làm rỗng ngay lập tức tất cả các tệp HTML, CSS, JS, hình ảnh WebP đã được lưu trên toàn cầu. Các lượt truy cập tiếp theo sẽ gây tải trực tiếp vào máy chủ gốc (Origin Server) trong khoảng 2-5 giây cho đến khi cache được làm ấm lại.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.06]">
                <div className="text-[10px] text-slate-400 font-mono">ĐIỂM POP CLOUDFLARE</div>
                <div className="text-white font-bold mt-1 text-sm flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>280+ Trung tâm</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.06]">
                <div className="text-[10px] text-slate-400 font-mono">THỜI GIAN TRỄ ƯỚC TÍNH</div>
                <div className="text-emerald-400 font-bold mt-1 text-sm font-mono">~2.4 giây</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-xs font-semibold text-slate-300 transition"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleExecutePurge}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.35)]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tiến hành Xóa Cache Ngay</span>
              </button>
            </div>
          </>
        )}

        {step === 'purging' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <div>
              <div className="text-white font-bold text-sm">Đang phát tín hiệu Purge Cache đến 280+ PoPs...</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Gửi lệnh tới Cloudflare Edge API Gateway</div>
            </div>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 animate-pulse w-3/4 rounded-full" />
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="text-white font-bold text-sm">Xóa sạch toàn bộ CDN Cache thành công!</div>
            <div className="text-xs text-emerald-300 font-mono">100% PoPs đã được làm mới</div>
          </div>
        )}
      </div>
    </div>
  );
};
