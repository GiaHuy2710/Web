import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectItem } from '../../types/project';

interface ProjectsToolbarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  projects?: ProjectItem[];
}

export const ProjectsToolbar: React.FC<ProjectsToolbarProps> = ({
  activeCategory,
  onSelectCategory,
  selectedTech,
  onSelectTech,
  sortBy,
  onSortChange,
  projects = [],
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'Tất cả', count: projects.length },
      {
        id: 'web-app',
        label: 'Web App',
        count: projects.filter((p) => p.category === 'Web App').length,
      },
      {
        id: 'ai-tools',
        label: 'AI Tools',
        count: projects.filter((p) => p.category === 'AI Tools').length,
      },
      {
        id: 'developer-tools',
        label: 'Developer Tools',
        count: projects.filter((p) => p.category === 'Developer Tools').length,
      },
      {
        id: 'games-creative',
        label: 'Games & Creative',
        count: projects.filter((p) => p.category === 'Games & Creative').length,
      },
    ];
  }, [projects]);

  const techFilters = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.techStack?.forEach((t) => techSet.add(t)));
    return Array.from(techSet).slice(0, 10);
  }, [projects]);

  const sortOptions = [
    { id: 'newest', label: 'Mới nhất' },
    { id: 'popular', label: 'Nhiều sao nhất' },
    { id: 'views', label: 'Lượt xem cao' },
    { id: 'name', label: 'Tên A-Z' },
  ];

  const currentSortLabel =
    sortOptions.find((o) => o.id === sortBy)?.label || 'Mới nhất';

  return (
    <div id="projects-section" className="w-full pt-6 pb-4 space-y-4">
      {/* Category Pills & Sort Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive =
              activeCategory === cat.label ||
              (cat.id === 'all' && activeCategory === 'all');
            return (
              <button
                key={cat.id}
                onClick={() =>
                  onSelectCategory(cat.id === 'all' ? 'all' : cat.label)
                }
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#151e2e] text-white border border-white/[0.12] shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                    isActive ? 'text-emerald-400 font-bold' : 'text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="relative self-end lg:self-auto">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111723] hover:bg-[#161f30] border border-white/[0.08] text-xs text-slate-300 font-medium transition cursor-pointer"
          >
            <span className="text-slate-400 font-bold text-[10px] tracking-wider uppercase">
              SẮP XẾP:
            </span>
            <span className="text-white font-semibold">{currentSortLabel}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                isSortOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0e1420] border border-white/[0.1] shadow-2xl p-1 z-30">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSortChange(option.id);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition cursor-pointer ${
                    sortBy === option.id
                      ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tech Filter Chips */}
      {techFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-slate-400 font-semibold text-xs mr-1">
            Tech Filter:
          </span>

          {techFilters.map((tech) => {
            const isSelected = selectedTech === tech;
            return (
              <button
                key={tech}
                onClick={() => onSelectTech(isSelected ? null : tech)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-[#111723]/60 text-slate-300 border-white/[0.06] hover:border-white/[0.16] hover:text-white'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? 'bg-emerald-400' : 'bg-slate-500'
                  }`}
                />
                <span>{tech}</span>
              </button>
            );
          })}

          {selectedTech && (
            <button
              onClick={() => onSelectTech(null)}
              className="text-[11px] text-slate-400 hover:text-rose-400 underline ml-2 transition cursor-pointer"
            >
              Xóa lọc
            </button>
          )}
        </div>
      )}
    </div>
  );
};
