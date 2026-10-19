import React, { useState } from 'react';
import { Terminal, X } from 'lucide-react';

export interface CliQuickActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const CliQuickActionsModal: React.FC<CliQuickActionsModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [cliCommand, setCliCommand] = useState('');
  const [cliLogs, setCliLogs] = useState<string[]>([
    'DevFolio Studio CLI v2.4.0 (x86_64-node-win32)',
    'Connected to cluster sng-edge-prod. Type "help" or run a quick command below.',
  ]);

  if (!isOpen) return null;

  const handleExecuteCli = (cmd?: string) => {
    const toRun = cmd || cliCommand;
    if (!toRun.trim()) return;

    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    let result = '';

    if (toRun.includes('export')) {
      result = 'OK: Generated export payload for 1,842 users. File ready for download.';
      onShowToast('CLI: Đã xuất dữ liệu người dùng thành công!');
    } else if (toRun.includes('ban') || toRun.includes('quarantine')) {
      result = 'OK: Flagged 9 suspicious IP clusters and synchronized cloud firewall.';
      onShowToast('CLI: Đã cách ly 9 cụm bot thành công!');
    } else if (toRun.includes('cache')) {
      result = 'OK: Cloudflare CDN edge cache purged (100% propagated across 12 datacenters).';
      onShowToast('CLI: Đã xóa cache CDN thành công!');
    } else if (toRun.includes('help')) {
      result = 'Commands: users --list, users --export, bot --quarantine-all, cache --purge, rbac --verify';
    } else {
      result = `OK: Command "${toRun}" executed successfully at cluster node.`;
      onShowToast(`CLI: Thực thi lệnh "${toRun}" hoàn tất!`);
    }

    setCliLogs((prev) => [...prev, `[${timestamp}] $ ${toRun}`, `→ ${result}`]);
    setCliCommand('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl bg-[#090e17] border border-emerald-500/30 shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <Terminal className="w-4 h-4" />
            <span>DevFolio Studio CLI Terminal</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Command Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] text-slate-500">Gợi ý nhanh:</span>
          <button
            type="button"
            onClick={() => handleExecuteCli('users --export-csv')}
            className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
          >
            users --export-csv
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCli('bot --quarantine-all')}
            className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
          >
            bot --quarantine-all
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCli('cache --purge')}
            className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
          >
            cache --purge
          </button>
          <button
            type="button"
            onClick={() => handleExecuteCli('help')}
            className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
          >
            help
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="h-64 rounded-xl bg-black/60 border border-white/[0.08] p-3 font-mono text-xs overflow-y-auto space-y-1 text-slate-300">
          {cliLogs.map((log, idx) => (
            <div
              key={idx}
              className={
                log.startsWith('$') || log.includes('$')
                  ? 'text-emerald-400 font-semibold'
                  : log.startsWith('→')
                  ? 'text-cyan-300 pl-2'
                  : 'text-slate-400'
              }
            >
              {log}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-emerald-400 text-xs">
              $
            </span>
            <input
              type="text"
              placeholder="devfolio command..."
              value={cliCommand}
              onChange={(e) => setCliCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleExecuteCli();
                }
              }}
              className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#111724] border border-white/[0.08] font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <button
            type="button"
            onClick={() => handleExecuteCli()}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs font-mono transition cursor-pointer"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
};
