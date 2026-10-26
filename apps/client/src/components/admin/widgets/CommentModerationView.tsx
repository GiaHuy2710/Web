import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  Sliders,
  MessageSquare,
  ClipboardCheck,
  ShieldAlert,
  Filter,
  ChevronDown,
  AlertTriangle,
  Ban,
  CheckCircle2,
  CornerDownRight,
  Pin,
  Sparkles,
  Eye,
  Send,
  Radio,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Mail,
  Zap,
} from 'lucide-react';

export interface ModerationCommentItem {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
    initials?: string;
    initialsColor?: string;
    email?: string;
    handle?: string;
    verifiedBadge?: string;
    isBot?: boolean;
    isNewAccount?: boolean;
    meta?: string;
  };
  project: {
    name: string;
    slug: string;
  };
  timeAgo: string;
  timestamp: string;
  rating?: number;
  content: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  classification: {
    type: 'phishing' | 'verified_code' | 'infra_question' | 'commercial';
    title: string;
    subtitle?: string;
    badgeText?: string;
    trustScore?: string;
    spamScore?: string;
    severity: 'high' | 'success' | 'info' | 'warning';
  };
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  isPinned?: boolean;
}

import { addAuditLog as recordGlobalAuditLog } from '../audit';

// Danh sách bình luận mặc định trống - khi có người dùng tương tác sẽ tự động hiển thị
const INITIAL_MODERATION_ITEMS: ModerationCommentItem[] = [];

export interface CommentModerationViewProps {
  onShowToast: (message: string) => void;
}

export const CommentModerationView: React.FC<CommentModerationViewProps> = ({ onShowToast }) => {
  // Main data state
  const [items, setItems] = useState<ModerationCommentItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('devfolio_moderation_items');
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return INITIAL_MODERATION_ITEMS;
  });
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'approved' | 'spam'>('pending');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState<boolean>(false);

  // Modals state
  const [isSpamRuleModalOpen, setIsSpamRuleModalOpen] = useState(false);
  const [isBannedKeywordsModalOpen, setIsBannedKeywordsModalOpen] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // AI Guard Filters state
  const [aiGuardRules, setAiGuardRules] = useState({
    blockPhishing: true,
    requireVerification: true,
    autoApprove5Star: false,
    profanityFilter: true,
  });

  // Notification Config state
  const [notifications, setNotifications] = useState({
    telegram: true,
    discord: true,
    dailyEmail: false,
  });

  // Audit Log Stream state
  const [auditStream, setAuditStream] = useState<string[]>([]);

  const addAuditLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    setAuditStream((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 8)]);
  };

  const persistItems = (newItems: ModerationCommentItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem('devfolio_moderation_items', JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  // Actions on comments
  const handleApprove = (id: string, name: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, status: 'approved' as const } : item));
    persistItems(updated);
    addAuditLog(`review-approved #${id} for ${name} by @admin`);
    recordGlobalAuditLog({
      action: `Phê duyệt bình luận #${id} của ${name}`,
      category: 'data',
      severity: 'success',
      targetResource: `comments://${id}`,
    });
    onShowToast(`Đã duyệt thành công bình luận của ${name}!`);
  };

  const handleReject = (id: string, name: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, status: 'rejected' as const } : item));
    persistItems(updated);
    addAuditLog(`rejected-comment #${id} from ${name}`);
    recordGlobalAuditLog({
      action: `Từ chối bình luận #${id} của ${name}`,
      category: 'data',
      severity: 'warning',
      targetResource: `comments://${id}`,
    });
    onShowToast(`Đã từ chối bình luận của ${name}.`);
  };

  const handleBlockIpAndSpam = (id: string, name: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, status: 'spam' as const } : item));
    persistItems(updated);
    addAuditLog(`blocked-ip & quarantined spam #${id} (${name})`);
    recordGlobalAuditLog({
      action: `Chặn IP & Đánh dấu spam bình luận #${id} (${name})`,
      category: 'security',
      severity: 'critical',
      targetResource: `comments://${id}`,
    });
    onShowToast(`Đã chặn IP vĩnh viễn và gắn cờ spam cho ${name}!`);
  };

  const handlePin = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
    onShowToast(`Đã ghim đánh giá của ${name} lên đầu repo!`);
  };

  const handleQuickApproveAll = () => {
    const safeItems = items.filter((i) => i.classification.severity !== 'high');
    setItems((prev) =>
      prev.map((item) =>
        item.classification.severity !== 'high' ? { ...item, status: 'approved' } : item
      )
    );
    addAuditLog(`batch-approved ${safeItems.length} safe reviews by @admin`);
    onShowToast(`Đã duyệt nhanh toàn bộ ${safeItems.length} bình luận hợp lệ!`);
  };

  const handleSendTestWebhook = () => {
    addAuditLog('dispatched test notification to telegram & discord');
    onShowToast('Đã phát tín hiệu thông báo thử nghiệm thành công tới Webhook!');
  };

  const handleSendReply = (authorName: string) => {
    if (!replyText.trim()) return;
    addAuditLog(`author-reply dispatched to @${authorName}`);
    onShowToast(`Đã gửi phản hồi chính thức tới ${authorName}!`);
    setReplyingCommentId(null);
    setReplyText('');
  };

  // Filtered list
  const filteredItems = items.filter((item) => {
    if (activeTab === 'pending' && item.status !== 'pending') return false;
    if (activeTab === 'approved' && item.status !== 'approved') return false;
    if (activeTab === 'spam' && item.status !== 'spam') return false;

    if (selectedProject !== 'all') {
      if (item.project.slug !== selectedProject) return false;
    }
    return true;
  });

  const pendingCount = items.filter((i) => i.status === 'pending').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. PAGE TITLE & HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Kiểm duyệt bình luận & Đánh giá
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950/70 text-red-400 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span>{pendingCount} chờ duyệt</span>
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/[0.05] border border-white/[0.08]">
              v2.4-stream
            </span>
            <p className="text-xs text-slate-400">
              Quản lý phản hồi trực tiếp, phát hiện spam tự động và duy trì chất lượng thảo luận kỹ thuật.
            </p>
          </div>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsSpamRuleModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#101726] hover:bg-[#162033] border border-white/10 text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quy tắc lọc Spam</span>
          </button>

          <button
            type="button"
            onClick={handleQuickApproveAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold text-xs transition shadow-[0_0_16px_rgba(52,211,153,0.35)] cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Duyệt nhanh tất cả</span>
          </button>
        </div>
      </div>

      {/* 2. 4 TOP KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Tổng bình luận */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              Tổng bình luận
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">{items.length}</span>
              <span className="text-[11px] font-semibold text-emerald-400">
                {items.length > 0 ? `${items.length} lượt` : '0 lượt'}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="w-9 h-9 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-cyan-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            {/* Sparkline curve */}
            <svg className="w-16 h-5 text-emerald-400 stroke-current fill-none stroke-[2]" viewBox="0 0 64 20">
              <path d="M 0 16 Q 16 12 32 14 T 64 4" />
            </svg>
          </div>
        </div>

        {/* Card 2: Hàng đợi chờ duyệt */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              Hàng đợi chờ duyệt
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                {pendingCount < 10 ? `0${pendingCount}` : pendingCount}
              </span>
              <span className="text-xs text-slate-400">cần xử lý thủ công</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-emerald-400">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Cấp bách
            </span>
          </div>
        </div>

        {/* Card 3: Nghi vấn bot / spam */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              Nghi vấn bot / spam
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">{items.filter(i => i.status === 'spam').length}</span>
              <span className="text-xs text-slate-400">AI lọc tự động</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: Điểm chất lượng */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                Điểm chất lượng
              </span>
              <div className="flex items-center text-amber-400 text-xs">
                {'★★★★★'}
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white tracking-tight">5.0</span>
              <span className="text-xs text-slate-400">/ 5.0 ({items.length} reviews)</span>
            </div>
          </div>
          <div className="px-2 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-[10px] font-bold tracking-wider uppercase text-center leading-tight">
            A+ Tín nhiệm
          </div>
        </div>

      </div>

      {/* 3. TABS & FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl bg-[#0b101b] border border-white/[0.06]">
        {/* Left Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-[#152033] text-white border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Chờ duyệt</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold">
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#152033] text-white border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Tất cả ({items.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('approved')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'approved'
                ? 'bg-[#152033] text-white border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Đã duyệt ({items.filter(i => i.status === 'approved').length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spam')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              activeTab === 'spam'
                ? 'bg-[#152033] text-white border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Spam ({items.filter(i => i.status === 'spam').length})</span>
          </button>
        </div>

        {/* Right Dropdown: Dự án Filter */}
        <div className="relative self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111724] hover:bg-[#172133] border border-white/[0.08] text-xs text-slate-300 transition cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Dự án:{' '}
              {selectedProject === 'all'
                ? 'Tất cả kho lưu trữ'
                : selectedProject === 'synapse-ai'
                ? 'Synapse AI'
                : selectedProject === 'chromapalette-ui'
                ? 'ChromaPalette UI'
                : selectedProject === 'devpulse-analytics'
                ? 'DevPulse Analytics'
                : 'KernelViper'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute right-0 mt-1 w-56 rounded-xl bg-[#111724] border border-white/[0.08] shadow-2xl p-1 z-30 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('all');
                  setIsProjectDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
              >
                Tất cả kho lưu trữ
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('synapse-ai');
                  setIsProjectDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
              >
                Synapse AI
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('chromapalette-ui');
                  setIsProjectDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
              >
                ChromaPalette UI
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('devpulse-analytics');
                  setIsProjectDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
              >
                DevPulse Analytics
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('kernel-viper');
                  setIsProjectDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
              >
                KernelViper
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. MAIN SPLIT CONTENT: CARDS (LEFT) & WIDGETS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 4 DETAILED MODERATION CARDS (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          
          {filteredItems.length === 0 ? (
            <div className="p-14 text-center rounded-2xl bg-[#0c121e] border border-white/[0.06] text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-white font-semibold text-sm">Hàng đợi kiểm duyệt đang trống</div>
              <p className="text-xs max-w-md mx-auto leading-relaxed">
                Không có bình luận hoặc đánh giá nào cần duyệt lúc này. Khi có người dùng gửi bình luận trên các sản phẩm của bạn, hệ thống sẽ lọc và hiển thị tại đây.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4 transition hover:border-white/10"
              >
                {/* User & Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    {item.author.avatarUrl ? (
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-slate-800">
                        <img
                          src={item.author.avatarUrl}
                          alt={item.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : item.author.initials ? (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${item.author.initialsColor}`}
                      >
                        {item.author.initials}
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 font-bold text-xs">
                        {item.author.name.charAt(0)}
                      </div>
                    )}

                    {/* Names & Badges */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs sm:text-sm">
                          {item.author.name}
                        </span>

                        {item.author.isBot && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                            Nghi vấn Bot
                          </span>
                        )}

                        {item.author.verifiedBadge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {item.author.verifiedBadge}
                          </span>
                        )}

                        {item.author.isNewAccount && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            Tài khoản mới tạo
                          </span>
                        )}

                        {item.author.handle && !item.author.isBot && (
                          <span className="text-[11px] text-cyan-400 font-mono hidden sm:inline">
                            {item.author.handle}
                          </span>
                        )}

                        {/* Star Rating if present */}
                        {item.rating && (
                          <div className="flex items-center gap-1 text-amber-400 text-xs">
                            <span>★★★★★</span>
                            <span className="font-bold text-slate-200 ml-0.5">{item.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono">
                        {item.author.email || item.author.handle}
                        {item.author.meta && (
                          <span className="ml-2 text-slate-500 font-sans">{item.author.meta}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Target Project Badge & Time */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#142033] border border-cyan-500/25 text-cyan-400 font-medium text-[11px]">
                      <ExternalLink className="w-3 h-3" />
                      <span>{item.project.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 whitespace-nowrap">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>

                {/* Comment Content */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.content}
                </p>

                {/* Optional Code Snippet Block */}
                {item.codeSnippet && (
                  <div className="rounded-xl bg-[#080d16] border border-white/[0.08] overflow-hidden text-xs font-mono">
                    <div className="px-3.5 py-1.5 bg-[#0e1422] border-b border-white/[0.05] flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.codeSnippet.filename}</span>
                      <span className="text-emerald-400 font-semibold">{item.codeSnippet.language}</span>
                    </div>
                    <pre className="p-3.5 text-slate-200 overflow-x-auto leading-relaxed text-[11px]">
                      <code>{item.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Classification / Security Banner */}
                {item.classification.type === 'phishing' && (
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 text-red-300">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="font-medium text-[11px]">
                        {item.classification.title}
                      </span>
                    </div>
                    {item.classification.badgeText && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 uppercase shrink-0">
                        {item.classification.badgeText}
                      </span>
                    )}
                  </div>
                )}

                {item.classification.type === 'verified_code' && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium text-[11px]">
                      {item.classification.title}
                    </span>
                  </div>
                )}

                {item.classification.type === 'infra_question' && (
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center gap-2 text-xs text-cyan-300">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium text-[11px]">
                      {item.classification.title}
                    </span>
                  </div>
                )}

                {item.classification.type === 'commercial' && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2 text-xs text-amber-300">
                    <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-medium text-[11px]">
                      {item.classification.title}
                    </span>
                  </div>
                )}

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.04]">
                  {/* Left special actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Reply author action */}
                    {(item.classification.type === 'verified_code' ||
                      item.classification.type === 'infra_question') && (
                      <button
                        type="button"
                        onClick={() =>
                          setReplyingCommentId(replyingCommentId === item.id ? null : item.id)
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-cyan-300 hover:text-white text-xs font-medium transition cursor-pointer"
                      >
                        <CornerDownRight className="w-3.5 h-3.5 text-cyan-400" />
                        <span>
                          {item.classification.type === 'verified_code'
                            ? 'Phản hồi với tư cách Tác giả'
                            : 'Trả lời & Giải đáp'}
                        </span>
                      </button>
                    )}

                    {/* Pin action for 5-star review */}
                    {item.classification.type === 'verified_code' && (
                      <button
                        type="button"
                        onClick={() => handlePin(item.id, item.author.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                          item.isPinned
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-[#111724] hover:bg-[#182337] border-white/[0.08] text-slate-300'
                        }`}
                      >
                        <Pin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.isPinned ? 'Đã ghim' : 'Ghim lên đầu repo'}</span>
                      </button>
                    )}

                    {/* Block IP for Phishing */}
                    {item.classification.type === 'phishing' && (
                      <button
                        type="button"
                        onClick={() => handleBlockIpAndSpam(item.id, item.author.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 text-red-400 text-xs font-semibold transition cursor-pointer"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Chặn IP & Xóa Spam</span>
                      </button>
                    )}

                    {/* Mark Spam for Commercial */}
                    {item.classification.type === 'commercial' && (
                      <button
                        type="button"
                        onClick={() => handleBlockIpAndSpam(item.id, item.author.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-amber-400 text-xs font-medium transition cursor-pointer"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Đánh dấu Spam</span>
                      </button>
                    )}
                  </div>

                  {/* Right standard decision buttons */}
                  <div className="flex items-center gap-2 ml-auto">
                    {/* Reject / Delete button */}
                    <button
                      type="button"
                      onClick={() => handleReject(item.id, item.author.name)}
                      className="px-3 py-1.5 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-slate-400 hover:text-white text-xs transition cursor-pointer"
                    >
                      {item.classification.type === 'infra_question' ? 'Xóa' : 'Từ chối'}
                    </button>

                    {/* Approve button */}
                    <button
                      type="button"
                      onClick={() => handleApprove(item.id, item.author.name)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-xs transition cursor-pointer ${
                        item.classification.type === 'phishing'
                          ? 'bg-[#111724] border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10'
                          : item.classification.type === 'commercial'
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                          : 'bg-emerald-400 hover:bg-emerald-300 text-gray-950 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>
                        {item.classification.type === 'phishing'
                          ? 'Bỏ qua cảnh báo & Duyệt'
                          : item.classification.type === 'verified_code'
                          ? 'Duyệt & Đăng ngay'
                          : item.classification.type === 'commercial'
                          ? 'Cho phép hiển thị'
                          : 'Duyệt bình luận'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Inline Reply Box if triggered */}
                {replyingCommentId === item.id && (
                  <div className="p-3.5 rounded-xl bg-[#090e17] border border-cyan-500/30 space-y-2 mt-2 animate-in fade-in duration-150">
                    <div className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1.5">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Phản hồi công khai cho {item.author.name}:</span>
                    </div>
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Nhập nội dung phản hồi kỹ thuật từ ban quản trị..."
                      className="w-full p-2.5 rounded-lg bg-[#111724] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setReplyingCommentId(null)}
                        className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendReply(item.author.name)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Gửi phản hồi</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Pagination Row */}
          <div className="p-4 border border-white/[0.06] rounded-2xl bg-[#0c121e] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              Hiển thị <span className="text-white font-medium">{filteredItems.length}</span> trên{' '}
              <span className="text-white font-medium">{items.length}</span> bình luận hàng đợi
            </div>

            <div className="flex items-center gap-2 font-mono">
              <button
                type="button"
                className="p-1.5 rounded-lg bg-[#111724] border border-white/[0.06] text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-white font-medium px-2">Trang 1 / 1</span>
              <button
                type="button"
                className="p-1.5 rounded-lg bg-[#111724] border border-white/[0.06] text-slate-400 hover:text-white transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 3 INTERACTIVE WIDGETS (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* WIDGET 1: BỘ LỌC TỰ ĐỘNG (AI GUARD) */}
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Bộ lọc tự động (AI Guard)</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Quy tắc xử lý tức thì luồng đánh giá đến bằng mô hình NLP nhúng trên Edge Worker.
            </p>

            <div className="space-y-3 text-xs">
              {/* Item 1 */}
              <label className="flex items-start justify-between gap-2 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Tự động chặn link lừa đảo</div>
                  <div className="text-[11px] text-slate-400">Blocklist 42,900 domains độc hại</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiGuardRules.blockPhishing}
                  onChange={(e) =>
                    setAiGuardRules({ ...aiGuardRules, blockPhishing: e.target.checked })
                  }
                  className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 mt-0.5 cursor-pointer"
                />
              </label>

              {/* Item 2 */}
              <label className="flex items-start justify-between gap-2 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Yêu cầu xác thực tài khoản</div>
                  <div className="text-[11px] text-slate-400">Chặn bình luận ẩn danh/temp mail</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiGuardRules.requireVerification}
                  onChange={(e) =>
                    setAiGuardRules({ ...aiGuardRules, requireVerification: e.target.checked })
                  }
                  className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 mt-0.5 cursor-pointer"
                />
              </label>

              {/* Item 3 */}
              <label className="flex items-start justify-between gap-2 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Tự duyệt đánh giá 5 sao</div>
                  <div className="text-[11px] text-slate-400">Áp dụng từ tác giả có đóng góp GitHub</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiGuardRules.autoApprove5Star}
                  onChange={(e) =>
                    setAiGuardRules({ ...aiGuardRules, autoApprove5Star: e.target.checked })
                  }
                  className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 mt-0.5 cursor-pointer"
                />
              </label>

              {/* Item 4 */}
              <label className="flex items-start justify-between gap-2 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Lọc từ ngữ thô tục / Công kích</div>
                  <div className="text-[11px] text-slate-400">Tiếng Việt & Tiếng Anh chuẩn RFC</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiGuardRules.profanityFilter}
                  onChange={(e) =>
                    setAiGuardRules({ ...aiGuardRules, profanityFilter: e.target.checked })
                  }
                  className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 mt-0.5 cursor-pointer"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setIsBannedKeywordsModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer"
            >
              Quản lý từ khóa cấm & Ngưỡng NLP
            </button>
          </div>

          {/* WIDGET 2: CẤU HÌNH NHẬN THÔNG BÁO */}
          <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Cấu hình nhận thông báo</span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Real-time
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Nhận tín hiệu tức thì khi có bình luận mới hoặc phản hồi bị gắn cờ đỏ.
            </p>

            <div className="space-y-3 text-xs">
              {/* Telegram Webhook */}
              <label className="flex items-start justify-between gap-2 cursor-pointer">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Telegram Webhook</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ĐÃ KẾT NỐI
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Bot: @DevFolioAdminBot-18849281...
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.telegram}
                  onChange={(e) =>
                    setNotifications({ ...notifications, telegram: e.target.checked })
                  }
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-0.5 cursor-pointer"
                />
              </label>

              {/* Discord Community */}
              <label className="flex items-start justify-between gap-2 cursor-pointer">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                    <span>Discord Community</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Kênh: #moderation-feed
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.discord}
                  onChange={(e) =>
                    setNotifications({ ...notifications, discord: e.target.checked })
                  }
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-0.5 cursor-pointer"
                />
              </label>

              {/* Email Tổng kết */}
              <label className="flex items-start justify-between gap-2 cursor-pointer">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Tổng kết ngày</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Gửi lúc 08:00 AM hàng ngày
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.dailyEmail}
                  onChange={(e) =>
                    setNotifications({ ...notifications, dailyEmail: e.target.checked })
                  }
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-0.5 cursor-pointer"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={handleSendTestWebhook}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Bắn thông báo thử nghiệm</span>
            </button>
          </div>

          {/* WIDGET 3: AUDIT LOG STREAM */}
          <div className="p-4 rounded-2xl bg-[#090e17] border border-white/[0.07] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold tracking-wider text-slate-400 uppercase text-[11px]">
                AUDIT LOG STREAM
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>

            <div className="space-y-1 font-mono text-[11px] text-slate-400 bg-black/40 p-2.5 rounded-xl border border-white/[0.04] overflow-x-auto">
              {auditStream.map((log, idx) => (
                <div key={idx} className="truncate">
                  {log.includes('flagged') ? (
                    <span className="text-red-400">{log}</span>
                  ) : log.includes('approved') ? (
                    <span className="text-emerald-400">{log}</span>
                  ) : (
                    <span className="text-slate-400">{log}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: QUY TẮC LỌC SPAM */}
      {isSpamRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c121e] border border-cyan-500/30 shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Cấu hình Bộ quy tắc lọc Spam</h3>
                  <p className="text-[11px] text-slate-400">Tùy chỉnh ngưỡng chặn tự động theo mô hình AI & Heuristics</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSpamRuleModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Ngưỡng điểm tin cậy Spam (Spam Score Threshold)</span>
                  <span className="font-mono font-bold text-emerald-400">≥ 85%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  defaultValue="85"
                  className="w-full accent-emerald-500"
                />
                <div className="text-[11px] text-slate-500">
                  Bình luận có điểm rủi ro vượt ngưỡng sẽ tự động bị cách ly vào hàng đợi chờ duyệt.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#111724] border border-white/[0.06] space-y-2">
                <div className="font-semibold text-white">Chính sách xử lý đường dẫn (Hyperlink Policy)</div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="link_policy" defaultChecked className="text-emerald-500" />
                    <span>Chặn tự động các liên kết rút gọn (bit.ly, t.me, linktree...)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="link_policy" className="text-emerald-500" />
                    <span>Yêu cầu thuộc tính rel="nofollow noopener" cho mọi liên kết ngoài</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setIsSpamRuleModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#111724] hover:bg-[#172133] text-slate-300 text-xs transition"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSpamRuleModalOpen(false);
                  addAuditLog('updated spam filter threshold to 85%');
                  onShowToast('Đã lưu cấu hình bộ lọc Spam thành công!');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs transition"
              >
                Lưu quy tắc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TỪ KHÓA CẤM & NGƯỠNG NLP */}
      {isBannedKeywordsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c121e] border border-emerald-500/30 shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Từ khóa cấm & Ngưỡng NLP</h3>
                  <p className="text-[11px] text-slate-400">Danh sách từ ngữ nhạy cảm và mô hình phân loại ngôn ngữ</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBannedKeywordsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Từ khóa cấm (Phân cách bằng dấu phẩy)
                </label>
                <textarea
                  rows={4}
                  defaultValue="airdrop, pump, 100x, telegram, zalo, bán source, hack tool, crack, lừa đảo, token claim"
                  className="w-full p-2.5 rounded-xl bg-[#111724] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#080d16] border border-white/[0.05] text-[11px] text-slate-400 leading-relaxed">
                Mô hình NLP sử dụng PhoBERT cho Tiếng Việt và RoBERTa cho Tiếng Anh để phát hiện ngữ nghĩa công kích hoặc quảng cáo thương mại ngụy trang.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setIsBannedKeywordsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#111724] text-slate-300 text-xs transition"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsBannedKeywordsModalOpen(false);
                  addAuditLog('synced 10 banned keywords to edge filter');
                  onShowToast('Đã đồng bộ danh sách từ khóa cấm thành công!');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold text-xs transition"
              >
                Cập nhật từ khóa
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
