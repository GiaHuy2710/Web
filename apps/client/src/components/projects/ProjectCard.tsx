import React, { useState } from 'react';
import { Heart, Eye, ArrowUpRight, Code2, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../../types/project';

interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onToggleLike: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onSelectProject,
  onToggleLike
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group rounded-2xl bg-[#0d1320] border border-white/[0.08] hover:border-emerald-500/30 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)]">
      
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#070b12]">
        
        {/* Project Thumbnail Image */}
        <img 
          src={project.image} 
          alt={project.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1320] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges Area */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto z-10 gap-2">
          
          {/* Left Badge (Featured / Breadcrumb / Popular) */}
          <div className="flex items-center gap-1.5">
            {project.badgeType === 'featured' && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Featured
              </span>
            )}

            {project.badgeType === 'popular' && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 backdrop-blur-md flex items-center gap-1 shadow-sm">
                Popular
              </span>
            )}

            {project.badgeType === 'breadcrumb' && (
              <span className="px-2.5 py-1 rounded-md text-[9px] font-semibold tracking-wider uppercase bg-black/60 border border-white/10 text-slate-300 backdrop-blur-md">
                TRANG CHỦ — KHO DỰ ÁN & PORTFOLIO
              </span>
            )}
          </div>

          {/* Right Metrics Pill (Likes, Views) */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Like button / badge */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(project.id);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium backdrop-blur-md border transition-all ${
                project.isLiked
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-black/60 hover:bg-black/80 border-white/10 text-slate-300 hover:text-white'
              }`}
              title="Lưu dự án"
            >
              <Heart 
                className={`w-3 h-3 ${project.isLiked ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} 
              />
              <span>{project.likes} {project.badge ? 'Lưu' : ''}</span>
            </button>

            {/* Views badge (if available) */}
            {project.views && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-black/60 border border-white/10 backdrop-blur-md">
                <Eye className="w-3 h-3 text-slate-400" />
                <span>{project.views}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#141b2b] text-cyan-300/90 border border-white/[0.07]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onSelectProject(project)}
            className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          {/* View Details link */}
          <button
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition group/btn"
          >
            <span>Xem chi tiết</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          {/* Icon Actions (Code & Preview) */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectProject(project)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              title="Xem mã nguồn & thông số"
            >
              <Code2 className="w-4 h-4" />
            </button>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
              title="Mở demo trực tiếp"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
