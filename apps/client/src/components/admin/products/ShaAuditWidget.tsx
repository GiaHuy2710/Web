import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ShaAuditWidget: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-[#090e17] border border-white/[0.06] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white tracking-wide">
            Tính toàn vẹn SHA-256
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Automated Audit
        </span>
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        Toàn bộ các gói binary (tar.gz, zip, wasm) đều được tạo mã băm chữ ký số tự động tại bước CI/CD GitHub Actions trước khi đẩy lên CDN.
      </p>

      {/* Status Box */}
      <div className="p-3 rounded-xl bg-[#0d1422] border border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div>
          <div className="text-xs font-bold text-white">
            Tất cả 48 file đạt chuẩn GPG Key
          </div>
          <div className="text-[11px] text-slate-400">
            Không phát hiện tệp hỏng hoặc lệch mã hash.
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-white/[0.05]">
        Lần quét tự động gần nhất: <span className="text-slate-300">15 phút trước</span> • Định kỳ mỗi 30m
      </div>
    </div>
  );
};