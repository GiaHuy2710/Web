import React from 'react';
import { Sparkles, Database, Boxes, Terminal, Edit3, Clock, MoreVertical } from 'lucide-react';

export interface RecentUploadsTableProps {
  onShowToast: (msg: string) => void;
}

export const RecentUploadsTable: React.FC<RecentUploadsTableProps> = ({ onShowToast }) => {
  return (
    <div className="p-6 rounded-2xl bg-[#0b101a] border border-white/[0.06]">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div>
          <h2 className="font-bold text-white text-sm">
            Sản phẩm tải lên gần đây & Trạng thái
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Quản lý trực tiếp các artifact, package & repo demo
          </p>
        </div>
        <button 
          onClick={() => onShowToast('Đang tải danh sách toàn bộ 48 dự án & artifacts...')}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition cursor-pointer"
        >
          <span>Xem tất cả (48)</span>
          <span>→</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-white/[0.05]">
              <th className="py-3 px-2">Tên sản phẩm / Repo</th>
              <th className="py-3 px-2">Phiên bản</th>
              <th className="py-3 px-2">Trạng thái</th>
              <th className="py-3 px-2">Lượt tải</th>
              <th className="py-3 px-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            
            {/* Row 1: Synapse AI */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="py-3.5 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Synapse AI</div>
                    <div className="text-[10px] text-slate-400">Fullstack • PyTorch + Next.js</div>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                  v2.4.0
                </span>
              </td>
              <td className="py-3.5 px-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </td>
              <td className="py-3.5 px-2 font-mono text-slate-300">48,210 dl</td>
              <td className="py-3.5 px-2 text-right">
                <div className="inline-flex items-center gap-1 text-slate-400">
                  <button onClick={() => onShowToast('Chỉnh sửa Synapse AI')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Xem lịch sử phiên bản Synapse AI')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Clock className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Menu tùy chọn mở rộng')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>

            {/* Row 2: HyperEdge KV */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="py-3.5 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">HyperEdge KV</div>
                    <div className="text-[10px] text-slate-400">Distributed Cache • Rust + WASM</div>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                  v1.1.2
                </span>
              </td>
              <td className="py-3.5 px-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </td>
              <td className="py-3.5 px-2 font-mono text-slate-300">31,405 dl</td>
              <td className="py-3.5 px-2 text-right">
                <div className="inline-flex items-center gap-1 text-slate-400">
                  <button onClick={() => onShowToast('Chỉnh sửa HyperEdge KV')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Xem lịch sử HyperEdge KV')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Clock className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Tùy chọn HyperEdge KV')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>

            {/* Row 3: CyberRogue 2D */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="py-3.5 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">CyberRogue 2D</div>
                    <div className="text-[10px] text-slate-400">Indie Game • Godot 4 + WebGL</div>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                  v0.8.5
                </span>
              </td>
              <td className="py-3.5 px-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Beta Live
                </span>
              </td>
              <td className="py-3.5 px-2 font-mono text-slate-300">19,840 dl</td>
              <td className="py-3.5 px-2 text-right">
                <div className="inline-flex items-center gap-1 text-slate-400">
                  <button onClick={() => onShowToast('Chỉnh sửa CyberRogue 2D')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Xem lịch sử CyberRogue 2D')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Clock className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Tùy chọn CyberRogue 2D')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>

            {/* Row 4: ChromaPalette CLI */}
            <tr className="hover:bg-white/[0.02] transition">
              <td className="py-3.5 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">ChromaPalette CLI</div>
                    <div className="text-[10px] text-slate-400">DevTool • Go binary + Homebrew</div>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                  v1.0.0
                </span>
              </td>
              <td className="py-3.5 px-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  In Review
                </span>
              </td>
              <td className="py-3.5 px-2 font-mono text-slate-300">12,110 dl</td>
              <td className="py-3.5 px-2 text-right">
                <div className="inline-flex items-center gap-1 text-slate-400">
                  <button onClick={() => onShowToast('Chỉnh sửa ChromaPalette CLI')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Xem lịch sử ChromaPalette CLI')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <Clock className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShowToast('Tùy chọn ChromaPalette CLI')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};
