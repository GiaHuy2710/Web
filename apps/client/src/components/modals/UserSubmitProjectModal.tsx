import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Terminal,
  Globe,
  Gamepad2,
  Cpu,
  CheckCircle2,
  Code2,
  Send,
} from 'lucide-react';
import { ProductRegistryItem, ProductCategory } from '../admin/products/types';

export interface UserSubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (newProject: ProductRegistryItem) => void;
}

export const UserSubmitProjectModal: React.FC<UserSubmitProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('web');
  const [version, setVersion] = useState('v1.0.0');
  const [techStackInput, setTechStackInput] = useState('TypeScript, React, Tailwind');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setName('');
    setCategory('web');
    setVersion('v1.0.0');
    setTechStackInput('TypeScript, React, Tailwind');
    setDemoUrl('');
    setGithubUrl('');
    setDescription('');
    setAuthorName('');
    setAuthorEmail('');
    setIsSuccess(false);
    setError(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên sản phẩm hoặc dự án.');
      return;
    }
    if (!description.trim()) {
      setError('Vui lòng nhập mô tả ngắn gọn về sản phẩm.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Xử lý tạo slug tự động
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const techStack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    let categoryLabel = 'Website & Web App';
    let categoryIcon: ProductRegistryItem['categoryIcon'] = 'web';
    if (category === 'cli') {
      categoryLabel = 'Công cụ & CLI';
      categoryIcon = 'terminal';
    } else if (category === 'game') {
      categoryLabel = 'Game & Creative';
      categoryIcon = 'game';
    }

    const newProduct: ProductRegistryItem = {
      id: `sub_${Date.now()}`,
      code: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      indexTag: 'Pending Review',
      name: name.trim(),
      slug: slug || `project-${Date.now()}`,
      category,
      categoryLabel,
      categoryIcon,
      techStack: techStack.length > 0 ? techStack : ['TypeScript'],
      version: version.trim() || 'v1.0.0',
      versionType: 'stable',
      downloads: '0',
      subStats: `Gửi bởi: ${authorName || 'Cộng tác viên'}`,
      status: 'pending',
      statusLabel: 'Chờ duyệt',
    };

    setTimeout(() => {
      try {
        // 1. Lưu vào danh sách sản phẩm ở trạng thái pending (Chờ duyệt)
        const rawProducts = localStorage.getItem('devfolio_products');
        const currentProducts: ProductRegistryItem[] = rawProducts ? JSON.parse(rawProducts) : [];
        currentProducts.unshift(newProduct);
        localStorage.setItem('devfolio_products', JSON.stringify(currentProducts));

        // 2. Ghi nhận nhật ký audit log cho ban quản trị
        try {
          const rawAudit = localStorage.getItem('devfolio_audit_logs');
          const currentAudit = rawAudit ? JSON.parse(rawAudit) : [];
          currentAudit.unshift({
            id: `audit_${Date.now()}`,
            timestamp: new Date().toISOString(),
            timeFormatted: 'Vừa xong',
            actor: authorName ? `${authorName} (Đóng góp)` : 'Người dùng vãng lai',
            action: `Gửi dự án mới chờ duyệt: ${newProduct.name}`,
            category: 'submission',
            severity: 'info',
            details: `Phân loại: ${categoryLabel} • Phiên bản: ${newProduct.version} • Email: ${authorEmail || 'Chưa cung cấp'}`,
          });
          localStorage.setItem('devfolio_audit_logs', JSON.stringify(currentAudit));
        } catch {
          // ignore
        }

        // Phát sự kiện đồng bộ
        window.dispatchEvent(new Event('devfolio_products_updated'));
        window.dispatchEvent(new Event('devfolio_audit_updated'));

        if (onSubmitSuccess) {
          onSubmitSuccess(newProduct);
        }

        setIsSubmitting(false);
        setIsSuccess(true);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
        setError('Có lỗi khi lưu dữ liệu. Vui lòng thử lại!');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-3xl bg-[#090e17] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0b121f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Đóng góp dự án & Sản phẩm mới</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Community
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Gửi công cụ hoặc ứng dụng của bạn lên cộng đồng DevFolio để ban quản trị kiểm duyệt
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)] animate-in zoom-in duration-300">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Gửi dự án thành công!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Cảm ơn bạn đã đóng góp <span className="text-emerald-400 font-bold">{name}</span>! Dự án đã được chuyển vào hàng đợi kiểm duyệt và sẽ tự động xuất hiện trên trang chủ ngay sau khi Ban quản trị phê duyệt.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
              >
                Hoàn tất & Quay lại
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* 1. Phân loại sản phẩm */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                1. Phân loại sản phẩm <span className="text-emerald-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setCategory('web')}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                    category === 'web'
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'bg-[#0f1624] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-xs text-white">Web App & SaaS</span>
                  <span className="text-[10px] text-slate-400">Ứng dụng web, SaaS, PWA</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('cli')}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                    category === 'cli'
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'bg-[#0f1624] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-xs text-white">Công cụ & CLI</span>
                  <span className="text-[10px] text-slate-400">CLI tool, DevTools, Script</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('game')}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                    category === 'game'
                      ? 'bg-purple-500/10 border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                      : 'bg-[#0f1624] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-xs text-white">Game & Creative</span>
                  <span className="text-[10px] text-slate-400">Indie game, WebGL, WASM</span>
                </button>
              </div>
            </div>

            {/* 2. Tên & Phiên bản */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Tên sản phẩm / Dự án <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Synapse AI Studio, DevMetrics CLI..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Phiên bản
                </label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="v1.0.0"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition font-mono"
                />
              </div>
            </div>

            {/* 3. Tech Stack */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>Công nghệ / Tech Stack (phân cách bằng dấu phẩy)</span>
                <span className="text-[10px] text-slate-400 font-mono">React, TypeScript, Rust...</span>
              </label>
              <div className="relative">
                <Code2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="TypeScript, React, Node.js, Docker, WebGL"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition"
                />
              </div>
            </div>

            {/* 4. Link Demo & GitHub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Demo trực tiếp / Live Website (Optional)</span>
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://myproject.dev"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GitHub / Repo công khai (Optional)</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition font-mono text-[11px]"
                />
              </div>
            </div>

            {/* 5. Mô tả ngắn */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Mô tả ngắn gọn & Điểm nổi bật <span className="text-emerald-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tóm tắt công năng chính của sản phẩm, giải quyết vấn đề gì cho lập trình viên hoặc người dùng..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition resize-none leading-relaxed"
              />
            </div>

            {/* 6. Thông tin người gửi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.05]">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Họ tên hoặc Nickname tác giả
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="VD: Alex Nguyen"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Email liên hệ nhận kết quả duyệt
                </label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="author@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1624] border border-white/[0.08] text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trạng thái sau khi gửi: <strong>Chờ kiểm duyệt</strong></span>
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition cursor-pointer"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_20px_rgba(52,211,153,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi kiểm duyệt ngay</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
