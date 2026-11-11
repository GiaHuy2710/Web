import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setStatus('error');
      setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/home/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        setErrorMessage(data?.message || data?.error?.message || 'Đăng ký không thành công. Vui lòng thử lại sau.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
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
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span className="text-emerald-400">⚡</span>
            <span className="tracking-wide">Stay in the loop</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Nhận thông báo khi ra mắt tool mới
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Không spam. Chỉ gửi email tóm tắt kỹ thuật, demo video và repo GitHub các tiện ích mã nguồn mở tôi phát hành định kỳ hàng tháng.
          </p>
        </div>

        {/* Right Input Form */}
        <div className="w-full lg:w-[480px]">
          {status === 'success' ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-300 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Cảm ơn bạn! Đã đăng ký nhận bản tin thành công.</span>
              </div>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-xs text-emerald-400 underline font-semibold hover:text-emerald-300 cursor-pointer"
              >
                Nhập lại
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="nhap.email.cua.ban@domain.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#111827]/90 text-sm text-white placeholder-slate-500 border transition outline-none focus:ring-2 ${
                      status === 'error'
                        ? 'border-rose-500/60 focus:ring-rose-500/30'
                        : 'border-white/[0.1] focus:border-emerald-500/50 focus:ring-emerald-500/20'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Đăng ký</span>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 pl-1 pt-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
