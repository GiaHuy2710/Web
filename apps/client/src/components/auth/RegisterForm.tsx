import React, { useState } from 'react';
import axios from 'axios';
import { 
  Contact, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { authApi } from '../../shared/api';
import { AuthUser } from '../../types/auth';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: (user?: AuthUser) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Input fields
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Checkboxes
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = fullname.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2) {
      setError('Họ và tên hoặc Nickname phải từ 2 ký tự trở lên.');
      return;
    }

    if (!trimmedEmail) {
      setError('Vui lòng nhập địa chỉ email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Địa chỉ email không đúng định dạng.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }

    if (!agreeTerms) {
      setError('Bạn cần đồng ý với Điều khoản & Chính sách để tiếp tục.');
      return;
    }

    setIsLoading(true);
    try {
      // Gọi qua tầng Service Frontend riêng biệt
      const data = await authApi.register({
        fullName: trimmedName,
        email: trimmedEmail,
        password,
        role: 'USER',
      });

      if (data?.token && data?.user) {
        authApi.saveSession(data.token, data.user);
      }

      if (onSuccess) {
        onSuccess(data?.user);
      }
    } catch (err: unknown) {
      console.error('Lỗi đăng ký:', err);
      let apiMessage = 'Đăng ký không thành công. Email này có thể đã được đăng ký.';
      if (axios.isAxiosError(err)) {
        apiMessage =
          err.response?.data?.error?.message ||
          err.response?.data?.message ||
          (err.code === 'ERR_NETWORK'
            ? 'Không thể kết nối máy chủ API (Server có thể chưa khởi động).'
            : apiMessage);
      }
      setError(apiMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-slate-200">
      {/* 1. Tiêu đề */}
      <div className="text-left mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Tham gia cộng đồng DevFolio
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
          Tạo tài khoản để chia sẻ dự án cá nhân, đánh giá mã nguồn mở và tương tác cùng hàng ngàn kỹ sư.
        </p>
      </div>

      {/* Thông báo lỗi */}
      {error && (
        <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* 2. Social Register (2 cột song song) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setError('Tính năng đăng ký qua GitHub đang được cập nhật.')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-3 bg-[#131b26] hover:bg-[#182332] border border-[#1e2d3e] rounded-xl text-xs font-medium text-slate-200 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => setError('Tính năng đăng ký qua Google đang được cập nhật.')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-3 bg-[#131b26] hover:bg-[#182332] border border-[#1e2d3e] rounded-xl text-xs font-medium text-slate-200 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Google</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-[#1a2634] w-full"></div>
        <span className="bg-[#0b1016] px-3 text-[11px] text-slate-500 font-medium">
          hoặc đăng ký bằng email
        </span>
      </div>

      {/* 3. Form fields */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Họ tên */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-slate-300">Họ và tên / Nickname</label>
            <span className="text-[11px] text-slate-500">Bắt buộc</span>
          </div>
          <div className="relative">
            <Contact className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
                if (error) setError(null);
              }}
              placeholder="VD: Alex Nguyen (@alexdev)"
              disabled={isLoading}
              className="w-full bg-[#0e1620] border border-[#1d2a38] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-slate-300">Email công việc hoặc cá nhân</label>
            <span className="text-[11px] text-slate-500 font-mono">alex@domain.com</span>
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="alex@domain.com"
              disabled={isLoading}
              className="w-full bg-[#0e1620] border border-[#1d2a38] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-slate-300">Mật khẩu</label>
            <span className="text-xs font-medium text-emerald-400">
              {password.length >= 10 ? 'Rất mạnh' : password.length >= 6 ? 'Đạt chuẩn' : 'Tối thiểu 6 ký tự'}
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              placeholder="••••••••••••••••"
              disabled={isLoading}
              className="w-full bg-[#0e1620] border border-[#1d2a38] rounded-xl pl-10 pr-10 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-500 hover:text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-2">
            <div className={`h-1 rounded-full ${password.length >= 2 ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
            <div className={`h-1 rounded-full ${password.length >= 6 ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
            <div className={`h-1 rounded-full ${password.length >= 10 ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
            <div className={`h-1 rounded-full ${password.length >= 12 ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
          </div>
        </div>

        {/* Nhập lại mật khẩu */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Nhập lại mật khẩu</label>
          <div className="relative">
            <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError(null);
              }}
              placeholder="••••••••••••••••"
              disabled={isLoading}
              className="w-full bg-[#0e1620] border border-[#1d2a38] rounded-xl pl-10 pr-10 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-500 hover:text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 pt-1">
          <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer select-none">
            <button
              type="button"
              onClick={() => setAgreeTerms(!agreeTerms)}
              className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                agreeTerms ? 'bg-emerald-400 text-slate-950' : 'border border-[#2a3c4e] bg-[#0e1620]'
              }`}
            >
              {agreeTerms && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span className="leading-snug text-[11px]">
              Tôi đồng ý với <a href="#terms" className="text-emerald-400 hover:underline">Điều khoản</a> & <a href="#privacy" className="text-emerald-400 hover:underline">Chính sách</a>.
            </span>
          </label>

          <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer select-none">
            <button
              type="button"
              onClick={() => setSubscribeNewsletter(!subscribeNewsletter)}
              className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                subscribeNewsletter ? 'bg-emerald-400 text-slate-950' : 'border border-[#2a3c4e] bg-[#0e1620]'
              }`}
            >
              {subscribeNewsletter && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span className="leading-snug text-[11px]">
              Nhận bản tin tóm tắt dự án mã nguồn mở & AI hàng tuần.
            </span>
          </label>
        </div>

        {/* Nút Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-3 py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(52,211,153,0.35)] transition-all cursor-pointer text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
              <span>Đang tạo tài khoản...</span>
            </>
          ) : (
            <>
              <span>Tạo tài khoản miễn phí</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-4 text-center text-xs">
        <p className="text-slate-400">
          Đã có tài khoản?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-emerald-400 font-medium hover:underline cursor-pointer"
          >
            Đăng nhập ngay
          </button>
        </p>
      </div>

      <p className="mt-8 text-center text-[11px] text-slate-500 leading-relaxed">
        Bằng việc tiếp tục, bạn đồng ý với{' '}
        <span className="underline cursor-pointer hover:text-slate-400">Điều khoản dịch vụ</span> và{' '}
        <span className="underline cursor-pointer hover:text-slate-400">Chính sách quyền riêng tư</span> của DevFolio.
      </p>
    </div>
  );
};