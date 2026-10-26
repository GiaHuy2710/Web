import React, { useState } from 'react';
import {
  Smartphone,
  Key,
} from 'lucide-react';

interface AdminProfileTabProps {
  onShowToast: (msg: string) => void;
}

export const AdminProfileTab: React.FC<AdminProfileTabProps> = ({ onShowToast }) => {
  const [fullName, setFullName] = useState('Alex Nguyen');
  const [email, setEmail] = useState('alex.nguyen@devfolio.dev');
  const [title, setTitle] = useState('Senior Staff Fullstack Architect');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Đã lưu thông tin hồ sơ quản trị viên Alex Nguyen.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Profile Header Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0b101b] border border-white/[0.08] shadow-xl">
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Alex Nguyen"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b101b]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">{fullName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    SUPER ADMIN (ROOT)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{title}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-1">
                  <span>ID: usr_staff_root_001</span>
                  <span>•</span>
                  <span>IP: 118.69.12.98 (HCMC, VN)</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)] self-start sm:self-auto"
            >
              Cập nhật hồ sơ
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                HỌ VÀ TÊN
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                EMAIL QUẢN TRỊ
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                CHỨC DANH / ROLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                MÚI GIỜ HỆ THỐNG
              </label>
              <input
                type="text"
                readOnly
                value="Asia/Ho_Chi_Minh (GMT+7)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a12] border border-white/[0.08] text-slate-400 font-mono"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Security & 2FA Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 2FA Card */}
        <div className="p-5 rounded-2xl bg-[#0b101b] border border-white/[0.08] space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-white text-xs">
                Xác thực 2 yếu tố (2FA / TOTP)
              </h4>
            </div>
            <button
              type="button"
              onClick={() => {
                const nextVal = !is2FAEnabled;
                setIs2FAEnabled(nextVal);
                onShowToast(
                  nextVal
                    ? 'Đã kích hoạt xác thực 2 yếu tố 2FA/TOTP.'
                    : 'Đã tạm thời tắt xác thực 2FA.'
                );
              }}
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold cursor-pointer transition ${
                is2FAEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {is2FAEnabled ? 'ĐÃ BẬT' : 'ĐÃ TẮT'}
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Tài khoản được bảo vệ bằng ứng dụng Google Authenticator và khóa phần cứng YubiKey 5C NFC.
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 font-mono">
              Khóa khôi phục dự phòng: 8/8 còn lại
            </span>
            <button
              type="button"
              onClick={() =>
                onShowToast('Mã khôi phục 2FA đã được gửi an toàn về email.')
              }
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
            >
              Xem mã dự phòng
            </button>
          </div>
        </div>

        {/* SSH Keys Card */}
        <div className="p-5 rounded-2xl bg-[#0b101b] border border-white/[0.08] space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-cyan-400" />
              <h4 className="font-bold text-white text-xs">
                Khóa SSH Public Key (GitOps)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">
              ed25519
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#060a12] border border-white/[0.06] text-[11px] font-mono text-slate-300 truncate">
            ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... alex@macbook-pro
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500 font-mono">
              Thêm vào ngày 15/09/2026
            </span>
            <button
              type="button"
              onClick={() => onShowToast('Mở trình thêm SSH Key mới...')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
            >
              Quản lý SSH Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
