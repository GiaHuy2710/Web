import React, { useState } from 'react';
import {
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Webhook,
  Lock,
} from 'lucide-react';
import { ApiKeyItem } from './types';

interface ApiKeysTabProps {
  apiKeys: ApiKeyItem[];
  onShowToast: (msg: string) => void;
  onRevokeKey: (id: string) => void;
  onAddKey: (newKey: ApiKeyItem) => void;
}

export const ApiKeysTab: React.FC<ApiKeysTabProps> = ({
  apiKeys,
  onShowToast,
  onRevokeKey,
  onAddKey,
}) => {
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');
  const [newTokenRole, setNewTokenRole] = useState('Read & Deploy');

  const toggleTokenVisibility = (id: string) => {
    setShowTokens((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`Đã sao chép ${label} vào bộ nhớ tạm!`);
  };

  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTokenName.trim()) return;
    const randomHex = Math.random().toString(16).substring(2, 10);
    const newKey: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newTokenName.trim(),
      prefix: `std_live_${randomHex.slice(0, 6)}`,
      tokenFull: `std_live_${randomHex}${Math.random().toString(16).substring(2, 15)}`,
      createdDate: 'Hôm nay',
      lastUsed: 'Chưa sử dụng',
      role: newTokenRole,
      status: 'active',
      expiresIn: 'Còn 365 ngày',
    };
    onAddKey(newKey);
    setIsCreateModalOpen(false);
    setNewTokenName('');
    onShowToast(`Tạo khóa API mới [${newKey.name}] thành công!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-[#0b101b] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">
              Khóa API bí mật & Tích hợp CI/CD Pipeline
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cấp quyền programmatic access cho GitHub Actions, Cloudflare Edge và Kubelet Deployer.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tạo Token mới</span>
        </button>
      </div>

      {/* API Keys Table */}
      <div className="rounded-2xl bg-[#0b101b] border border-white/[0.08] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
            DANH SÁCH KHÓA HOẠT ĐỘNG ({apiKeys.length})
          </span>
          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Mã hóa AES-256 GCM at Rest</span>
          </span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {apiKeys.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Key className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-white font-bold text-sm">Chưa có khóa API nào được tạo</div>
              <p className="text-xs text-slate-400">
                Nhấn &quot;Tạo Token mới&quot; ở góc trên để cấp khóa bảo mật cho GitHub Actions, Cloudflare hoặc bot deploy.
              </p>
            </div>
          ) : (
            apiKeys.map((item) => {
            const isVisible = showTokens[item.id];
            const displayToken = isVisible
              ? item.tokenFull || `${item.prefix}••••••••••••••••`
              : `${item.prefix}••••••••••••••••••••••••`;

            return (
              <div
                key={item.id}
                className="p-4 hover:bg-white/[0.02] transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        item.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {item.status === 'active' ? 'Hoạt động' : 'Đã thu hồi'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">
                      {item.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <code className="text-xs font-mono text-cyan-300 bg-[#060a12] px-2.5 py-1 rounded-md border border-white/[0.06]">
                      {displayToken}
                    </code>
                    <button
                      type="button"
                      onClick={() => toggleTokenVisibility(item.id)}
                      className="p-1 rounded text-slate-400 hover:text-white transition"
                      title={isVisible ? 'Ẩn token' : 'Hiện token'}
                    >
                      {isVisible ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(item.tokenFull || item.prefix, 'Token')
                      }
                      className="p-1 rounded text-slate-400 hover:text-white transition"
                      title="Sao chép"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-slate-400 text-[11px]">Dùng lần cuối</div>
                    <div className="text-slate-200 font-mono text-[11px] mt-0.5">
                      {item.lastUsed}
                    </div>
                  </div>

                  {item.status === 'active' ? (
                    <button
                      type="button"
                      onClick={() => onRevokeKey(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Thu hồi</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">Đã vô hiệu hóa</span>
                  )}
                </div>
              </div>
            );
          }))}
        </div>
      </div>

      {/* Webhooks Section */}
      <div className="p-5 rounded-2xl bg-[#0b101b] border border-white/[0.08] space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <Webhook className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">
              Webhook Deploy Endpoint (GitHub Actions / GitLab CI)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            TLS v1.3 Verified
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#060a12] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="font-mono text-cyan-300 break-all select-all">
            https://api.devfolio.alexnguyen.dev/v1/hooks/deploy-signal
          </div>
          <button
            type="button"
            onClick={() =>
              handleCopy(
                'https://api.devfolio.alexnguyen.dev/v1/hooks/deploy-signal',
                'Webhook URL'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold transition shrink-0"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Sao chép URL</span>
          </button>
        </div>
      </div>

      {/* Modal Create Token */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0e1624] border border-white/[0.09] rounded-2xl shadow-2xl p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <span>Tạo khóa API Token mới</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateToken} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  TÊN ĐỊNH DANH TOKEN
                </label>
                <input
                  type="text"
                  required
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  placeholder="Ví dụ: Vercel Preview Deploy Hook"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  PHẠM VI QUYỀN HẠN (ROLE SCOPE)
                </label>
                <select
                  value={newTokenRole}
                  onChange={(e) => setNewTokenRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="Read & Deploy">Read & Deploy (Khuyến nghị cho CI/CD)</option>
                  <option value="Purge Cache Only">Purge Cache Edge Only</option>
                  <option value="Full Admin Studio">Full Admin Studio Access</option>
                  <option value="Telemetry Read-only">Telemetry Read-only</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-slate-300 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold"
                >
                  Tạo Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
