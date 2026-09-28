import React from 'react';
import { Layers, Eye, Star } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      label: 'HỆ SINH THÁI',
      value: '24+',
      desc: 'Dự án đã build',
      valueColor: 'text-emerald-400',
      icon: Layers
    },
    {
      label: 'LƯỢT TIẾP CẬN',
      value: '148.2k',
      desc: 'Lượt xem',
      valueColor: 'text-sky-400',
      icon: Eye
    },
    {
      label: 'MÃ NGUỒN MỞ',
      value: '12.4k',
      desc: 'Lượt sao GitHub',
      valueColor: 'text-slate-100',
      icon: Star
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
      {stats.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div 
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-[#0d1320]/80 border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 group hover:-translate-y-1 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                {item.label}
              </span>
              <IconComponent className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${item.valueColor}`}>
                {item.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-normal">
                {item.desc}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
