import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  ArrowRight, 
  Baby, 
  Utensils, 
  BookOpen, 
  ShoppingBag, 
  ShieldAlert, 
  Bot, 
  Heart
} from 'lucide-react';

interface MetaphorData {
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
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  time: string;
  text?: string;
  isMetaphor?: boolean;
  metaphorData?: MetaphorData;
}

interface QuickQuestionItem {
  id: string;
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  userText: string;
}

export const AiAssistantPage: React.FC = () => {
  // Chế độ giải thích: người mới tinh / cơ bản / chuyên sâu
  const [audienceMode, setAudienceMode] = useState<'beginner' | 'basic' | 'expert'>('beginner');
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cuộc trò chuyện ban đầu sạch
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: 'Xin chào! Mình là trợ lý DevFolio Companion kết nối trực tiếp với AI Backend. Bạn có thể chọn câu hỏi gợi ý bên trên hoặc nhập bất kỳ thắc mắc công nghệ nào để mình giải đáp mộc mạc và trực quan nhé!'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Bộ câu hỏi nhanh
  const quickQuestions: QuickQuestionItem[] = [
    {
      id: 'q1',
      icon: <Utensils className="w-4 h-4 text-cyan-400" />,
      tag: 'Cơ bản về Web',
      tagColor: 'text-cyan-400',
      title: 'API là cái gì, giải thích cho người 5 tuổi hiểu?',
      desc: 'Ví dụ quán ăn: Khách gọi món, người bồi bàn và đầu bếp.',
      userText: 'API là cái gì vậy bạn? Có thể giải thích như đang nói chuyện với người 5 tuổi được không?'
    },
    {
      id: 'q2',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
      tag: 'Dự án trong kho',
      tagColor: 'text-emerald-400',
      title: 'Dự án Synapse AI RAG giải quyết việc gì?',
      desc: 'Tìm kiếm chính xác như thủ thư thông minh tra cứu 1 dòng trong 500 cuốn sách.',
      userText: 'Dự án Synapse AI RAG trong kho của bạn làm được việc gì thực tế?'
    },
    {
      id: 'q3',
      icon: <ShoppingBag className="w-4 h-4 text-pink-400" />,
      tag: 'Ý tưởng kinh doanh',
      tagColor: 'text-pink-400',
      title: 'Muốn tự làm web bán hàng thì bắt đầu từng bước từ đâu?',
      desc: 'Hướng dẫn từng chặng không cần học viết code từ số 0.',
      userText: 'Mình muốn tự làm một website bán hàng nhỏ thì bắt đầu từ những bước nào?'
    },
    {
      id: 'q4',
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      tag: 'An toàn thông tin',
      tagColor: 'text-amber-400',
      title: 'Bảo mật 2FA là gì, sao ngân hàng cứ nhắc tôi bật?',
      desc: 'Như chìa khóa nhà kết hợp mã gửi vào chuông cửa riêng.',
      userText: 'Bảo mật 2FA là gì vậy? Sao app ngân hàng và Facebook cứ bắt tôi bật mã xác nhận?'
    }
  ];

  const askAiApi = async (questionText: string) => {
    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText,
          mode: audienceMode,
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        const aiData = resData?.data;
        if (aiData) {
          return {
            id: aiData.id || Date.now().toString(),
            sender: 'ai' as const,
            time: aiData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: aiData.text,
            isMetaphor: aiData.isMetaphor,
            metaphorData: aiData.metaphorData,
          };
        }
      }
    } catch {
      // offline fallback below
    }

    // Fallback nếu API server chưa bật
    return {
      id: (Date.now() + 1).toString(),
      sender: 'ai' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMetaphor: true,
      metaphorData: {
        title: `Giải đáp câu hỏi: "${questionText}" 💡`,
        subtitle: 'Dưới góc nhìn đời thường dễ hiểu nhất:',
        boxes: [
          {
            role: 'VAI TRÒ TRONG ĐỜI SỐNG',
            desc: 'Tương tự như việc bạn gửi yêu cầu hoặc gọi điện thoại cho một đơn vị dịch vụ.',
            avatar: '📬',
            highlight: true
          },
          {
            role: 'CÁCH HỆ THỐNG XỬ LÝ',
            desc: 'Hệ thống tiếp nhận, truy xuất kho lưu trữ và đóng gói kết quả trả lại màn hình.',
            avatar: '⚙️'
          },
          {
            role: 'KẾT QUẢ ĐẾN TAY BẠN',
            desc: 'Thông tin hiển thị mượt mà tức thì mà bạn không cần phải bận tâm cơ chế phức tạp bên dưới.',
            avatar: '🎉'
          }
        ],
        explanation: 'Mọi công nghệ hiện đại dù đồ sộ đến đâu cũng sinh ra để phục vụ những nhu cầu bình dị: giao tiếp nhanh hơn, ghi nhớ chính xác hơn và xử lý công việc nhàn hơn.',
        takeaway: 'Bạn có thể hỏi thêm bất cứ khái niệm nào, mình luôn sẵn sàng đồng hành cùng bạn!'
      }
    };
  };

  const handleSelectQuickQuestion = async (item: QuickQuestionItem) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: item.userText
    };

    setIsTyping(true);
    setMessages(prev => [...prev, userMsg]);

    const aiMsg = await askAiApi(item.userText);
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim() || isTyping) return;

    const questionVal = inputQuestion.trim();
    setInputQuestion('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: questionVal
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const aiMsg = await askAiApi(questionVal);
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Xin chào! Mình là trợ lý DevFolio Companion. Hãy hỏi mình bất kỳ điều gì bạn muốn tìm hiểu về công nghệ nhé!'
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
                    <span>Đang kết nối API</span>
                  </div>
                </div>
              </div>

              {/* Danh sách tin nhắn */}
              <div className="p-4 sm:p-6 space-y-6 max-h-[620px] overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.sender === 'user' ? (
                      /* Tin nhắn người dùng */
                      <div className="flex flex-col items-end space-y-1.5 ml-auto max-w-xl">
                        <div className="text-[11px] font-mono text-slate-400">
                          Bạn • {msg.time}
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
                      /* Tin nhắn AI */
                      <div className="flex items-start gap-3 max-w-2xl">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                          <Sparkles className="w-4 h-4" />
                        </div>

                        <div className="space-y-3 flex-1">
                          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">DevFolio Companion</span>
                            <span>• {msg.time}</span>
                          </div>

                          {msg.text && (
                            <div className="p-4 rounded-2xl bg-[#0f1724] border border-[#1d2b3c] text-xs sm:text-sm text-slate-200 leading-relaxed shadow-sm">
                              {msg.text}
                            </div>
                          )}

                          {msg.isMetaphor && msg.metaphorData && (
                            <div className="p-5 rounded-2xl bg-[#0a121c] border border-emerald-500/30 shadow-lg space-y-4">
                              <div>
                                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                                  {msg.metaphorData.title}
                                </h4>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                  {msg.metaphorData.subtitle}
                                </p>
                              </div>

                              {/* 3 Khối so sánh */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {msg.metaphorData.boxes.map((b, idx) => (
                                  <div
                                    key={idx}
                                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition ${
                                      b.highlight
                                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 shadow-sm'
                                        : 'bg-[#060a10] border-white/5 text-slate-300'
                                    }`}
                                  >
                                    <div className="text-lg">{b.avatar}</div>
                                    <div className="font-bold text-[11px] font-mono tracking-wider">
                                      {b.role}
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                      {b.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* Giải thích chi tiết */}
                              <div className="p-3.5 rounded-xl bg-[#070b10] border border-white/5 text-xs text-slate-300 leading-relaxed">
                                {msg.metaphorData.explanation}
                              </div>

                              {/* Đúc kết */}
                              <div className="flex items-start gap-2 pt-2 border-t border-white/[0.06] text-xs text-emerald-300">
                                <span className="font-bold">ĐÚC KẾT:</span>
                                <span className="text-slate-300 leading-relaxed">
                                  {msg.metaphorData.takeaway}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Sparkles className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="flex items-center gap-1 font-mono text-emerald-400">
                      <span>DevFolio AI đang soạn câu trả lời qua API</span>
                      <span className="animate-pulse">...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Gợi ý thêm */}
              <div className="px-4 py-2 bg-[#0a0f18] border-t border-[#16212e] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">Mẹo tương tác:</span>
                  <button
                    type="button"
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
                    placeholder="Hỏi bất cứ điều gì bạn chưa hiểu... (Ví dụ: Database là gì?, API hoạt động như thế nào?)"
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
                    <span>Tích hợp AI Endpoint thực tế (POST /api/ai/ask)</span>
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

            {/* 3. Quote khích lệ */}
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
