import React from 'react';
import { PlusCircle, Key, Terminal, X } from 'lucide-react';

export interface AdminModalsProps {
  isNewToolOpen: boolean;
  onCloseNewTool: () => void;
  onSubmitNewTool: () => void;
  isAdminInviteOpen: boolean;
  onCloseAdminInvite: () => void;
  inviteToken: string | null;
  onCopyInviteToken: () => void;
  isRealtimeLogsOpen: boolean;
  onCloseRealtimeLogs: () => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({
  isNewToolOpen,
  onCloseNewTool,
  onSubmitNewTool,
  isAdminInviteOpen,
  onCloseAdminInvite,
  inviteToken,
  onCopyInviteToken,
  isRealtimeLogsOpen,
  onCloseRealtimeLogs,
}) => {
  return (
    <>
      {/* 1. Modal: Đăng Tool Mới */}
      {isNewToolOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c121e] border border-white/[0.1] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Đăng tải công cụ / Artifact mới</h3>
              </div>
              <button onClick={onCloseNewTool} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitNewTool();
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tên dự án / Công cụ *</label>
                <input
                  required
                  type="text"
                  placeholder="VD: NeuroPulse SDK"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121927] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phiên bản ban đầu</label>
                  <input
                    type="text"
                    defaultValue="v1.0.0"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#121927] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Danh mục</label>
                  <select className="w-full px-3.5 py-2 rounded-xl bg-[#121927] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50">
                    <option>Web Apps</option>
                    <option>DevTools & CLI</option>
                    <option>AI / Machine Learning</option>
                    <option>Indie Game 2D/3D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Mô tả tóm tắt kỹ thuật</label>
                <textarea
                  rows={3}
                  placeholder="Kiến trúc công nghệ, ngôn ngữ Rust/TypeScript, thư viện chính..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121927] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onCloseNewTool}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Tạo bản build ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal: Tạo Mã Mời Admin */}
      {isAdminInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-[#0c121e] border border-white/[0.1] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Mã mời Quản trị viên (Invite Token)</h3>
              </div>
              <button onClick={onCloseAdminInvite} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Mã token này cho phép gán quyền <span className="text-emerald-400 font-semibold">ADMIN</span> trong bảng cơ sở dữ liệu Prisma:
            </p>

            <div className="p-3.5 rounded-xl bg-[#131c2d] border border-emerald-500/30 flex items-center justify-between font-mono text-emerald-300 text-sm font-bold">
              <span>{inviteToken || 'ADM-DEV984-2026'}</span>
              <button
                onClick={onCopyInviteToken}
                className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-xs font-sans transition cursor-pointer"
              >
                Copy
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Hiệu lực: <span className="text-slate-300">24 giờ</span>. Sau khi dùng xong sẽ tự động thu hồi.
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={onCloseAdminInvite}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-gray-950 font-semibold text-xs hover:bg-emerald-400 transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: Xem Logs Realtime */}
      {isRealtimeLogsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-2xl rounded-2xl bg-[#080d16] border border-white/[0.1] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Server & CDN Edge Logs Stream (Realtime)</h3>
              </div>
              <button onClick={onCloseRealtimeLogs} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 overflow-y-auto p-3.5 rounded-xl bg-[#04070c] border border-white/[0.06] font-mono text-xs space-y-1.5 text-slate-300">
              <div className="text-slate-400">[14:32:01.402] [Edge SNG-1] GET /api/home/projects - 200 OK (18ms)</div>
              <div className="text-slate-400">[14:32:04.110] [CDN Tokyo] Cache hit for /dist/synapse-ai.wasm (0ms)</div>
              <div className="text-emerald-400">[14:32:15.820] [Prisma DB] Pool connection acquired in 1.4ms (Pool 12/50)</div>
              <div className="text-slate-400">[14:32:20.901] [Auth Service] JWT Verify superadmin token #9921 - Success</div>
              <div className="text-cyan-400">[14:32:28.140] [AI Assistant] Stream response completed (Tokens: 382, Duration: 640ms)</div>
              <div className="text-slate-400">[14:32:33.004] [HealthCheck] Server /health returned status 200 OK</div>
              <div className="text-emerald-300 animate-pulse">[Streaming] Listening for new events across 12 nodes...</div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-400">Node: server.devfolio.io (Cluster-Production)</span>
              <button
                onClick={onCloseRealtimeLogs}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs transition cursor-pointer"
              >
                Đóng console
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
