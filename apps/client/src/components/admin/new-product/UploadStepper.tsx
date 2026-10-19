import React from 'react';

const STEPS = [
  { step: '01', status: 'ĐANG ĐIỀN', title: 'Thông tin & Phân loại', active: true },
  { step: '02', status: 'CHỜ XỬ LÝ', title: 'Gói & Deployment', active: false },
  { step: '03', status: 'CHỜ XỬ LÝ', title: 'Media & Demo Preview', active: false },
  { step: '04', status: 'CHỜ XỬ LÝ', title: 'Xuất bản & Phân quyền', active: false },
];

export const UploadStepper: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {STEPS.map((item) => (
        <div
          key={item.step}
          className={`p-3.5 rounded-2xl flex items-center gap-3 transition ${
            item.active
              ? 'bg-[#0c131f] border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
              : 'bg-[#090e17] border border-white/[0.05] opacity-60'
          }`}
        >
          <span
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
              item.active
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                : 'bg-white/[0.04] border border-white/[0.08] text-slate-400'
            }`}
          >
            {item.step}
          </span>
          <div>
            <div
              className={`text-[10px] font-bold tracking-wider uppercase font-mono ${
                item.active ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {item.status}
            </div>
            <div
              className={`text-xs ${
                item.active ? 'font-semibold text-white' : 'font-medium text-slate-300'
              }`}
            >
              {item.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};