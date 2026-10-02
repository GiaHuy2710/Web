import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  Rss, 
  ChevronDown, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
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

  // Danh mục phân loại
  const categories = [
    { id: 'all', label: 'Tất cả', count: 28 },
    { id: 'ai-rag', label: 'AI & RAG', count: 8 },
    { id: 'architecture', label: 'System Architecture', count: 6 },
    { id: 'frontend', label: 'Frontend & WebGL', count: 5 },
    { id: 'devops', label: 'DevOps & Edge', count: 5 },
    { id: 'indie', label: 'Indie Hacking', count: 4 }
  ] as const;

  // Bài viết nổi bật (Featured Article)
  const featuredArticle = {
    id: 'featured-rag',
    title: 'Xây dựng hệ thống Hybrid RAG đa ngữ cho Monorepo 500k LOC với Qdrant và Rust',
    date: '28/02/2025',
    readTime: '12 phút đọc',
    desc: 'Khảo sát thực chiến việc kết hợp Sparse (BM25) và Dense vectors thông qua Qdrant, tối ưu hóa context retrieval tốc độ cao cho codebase quy mô lớn với bộ parse AST viết bằng Rust chạy song song.',
    retrievalAccuracy: '+38.4%',
    vectorLatency: '34.2ms p99',
    embeddingDim: '1,536 dens',
    author: 'Alex Nguyen',
    authorAvatar: '/images/alex-avatar.jpg'
  };

  // Danh sách các bài viết kỹ thuật
  const allArticles: ArticleItem[] = [
    {
      id: 'sse-websockets',
      badge: 'Backend | Go',
      badgeCategory: 'backend',
      title: 'Tối ưu hóa Server-Sent Events và WebSockets trong kiến trúc...',
      date: '15/02/2025',
      readTime: '9 phút đọc',
      desc: 'Chiến lược quản lý 100,000 persistent connections trên Go goroutine worker pools kết hợp Redis Pub/Sub giải quyết triệt để vấn đề rò rỉ socket descriptor.',
      tags: ['#golang', '#networking'],
      image: '/images/devpulse.jpg',
      category: 'architecture'
    },
    {
      id: 'design-system-oklch',
      badge: 'Frontend | UI',
      badgeCategory: 'frontend',
      title: 'Thiết kế Design System với Tailwind CSS và OKLCH Color Space',
      date: '10/02/2025',
      readTime: '6 phút đọc',
      desc: 'Tạo bảng màu dark mode với tỷ lệ tương phản đồng nhất chuẩn WCAG AAA thông qua perceptually uniform space, loại bỏ hoàn toàn hiện tượng lệch độ sáng tự nhiên.',
      tags: ['#tailwind', '#design-system'],
      image: '/images/chromapalette.jpg',
      category: 'frontend'
    },
    {
      id: 'local-llm-rtx4090',
      badge: 'AI | Infra',
      badgeCategory: 'ai',
      title: 'Triển khai Local LLM Inference với Ollama và llama.cpp trên GPU RTX 4090',
      date: '04/02/2025',
      readTime: '10 phút đọc',
      desc: 'Setup pipeline suy luận DeepSeek-R1 & Llama 3 70B quant 4-bit, đạt 48 tokens/sec an toàn tuyệt đối về dữ liệu mã nguồn nội bộ mà không cần thuê dGPU cloud đắt đỏ.',
      tags: ['#ollama', '#self-hosted'],
      image: '/images/synapse-ai.jpg',
      category: 'ai-rag'
    },
    {
      id: 'pg-repack-zero-downtime',
      badge: 'Database | DevOps',
      badgeCategory: 'database',
      title: 'Zero-Downtime Database Migration trên PostgreSQL với pg_repack',
      date: '28/01/2025',
      readTime: '8 phút đọc',
      desc: 'Giải phóng 180GB table bloat và tái cấu trúc primary keys cho bảng 80 triệu dòng mà không giữ Exclusive Table Lock, đảm bảo 99.999% SLA cho thanh toán.',
      tags: ['#postgresql', '#perf'],
      image: '/images/pixelforge.jpg',
      category: 'devops'
    },
    {
      id: 'open-core-2000-mrr',
      badge: 'Indie Hacker | SaaS',
      badgeCategory: 'saas',
      title: 'Kinh nghiệm kiếm $2,000 MRR đầu tiên từ công cụ lập trình SaaS mã nguồn mở',
      date: '19/01/2025',
      readTime: '7 phút đọc',
      desc: 'Mô hình Open-core, kỹ thuật Product-Led Growth trên GitHub Discussions, và cách định giá gói trả phí nhắm thẳng vào khách hàng doanh nghiệp Tech Lead.',
      tags: ['#bootstrap', '#saas'],
      image: '/images/markdownx.jpg',
      category: 'indie'
    },
    {
      id: 'tree-sitter-ast-rust',
      badge: 'Rust | Compiler',
      badgeCategory: 'rust',
      title: 'Phân tích cú pháp AST nhanh gấp 10 lần bằng Tree-sitter và Rust',
      date: '11/01/2025',
      readTime: '11 phút đọc',
      desc: 'Tận dụng incremental parsing của Tree-sitter để xây dựng static code analyzer tùy chỉnh phân tích quan hệ gọi hàm đa file trong chưa đầy 12ms.',
      tags: ['#rust', '#ast', '#compiler'],
      image: '/images/docuflow.jpg',
      category: 'architecture'
    }
  ];

  // Lọc và tìm kiếm bài viết
  const filteredArticles = useMemo(() => {
    return allArticles.filter(art => {
      const matchCat = activeCategory === 'all' || art.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [allArticles, activeCategory, searchQuery]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 font-sans pb-16">
      
      {/* 1. Header Banner & Slogan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        
        {/* Nhãn Dev Journal */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DEV_JOURNAL // REPOSITORY_DOCS</span>
        </div>

        {/* Tiêu đề & Giới thiệu */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Tài liệu &amp; Kỹ thuật chuyên sâu
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Các bài viết phân tích kiến trúc vi dịch vụ, nghiên cứu Hybrid RAG &amp; Local LLM, tối ưu hóa runtime hiệu năng cao và hành trình tạo doanh thu SaaS cho indie developers.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0 pb-1">
            <span className="font-semibold text-white">28 ấn phẩm kỹ thuật</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">100% Open Source code</span>
          </div>
        </div>

      </div>

      {/* 2. Toolbar: Tìm kiếm, Sắp xếp & Tabs phân loại */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 space-y-4">
        
        {/* Hàng Search Bar + Sort Dropdown + RSS Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Ô tìm kiếm */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo từ khóa, kiến trúc, thư viện (vd: RAG, Rust, WebSockets)..."
              className="w-full bg-[#0a0f16] border border-[#1b2636] rounded-xl pl-11 pr-14 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-inner"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                ESC
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
              onClick={() => setActiveCategory(cat.id)}
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

      {/* 3. Bài Viết Nổi Bật (Featured Article Showcase) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div 
          onClick={() => setReadingArticle({
            id: featuredArticle.id,
            badge: 'AI & RAG',
            badgeCategory: 'ai',
            title: featuredArticle.title,
            date: featuredArticle.date,
            readTime: featuredArticle.readTime,
            desc: featuredArticle.desc,
            tags: ['#qdrant', '#rust', '#hybrid-rag', '#bm25'],
            image: '/images/synapse-ai.jpg',
            category: 'ai-rag'
          })}
          className="rounded-3xl bg-[#090e15] border border-[#1b2737] hover:border-emerald-500/40 transition-all cursor-pointer overflow-hidden shadow-2xl group grid grid-cols-1 lg:grid-cols-12"
        >
          
          {/* Cột Trái: Đồ thị / Sơ đồ Kiến trúc AI Pipeline */}
          <div className="lg:col-span-7 bg-[#060a10] border-b lg:border-b-0 lg:border-r border-[#17222f] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Hiệu ứng hào quang xanh */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                DevFolio Articles
              </span>
              <div className="flex items-center gap-3">
                <span className="hover:text-white">Dashboard</span>
                <span className="hover:text-white">Documentation</span>
                <span className="hover:text-white">Search</span>
              </div>
            </div>

            {/* Sơ đồ Flow trực quan */}
            <div className="relative z-10 my-8 space-y-4">
              <div className="p-4 rounded-2xl bg-[#0d141e]/90 border border-[#1b2737] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>AI Pipeline Architecture</span>
                  <span className="text-emerald-400">STATUS: ACTIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="p-2 rounded bg-black/40 border border-white/5">Query Embedding</div>
                  <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">Semantic Search</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">Context Merging</div>
                  <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">Live Synthesis</div>
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật chân card */}
            <div className="relative z-10 flex items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-[#0c131d] border border-[#1e2d3e]">
                <div className="text-[10px] text-slate-500">VECTOR LATENCY</div>
                <div className="font-bold text-emerald-400">{featuredArticle.vectorLatency}</div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-[#0c131d] border border-[#1e2d3e]">
                <div className="text-[10px] text-slate-500">EMBEDDING DIM</div>
                <div className="font-bold text-cyan-300">{featuredArticle.embeddingDim}</div>
              </div>
            </div>
          </div>

          {/* Cột Phải: Nội dung tóm tắt & CTA */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  ✨ Featured Article
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  AI &amp; RAG
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Deep Dive
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                {featuredArticle.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                {featuredArticle.desc}
              </p>

              {/* Metric Card */}
              <div className="p-3 rounded-xl bg-[#0c141e] border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Retrieval Accuracy: <strong>{featuredArticle.retrievalAccuracy}</strong></span>
                </div>
                {/* Sparkline curve */}
                <div className="w-16 h-4 text-emerald-400">
                  <svg viewBox="0 0 60 16" className="w-full h-full stroke-current fill-none stroke-2">
                    <path d="M0,14 Q15,12 30,6 T60,2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Author Meta & Action */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={featuredArticle.authorAvatar} 
                  alt={featuredArticle.author} 
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-white">{featuredArticle.author}</div>
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(featuredArticle.id, e)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    bookmarkedIds.has(featuredArticle.id)
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-[#121a24] border-white/10 text-slate-400 hover:text-white'
                  }`}
                  title="Lưu bài viết"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedIds.has(featuredArticle.id) ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
                >
                  <span>Đọc bài phân tích</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Danh Sách Bài Viết Kỹ Thuật Mới Nhất (Grid 6 Cards) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Bài viết Kỹ thuật mới nhất
            </h3>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Hiển thị 1 - {filteredArticles.length} trên 28 bài
          </span>
        </div>

        {/* Grid 6 Thẻ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setReadingArticle(art)}
              className="group p-4 rounded-2xl bg-[#090e15] hover:bg-[#0d141e] border border-[#172332] hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Ảnh preview phía trên */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/50 mb-4">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge danh mục trên ảnh */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-cyan-300">
                    {art.badge}
                  </span>

                  {/* Nút lưu Bookmark */}
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

                {/* Date & Read time */}
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

                {/* Tiêu đề */}
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2 mb-2">
                  {art.title}
                </h4>

                {/* Mô tả ngắn */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {art.desc}
                </p>
              </div>

              {/* Footer thẻ: Tags + Đọc tiếp */}
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

      </div>

      {/* 5. Phân Trang (Pagination) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          Trang {currentPage} trên 5 (Tổng 28 ấn phẩm)
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

          {[1, 2, 3].map((page) => (
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

          <span className="px-1 text-slate-600">...</span>

          <button
            onClick={() => setCurrentPage(5)}
            className={`w-8 h-8 rounded-lg font-bold transition cursor-pointer ${
              currentPage === 5
                ? 'bg-emerald-400 text-slate-950 font-bold'
                : 'bg-[#0a0f16] border border-[#1b2636] text-slate-400 hover:text-white'
            }`}
          >
            5
          </button>

          <button 
            disabled={currentPage === 5}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 5))}
            className="p-2 rounded-lg bg-[#0a0f16] border border-[#1b2636] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button 
            disabled={currentPage === 5}
            onClick={() => setCurrentPage(5)}
            className="p-2 rounded-lg bg-[#0a0f16] border border-[#1b2636] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6. Newsletter Banner: DevFolio Dispatch Weekly */}
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
              Không spam. Không bài viết tiếp thị. Chỉ có phân tích hiệu năng, bài học tối ưu hạ tầng thực tế và công nghệ hệ thống cốt lõi.
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
              <span>Được tin đọc bởi hơn 3,400+ engineers từ VNG, Momo, Shopee và startup founders.</span>
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

            <div className="p-4 rounded-xl bg-[#060a10] border border-white/5 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-emerald-400 font-bold">// Tóm tắt giải pháp kỹ thuật</div>
              <div>1. Thiết lập worker goroutine pool giới hạn 100k kết nối song song.</div>
              <div>2. Redis Pub/Sub cluster phân tán tải broadcast message dưới 3ms.</div>
              <div>3. Tối ưu Linux kernel sysctl: net.core.somaxconn = 65535.</div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setReadingArticle(null)}
                className="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs"
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
