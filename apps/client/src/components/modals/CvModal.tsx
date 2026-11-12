import React, { useState, useEffect } from 'react';
import { X, Download, Mail, MapPin } from 'lucide-react';
import { authApi } from '../../shared/api/auth.api';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState<{
    fullName: string;
    headline: string;
    email: string;
    location: string;
    bio: string;
    avatarUrl: string;
  }>(() => {
    const user = authApi.getCurrentUser();
    return {
      fullName: user?.fullName || 'Chưa đăng nhập',
      headline: user?.role === 'ADMIN' ? 'Quản trị viên hệ thống' : 'Thành viên DevFolio',
      email: user?.email || '',
      location: '',
      bio: 'Chưa cập nhật thông tin giới thiệu cá nhân.',
      avatarUrl: user?.avatarUrl || '',
    };
  });

  useEffect(() => {
    if (!isOpen) return;
    const currentUser = authApi.getCurrentUser(); if (!currentUser?.id) return; fetch(`/api/profiles/${currentUser.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data) {
          setProfile((prev) => ({
            ...prev,
            ...data.data,
          }));
        }
      })
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#0d131f] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-white/[0.07] pb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg shrink-0 bg-[#080d16] flex items-center justify-center font-bold text-emerald-400 text-lg">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
            ) : (
              profile.fullName.substring(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{profile.fullName}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {profile.headline}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {profile.location}</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {profile.email}</span>
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Tóm tắt năng lực & Kỹ thuật</h4>
          <p>{profile.bio}</p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
            <span className="font-bold text-slate-200">Frontend & Client:</span>
            <p className="text-slate-400 text-[11px]">React, TypeScript, TailwindCSS, Next.js, WebAssembly.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
            <span className="font-bold text-slate-200">Backend & Cloud:</span>
            <p className="text-slate-400 text-[11px]">Go, Node.js/Express, Docker, PostgreSQL, Redis, Edge CDN.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-slate-400">Định dạng: Profile_CV_2026.pdf</span>
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert(`Đang tải xuống bộ tài liệu & CV của ${profile.fullName}...`);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Tải tài liệu / CV</span>
          </a>
        </div>
      </div>
    </div>
  );
};
