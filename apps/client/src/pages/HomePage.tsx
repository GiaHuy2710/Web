import React from 'react';
import { FolderGit2, Plus } from 'lucide-react';
import { 
  HeroSection, 
  StatsSection, 
  ProjectsToolbar, 
  ProjectCard, 
  Pagination, 
  NewsletterSection 
} from '../components';
import { ProjectItem } from '../types/project';

export interface HomePageProps {
  projects: ProjectItem[];
  filteredProjects: ProjectItem[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectProject: (project: ProjectItem) => void;
  onToggleLike: (projectId: string) => void;
  onExploreProjects: () => void;
  onOpenCvModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  filteredProjects,
  activeCategory,
  onSelectCategory,
  selectedTech,
  onSelectTech,
  sortBy,
  onSortChange,
  currentPage,
  onPageChange,
  onSelectProject,
  onToggleLike,
  onExploreProjects,
  onOpenCvModal,
}) => {
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <HeroSection 
        onExploreProjects={onExploreProjects}
        onOpenCvModal={onOpenCvModal}
      />

      {/* Stats Section - Dữ liệu thực tế */}
      <StatsSection projects={projects} />

      {/* Projects Toolbar (Tabs, Sort, Tech Filter) */}
      <ProjectsToolbar 
        projects={projects}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        selectedTech={selectedTech}
        onSelectTech={onSelectTech}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      {/* Empty state khi chưa có dự án nào */}
      {projects.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#0b101a] border border-white/[0.06] space-y-4 my-8 p-8">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-400">
            <FolderGit2 className="w-7 h-7 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Kho dự án hiện đang trống
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Hệ thống chưa ghi nhận dự án nào được đăng tải. Khi bạn đăng tải hoặc lưu bản phát hành trong trang Quản trị (Admin Studio), sản phẩm sẽ lập tức xuất hiện tại đây.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = '#admin';
                  window.location.reload();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Đăng sản phẩm đầu tiên</span>
            </button>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty state khi bộ lọc không có kết quả */
        <div className="py-16 text-center rounded-2xl bg-[#0d131f] border border-white/[0.06] space-y-3 my-8">
          <p className="text-sm text-slate-400">Không có dự án nào khớp với bộ lọc hiện tại.</p>
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectTech(null);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        /* Projects 3-Column Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {paginatedProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      )}

      {/* Pagination Bar - Chỉ hiển thị khi có nhiều hơn 1 trang */}
      {filteredProjects.length > itemsPerPage && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProjects.length}
          onPageChange={onPageChange}
        />
      )}

      {/* Newsletter Section with Interactive Simulation */}
      <NewsletterSection />
    </main>
  );
};
