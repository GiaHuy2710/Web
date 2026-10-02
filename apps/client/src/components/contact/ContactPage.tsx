import React, { useState } from 'react';
import { 
  Zap, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  Clock, 
  Github, 
  Linkedin, 
  Send, 
  ChevronDown, 
  ShieldCheck, 
  ExternalLink, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Sliders
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  // State chuyển đổi xem trước trạng thái Form: 'default' | 'success' | 'validation_error'
  const [formStatePreview, setFormStatePreview] = useState<'default' | 'success' | 'validation_error'>('default');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Thuê làm dự án (Project Development / MVP)');
  const [budget, setBudget] = useState('$2,000 - $5,000');
  const [message, setMessage] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; message?: string }>({});

  // State tương tác khác
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion state cho mục FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const budgetOptions = [
    '< $2,000',
    '$2,000 - $5,000',
    '$5,000 - $10,000',
    'Thỏa thuận'
  ];

  const faqs = [
    {
      q: 'Quy trình làm việc thường diễn ra như thế nào?',
      a: 'Quy trình gồm 4 giai đoạn chuẩn Agile: 1. Khảo sát nhu cầu kỹ thuật & ký thỏa thuận bảo mật NDA -> 2. Thiết kế kiến trúc giải pháp & lập kế hoạch chi tiết -> 3. Triển khai theo từng Sprint 1-2 tuần kèm demo liên tục -> 4. Kiểm thử bảo mật, triển khai hạ tầng CI/CD và bàn giao toàn bộ mã nguồn.'
    },
    {
      q: 'Bạn nhận thanh toán và hợp đồng theo hình thức nào?',
      a: 'Linh hoạt theo hợp đồng pháp nhân công ty hoặc cá nhân. Thanh toán chia đều theo 3 mốc bàn giao dự án (Milestones: 30% khởi động - 40% hoàn thiện tính năng cốt lõi - 30% nghiệm thu & chuyển giao). Hỗ trợ chuyển khoản ngân hàng hoặc thanh toán quốc tế.'
    },
    {
      q: 'Có hỗ trợ bảo trì sau khi bàn giao không?',
      a: 'Tất cả các sản phẩm được bảo hành kỹ thuật, vá lỗi bảo mật và theo dõi uptime miễn phí từ 1 đến 3 tháng sau ngày bàn giao chính thức. Sau thời gian trên, tôi cung cấp gói Service Level Agreement (SLA) định kỳ theo yêu cầu.'
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alex.nguyen@techcorp.io');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePreviewStateChange = (state: 'default' | 'success' | 'validation_error') => {
    setFormStatePreview(state);
    if (state === 'validation_error') {
      setErrors({
        fullName: 'Vui lòng nhập họ và tên của bạn',
        email: 'Địa chỉ email không đúng định dạng',
        message: 'Nội dung tin nhắn không được để trống'
      });
    } else {
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; email?: string; message?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn';
    }
    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Địa chỉ email không đúng định dạng';
    }
    if (!message.trim()) {
      newErrors.message = 'Nội dung tin nhắn không được để trống';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormStatePreview('validation_error');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatePreview('success');
    }, 800);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setFormStatePreview('default');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 font-sans pb-16">
      
      {/* 1. Header Banner & Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        
        {/* Hàng 2 Badge trên đầu */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Đang nhận dự án mới (Available for Q2/Q3 2025)</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-300">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Thời gian phản hồi dự kiến: Dưới 12 tiếng</span>
          </div>
        </div>

        {/* Tiêu đề trang */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
            CONNECT & COLLABORATE
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Làm việc cùng tôi
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Bạn có ý tưởng dự án mới, cần tư vấn kiến trúc phần mềm hoặc muốn hợp tác kỹ thuật cao? Hãy gửi tin nhắn chi tiết bên dưới.
          </p>
        </div>

      </div>

      {/* 2. Main 2-Column Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================
              CỘT TRÁI: FORM LIÊN HỆ (7 / 12)
             ======================================================== */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Bộ điều khiển xem trước 3 trạng thái Form */}
            <div className="p-3 bg-[#0d141e] border border-[#1b2636] rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>TRẠNG THÁI FORM:</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePreviewStateChange('default')}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    formStatePreview === 'default'
                      ? 'bg-[#182433] text-white border border-white/10 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1. Mặc định
                </button>

                <button
                  type="button"
                  onClick={() => handlePreviewStateChange('success')}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    formStatePreview === 'success'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2. Gửi thành công
                </button>

                <button
                  type="button"
                  onClick={() => handlePreviewStateChange('validation_error')}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    formStatePreview === 'validation_error'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3. Lỗi validate
                </button>
              </div>
            </div>

            {/* Container Form Chính */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0f16] border border-[#1b2636] shadow-2xl">
              
              {formStatePreview === 'success' ? (
                /* Giao diện trạng thái 2: Gửi thành công */
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Tin nhắn đã được gửi thành công!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                    Cảm ơn bạn đã liên hệ. Tôi đã nhận được thông tin dự án và sẽ phản hồi lại qua email <span className="text-emerald-400 font-mono font-medium">{email || 'của bạn'}</span> trong vòng dưới 12 tiếng.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#141e2b] hover:bg-[#1a2736] border border-white/10 text-xs font-semibold text-white transition cursor-pointer"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                /* Giao diện form nhập liệu */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Hàng Họ tên & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Họ và tên <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="VD: Nguyễn Văn A"
                        className={`w-full bg-[#070b10] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition ${
                          errors.fullName 
                            ? 'border border-rose-500/60 focus:border-rose-400' 
                            : 'border border-[#1a2636] focus:border-emerald-500'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Địa chỉ Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className={`w-full bg-[#070b10] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition ${
                          errors.email 
                            ? 'border border-rose-500/60 focus:border-rose-400' 
                            : 'border border-[#1a2636] focus:border-emerald-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Loại yêu cầu hợp tác */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Loại yêu cầu hợp tác
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        Chọn 1 phân loại
                      </span>
                    </div>

                    <div className="relative">
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full appearance-none bg-[#070b10] border border-[#1a2636] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition cursor-pointer"
                      >
                        <option value="Thuê làm dự án (Project Development / MVP)">
                          Thuê làm dự án (Project Development / MVP)
                        </option>
                        <option value="Tư vấn kiến trúc hệ thống (System Architecture Advisory)">
                          Tư vấn kiến trúc hệ thống (System Architecture Advisory)
                        </option>
                        <option value="Tối ưu hiệu năng & Database (Performance Optimization)">
                          Tối ưu hiệu năng & Database (Performance Optimization)
                        </option>
                        <option value="Khác / Trao đổi kỹ thuật (Other Technical Inquiry)">
                          Khác / Trao đổi kỹ thuật (Other Technical Inquiry)
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Ngân sách dự kiến */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Ngân sách dự kiến (Optional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`py-2 px-3 rounded-xl border text-xs font-mono transition cursor-pointer text-center ${
                            budget === opt
                              ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold shadow-sm'
                              : 'bg-[#070b10] border-[#1a2636] text-slate-400 hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nội dung tin nhắn */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Nội dung tin nhắn <span className="text-emerald-400">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        &lt;&gt; Markdown hỗ trợ
                      </span>
                    </div>

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mô tả ngắn gọn về bài toán, phạm vi dự án hoặc ý tưởng hợp tác..."
                      rows={5}
                      className={`w-full bg-[#070b10] rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition resize-none ${
                        errors.message 
                          ? 'border border-rose-500/60 focus:border-rose-400' 
                          : 'border border-[#1a2636] focus:border-emerald-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Nút Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(52,211,153,0.35)] transition cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Đang gửi tin nhắn...' : 'Gửi tin nhắn ngay'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  {/* Cam kết bảo mật dưới nút */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-2 font-mono">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Cam kết bảo mật thông tin. Không chia sẻ email cho bên thứ ba.</span>
                  </div>

                </form>
              )}

            </div>
          </div>


          {/* ========================================================
              CỘT PHẢI: THÔNG TIN TRỰC TIẾP & FAQ (5 / 12)
             ======================================================== */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1. Card: Email trực tiếp */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                  <span className="text-emerald-400">✉️</span>
                  <span>EMAIL TRỰC TIẾP</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Primary
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#070b10] border border-[#16212e] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-semibold truncate">alex.nguyen@techcorp.io</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ml-2 text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition cursor-pointer shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Thích hợp cho các yêu cầu NDA, hợp đồng hoặc tài liệu kỹ thuật đính kèm.
              </p>
            </div>

            {/* 2. Card: Đặt lịch trao đổi nhanh */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ĐẶT LỊCH TRAO ĐỔI NHANH</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-bold text-white">
                  Cuộc gọi 15 phút (Google Meet / Cal.com)
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Trao đổi sơ bộ về định hướng kiến trúc, thời gian triển khai và ước tính chi phí trước khi bắt đầu.
                </p>
              </div>

              <a
                href="https://cal.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#121c27] hover:bg-[#182535] border border-[#1f2f42] text-xs font-semibold text-cyan-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Đặt lịch hẹn trực tiếp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3. Hàng 2 ô Vị trí & Khung giờ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VỊ TRÍ LÀM VIỆC</span>
                </div>
                <div className="font-bold text-xs text-white">TP. Hồ Chí Minh / Hà Nội</div>
                <div className="text-[10px] text-slate-400">Remote &amp; Onsite linh hoạt</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>KHUNG GIỜ LÀM VIỆC</span>
                </div>
                <div className="font-bold text-xs text-white">9:00 - 21:00</div>
                <div className="text-[10px] text-slate-400">Thứ Hai - Thứ Bảy (GMT+7)</div>
              </div>
            </div>

            {/* 4. Kênh liên hệ trực tiếp & Mã nguồn */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400">
                KÊNH LIÊN HỆ TRỰC TIẾP &amp; MÃ NGUỒN
              </div>

              <div className="space-y-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#070b10] hover:bg-[#0e1622] border border-[#16212e] flex items-center justify-between text-xs transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    <div>
                      <div className="font-bold text-white">GitHub</div>
                      <div className="text-[11px] text-slate-500">github.com/alexdev • Xem mã nguồn &amp; commits</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#070b10] hover:bg-[#0e1622] border border-[#16212e] flex items-center justify-between text-xs transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                    <div>
                      <div className="font-bold text-white">LinkedIn</div>
                      <div className="text-[11px] text-slate-500">linkedin.com/in/alexnguyen-swe</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                </a>

                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#070b10] hover:bg-[#0e1622] border border-[#16212e] flex items-center justify-between text-xs transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Telegram / X</div>
                      <div className="text-[11px] text-slate-500">@alex_systemflow • Nhắn tin nhanh</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* 5. Câu hỏi thường gặp (Accordion FAQ) */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1a2533] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                <span>❓</span>
                <span>Câu hỏi thường gặp</span>
              </div>

              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#16212e] bg-[#070b10] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                      className="w-full p-3 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white transition cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                          openFaqIndex === i ? 'rotate-180 text-emerald-400' : ''
                        }`}
                      />
                    </button>

                    {openFaqIndex === i && (
                      <div className="px-3 pb-3 text-[11px] text-slate-400 leading-relaxed border-t border-white/[0.04] pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 3. Bottom Banner: Sẵn sàng ký kết thỏa thuận bảo mật (NDA) */}
        <div className="mt-10 p-5 rounded-2xl bg-[#0b1017] border border-[#1a2533] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-white">
                Sẵn sàng ký kết thỏa thuận bảo mật (NDA)
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Tôi tôn trọng và bảo vệ tuyệt đối bản quyền trí tuệ, cơ sở dữ liệu và ý tưởng khởi nghiệp của bạn.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              PGP Key Verified
            </span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Audit Ready
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
