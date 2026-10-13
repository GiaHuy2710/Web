import React from 'react';
import { 
  FolderKanban, 
  User, 
  FileText, 
  Bot, 
  Mail, 
  Layers, 
  Terminal,
  X
} from 'lucide-react';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigateSection,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'projects', label: 'Dự án', icon: FolderKanban },
    { id: 'about', label: 'Về tôi', icon: User },
    { id: 'docs', label: 'Tài liệu & Blog', icon: FileText },
    { id: 'ai-assistant', label: 'Trợ lý AI', icon: Bot },
    { id: 'contact', label: 'Liên hệ', icon: Mail },
    { id: 'admin', label: 'Admin Studio', icon: Layers, isSpecial: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-72 max-w-[80vw] bg-[#090d16] border-r border-white/[0.08] p-5 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">
                Dev<span className="text-emerald-400">Folio</span>
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5 text-xs font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateSection(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold'
                      : item.isSpecial
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/25'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : item.isSpecial ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="text-[11px] text-slate-500 text-center border-t border-white/[0.05] pt-3">
          DevFolio Platform v2.4.0
        </div>
      </div>
    </div>
  );
};
