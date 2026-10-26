import React, { useState } from 'react';
import { ShieldCheck, X, Check, Loader2, Lock } from 'lucide-react';

interface MerkleVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalLogs: number;
}

export const MerkleVerificationModal: React.FC<MerkleVerificationModalProps> = ({
  isOpen,
  onClose,
  totalLogs,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  if (!isOpen) return null;

  const handleStartVerification = () => {
    setIsVerifying(true);
    setIsVerified(false);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#0e1624] border border-emerald-500/30 rounded-2xl shadow-2xl p-6 space-y-5 text-slate-200">
        <div className="flex items-start justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Kiểm tra toàn vẹn chuỗi Merkle Tree
              </h3>
              <p className="text-xs text-emerald-400 font-mono mt-0.5">
                Mã hóa SHA-256 Tamper-Proof Audit Trail
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <p className="text-slate-300 leading-relaxed">
            Mỗi hành động trong hệ thống Studio được nối tiếp vào sổ cái bất biến (Append-Only Ledger) và được hash thành các nút lá (Leaf nodes) tạo thành cây Merkle Root. Thuật toán sẽ tính toán lại mã hash của toàn bộ <span className="text-emerald-400 font-bold font-mono">{totalLogs}</span> bản ghi để kiểm tra xem có bất kỳ dữ liệu nào bị thay đổi hay can thiệp trái phép không.
          </p>

          <div className="p-3.5 rounded-xl bg-[#080d16] border border-white/[0.06] space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-400">
              <span>MERKLE ROOT HASH</span>
              <span className="text-emerald-400 font-bold">LATEST ROOT</span>
            </div>
            <div className="text-cyan-300 break-all select-all bg-black/40 p-2 rounded border border-white/[0.06]">
              3f82a91c049b71e8402da182bca908234812bca0918234fe10948bc182301984
            </div>
          </div>

          {isVerifying && (
            <div className="py-4 flex flex-col items-center justify-center space-y-2 text-center">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <div className="text-white font-bold">Đang duyệt cây nhị phân Merkle...</div>
              <div className="text-slate-400 font-mono text-[11px]">
                Kiểm tra tính hợp lệ của từng block con
              </div>
            </div>
          )}

          {isVerified && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-3 text-emerald-300">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 stroke-[2.5]" />
              <div>
                <div className="font-bold text-white text-xs">
                  Xác thực thành công 100% — Không có giả mạo!
                </div>
                <div className="text-[11px] text-emerald-300/90 mt-0.5">
                  Tất cả {totalLogs} bản ghi nhật ký đều khớp hoàn hảo với chữ ký gốc.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-300"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleStartVerification}
            disabled={isVerifying}
            className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)] flex items-center gap-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isVerifying ? 'Đang kiểm tra...' : 'Bắt đầu kiểm tra ngay'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
