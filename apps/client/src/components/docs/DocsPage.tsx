import React, { useState, useMemo, useEffect } from 'react';
import { apiClient } from '../../shared/api';
import { 
  Search, 
  Calendar, 
  Clock, 
  Bookmark, 
  ArrowRight, 
  Rss, 
  ChevronDown, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';
 

interface ArticleItem {
  id: string;
  badge: string;
  badgeCategory: 'backend' | 'frontend' | 'ai' | 'database' | 'saas' | 'rust';
  title: string;
  date: string;
  readTime: string;
  desc: string;
  tags: string[];
  image: string;
  category: 'all' | 'ai-rag' | 'architecture' | 'frontend' | 'devops' | 'indie';
  isBookmarked?: boolean;
}

export const DocsPage: React.FC = () => {

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai-rag' | 'architecture' | 'frontend' | 'devops' | 'indie'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'readTime'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Selected article for reading modal
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  // Kéo dữ liệu từ API hoặc đồng bộ storage
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  // Tải danh sách bài viết từ backend khi mở trang.
  useEffect(() => {
    let cancelled = false;

    const loadArticles = async () => {
      setIsLoadingArticles(true);
      setArticlesError(null);

      try {
        const response = await apiClient.get('/docs');
        if (!cancelled) {
          setArticles(response.data?.data ?? []);
        }
      } catch {
        if (!cancelled) {
          setArticlesError('Không thể tải tài liệu.');
        }
      } finally {
        if (!cancelled) setIsLoadingArticles(false);
      }
    };

    void loadArticles();

    return () => {
      cancelled = true;
    };
  }, []);

  // Danh mục phân loại tính toán động
  const categories = useMemo(() => [
    { id: 'all' as const, label: 'Tất cả', count: articles.length },
    { id: 'ai-rag' as const, label: 'AI & RAG', count: articles.filter(a => a.category === 'ai-rag').length },
    { id: 'architecture' as const, label: 'System Architecture', count: articles.filter(a => a.category === 'architecture').length },
    { id: 'frontend' as const, label: 'Frontend & WebGL', count: articles.filter(a => a.category === 'frontend').length },
    { id: 'devops' as const, label: 'DevOps & Edge', count: articles.filter(a => a.category === 'devops').length },
    { id: 'indie' as const, label: 'Indie Hacking', count: articles.filter(a => a.category === 'indie').length }
  ], [articles]);

  // Bài viết nổi bật (lấy bài đầu tiên nếu có)
  const featuredArticle = articles.length > 0 ? articles[0] : null;

  // Lọc bài viết
  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [articles, searchQuery, activeCategory]);

  const pageSize = 6;
  const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubscribeNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;

    try {
      await fetch('/api/home/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });
    } catch {
      // offline fallback
    }

    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 font-sans pb-16">
      
      {/* 1. Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
            PUBLICATIONS & ENGINEERING LOGS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tài liệu & Blog Kỹ thuật
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Nơi ghi chép các phân tích sâu về kiến trúc hệ thống, kinh nghiệm tối ưu hóa cơ sở dữ liệu lớn và chia sẻ mã nguồn thực chiến.
          </p>
        </div>
      </div>

      {/* 2. Controls Toolbar & Tabs Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Ô Tìm Kiếm */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết theo từ khóa, công nghệ, tag..."
              className="w-full pl-10 pr-16 py-3 rounded-xl bg-[#0a0f16] border border-[#1b2636] text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition font-sans"
            />
            {searchQuery && (
              <span 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </span>
            )}
          </div>

          {/* Sắp xếp Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'readTime')}
              className="appearance-none bg-[#0a0f16] border border-[#1b2636] rounded-xl pl-4 pr-9 py-3 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-emerald-500 transition cursor-pointer"
            >
              <option value="newest">Sắp xếp: Mới nhất</option>
              <option value="popular">Sắp xếp: Phổ biến nhất</option>
              <option value="readTime">Sắp xếp: Thời gian đọc</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Nút RSS Feed */}
          <button
            type="button"
            onClick={() => alert('Đã sao chép link RSS Feed: https://devfolio.co/feed.xml')}
            className="p-3 bg-[#0a0f16] hover:bg-[#121c27] border border-[#1b2636] rounded-xl text-slate-400 hover:text-emerald-400 transition cursor-pointer flex items-center justify-center shrink-0"
            title="Đăng ký nhận tin qua RSS Feed"
          >
            <Rss className="w-4 h-4" />
          </button>
        </div>

        {/* Hàng Tabs Danh Mục (Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : 'bg-[#0a0f16] border border-[#1a2535] text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono ${
                activeCategory === cat.id ? 'text-slate-900 font-bold' : 'text-slate-500'
              }`}>
                ({cat.count})
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* 3. Bài Viết Nổi Bật (Chỉ hiển thị khi có bài) */}
      {featuredArticle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <div 
            onClick={() => setReadingArticle(featuredArticle)}
            className="rounded-3xl bg-[#090e15] border border-[#1b2737] hover:border-emerald-500/40 transition-all cursor-pointer overflow-hidden shadow-2xl group grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 bg-[#060a10] border-b lg:border-b-0 lg:border-r border-[#17222f] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  Featured
                </span>
                <span>{featuredArticle.date}</span>
              </div>

              <div className="relative z-10 my-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                  {featuredArticle.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span>Đọc bài phân tích</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/40">
                <img 
                  src={featuredArticle.image || '/images/synapse-ai.jpg'} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {featuredArticle.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Danh Sách Bài Viết Kỹ Thuật */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Bài viết Kỹ thuật
            </h3>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Hiển thị {filteredArticles.length} bài viết
          </span>
        </div>

        {isLoadingArticles ? (
          <div className="py-16 text-center text-slate-400">Đang tải tài liệu...</div>
        ) : articlesError ? (
          <div role="alert" className="py-16 text-center text-rose-300">{articlesError}</div>
        ) : filteredArticles.length === 0 ? (
          /* Trạng thái trống sạch */
          <div className="py-20 px-4 rounded-3xl bg-[#090e15] border border-dashed border-[#1b2737] flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">Chưa có bài viết hoặc tài liệu kỹ thuật nào</h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Kho tài liệu đang ở trạng thái sạch. Khi bạn hoặc ban quản trị đăng tải bài viết qua API hoặc Admin Studio, các ấn phẩm sẽ tự động xuất hiện tại đây.
            </p>
          </div>
        ) : (
          /* Grid Thẻ Bài Viết */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setReadingArticle(art)}
                className="group p-4 rounded-2xl bg-[#090e15] hover:bg-[#0d141e] border border-[#172332] hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/50 mb-4">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-cyan-300">
                      {art.badge}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(art.id, e)}
                      className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition cursor-pointer ${
                        bookmarkedIds.has(art.id)
                          ? 'bg-emerald-500/30 border-emerald-500/50 text-emerald-300'
                          : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.has(art.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {art.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {art.readTime}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2 mb-2">
                    {art.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {art.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.05] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 truncate">
                    {art.tags.map((t, idx) => (
                      <span key={idx} className="hover:text-slate-300">{t}</span>
                    ))}
                  </div>

                  <div className="text-emerald-400 group-hover:translate-x-1 transition-transform font-medium flex items-center gap-1 shrink-0">
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* 5. Phân Trang (Chỉ hiện khi có bài) */}
      {filteredArticles.length > 0 && totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            Trang {currentPage} trên {totalPages} (Tổng {filteredArticles.length} ấn phẩm)
          </div>

          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="p-2 rounded-lg bg-[#0a0f16] border border-[#1b2636] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-2 rounded-lg bg-[#0a0f16] border border-[#1b2636] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg font-bold transition cursor-pointer ${
                  currentPage === page
                    ? 'bg-emerald-400 text-slate-950 font-bold'
                    : 'bg-[#0a0f16] border border-[#1b2636] text-slate-400 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="p-2 rounded-lg bg-[#0a0f16] border border-[#1b2636] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="p-2 rounded-lg bg-[#0a0f16] border border-[#1b2636] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 6. Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#090e15] border border-[#1a2636] shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              DevFolio Dispatch Weekly
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Nhận tóm tắt kiến trúc &amp; code snippet mới vào thứ Hai
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Không spam. Không bài viết tiếp thị. Phân tích hiệu năng, bài học tối ưu hạ tầng thực tế và công nghệ hệ thống.
            </p>
          </div>

          <div className="w-full lg:w-[460px] space-y-3">
            {isSubscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cảm ơn bạn! Bản tin kiến trúc tuần tới sẽ được gửi tới bạn.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribeNewsletter} className="flex items-center gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="nhap.email.cua.ban@congty.com"
                  className="flex-1 bg-[#060a10] border border-[#1b2636] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-inner"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-[0_0_20px_rgba(52,211,153,0.3)] shrink-0 cursor-pointer"
                >
                  <span>Đăng ký</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Cập nhật qua API Server Backend.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Modal khi bấm vào bài viết */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="fixed inset-0" onClick={() => setReadingArticle(null)} />
          <div className="relative z-10 w-full max-w-3xl bg-[#0a0f16] border border-[#1f2d3e] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {readingArticle.badge}
              </span>
              <button 
                onClick={() => setReadingArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {readingArticle.title}
            </h2>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>{readingArticle.date}</span>
              <span>•</span>
              <span>{readingArticle.readTime}</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {readingArticle.desc}
            </p>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setReadingArticle(null)}
                className="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Đóng bài đọc
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
