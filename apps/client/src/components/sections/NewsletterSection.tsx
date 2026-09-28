import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

type SimulationState = 'default' | 'success' | 'error';

export const NewsletterSection: React.FC = () => {
  const [simulationState, setSimulationState] = useState<SimulationState>('default');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSimulationState('error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSimulationState('success');
    }, 600);
  };

  const handleReset = (state: SimulationState) => {
    setSimulationState(state);
    if (state === 'default') {
      setEmail('');
    } else if (state === 'error') {
      setEmail('invalid-email-address');
    } else if (state === 'success') {
      setEmail('developer@devfolio.io');
    }
  };

  return (
    <section id="contact" className="my-14 rounded-3xl bg-[#0c121d] border border-white/[0.08] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left Information Area */}
        <div className="max-w-xl space-y-3">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span className="text-emerald-400">⚡</span>
            <span className="tracking-wide">Stay in the loop</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Nhận thông báo khi ra mắt tool mới
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Không spam. Chỉ gửi email tóm tắt kỹ thuật, demo video và repo GitHub các tiện ích mã nguồn mở tôi phát hành định kỳ hàng tháng.
          </p>

        </div>

        {/* Right Simulation & Input Form */}
        <div className="w-full lg:w-[480px] space-y-4">
          
          {/* Simulation Mode Toggle Bar */}
          <div className="flex items-center justify-start lg:justify-end gap-2 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Mô phỏng:</span>
            
            <button
              type="button"
              onClick={() => handleReset('default')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                simulationState === 'default'
                  ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Mặc định
            </button>

            <button
              type="button"
              onClick={() => handleReset('success')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                simulationState === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Thành công
            </button>

            <button
              type="button"
              onClick={() => handleReset('error')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                simulationState === 'error'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Lỗi email
            </button>
          </div>

          {/* Form and Status Displays */}
          {simulationState === 'success' ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-300 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Tuyệt vời! Đã đăng ký nhận bản tin kỹ thuật thành công.</span>
              </div>
              <button
                onClick={() => handleReset('default')}
                className="text-xs text-emerald-400 underline font-semibold hover:text-emerald-300"
              >
                Nhập lại
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                
                {/* Email Input Field */}
                <div className="relative w-full flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (simulationState === 'error') setSimulationState('default');
                    }}
                    placeholder="nhap.email.cua.ban@domain.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827]/90 text-sm text-white placeholder-slate-500 border transition outline-none focus:ring-2 ${
                      simulationState === 'error'
                        ? 'border-rose-500/60 focus:ring-rose-500/30'
                        : 'border-white/[0.1] focus:border-emerald-500/50 focus:ring-emerald-500/20'
                    }`}
                  />
                </div>

                {/* Submit Mint Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Đăng ký</span>
                  )}
                </button>
              </div>

              {simulationState === 'error' && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 pl-1 pt-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Vui lòng nhập định dạng email hợp lệ (ví dụ: alex@domain.com).</span>
                </div>
              )}
            </form>
          )}

        </div>

      </div>

    </section>
  );
};
