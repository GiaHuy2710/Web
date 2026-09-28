import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-white/[0.06] text-xs text-slate-400">
      
      {/* Items count indicator */}
      <div>
        Hiển thị <span className="font-semibold text-slate-200">1-6</span> trên <span className="font-semibold text-slate-200">{totalItems}</span> dự án
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
            currentPage === 1
              ? 'border-white/[0.04] text-slate-600 cursor-not-allowed'
              : 'border-white/[0.08] text-slate-300 hover:bg-white/[0.05] hover:text-white'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Trước</span>
        </button>

        {/* Page Numbers */}
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold font-mono flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
            currentPage === totalPages
              ? 'border-white/[0.04] text-slate-600 cursor-not-allowed'
              : 'border-white/[0.08] text-slate-300 hover:bg-white/[0.05] hover:text-white'
          }`}
        >
          <span>Tiếp</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
};
