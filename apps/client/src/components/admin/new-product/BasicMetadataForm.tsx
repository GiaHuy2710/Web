import React, { useState } from 'react';
import { Sliders, CheckCircle2, Sparkles, Copy, Check, Plus, X } from 'lucide-react';

interface Props {
  name: string;
  setName: (v: string) => void;
  version: string;
  setVersion: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;
  summary: string;
  setSummary: (v: string) => void;
  techStacks: string[];
  setTechStacks: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BasicMetadataForm: React.FC<Props> = ({
  name,
  setName,
  version,
  setVersion,
  slug,
  setSlug,
  summary,
  setSummary,
  techStacks,
  setTechStacks,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const generateSlug = () => {
    const s = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(s || 'san-pham-moi');
  };

  const copySlug = () => {
    navigator.clipboard.writeText(`https://devfolio.io/software/${slug}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const removeTag = (tag: string) => {
    setTechStacks(prev => prev.filter(t => t !== tag));
  };

  const addTag = () => {
    if (tagInput.trim() && !techStacks.includes(tagInput.trim())) {
      setTechStacks(prev => [...prev, tagInput.trim()]);
      setTagInput('');
      setIsAddingTag(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-[#090e17] border border-white/[0.06] space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            2. Thông tin Cấu hình Cơ bản
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          METADATA_MANIFEST
        </span>
      </div>

      {/* Hàng 1: Tên & Phiên bản */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-300">
              Tên sản phẩm số <span className="text-emerald-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">Tối đa 60 ký tự</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: RustPulse CLI Monitor"
              className="w-full bg-[#0d1422] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 pr-10 transition font-medium"
            />
            <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="md:col-span-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-300">
              Phiên bản phát hành <span className="text-emerald-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">SemVer 2.0</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="v1.0.0"
              className="w-full bg-[#0d1422] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 pr-14 transition font-mono"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-slate-300">
              TAG
            </span>
          </div>
        </div>
      </div>

      {/* Hàng 2: SEO Slug */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-300">
            Đường dẫn truy cập định danh (SEO Slug)
          </label>
          <button
            type="button"
            onClick={generateSlug}
            className="text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tự sinh chuẩn SEO</span>
          </button>
        </div>

        <div className="flex items-center bg-[#0d1422] border border-white/[0.08] rounded-xl px-4 py-2 text-xs sm:text-sm font-mono text-slate-400">
          <span className="select-none text-slate-400">https://devfolio.io/software/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1 bg-transparent border-none text-emerald-400 focus:outline-none px-1 font-mono"
          />
          <button
            type="button"
            onClick={copySlug}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hàng 3: Mô tả tóm tắt */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-300">
            Mô tả tóm tắt (Card Summary hiển thị ngoài kho tải) <span className="text-emerald-400">*</span>
          </label>
          <span className={`text-[11px] font-mono ${summary.length > 140 ? 'text-rose-400' : 'text-slate-400'}`}>
            {summary.length} / 140 ký tự
          </span>
        </div>
        <textarea
          rows={2}
          value={summary}
          maxLength={140}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Nhập mô tả tóm tắt hiển thị ngoài danh sách..."
          className="w-full bg-[#0d1422] border border-white/[0.08] rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition leading-relaxed"
        />
      </div>

      {/* Hàng 4: Tech Stacks Tags */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-300">
            Công nghệ & Thư viện cốt lõi (Tech Stacks)
          </label>
          <span className="text-[11px] text-slate-400 font-mono">
            Đã chọn {techStacks.length} tags
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {techStacks.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-rose-400 transition cursor-pointer"
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            </span>
          ))}

          {isAddingTag ? (
            <div className="flex items-center gap-1.5 bg-[#0d1422] border border-emerald-500/40 rounded-xl px-2.5 py-1">
              <input
                type="text"
                autoFocus
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTag();
                  if (e.key === 'Escape') setIsAddingTag(false);
                }}
                placeholder="Tên công nghệ..."
                className="bg-transparent border-none text-xs text-white focus:outline-none w-28"
              />
              <button
                type="button"
                onClick={addTag}
                className="text-emerald-400 hover:text-emerald-300 text-xs font-bold"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setIsAddingTag(false)}
                className="text-slate-400 hover:text-rose-400 text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingTag(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-dashed border-white/[0.15] text-xs text-slate-400 hover:text-white transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm công nghệ...</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};