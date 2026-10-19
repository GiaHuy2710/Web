import React from 'react';
import { Database } from 'lucide-react';

export const CdnStorageWidget: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-[#090e17] border border-white/[0.06] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-white tracking-wide">
            Giám sát CDN Storage & Pipeline
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Edge: Bình thường
        </span>
      </div>

      <p className="text-[11px] text-slate-400">
        Hạ tầng lưu trữ Cloudflare R2 Object Storage liên kết qua 300+ Edge Data Centers.
      </p>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-slate-400">Bộ nhớ Cloudflare R2 đã dùng:</span>
          <span className="text-white font-bold">142.8 GB / 500.0 GB (28.5%)</span>
        </div>
        <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full" style={{ width: '28.5%' }} />
        </div>
      </div>

      {/* 3 Thông số chi tiết */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/[0.05] text-[11px]">
        <div>
          <div className="text-[10px] font-mono text-slate-400">BĂNG THÔNG THÁNG</div>
          <div className="font-bold text-white font-mono mt-0.5">1.2 TB / 10 TB</div>
          <div className="text-[10px] text-emerald-400">Tối ưu nén Brotli</div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-400">TỐC ĐỘ TẢI TB</div>
          <div className="font-bold text-white font-mono mt-0.5">85.4 MB/s</div>
          <div className="text-[10px] text-emerald-400">Độ trễ TB: 14ms</div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-400">BẢO VỆ TẢI VỀ</div>
          <div className="font-bold text-white font-mono mt-0.5">Token Signed</div>
          <div className="text-[10px] text-emerald-400">Chống hotlinking</div>
        </div>
      </div>
    </div>
  );
};