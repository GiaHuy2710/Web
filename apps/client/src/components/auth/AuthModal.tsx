import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  ArrowLeft, 
  Star, 
  Copy, 
  Lock, 
  Cpu
} from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthUser } from '../../types/auth';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  onLoginSuccess?: (user?: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'login',
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  // Phím ESC để đóng
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyCode = () => {
    const code = `let pipeline = SynapseEngine::init();
match pipeline.query_vector(tensor).await {
  Ok(embed) => Ok(embed.cos_sim()),
  Err(e) => panic!("{:?}", e)
}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAuthSuccess = (user?: AuthUser) => {
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070b10] flex overflow-y-auto">
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        
        {/* =========================================
            CỘT TRÁI: SHOWCASE HỆ SINH THÁI KỸ THUẬT
           ========================================= */}
        <div className="lg:w-[52%] xl:w-[50%] p-6 sm:p-10 lg:p-14 bg-[#090e15] border-b lg:border-b-0 lg:border-r border-[#15202c] flex flex-col justify-between relative overflow-hidden">
          
          {/* Hiệu ứng hào quang nền mờ */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* 1. Header Cột Trái */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">DevFolio</span>
              <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                v2.4
              </span>
            </div>

            {/* Live Ecosystem Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111c26] border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Ecosystem</span>
            </div>
          </div>

          {/* 2. Nội dung chính: Slogan & Thẻ code Synapse AI */}
          <div className="relative z-10 my-10 lg:my-auto max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white leading-tight tracking-tight">
              Khám phá và lưu lại các sản phẩm số,{' '}
              <span className="text-emerald-400">công cụ AI mã nguồn mở.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
              Nền tảng danh bạ & portfolio kỹ thuật kết nối cộng đồng kỹ sư, indie hackers và nhà phát triển công nghệ cao.
            </p>

            {/* Thẻ preview dự án: Synapse AI */}
            <div className="mt-8 bg-[#0d141e]/90 border border-[#1e2d3e] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
              
              {/* Header của card */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Synapse AI</span>
                      <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                        v2.4.0
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Production Ready • Vector Embedding Pipeline</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141e2b] border border-[#223347] text-xs font-mono text-emerald-400/90">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>2.8k</span>
                </div>
              </div>

              {/* Khung Code Editor */}
              <div className="bg-[#070b10] border border-[#192636] rounded-xl overflow-hidden font-mono text-xs">
                {/* Thanh tab engine.rs */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-[#0a1017] border-b border-[#192636] text-slate-400 text-[11px]">
                  <span>engine.rs</span>
                  <button 
                    onClick={handleCopyCode}
                    className="hover:text-white transition flex items-center gap-1 cursor-pointer"
                    title="Sao chép mã"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Đã sao chép' : ''}</span>
                  </button>
                </div>

                {/* Nội dung code có syntax highlight */}
                <div className="p-3.5 leading-relaxed text-slate-300 overflow-x-auto">
                  <div>
                    <span className="text-purple-400">let</span> pipeline = <span className="text-emerald-400">SynapseEngine</span>::<span className="text-sky-300">init</span>();
                  </div>
                  <div>
                    <span className="text-purple-400">match</span> pipeline.<span className="text-sky-300">query_vector</span>(tensor).<span className="text-purple-400">await</span> {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-emerald-400">Ok</span>(embed) =&gt; <span className="text-emerald-400">Ok</span>(embed.<span className="text-sky-300">cos_sim</span>()),
                  </div>
                  <div className="pl-4">
                    <span className="text-rose-400">Err</span>(e) =&gt; <span className="text-rose-400">panic!</span>(<span className="text-amber-300">"{'{:?}'}"</span>, e)
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>

              {/* Tags & Độ trễ */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#131c28] border border-[#1e2d3e] text-slate-300">Rust</span>
                  <span className="px-2 py-0.5 rounded bg-[#131c28] border border-[#1e2d3e] text-slate-300">Next.js 15</span>
                  <span className="px-2 py-0.5 rounded bg-[#131c28] border border-[#1e2d3e] text-slate-300">Qdrant DB</span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>99.98% Latency &lt; 4ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Footer Cột Trái: Thông số kỹ thuật */}
          <div className="relative z-10 pt-6 border-t border-[#15202c] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Mã hóa TLS 1.3 End-to-End</span>
            </div>
            <div>
              <span>24+ Dự án đã thẩm định</span>
            </div>
            <div>
              <span>100% Zero-telemetry</span>
            </div>
            <div className="text-right sm:text-left">
              <span>REGION: SIN-1</span>
            </div>
          </div>
        </div>

        {/* =========================================
            CỘT PHẢI: FORM ĐĂNG NHẬP / ĐĂNG KÝ
           ========================================= */}
        <div className="lg:w-[48%] xl:w-[50%] p-6 sm:p-10 lg:p-14 bg-[#070b10] flex flex-col justify-between min-h-screen">
          
          {/* Top Bar: Về trang chủ & Segmented Tab */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Về trang chủ</span>
            </button>

            {/* Pill switcher */}
            <div className="p-1 bg-[#101722] border border-[#1d2b3b] rounded-xl flex items-center">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-[#1b2736] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Đăng nhập
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-[#1b2736] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Đăng ký
              </button>
            </div>
          </div>

          {/* Form nội dung */}
          <div className="my-auto py-4">
            {activeTab === 'login' ? (
              <LoginForm 
                onSwitchToRegister={() => setActiveTab('register')} 
                onSuccess={handleAuthSuccess}
              />
            ) : (
              <RegisterForm 
                onSwitchToLogin={() => setActiveTab('login')} 
                onSuccess={handleAuthSuccess}
              />
            )}
          </div>

          {/* Bottom spacer for balance */}
          <div className="hidden lg:block h-4" />
        </div>

      </div>
    </div>
  );
};
