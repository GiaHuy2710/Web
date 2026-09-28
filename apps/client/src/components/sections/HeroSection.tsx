import React from 'react';
import { ArrowDown, FileText } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenCvModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExploreProjects, 
  onOpenCvModal 
}) => {
  return (
    <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 text-left max-w-4xl">
      
      {/* Availability Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="tracking-wide">Available for contract & building open source</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.18] mb-6">
        Xây dựng & chia sẻ các{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
          sản phẩm số tinh tế
        </span>
        , công cụ AI và giải pháp mã nguồn mở.
      </h1>

      {/* Subtitle description */}
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-normal">
        Kỹ sư phần mềm Full-stack & Indie Hacker với tư duy thiết kế tối giản. Tôi tạo ra các công cụ năng suất tốc độ cao, ứng dụng AI thực chiến và hệ thống có khả năng mở rộng với trải nghiệm người dùng trực quan.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Primary Mint Button */}
        <button
          onClick={onExploreProjects}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Khám phá dự án</span>
          <ArrowDown className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Secondary Glass CV Button */}
        <button
          onClick={onOpenCvModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111827]/80 hover:bg-[#1f2937] text-slate-200 hover:text-white border border-white/[0.1] font-medium text-sm transition-all duration-200 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <FileText className="w-4 h-4 text-slate-400" />
          <span>Nhận tài liệu / CV</span>
        </button>
      </div>

    </section>
  );
};
