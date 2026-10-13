import React from 'react';
import { Clock, RefreshCw } from 'lucide-react';

export interface AuditLogItem {
  id: number;
  time: string;
  actor: string;
  action: string;
  detail: string;
}

export interface AuditLogProps {
  logs: AuditLogItem[];
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const AuditLog: React.FC<AuditLogProps> = ({ logs, isRefreshing, onRefresh }) => {
  return (
    <div className="p-6 rounded-2xl bg-[#0b101a] border border-white/[0.06]">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <h2 className="font-bold text-white text-sm">
            Nhật ký quản trị (Audit)
          </h2>
        </div>
        <button
          onClick={onRefresh}
          title="Làm mới nhật ký"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
        </button>
      </div>

      <div className="space-y-4 mt-4 text-xs">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3">
            <span className="font-mono text-emerald-400/90 text-[11px] font-semibold shrink-0 pt-0.5">
              {log.time}
            </span>
            <div className="min-w-0">
              <p className="text-slate-200 font-medium leading-relaxed">
                <span className="text-white font-semibold">{log.actor}</span> {log.action}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {log.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
