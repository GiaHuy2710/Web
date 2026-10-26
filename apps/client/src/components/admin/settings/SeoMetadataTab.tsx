import React, { useState } from 'react';
import {
  Sliders,
  Globe,
  Upload,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { WebsiteSeoConfig } from './types';

interface SeoMetadataTabProps {
  config: WebsiteSeoConfig;
  onChangeConfig: (newConfig: WebsiteSeoConfig) => void;
  onOpenPurgeModal: () => void;
  onShowToast: (msg: string) => void;
}

export const SeoMetadataTab: React.FC<SeoMetadataTabProps> = ({
  config,
  onChangeConfig,
  onOpenPurgeModal,
  onShowToast,
}) => {
  const [newTagInput, setNewTagInput] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      const cleanTag = newTagInput.trim().replace(/^#/, '');
      if (!config.keywords.includes(cleanTag)) {
        onChangeConfig({
          ...config,
          keywords: [...config.keywords, cleanTag],
        });
        onShowToast(`Đã thêm từ khóa #${cleanTag}`);
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChangeConfig({
      ...config,
      keywords: config.keywords.filter((t) => t !== tagToRemove),
    });
    onShowToast(`Đã xóa từ khóa #${tagToRemove}`);
  };

  const descLength = config.metaDescription.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 2-Column Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Configuration Forms (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CARD 1: Thông số Portfolio & Metadata Core */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0b101b] border border-white/[0.08] space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm tracking-tight">
                  Thông số Portfolio & Metadata Core
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-400 tracking-wider bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                GLOBAL HEADERS
              </span>
            </div>

            {/* Field 1: Brand Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                <span>TÊN WEBSITE (BRAND TITLE)</span>
                <span className="text-slate-500 font-normal">ĐỘ DÀI KHUYẾN NGHỊ: 10-30 KÝ TỰ</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={config.brandTitle}
                  onChange={(e) =>
                    onChangeConfig({ ...config, brandTitle: e.target.value })
                  }
                  placeholder="DevFolio — Alex Nguyen"
                  className="w-full px-3.5 py-2.5 pr-14 rounded-xl bg-[#060a12] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition font-medium"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.06]">
                  UTF-8
                </span>
              </div>
            </div>

            {/* Field 2 & 3: Meta Page Title & Custom Domain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  META PAGE TITLE
                </label>
                <input
                  type="text"
                  value={config.metaPageTitle}
                  onChange={(e) =>
                    onChangeConfig({ ...config, metaPageTitle: e.target.value })
                  }
                  placeholder="Alex Nguyen | Senior Staff Fullstack"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  CUSTOM DOMAIN (CNAME)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.customDomain}
                    onChange={(e) =>
                      onChangeConfig({ ...config, customDomain: e.target.value })
                    }
                    placeholder="https://portfolio.alexnguyen.dev"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-xs font-mono text-cyan-400 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition"
                  />
                </div>
              </div>
            </div>

            {/* Field 4: Meta Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                <span>MÔ TẢ SEO MẶC ĐỊNH (META DESCRIPTION)</span>
                <span
                  className={`font-mono text-[11px] ${
                    descLength > 160 ? 'text-amber-400 font-bold' : 'text-emerald-400'
                  }`}
                >
                  {descLength} / 160 ký tự
                </span>
              </div>
              <textarea
                rows={3}
                value={config.metaDescription}
                onChange={(e) =>
                  onChangeConfig({ ...config, metaDescription: e.target.value })
                }
                placeholder="Nhập mô tả tóm tắt website hiển thị trên công cụ tìm kiếm và mạng xã hội..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition leading-relaxed resize-none"
              />
            </div>

            {/* Field 5: Keywords Indexing */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                TỪ KHÓA PHÂN LOẠI (KEYWORDS INDEXING)
              </label>
              <div className="p-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] flex flex-wrap items-center gap-2">
                {config.keywords.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111927] border border-cyan-500/30 text-cyan-300 text-xs font-mono group hover:border-rose-500/40 transition"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-slate-400 hover:text-rose-400 cursor-pointer ml-0.5"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="+ Thêm thẻ mới (Enter)..."
                  className="px-2 py-1 bg-transparent text-xs text-slate-300 placeholder-slate-500 focus:outline-none min-w-[140px] flex-1"
                />
              </div>
            </div>
          </div>

          {/* CARD 2: Đồ họa thương hiệu & Social Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0b101b] border border-white/[0.08] space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-white text-sm tracking-tight">
                Đồ họa thương hiệu & Social Card
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Left Favicon preview (4 cols) */}
              <div className="sm:col-span-4 p-3.5 rounded-xl bg-[#060a12] border border-white/[0.06] flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0e1726] border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
                  <Terminal className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    FAVICON (SVG / PNG)
                  </div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">
                    {config.faviconName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {config.faviconSize}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onShowToast('Mở hộp thoại chọn tệp Favicon SVG vector mới...')
                    }
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-semibold mt-0.5 inline-block cursor-pointer"
                  >
                    Thay đổi
                  </button>
                </div>
              </div>

              {/* Right Social Preview (8 cols) */}
              <div className="sm:col-span-8 p-3 rounded-xl bg-[#060a12] border border-white/[0.06] flex flex-col justify-between relative overflow-hidden group">
                <div className="relative h-24 rounded-lg bg-gradient-to-br from-[#0c1e34] via-[#091526] to-[#040811] border border-white/[0.08] overflow-hidden flex items-center justify-between px-4">
                  {/* Subtle code pattern */}
                  <div className="space-y-1 font-mono text-[9px] text-emerald-400/70 select-none">
                    <div>{'>'} const DevFolio = new Engine();</div>
                    <div>{'>'} cluster.deploy('edge-v2.4');</div>
                    <div className="text-cyan-300 font-bold text-sm tracking-tight mt-1">
                      DevFolio Architecture
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onShowToast('Mở trình tải lên hình ảnh Social Card 1200x630...')
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Tải lên mới</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-2 px-1">
                  <span className="text-white font-semibold">{config.ogImageName}</span>
                  <span>{config.ogImageSize}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Realtime Live Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0b101b] border border-white/[0.08] space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-bold text-cyan-300 font-mono tracking-tight">
                  XEM TRƯỚC THỜI GIAN THỰC (LIVE PREVIEW)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                SERP & OpenGraph
              </span>
            </div>

            {/* 1. Google SERP Preview */}
            <div className="p-3.5 rounded-xl bg-[#060a12] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{config.customDomain}</span>
              </div>
              <div className="text-sm font-semibold text-[#8ab4f8] hover:underline cursor-pointer truncate">
                {config.metaPageTitle || 'Alex Nguyen | Senior Staff Fullstack Architect'}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {config.metaDescription ||
                  'Không gian chia sẻ kiến trúc hệ thống phân tán, các dự án mã nguồn mở hiệu năng cao...'}
              </p>
            </div>

            {/* 2. OpenGraph Card Preview */}
            <div className="rounded-xl bg-[#060a12] border border-white/[0.06] overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-slate-900 border-b border-white/[0.06] relative p-3 flex flex-col justify-between">
                <span className="self-start text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                  og:image ready
                </span>
                <div className="text-right">
                  <span className="font-bold text-white text-lg tracking-tight drop-shadow-md">
                    {config.brandTitle}
                  </span>
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                  {config.customDomain.replace(/^https?:\/\//, '').toUpperCase()}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {config.brandTitle}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {config.metaDescription}
                </div>
              </div>
            </div>

            {/* 3. SSL / TLS Status */}
            <div className="p-3.5 rounded-xl bg-[#060a12] border border-emerald-500/20 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Chứng chỉ SSL / TLS Tự Động</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-normal">Active</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Khóa Let’s Encrypt Wildcard tự gia hạn còn 82 ngày hiệu lực. HTTP/3 QUIC được kích hoạt sẵn.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Vùng nguy hiểm (Danger Zone) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0b101b] border border-rose-500/20 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="font-bold text-white text-sm">
                Vùng nguy hiểm (Danger Zone)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các thao tác ảnh hưởng trực tiếp đến người xem và hạ tầng mạng toàn cầu.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
            HIGH PRIVILEGE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Danger Card 1: Purge CDN Cache */}
          <div className="p-4 rounded-xl bg-[#060a12] border border-white/[0.06] flex flex-col justify-between space-y-3">
            <div>
              <div className="font-bold text-white text-xs">
                Xóa toàn bộ Cache CDN (Purge Edge Cache)
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Làm rỗng các bản lưu tĩnh trên 280+ điểm PoP Edge Cloudflare. Traffic kế tiếp sẽ truy xuất trực tiếp vào server gốc.
              </p>
            </div>

            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Thời gian xử lý: <span className="text-slate-300 font-semibold">~2.4s</span>
              </span>
              <button
                type="button"
                onClick={onOpenPurgeModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#221018] hover:bg-[#321322] border border-rose-500/40 text-rose-300 text-xs font-semibold transition cursor-pointer shadow-[0_0_12px_rgba(244,63,94,0.2)]"
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Xóa Cache Toàn Cầu</span>
              </button>
            </div>
          </div>

          {/* Danger Card 2: Chế độ bảo trì & Khóa bình luận */}
          <div className="p-4 rounded-xl bg-[#060a12] border border-white/[0.06] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-xs">
                  Chế độ bảo trì & Khóa bình luận mới
                </div>
                {/* Interactive Toggle Switch */}
                <button
                  type="button"
                  onClick={() => {
                    const nextMode = !config.maintenanceMode;
                    onChangeConfig({ ...config, maintenanceMode: nextMode });
                    onShowToast(
                      nextMode
                        ? 'Đã kích hoạt chế độ bảo trì hệ thống (Maintenance 503)!'
                        : 'Đã tắt bảo trì, hệ thống hoạt động bình thường.'
                    );
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    config.maintenanceMode ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      config.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Khi bật, tất cả form bình luận, gửi tin nhắn liên hệ và API tương tác từ khách sẽ tạm đóng để chống spam.
              </p>
            </div>

            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    config.maintenanceMode
                      ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                      : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                  }`}
                />
                <span
                  className={
                    config.maintenanceMode ? 'text-amber-300 font-medium' : 'text-emerald-400 font-medium'
                  }
                >
                  {config.maintenanceMode
                    ? 'Đang bật chế độ bảo trì'
                    : 'Trạng thái: Hoạt động bình thường'}
                </span>
              </div>
              <span className="text-slate-500">
                {config.maintenanceMode ? 'HTTP 503 Maintenance' : 'HTTP 200 Live'}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
