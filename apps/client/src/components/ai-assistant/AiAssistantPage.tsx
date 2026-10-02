import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  ArrowRight, 
  ExternalLink, 
  Mic, 
  Wand2, 
  Baby, 
  Utensils, 
  BookOpen, 
  ShoppingBag, 
  ShieldAlert, 
  Bot, 
  Heart
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  time: string;
  text?: string;
  isMetaphor?: boolean;
  metaphorData?: {
    title: string;
    subtitle: string;
    boxes: {
      role: string;
      desc: string;
      avatar: string;
      highlight?: boolean;
    }[];
    explanation: string;
    takeaway: string;
  };
}

export const AiAssistantPage: React.FC = () => {
  // Chế độ giải thích: người mới tinh / cơ bản / chuyên sâu
  const [audienceMode, setAudienceMode] = useState<'beginner' | 'basic' | 'expert'>('beginner');
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Danh sách hội thoại mẫu
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      time: '18:24',
      text: 'API là cái gì vậy bạn? Nghe lập trình viên với mấy bạn IT nói suốt ngày mà mình không hiểu gì cả. Có thể giải thích như đang nói chuyện với người 5 tuổi được không?'
    },
    {
      id: '2',
      sender: 'ai',
      time: '18:24',
      isMetaphor: true,
      metaphorData: {
        title: 'Hãy tưởng tượng bạn đang đi ăn ở một quán phở! 🍜',
        subtitle: 'Rất vui vì bạn đã hỏi câu này! Đừng cảm thấy ngại, thực ra API không hề huyền bí hay phức tạp như mọi người hay dọa đâu. Nó đơn giản như sau:',
        boxes: [
          {
            role: 'BẠN LÀ KHÁCH HÀNG',
            desc: 'Là màn hình app trên điện thoại của bạn đang mở.',
            avatar: '📱'
          },
          {
            role: 'NGƯỜI BỒI BÀN LÀ API',
            desc: 'Mang tờ gọi món vào bếp, rồi bưng tô phở nóng quay lại bàn.',
            avatar: '🧑‍💼',
            highlight: true
          },
          {
            role: 'NHÀ BẾP LÀ HỆ THỐNG (SERVER)',
            desc: 'Nơi cất giữ thịt bánh, kho dữ liệu và thực hiện nấu nướng.',
            avatar: '👨‍🍳'
          }
        ],
        explanation: 'Bạn không cần phải tự mình chạy bổ vào bếp lục tủ lạnh xem còn thịt bò không (vừa nguy hiểm, vừa rối loạn). Bạn chỉ cần bảo với người phục vụ: “Cho một tô tái nạm”. Người phục vụ (API) sẽ làm việc với nhà bếp và mang kết quả ra cho bạn!',
        takeaway: 'API là người đưa thư / bồi bàn trung gian giúp các ứng dụng nói chuyện và xin dữ liệu của nhau một cách trật tự, an toàn.'
      }
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Bộ câu hỏi nhanh thực tế
  const quickQuestions = [
    {
      id: 'q1',
      icon: <Utensils className="w-4 h-4 text-cyan-400" />,
      tag: 'Cơ bản về Web',
      tagColor: 'text-cyan-400',
      title: 'Backend và Frontend là gì? Ví von như nhà hàng?',
      desc: 'Bồi bàn bưng bê hay đầu bếp trong bếp đóng vai trò gì?',
      userText: 'Backend và Frontend khác nhau như thế nào? Ví von như nhà hàng giúp mình với!',
      aiReply: {
        title: 'Nhà hàng công nghệ: Bàn ăn (Frontend) & Gian bếp (Backend) 🍽️',
        subtitle: 'Một trang web hay ứng dụng điện thoại thực chất giống như một quán ăn cao cấp:',
        boxes: [
          {
            role: 'FRONTEND (BÀN ĂN & KHÔNG GIAN)',
            desc: 'Tất cả những gì mắt bạn nhìn thấy: bàn ghế đẹp, menu lung linh, đèn sáng, nhạc êm dịu.',
            avatar: '🎨',
            highlight: true
          },
          {
            role: 'BACKEND (GIAN BẾP BÊN TRONG)',
            desc: 'Bếp ga, kho trữ thực phẩm đông lạnh, công thức nấu bí truyền và thớt dao cắt gọt.',
            avatar: '🍳'
          },
          {
            role: 'KẾT NỐI (ĐƯỜNG TRUYỀN DỮ LIỆU)',
            desc: 'Khách chỉ việc bấm nút trên bàn, thức ăn được bếp nấu xong chuyển thẳng ra đĩa.',
            avatar: '⚡'
          }
        ],
        explanation: 'Lập trình viên Frontend chăm chút giao diện cho bạn bấm sướng tay, còn lập trình viên Backend lo tính tiền đúng, lưu tài khoản không bị hacker trộm mất.',
        takeaway: 'Frontend là bộ mặt giao diện bên ngoài, Backend là bộ não lưu trữ logic và dữ liệu bên trong.'
      }
    },
    {
      id: 'q2',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
      tag: 'Tính năng DevFolio',
      tagColor: 'text-emerald-400',
      title: 'Synapse AI hoạt động thế nào nếu ví như trợ lý thư viện?',
      desc: 'Tìm kiếm sách siêu tốc mà không cần đọc hết từ 1 đến vạn.',
      userText: 'Synapse AI hoạt động thế nào? Hãy ví von nó như một người thủ thư siêu năng lực.',
      aiReply: {
        title: 'Thủ thư thần kỳ trong kho tàng 500,000 cuốn sách 📚',
        subtitle: 'Khi bạn lạc vào một thư viện quốc gia rộng bạt ngàn chứa hàng trăm ngàn đầu sách lập trình:',
        boxes: [
          {
            role: 'CÁCH TRUYỀN THỐNG (TỰ ĐỌC)',
            desc: 'Bạn phải lật từng trang của 500 cuốn sách chỉ để tìm 1 câu định nghĩa (mất cả tuần).',
            avatar: '😫'
          },
          {
            role: 'SYNAPSE AI (THỦ THƯ TRÍ TUỆ NHÂN TẠO)',
            desc: 'Đã thuộc lòng bản đồ mọi giá sách, phân loại theo ý nghĩa ngữ nghĩa (Vector).',
            avatar: '🤖',
            highlight: true
          },
          {
            role: 'KẾT QUẢ TỨC THÌ (DƯỚI 400MS)',
            desc: 'Bạn vừa hỏi câu đầu tiên, thủ thư đã bay tới rút đúng cuốn sách, mở sẵn trang cần đọc.',
            avatar: '✨'
          }
        ],
        explanation: 'Synapse AI không đọc code như con người từng dòng, mà dịch toàn bộ code thành các toạ độ ý nghĩa. Do đó nó tìm câu trả lời chính xác từng dòng chỉ trong 380 miligiây.',
        takeaway: 'Synapse AI là công cụ chỉ mục thông minh giúp kỹ sư tra cứu vị trí code và hiểu logic dự án ngay tức khắc.'
      }
    },
    {
      id: 'q3',
      icon: <ShoppingBag className="w-4 h-4 text-pink-400" />,
      tag: 'Ý tưởng kinh doanh',
      tagColor: 'text-pink-400',
      title: 'Muốn tự làm web bán hàng thì bắt đầu từng bước từ đâu?',
      desc: 'Hướng dẫn từng chặng không cần học viết code từ số 0.',
      userText: 'Mình muốn tự làm một website bán hàng nhỏ thì bắt đầu từ những bước nào?',
      aiReply: {
        title: '3 Bước mở cửa hàng trực tuyến không cần biết viết code 🛍️',
        subtitle: 'Đừng vội mua sách học lập trình C++ hay Java! Hãy nghĩ như bạn mở quầy bán nước:',
        boxes: [
          {
            role: 'BƯỚC 1: BIỂN HIỆU (TÊN MIỀN)',
            desc: 'Mua một tên miền dễ nhớ (VD: giaydep.vn) như cắm biển hiệu cửa hàng.',
            avatar: '🏷️'
          },
          {
            role: 'BƯỚC 2: MẶT BẰNG (NỀN TẢNG CÓ SẴN)',
            desc: 'Dùng các nền tảng kéo thả (Shopify, WordPress, Webflow) dựng kệ hàng trong 1 ngày.',
            avatar: '🏪',
            highlight: true
          },
          {
            role: 'BƯỚC 3: MÁY QUẸT THẺ (CỔNG THANH TOÁN)',
            desc: 'Kết nối mã QR VietQR / MoMo để khách chuyển khoản là ting ting có tiền ngay.',
            avatar: '💳'
          }
        ],
        explanation: 'Thời nay bạn không cần tự may từng sợi chỉ để mở tiệm quần áo. Sử dụng các công cụ kéo thả hiện đại là cách các startup triệu đô khởi đầu.',
        takeaway: 'Bắt đầu từ nền tảng dựng sẵn (No-code/Low-code) để bán được đơn hàng đầu tiên trước khi nghĩ tới việc thuê lập trình viên đắt đỏ.'
      }
    },
    {
      id: 'q4',
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      tag: 'Bảo vệ tài khoản',
      tagColor: 'text-amber-400',
      title: 'Bảo mật 2FA là gì, sao ngân hàng cứ nhắc tôi bật?',
      desc: 'Như chìa khóa nhà kết hợp mã gửi vào chuông cửa riêng.',
      userText: 'Bảo mật 2FA là gì vậy? Sao app ngân hàng và Facebook cứ bắt tôi bật mã xác nhận?',
      aiReply: {
        title: 'Ổ khóa cửa 2 lớp bí mật của ngôi nhà tài sản 🔐',
        subtitle: '2FA viết tắt của Two-Factor Authentication (Xác thực hai yếu tố):',
        boxes: [
          {
            role: 'LỚP 1: MẬT KHẨU (CHÌA KHÓA CỬA)',
            desc: 'Là chìa khóa cơ bạn cầm. Lỡ làm rơi ngoài đường thì kẻ trộm nhặt được mở vào nhà.',
            avatar: '🔑'
          },
          {
            role: 'LỚP 2: MÃ 2FA (CHUÔNG CỬA GỬI VỀ ĐIỆN THOẠI)',
            desc: 'Dù trộm có chìa khóa, chuông cửa vẫn réo mã OTP bí mật vào túi áo của riêng bạn.',
            avatar: '📲',
            highlight: true
          },
          {
            role: 'KẾT QUẢ (AN TOÀN TUYỆT ĐỐI)',
            desc: 'Kẻ xấu không có điện thoại trong tay của bạn thì đành đứng nhìn cửa khóa chặt.',
            avatar: '🛡️'
          }
        ],
        explanation: 'Mật khẩu ngày nay rất dễ bị rò rỉ nếu bạn lỡ bấm vào link lạ. Nhưng mã 2FA thay đổi liên tục 30 giây một lần trên điện thoại giúp tiền trong tài khoản của bạn được bảo vệ 99.9%.',
        takeaway: '2FA là lớp khiên thứ 2 bắt buộc phải có để kẻ trộm dù biết mật khẩu vẫn không thể đăng nhập được.'
      }
    }
  ];

  const handleSelectQuickQuestion = (item: typeof quickQuestions[0]) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: item.userText
    };

    setIsTyping(true);
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMetaphor: true,
        metaphorData: item.aiReply
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputQuestion.trim()
    };

    const questionVal = inputQuestion.trim();
    setInputQuestion('');
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMetaphor: true,
        metaphorData: {
          title: `Giải đáp câu hỏi: "${questionVal}" 💡`,
          subtitle: 'Tuyệt vời! Dưới góc nhìn dễ hiểu nhất không dùng thuật ngữ rối não:',
          boxes: [
            {
              role: 'VAI TRÒ TRONG ĐỜI SỐNG',
              desc: 'Tương tự như việc bạn gửi thư hoặc gọi điện thoại cho một người bạn thân.',
              avatar: '📬',
              highlight: true
            },
            {
              role: 'CÁCH HỆ THỐNG XỬ LÝ',
              desc: 'Máy tính nhận yêu cầu, kiểm tra kho dữ liệu và đóng gói kết quả sạch đẹp.',
              avatar: '⚙️'
            },
            {
              role: 'KẾT QUẢ ĐẾN TAY BẠN',
              desc: 'Mọi thông tin hiện lên màn hình mượt mà không cần bạn phải hiểu cơ chế điện toán bên dưới.',
              avatar: '🎉'
            }
          ],
          explanation: 'Mọi công nghệ hiện đại dù phức tạp đến đâu cũng sinh ra để phục vụ những nhu cầu rất bình dị của con người: giao tiếp nhanh hơn, ghi nhớ nhiều hơn và giải trí vui hơn.',
          takeaway: 'Cứ tự nhiên hỏi tiếp nhé! Đội ngũ DevFolio luôn sẵn sàng giải thích bất cứ khái niệm nào bạn thắc mắc.'
        }
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Xin chào! Mình là trợ lý DevFolio Companion. Hãy hỏi mình bất kỳ điều gì bạn chưa rõ về công nghệ, mình sẽ giải thích thật mộc mạc và dễ hiểu!'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 font-sans pb-16">
      
      {/* 1. Header Banner & Slogan Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center space-y-4">
        
        {/* Badge ELI5 */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>CHẾ ĐỘ ELI5 - KHÔNG THUẬT NGỮ RỐI NÃO</span>
        </div>

        {/* Tiêu đề lớn */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Trợ lý DevFolio AI —{' '}
          <span className="text-emerald-400">Hỏi gì cũng hiểu</span>
        </h1>

        {/* Phụ đề */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Bạn không rành kỹ thuật hay dòng lệnh? Đừng ngại! Hãy hỏi bằng lời nói đời thường nhất, AI sẽ giải thích như kể chuyện thường nhật quanh ta.
        </p>

        {/* 3 Nút chọn đối tượng (Audience Switcher) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setAudienceMode('beginner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
              audienceMode === 'beginner'
                ? 'bg-[#102422] border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                : 'bg-[#0d141e] border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            <span>👶 Người mới tinh</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              Khuyên dùng
            </span>
          </button>

          <button
            type="button"
            onClick={() => setAudienceMode('basic')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
              audienceMode === 'basic'
                ? 'bg-[#102422] border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                : 'bg-[#0d141e] border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            <span>⚡ Học viên cơ bản</span>
          </button>

          <button
            type="button"
            onClick={() => setAudienceMode('expert')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
              audienceMode === 'expert'
                ? 'bg-[#102422] border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                : 'bg-[#0d141e] border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            <span>💻 Kỹ sư chuyên sâu</span>
          </button>
        </div>

      </div>

      {/* 2. Hàng 4 Card Câu Hỏi Nhanh (Quick Questions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
          <span className="flex items-center gap-1.5 font-bold tracking-wider">
            <span>⚡</span> NHẤP / CHẠM ĐỂ HỎI NGAY CÁC CÂU HỎI THỰC TẾ
          </span>
          <span className="text-slate-500">&lt; câu hỏi phổ biến nhất</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {quickQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => handleSelectQuickQuestion(q)}
              className="group p-4 rounded-2xl bg-[#0c121b] hover:bg-[#111a26] border border-[#1b2737] hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    {q.icon}
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className={`text-[11px] font-mono font-semibold ${q.tagColor} mb-1`}>
                  {q.tag}
                </div>
                <h3 className="text-xs sm:text-[13px] font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                  {q.title}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {q.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main 2-Column Section: Chat (68%) & Sidebar (32%) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================
              CỘT TRÁI: KHUNG CHAT COMPANION (8 / 12)
             ======================================================== */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="rounded-3xl bg-[#0a0f16] border border-[#1b2636] flex flex-col overflow-hidden shadow-2xl">
              
              {/* Header của Chat Container */}
              <div className="p-4 sm:p-5 bg-[#0e1520] border-b border-[#1b2636] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">DevFolio Companion</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        v2.4 ELI5
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Luôn kiên nhẫn • Không dùng thuật ngữ khó hiểu</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetChat}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition cursor-pointer"
                    title="Làm mới cuộc trò chuyện"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121c27] border border-emerald-500/20 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Đang kết nối</span>
                  </div>
                </div>
              </div>

              {/* Danh sách tin nhắn */}
              <div className="p-4 sm:p-6 space-y-6 max-h-[620px] overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.sender === 'user' ? (
                      /* Tin nhắn người dùng (Căn phải) */
                      <div className="flex flex-col items-end space-y-1.5 ml-auto max-w-xl">
                        <div className="text-[11px] font-mono text-slate-400">
                          Bạn (Người mới) • {msg.time}
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className="p-4 rounded-2xl bg-[#141e2b] border border-[#213145] text-xs sm:text-sm text-slate-200 leading-relaxed shadow-sm">
                            {msg.text}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300 shrink-0">
                            U
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Tin nhắn AI Companion (Căn trái) */
                      <div className="flex items-start gap-3 max-w-2xl">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                          <Sparkles className="w-4 h-4" />
                        </div>

                        <div className="flex-1 space-y-3">
                          {/* Trường hợp phản hồi bình thường */}
                          {msg.text && (
                            <div className="p-4 rounded-2xl bg-[#0e1622] border border-[#1c293a] text-xs sm:text-sm text-slate-200 leading-relaxed">
                              {msg.text}
                            </div>
                          )}

                          {/* Trường hợp phản hồi trực quan theo dạng ẩn dụ (Metaphor Box) */}
                          {msg.isMetaphor && msg.metaphorData && (
                            <div className="p-5 rounded-2xl bg-[#0c141f] border border-[#1d2d3e] space-y-4 shadow-xl">
                              
                              {/* Header ẩn dụ */}
                              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                                <h4 className="font-bold text-sm sm:text-base text-white">
                                  {msg.metaphorData.title}
                                </h4>
                                <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                  Giải thích ẩn dụ
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                {msg.metaphorData.subtitle}
                              </p>

                              {/* 3 Cột so sánh trực quan */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
                                {msg.metaphorData.boxes.map((b, i) => (
                                  <div 
                                    key={i} 
                                    className={`p-3.5 rounded-xl border text-center space-y-2 ${
                                      b.highlight 
                                        ? 'bg-[#112324] border-emerald-500/50 shadow-md' 
                                        : 'bg-[#090f17] border-[#182637]'
                                    }`}
                                  >
                                    <div className="text-2xl">{b.avatar}</div>
                                    <div className="font-bold font-mono text-[11px] text-emerald-300 tracking-tight">
                                      {b.role}
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-snug">
                                      {b.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* Lời giải thích tự nhiên */}
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                {msg.metaphorData.explanation}
                              </p>

                              {/* Hộp ghi nhớ 10 giây */}
                              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3">
                                <span className="text-base">💡</span>
                                <div className="text-xs leading-relaxed text-emerald-200">
                                  <span className="font-bold">GHI NHỚ NHANH TRONG 10 GIÂY: </span>
                                  <span>{msg.metaphorData.takeaway}</span>
                                </div>
                              </div>

                            </div>
                          )}

                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator khi AI gõ */}
                {isTyping && (
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#0e1622] px-3 py-2 rounded-xl border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1 text-[11px]">Đang suy nghĩ ẩn dụ gần gũi nhất...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Action Pills hỗ trợ nhập */}
              <div className="p-3 bg-[#0a0f16] border-t border-[#1b2636] flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={() => setInputQuestion('Hãy giải thích thật ngắn gọn bằng 3 câu.')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111925] border border-white/[0.08] hover:border-emerald-500/30 text-slate-400 hover:text-white text-xs transition cursor-pointer"
                  >
                    <Mic className="w-3 h-3 text-cyan-400" />
                    <span>Nói bằng giọng nói</span>
                  </button>

                  <button 
                    onClick={() => setInputQuestion('Làm sao để người không biết code tạo ra ứng dụng?')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111925] border border-white/[0.08] hover:border-emerald-500/30 text-slate-400 hover:text-white text-xs transition cursor-pointer"
                  >
                    <Wand2 className="w-3 h-3 text-purple-400" />
                    <span>Viết hộ câu hỏi</span>
                  </button>

                  <button 
                    onClick={() => setInputQuestion('Hãy ví von câu này cho học sinh lớp 1 hiểu được không?')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111925] border border-white/[0.08] hover:border-emerald-500/30 text-slate-400 hover:text-white text-xs transition cursor-pointer"
                  >
                    <Baby className="w-3 h-3 text-emerald-400" />
                    <span>Đơn giản hóa câu trả lời nữa</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                  Nhấn Enter để gửi
                </span>
              </div>

              {/* Khung nhập câu hỏi (Input Form) */}
              <form onSubmit={handleSendMessage} className="p-4 bg-[#0e1622] border-t border-[#1b2636] space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputQuestion}
                    onChange={(e) => setInputQuestion(e.target.value)}
                    placeholder="Hỏi bất cứ điều gì bạn chưa hiểu... (Ví dụ: Database là gì?, Dự án này làm được gì?)"
                    className="w-full bg-[#070b10] border border-[#1b2737] rounded-xl pl-4 pr-32 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuestion.trim() || isTyping}
                    className="absolute right-2 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer"
                  >
                    <span>Gửi câu hỏi</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Footer chú thích an toàn */}
                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Trả lời bằng ngôn ngữ thuần Việt, tôn trọng mọi câu hỏi ban đầu</span>
                  </div>
                  <span className="text-emerald-400/80">
                    [Chế độ an toàn cho người mới: Đang bật]
                  </span>
                </div>
              </form>

            </div>
          </div>


          {/* ========================================================
              CỘT PHẢI: TỪ ĐIỂN & GỢI Ý (SIDEBAR - 4 / 12)
             ======================================================== */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Box: Tình trạng hỗ trợ */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1b2636] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Tình trạng hỗ trợ</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hệ thống luôn kiên nhẫn 100%, sẵn lòng lặp lại bao nhiêu lần cũng được cho tới khi bạn thực sự hiểu.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-center font-mono">
                <div className="p-2 rounded-xl bg-white/[0.02]">
                  <div className="text-emerald-400 font-bold text-sm">24/7</div>
                  <div className="text-[10px] text-slate-500">Luôn thức</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02]">
                  <div className="text-cyan-400 font-bold text-sm">0%</div>
                  <div className="text-[10px] text-slate-500">Phán xét</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02]">
                  <div className="text-purple-400 font-bold text-sm">∞</div>
                  <div className="text-[10px] text-slate-500">Kiên nhẫn</div>
                </div>
              </div>
            </div>

            {/* 2. Box: Từ điển IT bỏ túi (Siêu dễ) */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1b2636] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-white">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Từ điển IT bỏ túi</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Siêu dễ
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>🍪</span> Cookie là gì?
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Như chiếc thẻ gửi xe. Khi bạn vào web, nó nhớ mặt bạn để lần sau vào lại không cần phải gõ lại mật khẩu từ đầu.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>☁️</span> Đám mây (Cloud)?
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Không phải đám mây trên trời! Đó là một dàn máy tính khổng lồ của Google, Amazon đặt ở nơi khác để giữ ảnh &amp; file giúp bạn.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>⚡</span> Bộ nhớ đệm (Cache)?
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Như việc bạn để sẵn chai nước trên bàn làm việc thay vì mỗi lần khát lại phải đi bộ xuống tận tầng 1 mở tủ lạnh.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>🌍</span> Mã nguồn mở (Open Source)?
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Như công thức nấu ăn của bà ngoại được chia sẻ miễn phí cho cả xóm, ai thích vào thêm bớt gia vị đều được.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Box: Dự án dễ chơi thử nhất */}
            <div className="p-5 rounded-2xl bg-[#0b1017] border border-[#1b2636] space-y-3.5">
              <div className="flex items-center gap-2 font-bold text-xs text-white">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Dự án dễ chơi thử nhất</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hai sản phẩm có giao diện thân thiện, trực quan, người không biết code bấm vào là hiểu ngay cách chạy:
              </p>

              {/* Dự án 1 */}
              <div className="p-3.5 rounded-xl bg-[#070b10] border border-[#182535] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Dự án 01</span>
                  <span className="text-emerald-400 font-semibold">Có Demo Live</span>
                </div>
                <div className="font-bold text-white text-xs">PulseCanvas UI Sandbox</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Bảng vẽ kéo thả giao diện. Bạn chỉ cần dùng chuột di chuyển các ô vuông để tạo ra ứng dụng điện thoại riêng.
                </p>
                <a 
                  href="#demo"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium pt-1"
                >
                  <span>Dùng thử không cần đăng ký</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Dự án 2 */}
              <div className="p-3.5 rounded-xl bg-[#070b10] border border-[#182535] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Dự án 02</span>
                  <span className="text-cyan-400 font-semibold">Trực quan hóa</span>
                </div>
                <div className="font-bold text-white text-xs">Solaris Data Explorer</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Biến những con số khô khan thành vũ trụ 3D lấp lánh như xem phim khoa học viễn tưởng.
                </p>
                <a 
                  href="#demo"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium pt-1"
                >
                  <span>Khám phá 3D trực quan</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 4. Quote khích lệ */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0c1622] to-[#070b10] border border-[#1b2838] text-center space-y-2">
              <p className="text-xs italic text-slate-300 leading-relaxed">
                “Không có câu hỏi nào là ngớ ngẩn. Mọi lập trình viên kỳ cựu đều từng bắt đầu từ việc không biết bấm nút nào!”
              </p>
              <div className="text-[11px] font-mono text-emerald-400 font-medium">
                — DevFolio Mentorship Team
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
