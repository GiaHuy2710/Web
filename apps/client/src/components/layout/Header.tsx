import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  ChevronDown, 
  Heart, 
  Settings, 
  Layers, 
  LogOut,
  UserPlus
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  savedCount: number;
  onSelectSaved: () => void;
  onNavigateSection: (sectionId: string) => void;
  isLoggedIn?: boolean;
  onOpenAuth?: (tab: 'login' | 'register') => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenSearch, 
  savedCount,
  onSelectSaved,
  onNavigateSection,
  isLoggedIn = false,
  onOpenAuth,
  onLogout
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Can optionally close or keep interactive
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#090d14]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-8">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/50 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Terminal className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1">
              Dev<span className="text-emerald-400">Folio</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button 
              onClick={() => onNavigateSection('projects')}
              className="px-3 py-1.5 rounded-lg text-white hover:text-emerald-400 hover:bg-white/[0.04] transition-colors"
            >
              Dự án
            </button>
            <button 
              onClick={() => onNavigateSection('about')}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              Về tôi
            </button>
            <button 
              onClick={() => onNavigateSection('docs')}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              Tài liệu & Blog
            </button>
            <button 
              onClick={() => onNavigateSection('contact')}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              Liên hệ
            </button>
          </nav>
        </div>

        {/* Right Controls: Search & User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger with Ctrl+K shortcut */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#111723]/90 hover:bg-[#161f30] text-slate-400 hover:text-slate-200 border border-white/[0.08] transition text-xs shadow-inner"
            title="Nhấn để tìm kiếm dự án"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Tìm kiếm...</span>
            <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] border border-white/[0.08] text-slate-300">
              Ctrl K
            </span>
          </button>

          {/* Guest Auth Buttons or Logged-in Profile */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAuth?.('login')}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition cursor-pointer"
              >
                Đăng nhập
              </button>

              <button
                type="button"
                onClick={() => onOpenAuth?.('register')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-950 bg-emerald-400 hover:bg-emerald-300 transition shadow-[0_0_16px_rgba(52,211,153,0.3)] flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Đăng ký</span>
              </button>
            </div>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#111723] hover:bg-[#172031] border border-white/[0.08] text-xs transition"
              >
                <span className="text-slate-200 font-medium hidden sm:inline">Alex Nguyen</span>
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-emerald-500/40">
                  <img 
                    src="/images/alex-avatar.jpg" 
                    alt="Alex Nguyen Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu Card */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0c111a]/95 border border-white/[0.1] shadow-2xl backdrop-blur-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* User Info Header */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-2">
                    <div className="relative">
                      <img 
                        src="/images/alex-avatar.jpg" 
                        alt="Alex Nguyen" 
                        className="w-10 h-10 rounded-full object-cover border border-emerald-500/40 shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0c111a] rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-xs truncate">Alex Nguyen</span>
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          PRO
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">@alexdev • alex@devfolio.io</p>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="space-y-0.5 text-xs text-slate-300">
                    <button 
                      onClick={() => {
                        onSelectSaved();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Heart className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span>Dự án đã lưu</span>
                      </div>
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-300">
                        {savedCount}
                      </span>
                    </button>

                    <button 
                      onClick={() => {
                        alert('Mở trang cài đặt tài khoản Alex Nguyen');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Cài đặt tài khoản</span>
                    </button>

                    <button 
                      onClick={() => {
                        alert('Chuyển hướng đến Admin Studio Portal');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Admin Studio</span>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        ADMIN PORTAL
                      </span>
                    </button>

                    <div className="my-1 border-t border-white/[0.06]" />

                    <button 
                      onClick={() => {
                        onLogout?.();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
