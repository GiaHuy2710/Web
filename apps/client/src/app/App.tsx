import React, { useState, useMemo, useEffect } from 'react';
import {
  // Layout components
  Header,
  Footer,
  // Page sections
  HeroSection,
  StatsSection,
  NewsletterSection,
  // Projects feature components
  ProjectCard,
  ProjectsToolbar,
  Pagination,
  // Interactive Modals
  ProjectDetailModal,
  CommandPaletteModal,
  CvModal,
  // Auth components
  AuthModal,
} from '../components';

import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem } from '../types/project';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [savedCount, setSavedCount] = useState<number>(5);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Global Ctrl+K listener for Command Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Sort Projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (selectedTech) {
      result = result.filter(p => 
        p.techStack.some(t => t.toLowerCase() === selectedTech.toLowerCase())
      );
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [projects, activeCategory, selectedTech, sortBy]);

  // Handle Like Toggle
  const handleToggleLike = (projectId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likes: nextLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
    setSavedCount(prev => prev + 1);
  };

  const handleExploreProjects = () => {
    const elem = document.getElementById('projects-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSaved = () => {
    alert(`Bạn đang có ${savedCount} dự án đã lưu trong bộ sưu tập cá nhân.`);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'projects') {
      handleExploreProjects();
    } else if (sectionId === 'about') {
      setIsCvOpen(true);
    } else if (sectionId === 'docs') {
      alert('Tài liệu kỹ thuật & blog đang được tổng hợp và xuất bản định kỳ.');
    } else if (sectionId === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'login') {
      setAuthTab('login');
      setIsAuthOpen(true);
    } else if (sectionId === 'register') {
      setAuthTab('register');
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300 relative">
      
      {/* Top Navigation Bar */}
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)}
        savedCount={savedCount}
        onSelectSaved={handleSelectSaved}
        onNavigateSection={handleNavigateSection}
        isLoggedIn={isLoggedIn}
        onOpenAuth={(tab) => {
          setAuthTab(tab);
          setIsAuthOpen(true);
        }}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <HeroSection 
          onExploreProjects={handleExploreProjects}
          onOpenCvModal={() => setIsCvOpen(true)}
        />

        {/* Stats Section */}
        <StatsSection />

        {/* Projects Toolbar (Tabs, Sort, Tech Filter) */}
        <ProjectsToolbar 
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }}
          selectedTech={selectedTech}
          onSelectTech={(tech) => {
            setSelectedTech(tech);
            setCurrentPage(1);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Projects 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onSelectProject={setSelectedProject}
              onToggleLike={handleToggleLike}
            />
          ))}
        </div>

        {/* Empty state if filter has no results */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center rounded-2xl bg-[#0d131f] border border-white/[0.06] space-y-3">
            <p className="text-sm text-slate-400">Không có dự án nào khớp với bộ lọc hiện tại.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedTech(null);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition"
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
          onPageChange={setCurrentPage}
        />

        {/* Newsletter Section with Interactive Simulation */}
        <NewsletterSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPaletteModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        onSelectProject={setSelectedProject}
      />

      {/* CV Modal */}
      <CvModal 
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
      />

    <AuthModal 
      isOpen={isAuthOpen} 
      onClose={() => setIsAuthOpen(false)} 
      defaultTab={authTab}
    />
    </div>
  );
};

export default App;
