import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../types/project';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = projects.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#0d131f] border border-white/[0.12] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#111827]/80">
          <Search className="w-5 h-5 text-emerald-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm dự án, công nghệ (React, Go, Python, AI)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          <button 
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-white/[0.06] text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Không tìm thấy dự án nào khớp với "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectProject(item);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] text-left transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-black/40 border border-white/[0.08] shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Command palette footer info */}
        <div className="px-4 py-2 bg-[#090d15] border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-400">
          <span>Tìm kiếm thông minh trên DevFolio</span>
          <span className="font-mono">ESC để đóng</span>
        </div>
      </div>
    </div>
  );
};
