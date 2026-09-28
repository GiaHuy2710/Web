import React from 'react';
import { X, Download, Mail, MapPin } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#0d131f] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-white/[0.07] pb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg shrink-0">
            <img src="/images/alex-avatar.jpg" alt="Alex Nguyen" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Alex Nguyen</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Full-Stack & AI Engineer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> Ho Chi Minh City / Remote</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> alex@devfolio.io</span>
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Tóm tắt năng lực & Kỹ thuật</h4>
          <p>
            Hơn 6 năm kinh nghiệm phát triển phần mềm kiến trúc phân tán, xây dựng microservices hiệu năng cao bằng Golang & Node.js, thiết kế giao diện hiện đại với React/Next.js/Tailwind, và tích hợp các mô hình Generative AI/RAG vào quy trình thực tế.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
            <span className="font-bold text-slate-200">Frontend & Client:</span>
            <p className="text-slate-400 text-[11px]">React, Next.js 14, TypeScript, TailwindCSS, Svelte, WebGL, WebAssembly.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
            <span className="font-bold text-slate-200">Backend & Cloud:</span>
            <p className="text-slate-400 text-[11px]">Go, Python, Node.js/Express, Docker, Kubernetes, PostgreSQL, Redis, Turborepo.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-slate-400">Định dạng: Alex_Nguyen_CV_2026.pdf (1.2 MB)</span>
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert('Đang tải xuống bộ tài liệu & CV Alex Nguyen...');
              onClose();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Tải tài liệu / CV</span>
          </a>
        </div>
      </div>
    </div>
  );
};
