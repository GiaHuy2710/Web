import React, { useState } from 'react';
import {
  Eye,
  Users,
  Clock,
  Download,
  Share2,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Zap,
  Info,
  ChevronDown,
  Laptop,
  Flame,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export interface AnalyticsDashboardViewProps {
  onShowToast: (message: string) => void;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({ onShowToast }) => {
  // Period filter: 'today' | '7d' | '30d' | 'all'
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | '7d' | '30d' | 'all'>('30d');
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<boolean>(true);

  // Referrers data
  const referrers = [
    { name: 'GitHub Repository & Topics', percentage: 42, count: '62,280', color: 'bg-emerald-400' },
    { name: 'X / Twitter Tech Community', percentage: 28, count: '41,520', color: 'bg-cyan-400' },
    { name: 'Trực tiếp (Direct & Bookmarks)', percentage: 16, count: '23,720', color: 'bg-blue-400' },
    { name: 'Reddit r/webdev & r/programming', percentage: 9, count: '13,340', color: 'bg-purple-400' },
    { name: 'Google Search Organic', percentage: 5, count: '7,419', color: 'bg-slate-400' },
  ];

  // Top Performing Projects
  const topProjects = [
    {
      id: 'proj-1',
      name: 'Synapse AI Studio',
      version: 'v2.4 • Core Engine',
      image: '/images/synapse-ai.jpg',
      views: '62,400',
      demos: '18,340',
      stars: '1.4k',
      growth: '+42.8%',
      isHot: true,
    },
    {
      id: 'proj-2',
      name: 'DevPulse Analytics',
      version: 'v1.8 • Monitoring',
      image: '/images/devpulse.jpg',
      views: '38,120',
      demos: '9,280',
      stars: '890',
      growth: '+18.2%',
      isHot: false,
    },
    {
      id: 'proj-3',
      name: 'ChromaPalette Generator',
      version: 'v3.0 • UI/UX Tool',
      image: '/images/chromapalette.jpg',
      views: '22,940',
      demos: '4,580',
      stars: '520',
      growth: '+9.6%',
      isHot: false,
    },
  ];

  // Device breakdown
  const devices = [
    { name: 'Desktop & Workstation', percentage: 82, icon: Monitor, color: 'text-emerald-400 bg-emerald-400' },
    { name: 'Mobile (iOS / Android)', percentage: 16, icon: Smartphone, color: 'text-cyan-400 bg-cyan-400' },
    { name: 'Tablet Devices', percentage: 2, icon: Tablet, color: 'text-slate-400 bg-slate-400' },
  ];

  // OS & Browser
  const runtimes = [
    { name: 'macOS • Chrome', percentage: 51.2, color: 'bg-emerald-400' },
    { name: 'Windows • Edge / Chrome', percentage: 31.8, color: 'bg-cyan-400' },
    { name: 'Linux • Firefox Dev Edition', percentage: 14.3, color: 'bg-purple-400' },
  ];

  // Geos
  const geos = [
    { code: 'VN', name: 'Việt Nam', percentage: 54, color: 'bg-emerald-400' },
    { code: 'US', name: 'Hoa Kỳ (Mỹ)', percentage: 22, color: 'bg-cyan-400' },
    { code: 'SG', name: 'Singapore', percentage: 11, color: 'bg-blue-400' },
    { code: 'JP', name: 'Nhật Bản', percentage: 8, color: 'bg-purple-400' },
  ];

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    setIsExportDropdownOpen(false);
    onShowToast(`Đang kết xuất báo cáo thống kê định dạng ${format.toUpperCase()}... Hoàn tất!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. TOP HEADER & TELEMETRY CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
        <div>
          {/* Real-time telemetry badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
              REAL-TIME TELEMETRY
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              <span>Live Pipeline</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Thống kê & Phân tích chuyên sâu
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Giám sát hiệu suất dự án, tương tác mã nguồn và lưu lượng truy cập toàn cầu.
          </p>
        </div>

        {/* Right Period Buttons & Export */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
          <div className="p-1 rounded-xl bg-[#0c121e] border border-white/[0.08] flex items-center gap-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedPeriod('today')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedPeriod === 'today'
                  ? 'bg-[#152033] text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod('7d')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedPeriod === '7d'
                  ? 'bg-[#152033] text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              7 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod('30d')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedPeriod === '30d'
                  ? 'bg-[#152033] text-emerald-400 font-bold border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              30 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedPeriod === 'all'
                  ? 'bg-[#152033] text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Toàn thời gian
            </button>
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold text-xs transition shadow-[0_0_16px_rgba(52,211,153,0.35)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Xuất báo cáo</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-[#111724] border border-white/[0.08] shadow-2xl p-1 z-30 text-xs">
                <button
                  type="button"
                  onClick={() => handleExport('csv')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
                >
                  Xuất tệp CSV
                </button>
                <button
                  type="button"
                  onClick={() => handleExport('json')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
                >
                  Xuất tệp JSON Data
                </button>
                <button
                  type="button"
                  onClick={() => handleExport('pdf')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
                >
                  Xuất tệp PDF Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. 4 TOP METRIC CARDS (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Tổng Pageviews */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              TỔNG PAGEVIEWS
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              148,290
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-emerald-400">↗ +18.4%</span>
              <span className="text-[11px] text-slate-400">vs tháng trước</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-emerald-400">
              <Eye className="w-4 h-4" />
            </div>
            {/* Sparkline curve */}
            <svg className="w-16 h-5 text-emerald-400 stroke-current fill-none stroke-[2]" viewBox="0 0 64 20">
              <path d="M 0 16 Q 16 14 32 10 T 64 2" />
            </svg>
          </div>
        </div>

        {/* Card 2: Khách ghé thăm (Unique) */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              KHÁCH GHÉ THĂM (UNIQUE)
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              32,450
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-emerald-400">↗ +12.1%</span>
              <span className="text-[11px] text-slate-400">vs chu kỳ cũ</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
            <svg className="w-16 h-5 text-cyan-400 stroke-current fill-none stroke-[2]" viewBox="0 0 64 20">
              <path d="M 0 18 Q 20 16 40 12 T 64 4" />
            </svg>
          </div>
        </div>

        {/* Card 3: Tỷ lệ Click Demo (CTR) */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              TỶ LỆ CLICK DEMO (CTR)
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white tracking-tight">23.0%</span>
              <span className="text-xs text-slate-400 font-mono">34.1k hits</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-emerald-400">↗ +5.4%</span>
              <span className="text-[11px] text-slate-400">chuyển đổi tốt</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-purple-400">
              <Laptop className="w-4 h-4" />
            </div>
            <svg className="w-16 h-5 text-purple-400 stroke-current fill-none stroke-[2]" viewBox="0 0 64 20">
              <path d="M 0 16 Q 16 12 32 14 T 64 6" />
            </svg>
          </div>
        </div>

        {/* Card 4: Thời gian Onsite trung bình */}
        <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              THỜI GIAN ONSITE TRUNG BÌNH
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              3m 45s
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-emerald-400">↗ +0.8%</span>
              <span className="text-[11px] text-slate-400">duy trì ổn định</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
            <svg className="w-16 h-5 text-emerald-400 stroke-current fill-none stroke-[2]" viewBox="0 0 64 20">
              <path d="M 0 15 Q 20 13 40 14 T 64 12" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. MULTI-CURVE TREND CHART: XU HƯỚNG TƯƠNG TÁC THEO THỜI GIAN */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
        {/* Chart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.05]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Xu hướng tương tác theo thời gian
              </h2>
              <Info className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-300" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              So sánh nhịp độ Pageviews toàn trang và lượt kích hoạt Live Demo
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
              <span className="text-slate-300">Lượt xem trang (Pageviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
              <span className="text-slate-300">Lượt mở Demo (Clicks)</span>
            </div>
          </div>
        </div>

        {/* SVG Interactive Chart Canvas */}
        <div className="relative pt-6 pb-2">
          
          {/* Spike Tooltip Card (at 18 Th10) */}
          {activeTooltip && (
            <div className="absolute left-[54%] top-[14%] -translate-x-1/2 z-20 pointer-events-auto transition-transform hover:scale-105">
              <div className="p-3 rounded-xl bg-[#0d1624]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md space-y-1.5 text-xs min-w-[210px]">
                <div className="flex items-center justify-between gap-2 text-emerald-400 font-bold text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Phát hành Synapse AI v2.4</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTooltip(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center justify-between text-slate-300 text-[11px] font-mono">
                  <span>Views: <strong className="text-white">7,849</strong></span>
                  <span className="text-slate-500">|</span>
                  <span>Demos: <strong className="text-cyan-400">2,110</strong></span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Ngày 18 Tháng 10 • Tăng đột biến 300%
                </div>
              </div>
              <div className="w-2.5 h-2.5 bg-[#0d1624] border-r border-b border-emerald-500/40 rotate-45 mx-auto -mt-1.5" />
            </div>
          )}

          {/* SVG Canvas */}
          <div className="w-full h-64 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240" preserveAspectRatio="none">
              <defs>
                {/* Gradient for Pageviews (Green) */}
                <linearGradient id="pageviewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>

                {/* Gradient for Demo Clicks (Cyan) */}
                <linearGradient id="demosGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="800" y2="90" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="800" y2="140" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="190" x2="800" y2="190" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="230" x2="800" y2="230" stroke="rgba(255,255,255,0.06)" />

              {/* Area 1: Pageviews (Green) */}
              <path
                d="M 0 170 C 120 160 220 140 320 120 C 380 110 440 40 480 40 C 520 40 560 110 640 95 C 720 80 760 70 800 60 L 800 230 L 0 230 Z"
                fill="url(#pageviewsGrad)"
              />
              <path
                d="M 0 170 C 120 160 220 140 320 120 C 380 110 440 40 480 40 C 520 40 560 110 640 95 C 720 80 760 70 800 60"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Area 2: Demo Clicks (Cyan) */}
              <path
                d="M 0 195 C 120 190 220 180 320 165 C 380 155 440 90 480 85 C 520 80 560 140 640 125 C 720 110 760 105 800 95 L 800 230 L 0 230 Z"
                fill="url(#demosGrad)"
              />
              <path
                d="M 0 195 C 120 190 220 180 320 165 C 380 155 440 90 480 85 C 520 80 560 140 640 125 C 720 110 760 105 800 95"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Spike Vertical Marker at x=480 (18 Th10) */}
              <line x1="480" y1="30" x2="480" y2="230" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="480" cy="40" r="5" fill="#10b981" stroke="#070b12" strokeWidth="2" />
              <circle cx="480" cy="85" r="5" fill="#06b6d4" stroke="#070b12" strokeWidth="2" />
            </svg>

            {/* Y-Axis scale labels */}
            <div className="absolute left-2 top-0 bottom-6 flex flex-col justify-between text-[10px] font-mono text-slate-500 pointer-events-none">
              <span>8,000</span>
              <span>6,000</span>
              <span>4,000</span>
              <span>2,000</span>
              <span>0</span>
            </div>
          </div>

          {/* X-Axis date labels */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 px-2">
            <span>01 Th10</span>
            <span>06 Th10</span>
            <span>12 Th10</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              18 Th10 (Spike)
            </span>
            <span>24 Th10</span>
            <span>30 Th10</span>
          </div>
        </div>
      </div>

      {/* 4. MIDDLE GRID: REFERRERS (40%) & TOP PERFORMING PROJECTS (60%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: KÊNH LƯU LƯỢNG (REFERRERS) - 5 COLS */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div>
              <h3 className="font-bold text-white text-sm">
                Kênh lưu lượng (Referrers)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Nguồn điều hướng người dùng trực tiếp
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#111724] border border-white/[0.06] flex items-center justify-center text-slate-400">
              <Share2 className="w-4 h-4" />
            </div>
          </div>

          {/* Progress list */}
          <div className="space-y-3.5 text-xs">
            {referrers.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <div className="font-mono text-slate-400 text-[11px]">
                    <span className="text-white font-semibold">{item.percentage}%</span>{' '}
                    <span>({item.count})</span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bounce rate box */}
          <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.05] flex items-center justify-between text-xs mt-2">
            <div className="flex items-center gap-2 text-slate-400">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Tỷ lệ thoát trang (Bounce Rate):</span>
            </div>
            <div className="font-mono font-bold text-emerald-400">
              28.4% <span className="font-sans text-xs font-normal text-emerald-300">(Tốt)</span>
            </div>
          </div>
        </div>

        {/* RIGHT: DỰ ÁN THỊNH HÀNH (TOP PERFORMING PROJECTS) - 7 COLS */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div>
              <h3 className="font-bold text-white text-sm">
                Dự án thịnh hành (Top Performing Projects)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Xếp hạng theo sức hút tương tác và độ quan tâm của cộng đồng
              </p>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('Xem toàn bộ bảng xếp hạng 18 dự án!')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <span>Chi tiết</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/[0.04] pb-2">
                  <th className="pb-2.5">DỰ ÁN</th>
                  <th className="pb-2.5 text-right">LƯỢT XEM</th>
                  <th className="pb-2.5 text-right">LIVE DEMO</th>
                  <th className="pb-2.5 text-right">STARS</th>
                  <th className="pb-2.5 text-right">TĂNG TRƯỞNG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {topProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-white/[0.02] transition">
                    {/* Project info */}
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-slate-800">
                          <img
                            src={proj.image}
                            alt={proj.name}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white tracking-tight truncate flex items-center gap-1">
                            <span>{proj.name}</span>
                            {proj.isHot && (
                              <Flame className="w-3 h-3 text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">
                            {proj.version}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Views */}
                    <td className="py-3 px-2 text-right font-mono font-medium text-slate-300">
                      {proj.views}
                    </td>

                    {/* Live Demo */}
                    <td className="py-3 px-2 text-right font-mono font-bold text-cyan-400">
                      {proj.demos}
                    </td>

                    {/* Stars */}
                    <td className="py-3 px-2 text-right font-mono text-amber-400">
                      ★ {proj.stars}
                    </td>

                    {/* Growth */}
                    <td className="py-3 pl-2 text-right font-mono font-bold text-emerald-400">
                      {proj.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer status */}
          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Hiển thị 3 / 18 dự án active</span>
            <span className="text-emerald-400 font-semibold">
              Tốc độ chuyển đổi kho code: 31.4%
            </span>
          </div>
        </div>

      </div>

      {/* 5. BOTTOM 3 COLUMNS: DEVICES, RUNTIME/OS, AND TOP GEOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: PHÂN BỐ THIẾT BỊ */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div>
              <h3 className="font-bold text-white text-sm">Phân bố Thiết bị</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tỷ lệ truy cập theo nền tảng phần cứng
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#111724] border border-white/[0.06] flex items-center justify-center text-slate-400">
              <Monitor className="w-4 h-4" />
            </div>
          </div>

          {/* Donut Chart Simulation */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-white/[0.05]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* 82% Desktop (Emerald) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-emerald-400"
                  strokeWidth="8"
                  strokeDasharray="238.76"
                  strokeDashoffset="42.97"
                  strokeLinecap="round"
                  fill="transparent"
                />
                {/* 16% Mobile (Cyan) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  className="stroke-cyan-400"
                  strokeWidth="8"
                  strokeDasharray="238.76"
                  strokeDashoffset="200.55"
                  strokeLinecap="round"
                  fill="transparent"
                  transform="rotate(295 50 50)"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white tracking-tight">82%</span>
                <span className="text-[9px] font-mono tracking-wider uppercase text-slate-400">DESKTOP</span>
              </div>
            </div>
          </div>

          {/* Breakdown items */}
          <div className="space-y-2 text-xs pt-1">
            {devices.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${d.color.split(' ')[1]}`} />
                  <span className="text-slate-300">{d.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: HỆ ĐIỀU HÀNH & TRÌNH DUYỆT */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div>
              <h3 className="font-bold text-white text-sm">Hệ điều hành & Trình duyệt</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Môi trường runtime của lập trình viên
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#111724] border border-white/[0.06] flex items-center justify-center text-slate-400">
              <Laptop className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-4 text-xs pt-1">
            {runtimes.map((rt, i) => (
              <div key={i} className="space-y-1.5 p-2.5 rounded-xl bg-[#090e17] border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-medium">{rt.name}</span>
                  <span className="font-mono font-bold text-white">{rt.percentage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${rt.color}`}
                    style={{ width: `${rt.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Sub Engine telemetry */}
          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>WebKit Engine: 62%</span>
            <span>Blink Engine: 34%</span>
          </div>
        </div>

        {/* CARD 3: QUỐC GIA HÀNG ĐẦU (TOP GEOS) */}
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
            <div>
              <h3 className="font-bold text-white text-sm">Quốc gia hàng đầu</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Khu vực phân bổ người đọc & nhà tuyển dụng
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#111724] border border-white/[0.06] flex items-center justify-center text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3 text-xs pt-1">
            {geos.map((g, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-white/[0.06] text-slate-300">
                      {g.code}
                    </span>
                    <span className="text-slate-200 font-medium">{g.name}</span>
                  </div>
                  <span className="font-mono font-bold text-white">{g.percentage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${g.color}`}
                    style={{ width: `${g.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Hiring recruit alert box */}
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-300 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px]">Tuyển dụng tech từ US/SG:</span>
            </div>
            <span className="font-mono font-bold text-white">14 thư mời</span>
          </div>
        </div>

      </div>

    </div>
  );
};
