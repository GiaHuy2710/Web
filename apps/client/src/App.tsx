import React, { useState, useMemo, useEffect } from 'react';
import {
  Header,
  Footer,
  CommandPaletteModal,
  CvModal,
  AuthModal,
} from './components';

import {
  HomePage,
  ProjectDetailPage,
  AiAssistantPage,
  ContactPage,
  DocsPage,
  AdminPage,
} from './pages';

import { ProjectItem, ProjectCategory } from './types/project';
import { ProductRegistryItem } from './components/admin/products/types';
import { AuthUser } from './types/auth';
import { authApi } from './shared/api';

// Chuyển đổi dữ liệu từ ProductRegistryItem sang ProjectItem để hiển thị trên Landing page
const mapProductRegistryToProjectItem = (item: ProductRegistryItem): ProjectItem => {
  let cat: ProjectCategory = 'Developer Tools';
  if (item.category === 'web' || item.categoryLabel?.toLowerCase().includes('web')) {
    cat = 'Web App';
  } else if (item.category === 'game' || item.categoryLabel?.toLowerCase().includes('game')) {
    cat = 'Games & Creative';
  } else if (item.categoryLabel?.toLowerCase().includes('ai')) {
    cat = 'AI Tools';
  }

  return {
    id: item.slug || item.id,
    title: item.name,
    badge: item.indexTag || 'Active',
    badgeType: 'breadcrumb',
    likes: 0,
    views: item.downloads || '0',
    category: cat,
    techStack: item.techStack || ['TypeScript'],
    description: item.statusLabel ? `Phiên bản ${item.version} • ${item.categoryLabel}` : item.name,
    image: '/images/synapse-ai.jpg',
    demoUrl: `https://${item.slug || 'project'}.devfolio.io`,
    githubUrl: `https://github.com/alexdev/${item.slug || 'project'}`,
    details: {
      longDescription: `Dự án ${item.name} (${item.version}). Phân loại: ${item.categoryLabel}. Mã gói: ${item.code}.`,
      highlights: [
        `Phát hành phiên bản ${item.version}`,
        `Cấu hình môi trường Edge CDN`,
        `Tương thích toàn hệ thống`,
      ],
      architecture: item.techStack?.join(', ') || 'TypeScript',
      version: item.version,
      stars: '0',
    },
  };
};

const getStoredProjects = (): ProjectItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('devfolio_products');
      if (raw) {
        const items: ProductRegistryItem[] = JSON.parse(raw);
        if (Array.isArray(items) && items.length > 0) {
          const active = items.filter((i) => i.status === 'active');
          const toShow = active.length > 0 ? active : items;
          return toShow.map(mapProductRegistryToProjectItem);
        }
      }
    } catch {
      // ignore
    }
  }
  return [];
};

export const App: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(getStoredProjects);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Đồng bộ danh sách dự án khi có thay đổi từ Admin Studio hoặc tab khác
  useEffect(() => {
    const handleSync = () => {
      setProjects(getStoredProjects());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('devfolio_products_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('devfolio_products_updated', handleSync);
    };
  }, []);

  // Xác định view ban đầu: Mặc định luôn là 'projects' (Landing page)
  // Chỉ mở admin khi truy cập trực tiếp hash #admin hoặc query param ?view=admin
  const getInitialView = (): 'projects' | 'project-detail' | 'ai-assistant' | 'contact' | 'docs' | 'admin' => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;
      if (pathname.includes('/admin') || search.includes('view=admin') || hash === '#admin') {
        return 'admin';
      }
    }
    return 'projects';
  };

  const [currentView, setCurrentView] = useState<'projects' | 'project-detail' | 'ai-assistant' | 'contact' | 'docs' | 'admin'>(getInitialView);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const handleBackToHome = () => {
    setSelectedProject(null);
    setCurrentView('projects');
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState(null, '', '/');
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
      setSelectedProject(null);
      setCurrentView('admin');
      if (typeof window !== 'undefined' && window.history.pushState) {
        window.history.pushState(null, '', '/#admin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSelectProject={(p) => {
            setSelectedProject(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onToggleLike={handleToggleLike}
          onExploreProjects={handleExploreProjects}
          onOpenCvModal={() => setIsCvOpen(true)}
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
