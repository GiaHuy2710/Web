import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Star } from 'lucide-react';
import { ProjectItem } from '../../types/project';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c111a] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Preview Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c111a] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              {project.category}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/60 px-3 py-1 rounded-md backdrop-blur-md border border-white/10">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{project.details.stars}</span>
            </div>
          </div>
        </div>

        {/* Title and Tech Badges */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.map((tech, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#141b2b] text-cyan-300 border border-white/[0.08]">
                {tech}
              </span>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
          
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.details.longDescription}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="space-y-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Điểm nổi bật về mặt kỹ thuật
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {project.details.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture details */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kiến trúc công nghệ:</span>
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-cyan-300">
            {project.details.architecture}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06]">
          <span className="text-xs text-slate-500 font-mono">Phiên bản hiện tại: {project.details.version}</span>
          
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141b29] hover:bg-[#1c263a] text-slate-200 text-xs font-medium border border-white/[0.1] transition"
            >
              <Github className="w-4 h-4" />
              <span>Xem GitHub Repo</span>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20"
            >
              <span>Trải nghiệm Demo</span>
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
