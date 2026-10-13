import React from 'react';
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
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <HeroSection 
        onExploreProjects={onExploreProjects}
        onOpenCvModal={onOpenCvModal}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Projects Toolbar (Tabs, Sort, Tech Filter) */}
      <ProjectsToolbar 
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        selectedTech={selectedTech}
        onSelectTech={onSelectTech}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      {/* Projects 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id}
            project={project}
            onSelectProject={onSelectProject}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>

      {/* Empty state if filter has no results */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center rounded-2xl bg-[#0d131f] border border-white/[0.06] space-y-3">
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
      )}

      {/* Pagination Bar */}
      <Pagination 
        currentPage={currentPage}
        totalPages={4}
        totalItems={24}
        onPageChange={onPageChange}
      />

      {/* Newsletter Section with Interactive Simulation */}
      <NewsletterSection />
    </main>
  );
};
