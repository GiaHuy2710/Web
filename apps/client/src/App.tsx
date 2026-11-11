import React, { useState, useEffect } from 'react';
import {
  Header,
  Footer,
  CommandPaletteModal,
  CvModal,
  AuthModal,
  UserSubmitProjectModal,
} from './components';

import {
  HomePage,
  ProjectDetailPage,
  AiAssistantPage,
  ContactPage,
  DocsPage,
  AdminPage,
} from './pages';

import { ProjectItem } from './types/project';
import { AuthUser } from './types/auth';
import { authApi } from './shared/api';
import { projectApi } from './shared/api/project.api';

export const App: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Đồng bộ danh sách dự án khi có thay đổi từ Admin Studio hoặc tab khác
  useEffect(() => {
  let cancelled = false;

  const loadProjects = async () => {
    setIsLoadingProjects(true);
    setProjectsError(null);

    try {
      const response = await projectApi.getProjects({
        category: activeCategory,
        tech: selectedTech ?? undefined,
        sort: sortBy,
        page: currentPage,
        limit: 6,
      });

      if (cancelled) return;

      setProjects(response.projects.map((project) => ({ ...project, image: project.image || '/images/synapse-ai.jpg', details: project.details || { longDescription: project.description || '', highlights: [], architecture: project.techStack?.join(', ') || 'N/A', version: '1.0.0', stars: String(project.likes || 0) } })));
      setTotalPages(response.pagination.totalPages);
      setTotalProjects(response.pagination.total);
    } catch {
      if (cancelled) return;
      setProjectsError('Không thể tải danh sách dự án. Vui lòng thử lại.');
    } finally {
      if (!cancelled) setIsLoadingProjects(false);
    }
  };

  void loadProjects();

  return () => {
    cancelled = true;
  };
  }, [activeCategory, selectedTech, sortBy, currentPage]);

  // Xác định view ban đầu: Mặc định luôn là 'projects' (Landing page)
  // Chỉ mở admin khi truy cập trực tiếp hash #admin hoặc query param ?view=admin
  // Tự động dọn dẹp hash #admin từ session cũ nếu có trên trình duyệt
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Xác định view ban đầu: Mặc định luôn là 'projects' (Landing page)
  // Chỉ mở admin khi truy cập trực tiếp đường dẫn /admin hoặc query param ?view=admin
  const getInitialView = (): 'projects' | 'project-detail' | 'ai-assistant' | 'contact' | 'docs' | 'admin' => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const search = window.location.search;
      if (pathname.includes('/admin') || search.includes('view=admin')) {
        return 'admin';
      }
    }
    return 'projects';
  };

  const [currentView, setCurrentView] = useState<'projects' | 'project-detail' | 'ai-assistant' | 'contact' | 'docs' | 'admin'>(getInitialView);
  const [adminTab, setAdminTab] = useState<string>('products');

  const handleNavigateToAdmin = (tab: string = 'products') => {
    setSelectedProject(null);
    setAdminTab(tab);
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const handleBackToHome = () => {
    setSelectedProject(null);
    setCurrentView('projects');
    if (typeof window !== 'undefined' && window.history.replaceState) {
      window.history.replaceState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quản lý trạng thái xác thực người dùng từ session helper
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authApi.getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!authApi.getToken());

  const handleLoginSuccess = (user?: AuthUser) => {
    if (user) {
      setCurrentUser(user);
    }
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    authApi.clearSession();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

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
const filteredProjects = projects;

  // Handle Like Toggle
  const handleToggleLike = async (projectId: string) => {
    try {
      const result = await projectApi.toggleLike(projectId);
      setProjects((prev) => prev.map((project) => project.id === projectId ? { ...project, likes: result.likes, isLiked: result.isLiked } : project));
      setSavedCount((count) => count + 1);
    } catch {
      setProjectsError('Không thể cập nhật lượt thích. Vui lòng thử lại.');
    }
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
      handleBackToHome();
      setTimeout(() => handleExploreProjects(), 50);
    } else if (sectionId === 'about') {
      setIsCvOpen(true);
    } else if (sectionId === 'docs') {
      setSelectedProject(null);
      setCurrentView('docs');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'ai-assistant') {
      setSelectedProject(null);
      setCurrentView('ai-assistant');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'contact') {
      setSelectedProject(null);
      setCurrentView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'admin') {
      handleNavigateToAdmin('products');
    } else if (sectionId === 'login') {
      setAuthTab('login');
      setIsAuthOpen(true);
    } else if (sectionId === 'register') {
      setAuthTab('register');
      setIsAuthOpen(true);
    }
  };

  // Render Admin Studio Workspace directly
  if (currentView === 'admin') {
    return (
      <AdminPage 
        onBackToHome={handleBackToHome}
        currentUser={currentUser}
        defaultTab={adminTab}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300 relative">
      
      {/* Top Navigation Bar */}
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)}
        savedCount={savedCount}
        onSelectSaved={handleSelectSaved}
        onNavigateSection={handleNavigateSection}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onOpenAuth={(tab) => {
          setAuthTab(tab);
          setIsAuthOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      {currentView === 'docs' ? (
        <DocsPage />
      ) : currentView === 'contact' ? (
        <ContactPage />
      ) : currentView === 'ai-assistant' ? (
        <AiAssistantPage />
      ) : selectedProject ? (
        <ProjectDetailPage 
          project={selectedProject}
          onBack={() => {
            setSelectedProject(null);
            setCurrentView('projects');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectProject={(p) => {
            setSelectedProject(p);
            setCurrentView('project-detail');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          allProjects={projects}
        />
      ) : (
        <HomePage 
          projects={projects}
          filteredProjects={filteredProjects}
          isLoading={isLoadingProjects}
          error={projectsError}
          totalPages={totalPages}
          totalProjects={totalProjects}
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
          onSortChange={(sort) => { setSortBy(sort); setCurrentPage(1); }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSelectProject={(p) => {
            setSelectedProject(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onToggleLike={handleToggleLike}
          onExploreProjects={handleExploreProjects}
          onOpenCvModal={() => setIsCvOpen(true)}
          onOpenSubmitProjectModal={() => setIsSubmitModalOpen(true)}
          onNavigateToAdmin={() => handleNavigateToAdmin('products')}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPaletteModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        onSelectProject={(p) => {
          setSelectedProject(p);
          setCurrentView('project-detail');
          setIsSearchOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* CV Modal */}
      <CvModal 
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
      />

      {/* User Submit Project Modal (Modal đóng góp dự án của người dùng) */}
      <UserSubmitProjectModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        defaultTab={authTab}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
