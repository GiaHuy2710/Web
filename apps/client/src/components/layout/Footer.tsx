import React from 'react';
import { Terminal, Github, Twitter, Linkedin, Rss } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.07] bg-[#070a0f] pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Logo & Description */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                Dev<span className="text-emerald-400">Folio</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Không gian lưu trữ dự án, mã nguồn mở và kiến trúc phần mềm kỹ thuật cao.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-xs font-medium text-slate-400">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="#rss" 
              onClick={(e) => { e.preventDefault(); alert('RSS Feed: https://devfolio.io/feed.xml'); }}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Rss className="w-3.5 h-3.5" />
              <span>RSS Feed</span>
            </a>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All systems operational</span>
          </div>

          {/* Copyright */}
          <div className="text-slate-400 font-normal">
            © 2026 DevFolio. Crafted with precision & code.
          </div>

        </div>

      </div>
    </footer>
  );
};
