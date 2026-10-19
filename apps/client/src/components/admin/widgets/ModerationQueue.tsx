import React from 'react';
import { ShieldCheck, Play } from 'lucide-react';
import { ModerationItem, ModerationQueueProps } from '../types';

export { type ModerationItem, type ModerationQueueProps };

export const ModerationQueue: React.FC<ModerationQueueProps> = ({
  items,
  onApprove,
  onReject,
  onTestSandbox,
  onViewProfile,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-[#0b101a] border border-white/[0.06]">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h2 className="font-bold text-white text-sm">
            Hàng đợi kiểm duyệt
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          {items.length} chờ
        </span>
      </div>

      <div className="space-y-4 mt-4">
        {items.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            🎉 Đã duyệt hết hàng đợi! Không có mục nào tồn đọng.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-3.5 rounded-xl bg-[#0e1422] border border-white/[0.05] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${item.badgeColor}`}>
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.content}
              </p>

              {/* Action Buttons */}
              {item.type === 'comment' && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onApprove(item.id, 'Bình luận của @techlo_dude')}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs transition cursor-pointer"
                  >
                    Duyệt
                  </button>
                  <button
                    onClick={() => onReject(item.id)}
                    className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 text-xs border border-white/[0.08] transition cursor-pointer"
                  >
                    Xoá bỏ
                  </button>
                </div>
              )}

              {item.type === 'build' && (
                <div className="pt-1">
                  <button
                    onClick={onTestSandbox}
                    className="w-full py-1.5 rounded-lg bg-[#182335] hover:bg-[#202e46] text-slate-200 border border-white/[0.08] font-medium text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-slate-200" />
                    <span>Test Sandbox</span>
                  </button>
                </div>
              )}

              {item.type === 'contributor' && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onApprove(item.id, 'Cấp quyền Contributor')}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs transition cursor-pointer"
                  >
                    Cấp quyền
                  </button>
                  <button
                    onClick={() => onViewProfile('Dev @namnguyen')}
                    className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs border border-white/[0.08] transition cursor-pointer"
                  >
                    Xem profile
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
