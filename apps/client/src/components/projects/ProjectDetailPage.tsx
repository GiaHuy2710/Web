import React, { useState } from 'react';
import { 
  Folder, 
  Calendar, 
  Clock, 
  Zap, 
  CheckCheck, 
  Play, 
  ExternalLink, 
  Github, 
  Heart, 
  Share2, 
  Star, 
  GitFork, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Copy, 
  Check, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Sparkles,
  ArrowRight,
  GitBranch
} from 'lucide-react';
import { ProjectItem } from '../../types/project';

interface ProjectDetailPageProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject?: (project: ProjectItem) => void;
  allProjects?: ProjectItem[];
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ 
  project, 
  onBack,
  onSelectProject,
  allProjects = []
}) => {
  // State quản lý tab nội dung
  const [activeContentTab, setActiveContentTab] = useState<'overview' | 'architecture' | 'docs'>('overview');
  // State quản lý tab media thumbnail
  const [activeMediaTab, setActiveMediaTab] = useState<number>(0);
  // State quản lý yêu thích
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [savedCount, setSavedCount] = useState<number>(544);
  // State sao chép link
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedDocker, setCopiedDocker] = useState<boolean>(false);
  // State bình luận
  const [commentText, setCommentText] = useState<string>('');
  const [commentsList, setCommentsList] = useState([
    {
      id: '1',
      author: 'Tran Hoang',
      handle: '@hoang_dev',
      role: 'CONTRIBUTOR',
      time: '2 giờ trước',
      content: 'Cho mình hỏi về phần chunking logic của Tree-sitter! Khi gặp các class lớn lồng nhiều method closure trong TypeScript thì bộ parser này tách theo AST node nào? Bởi vì nếu chia nông quá thì mất ngữ cảnh còn sâu quá thì sợ vượt context window token limit của LLM local. Kết quả benchmark latency 380ms là trên máy local GPU hay chạy cloud dGPU?',
      likes: 8,
      isLiked: false,
      reply: {
        author: 'Alex Nguyen',
        role: 'Tác giả',
        time: '1 giờ trước',
        content: 'Cảm ơn @hoang_dev! Parser cắt đa cấp theo khối logic AST (Function Declaration / Method Definition), giữ nguyên ngữ cảnh cha (Parent Scope Header). Nếu method quá 1,200 tokens, mở sliding overlapping window 200 tokens. Latency 380ms đo thực tế trên RTX 4090 chạy Qdrant standalone + Ollama v0.3 nhé!',
        likes: 3,
        isLiked: false
      }
    },
    {
      id: '2',
      author: 'Daniel Ngo',
      handle: '@dango_ai',
      role: '',
      time: '1 ngày trước',
      content: 'Giao diện dashboard bundle check mượt đỉnh thật sự, đặc biệt là cách render cây AST đồ họa svg! Đã deploy thử trên Kubernetes cluster nội bộ công ty qua Helm Chart của repo, mượt mà ngoài mong đợi.',
      likes: 5,
      isLiked: false,
      reply: null
    }
  ]);

  const handleToggleSave = () => {
    setIsSaved(prev => !prev);
    setSavedCount(prev => (isSaved ? prev - 1 : prev + 1));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://devfolio.co/p/synapse-ai-rag');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyDocker = () => {
    navigator.clipboard.writeText('ghcr.io/devfolio/synapse:latest');
    setCopiedDocker(true);
    setTimeout(() => setCopiedDocker(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      author: 'Alex Nguyen',
      handle: '@alexdev',
      role: 'Tác giả',
      time: 'Vừa xong',
      content: commentText.trim(),
      likes: 0,
      isLiked: false,
      reply: null
    };

    setCommentsList([newComment, ...commentsList]);
    setCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    setCommentsList(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  // Dự án liên quan cùng tác giả
  const relatedProjects = allProjects.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 font-sans pb-16">
      
      {/* Top Breadcrumb & Metadata Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <button 
            onClick={onBack}
            className="hover:text-emerald-400 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Folder className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dự án</span>
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 font-medium truncate">
            {project.title} — AI RAG Architecture Engine
          </span>
        </div>

        {/* Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            ★ FEATURED
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            V2.4.0 PRODUCTION READY
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300">
            AI Tools
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300">
            Developer Tools
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
          {project.title} — Trợ lý tóm tắt kiến trúc codebase và tra cứu logic
        </h1>
        
        <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
          Công cụ tăng tốc kỹ sư phần mềm: Tự động phân tích AST, nhúng vector ngữ nghĩa đa kho lưu trữ (Multi-repo RAG) và sinh tài liệu API thời gian thực với độ trễ phản hồi dưới 400ms.
        </p>

        {/* Metadata Details Row */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 pb-6 border-b border-white/[0.07] text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Khởi tạo: 15/10/2024</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Cập nhật gần nhất: 2 ngày trước</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Latency: &lt;400ms TTFT</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Đã kiểm định trên 100k+ LOC</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Cột trái (Nội dung chính ~68%) & Cột phải (Sidebar ~32%) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================
              CỘT TRÁI (8 / 12)
             ======================================================== */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Media Showcase / Video Player Mock */}
            <div className="rounded-3xl bg-[#090d14] border border-[#1b2636] overflow-hidden shadow-2xl">
              
              {/* Thanh điều hướng giả lập trong video player */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1520] border-b border-[#1b2636] text-xs font-mono">
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Vector Search & AST Tree
                  </span>
                  <span className="text-slate-400 hidden sm:inline">Live RAG Pipeline & Code Logic</span>
                </div>
                <span className="text-slate-400 text-[11px] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  RAG Assistant Status - 98% Confidence
                </span>
              </div>

              {/* Khung visual mô phỏng Pipeline AST & Video Mock */}
              <div className="relative aspect-[16/9] w-full bg-[#060a10] flex items-center justify-center p-6 overflow-hidden group">
                
                {/* SVG Visual biểu diễn đồ thị AST và RAG pipeline */}
                <div className="absolute inset-0 opacity-25 pointer-events-none p-6 flex items-center justify-between">
                  <div className="w-1/3 h-full border border-dashed border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-around text-[10px] font-mono text-emerald-400">
                    <div className="p-2 bg-emerald-950/40 rounded border border-emerald-500/30">Tree-sitter Parser AST</div>
                    <div className="p-2 bg-cyan-950/40 rounded border border-cyan-500/30">Chunk Overlapping Window</div>
                    <div className="p-2 bg-indigo-950/40 rounded border border-indigo-500/30">Qdrant Vector Embedding</div>
                  </div>
                  <div className="w-1/2 h-full border border-dashed border-cyan-500/30 rounded-2xl p-4 font-mono text-[10px] text-cyan-300 leading-relaxed overflow-hidden">
                    <div className="text-slate-400">// Live Telemetry Query log</div>
                    <div className="text-emerald-400">&gt; match query_vector(tensor).await</div>
                    <div>&gt; HNSW search cos_sim() = 0.984</div>
                    <div className="text-yellow-400">&gt; Prompt Context: 1,420 tokens</div>
                    <div className="text-purple-400">&gt; Local LLM: Ollama (CodeQwen-7B)</div>
                    <div className="text-emerald-400">&gt; Response TTFT: 382ms [DONE]</div>
                  </div>
                </div>

                {/* Nút Play video trung tâm */}
                <div className="relative z-10 flex flex-col items-center text-center cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/30 group-hover:border-emerald-400 transition-all shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-emerald-400 translate-x-0.5" />
                  </div>
                  <div className="mt-4 font-bold text-white text-sm sm:text-base tracking-wide">
                    Xem Video Demo Kỹ Thuật
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    01:42 • 4K 60FPS Code-walkthrough
                  </div>
                </div>

                {/* Thanh trạng thái dưới cùng của player */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE STREAM | node-us-east-1 Qdrant Vector Cluster: OK</span>
                  </div>
                  <span>Release 2.4.0-stable</span>
                </div>
              </div>

              {/* Hàng 4 Thumbnail bên dưới player */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-[#0a0f17] border-t border-[#1b2636]">
                {[
                  { title: '01. Architecture', sub: 'AST Tree' },
                  { title: '02. Latency Bench', sub: 'Qdrant HNSW' },
                  { title: '03. API Socket', sub: 'Stream I/O' },
                  { title: '04. Next 15 App', sub: 'Client UI' }
                ].map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMediaTab(idx)}
                    className={`p-2 rounded-xl text-left transition cursor-pointer border ${
                      activeMediaTab === idx
                        ? 'bg-[#141f2d] border-emerald-500/50 shadow-sm'
                        : 'bg-[#0e141f] border-white/[0.05] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="text-xs font-mono font-semibold text-slate-200">{thumb.title}</div>
                    <div className="text-[10px] text-slate-400">{thumb.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Content Tabs Navigation */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
              {(
                [
                  { id: 'overview', label: 'Tổng quan & Tính năng' },
                  { id: 'architecture', label: 'Kiến trúc hệ thống' },
                  { id: 'docs', label: 'Cài đặt & Tài liệu' }
                ] as const
              ).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveContentTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    activeContentTab === tab.id
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 3. Section: Bối cảnh & Bài toán giải quyết */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>💡</span> Bối cảnh & Bài toán giải quyết
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thách thức thực tế */}
                <div className="p-5 rounded-2xl bg-[#0d141e] border border-rose-500/20 relative">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold font-mono uppercase tracking-wider mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Thách thức thực tế
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Khi onboarding vào một monorepo hơn 500k dòng code, kỹ sư tiêu tốn trung bình 4–6 tiếng mỗi ngày chỉ để đọc hiểu mối logic xử lý controller, middleware hay lần lần database schema đồng nhất. Tài liệu Confluence thường xuyên lạc hậu so với code đang deploy.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-mono">
                    <span>▼ Onboarding time: 3.5 tuần / dev</span>
                  </div>
                </div>

                {/* Giải pháp từ Synapse AI */}
                <div className="p-5 rounded-2xl bg-[#0d141e] border border-emerald-500/20 relative">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Giải pháp từ Synapse AI
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Synapse AI sử dụng cây phân tích cú pháp trừu tượng (AST) trích xuất chữ ký hàm và liên kết ngữ nghĩa vào Qdrant Vector Database. Mọi câu hỏi kiến trúc phức tạp được giải đáp chính xác kèm dẫn chứng file & line number trong chưa đầy 30 giây.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                    <span>▲ Thời gian tra cứu giảm 87%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Section: Tính năng cốt lõi (Key Features) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>⚙️</span> Tính năng cốt lõi (Key Features)
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Q/S: Best, Lat: 4ms LFSSR
                </span>
              </div>

              {/* 2x2 Grid Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Feature 1 */}
                <div className="p-5 rounded-2xl bg-[#0c121b] border border-[#1b2737] hover:border-emerald-500/30 transition">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">Real-time Code Indexing</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Lắng nghe Git hooks và file change events qua daemon Rust siêu nhẹ, cập nhật vector index ngay khi lập trình viên thực hiện git commit.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-5 rounded-2xl bg-[#0c121b] border border-[#1b2737] hover:border-cyan-500/30 transition">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">Hybrid RAG Search (Dense + Sparse)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kết hợp giữa BM25 + neural embedding để tìm kiếm theo cả Embeddings-cosine similarity lẫn từ khóa cú pháp kỹ thuật chính xác.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-5 rounded-2xl bg-[#0c121b] border border-[#1b2737] hover:border-purple-500/30 transition">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">Local LLM & OpenAI Fallback</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Chạy hoàn toàn cục bộ thông qua Ollama (Llama 3 / CodeQwen) đảm bảo bảo mật mã nguồn, tự động chuyển sang OpenAI GPT-4o khi gặp sự cố phức tạp.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="p-5 rounded-2xl bg-[#0c121b] border border-[#1b2737] hover:border-emerald-500/30 transition">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">Multi-repos Semantic Linking</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Liên kết mối quan hệ giữa monorepo Backend Go/NodeJS và Frontend Next.js/React, tracking data model từ API Client-Server xuyên suốt.
                  </p>
                </div>

              </div>

              {/* Zero-telemetry Privacy Banner */}
              <div className="p-4 rounded-2xl bg-[#0a1017] border border-[#1d2a3a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Zero-telemetry Privacy Guaranteed</div>
                    <div className="text-[11px] text-slate-400">
                      Không lưu trữ mã nguồn khách hàng ở máy chủ ngoài. Mã hóa vector đặc thù với AES-256-GCM cục bộ.
                    </div>
                  </div>
                </div>

                <span className="self-start sm:self-center px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0">
                  ENTERPRISE READY
                </span>
              </div>
            </div>

            {/* 5. Section: Công nghệ & Thư viện sử dụng (Tech Stack) */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>🧩</span> Công nghệ & Thư viện sử dụng (Tech Stack)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Next.js 14', sub: 'App Router & SSR', tag: 'N' },
                  { name: 'FastAPI', sub: 'Python 3.11 Backend', tag: 'Py' },
                  { name: 'Qdrant DB', sub: 'HNSW Vector Engine', tag: 'Q' },
                  { name: 'Rust (Tree-sitter)', sub: 'High-speed AST Parser', tag: 'Rs' },
                  { name: 'TailwindCSS', sub: 'Atomic Dark System', tag: 'Tw' },
                  { name: 'WebSockets', sub: 'Real-time Stream I/O', tag: 'Ws' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0d141e] border border-[#1b2635] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#141d2a] border border-[#213245] flex items-center justify-center font-mono font-bold text-xs text-emerald-400 shrink-0">
                      {item.tag}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Section: Bình luận & Thảo luận */}
            <div className="space-y-4 pt-4 border-t border-white/[0.07]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    Bình luận & Thảo luận
                  </h3>
                  <span className="text-xs font-mono text-slate-400">14 đóng góp</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <button className="hover:text-white transition">Cũ nhất trước</button>
                  <span>•</span>
                  <button className="text-emerald-400 font-semibold">Mới nhất trước</button>
                </div>
              </div>

              {/* Form gửi bình luận mới */}
              <form onSubmit={handleAddComment} className="p-4 rounded-2xl bg-[#0c121b] border border-[#1d2938] space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-white">Alex Nguyen</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                    Tác giả dự án
                  </span>
                </div>

                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Chia sẻ nhận xét kiến trúc, đóng góp pull-request hoặc đặt câu hỏi kỹ thuật về RAG pipeline..."
                  rows={3}
                  className="w-full bg-[#080d14] border border-[#1b2636] rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
                />

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="hidden sm:inline">Hỗ trợ định dạng Markdown và Code block</span>
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi bình luận</span>
                  </button>
                </div>
              </form>

              {/* Danh sách bình luận */}
              <div className="space-y-3 pt-2">
                {commentsList.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-[#090e15] border border-[#16212e] space-y-3">
                    {/* Header bình luận */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{c.author}</span>
                        <span className="text-slate-500 font-mono text-[11px]">{c.handle}</span>
                        {c.role && (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[9px] font-mono font-bold">
                            {c.role}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 text-[11px]">{c.time}</span>
                    </div>

                    {/* Nội dung */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {c.content}
                    </p>

                    {/* Like & Reply Action */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <button 
                        onClick={() => handleLikeComment(c.id)}
                        className={`flex items-center gap-1.5 hover:text-emerald-400 transition cursor-pointer ${
                          c.isLiked ? 'text-emerald-400 font-semibold' : ''
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{c.likes}</span>
                      </button>
                      <button className="hover:text-white transition cursor-pointer">
                        Trả lời
                      </button>
                    </div>

                    {/* Phản hồi con (nếu có) */}
                    {c.reply && (
                      <div className="mt-3 pl-4 border-l-2 border-emerald-500/40 bg-[#0c131c] p-3 rounded-r-xl space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{c.reply.author}</span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold">
                              {c.reply.role}
                            </span>
                          </div>
                          <span className="text-slate-500 text-[11px]">{c.reply.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {c.reply.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{c.reply.likes}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* ========================================================
              CỘT PHẢI (SIDEBAR - 4 / 12)
             ======================================================== */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Nút Call to Action */}
            <div className="space-y-2.5">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(52,211,153,0.35)] transition cursor-pointer"
              >
                <span>Truy cập Live Demo</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#111722] hover:bg-[#161f2e] border border-[#202c3e] text-slate-200 text-xs font-semibold flex items-center justify-between transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span>Xem GitHub (Mã nguồn)</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                  branch: main
                </span>
              </a>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleToggleSave}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition cursor-pointer ${
                    isSaved
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                      : 'bg-[#111722] border-[#202c3e] text-slate-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>Đã lưu ({savedCount})</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2.5 px-3 rounded-xl bg-[#111722] hover:bg-[#161f2e] border border-[#202c3e] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                  title="Chia sẻ liên kết"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* 2. Card: Chỉ số & Thông tin kỹ thuật */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Chỉ số & Thông tin kỹ thuật
              </h4>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/[0.06]">
                <div>
                  <div className="text-[11px] text-slate-500">Lượt xem</div>
                  <div className="font-mono font-bold text-base text-white">20.6K</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Sao GitHub</div>
                  <div className="font-mono font-bold text-base text-emerald-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>1,420</span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Forks</div>
                  <div className="font-mono font-bold text-base text-white flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>184</span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Bản quyền</div>
                  <div className="font-mono font-bold text-xs text-cyan-300 mt-1">MIT License</div>
                </div>
              </div>

              {/* Specs List */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">Phiên bản hiện tại:</span>
                  <span className="text-emerald-400 font-semibold">v2.4.0 (Latest)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">Ngày phát hành:</span>
                  <span>15/10/2024</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Docker Container:</span>
                    <button 
                      onClick={handleCopyDocker}
                      className="hover:text-white transition flex items-center gap-1 text-[10px]"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedDocker ? 'Đã sao chép' : ''}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded-lg bg-[#070b10] border border-[#16212e] text-[11px] text-cyan-300 truncate">
                    ghcr.io/devfolio/synapse:latest
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 text-slate-300">
                  <span className="text-slate-500">Kiểm định kỹ thuật (CI/CD):</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Passing 100%
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Card: Tác giả dự án */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-3.5">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/alex-avatar.jpg" 
                  alt="Alex Nguyen" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Alex Nguyen</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold">
                      PRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Senior Full-Stack Engineer</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Chuyên gia RAG & Distributed System, đam mê xây dựng công cụ AI mã nguồn mở cho lập trình viên. 7 năm kinh nghiệm phát triển phần mềm quy mô production.
              </p>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <a 
                  href="#about"
                  className="text-emerald-400 hover:underline font-medium flex items-center gap-1"
                >
                  <span>Xem Portfolio tác giả</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>📍 Hồ Chí Minh (GMT+7) • Available for Advisory</span>
              </div>
            </div>

            {/* 4. Box Copy Link */}
            <div className="p-3 rounded-xl bg-[#070b10] border border-[#17222f] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 truncate">devfolio.co/p/synapse-ai-rag</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="ml-2 text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0 font-medium cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================
            DỰ ÁN LIÊN QUAN CÙNG TÁC GIẢ (BOTTOM SECTION)
           ======================================================== */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Folder className="w-4 h-4 text-emerald-400" />
              Dự án liên quan cùng tác giả
            </h3>
            <button 
              onClick={onBack}
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedProjects.map((p) => (
              <div 
                key={p.id}
                onClick={() => onSelectProject?.(p)}
                className="group p-4 rounded-2xl bg-[#090e15] hover:bg-[#0d141e] border border-white/[0.06] hover:border-emerald-500/30 transition-all cursor-pointer space-y-3"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/40">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/10">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{p.details.stars}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{p.category}</span>
                  <h4 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors mt-0.5">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
