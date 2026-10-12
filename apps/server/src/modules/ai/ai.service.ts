import { AskAiInput } from "./ai.schema";

export interface MetaphorBox {
  role: string;
  desc: string;
  avatar: string;
  highlight?: boolean;
}

export interface MetaphorData {
  title: string;
  subtitle: string;
  boxes: MetaphorBox[];
  explanation: string;
  takeaway: string;
}

export interface AiResponse {
  id: string;
  sender: "ai";
  time: string;
  mode: "beginner" | "basic" | "expert";
  isMetaphor: boolean;
  text?: string;
  metaphorData?: MetaphorData;
  suggestions: string[];
}

export class AiService {
  /**
   * 1. Xử lý câu hỏi và trả về câu trả lời thông minh theo chế độ người nghe
   */
  async askAi(input: AskAiInput): Promise<AiResponse> {
    const questionLower = input.question.toLowerCase().trim();
    const mode = input.mode || "beginner";
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // ----------------------------------------------------
    // CHỦ ĐỀ 1: API (Bồi bàn & Quán ăn)
    // ----------------------------------------------------
    if (questionLower.includes("api") || questionLower.includes("giao diện lập trình")) {
      return {
        id: Date.now().toString(),
        sender: "ai",
        time: currentTime,
        mode,
        isMetaphor: true,
        metaphorData: {
          title: "Hãy tưởng tượng bạn đang đi ăn ở một quán phở! 🍜",
          subtitle: "Đừng lo lắng, API thực chất không hề huyền bí như mọi người hay dọa đâu. Nó đơn giản như sau:",
          boxes: [
            {
              role: "BẠN LÀ KHÁCH HÀNG (CLIENT)",
              desc: "Màn hình ứng dụng điện thoại bạn đang mở để chọn món.",
              avatar: "📱",
            },
            {
              role: "NGƯỜI BỒI BÀN LÀ API",
              desc: "Nhận yêu cầu gọi món vào bếp và bưng tô phở nóng quay lại bàn.",
              avatar: "🧑‍💼",
              highlight: true,
            },
            {
              role: "NHÀ BẾP LÀ HỆ THỐNG (SERVER/DATABASE)",
              desc: "Nơi lưu trữ nguyên liệu, kho dữ liệu và thực hiện nấu nướng.",
              avatar: "👨‍🍳",
            },
          ],
          explanation: "Bạn không cần tự chạy bổ vào bếp lục tủ lạnh xem còn thịt bò không (vừa nguy hiểm vừa hỗn loạn). Bạn chỉ cần bảo người phục vụ (API): 'Cho một tô tái nạm'. Bồi bàn sẽ mang kết quả ra cho bạn!",
          takeaway: "API là cầu nối trung gian giúp các ứng dụng xin dữ liệu của nhau một cách trật tự, an toàn và bảo mật.",
        },
        suggestions: [
          "RESTful API và GraphQL khác nhau thế nào?",
          "Backend và Frontend là gì? Ví von như nhà hàng?",
          "Bảo mật API bằng JWT hoạt động ra sao?",
        ],
      };
    }

    // ----------------------------------------------------
    // CHỦ ĐỀ 2: FRONTEND VÀ BACKEND
    // ----------------------------------------------------
    if (questionLower.includes("frontend") || questionLower.includes("backend")) {
      return {
        id: Date.now().toString(),
        sender: "ai",
        time: currentTime,
        mode,
        isMetaphor: true,
        metaphorData: {
          title: "Nhà hàng công nghệ: Bàn ăn (Frontend) & Gian bếp (Backend) 🍽️",
          subtitle: "Một trang web hay ứng dụng điện thoại thực chất giống như một quán ăn cao cấp:",
          boxes: [
            {
              role: "FRONTEND (BÀN ĂN & MENU)",
              desc: "Tất cả những gì mắt bạn nhìn thấy: bàn ghế đẹp, menu lung linh, nút bấm mượt mà.",
              avatar: "🎨",
              highlight: true,
            },
            {
              role: "BACKEND (GIAN BẾP NẤU NƯỚNG)",
              desc: "Bếp ga, kho trữ thực phẩm, công thức chế biến bí truyền và két sắt đựng tiền.",
              avatar: "🍳",
            },
            {
              role: "ĐƯỜNG TRUYỀN (HTTP / API)",
              desc: "Lối đi giúp thức ăn từ bếp được chuyển thẳng ra bàn khi bạn nhấn chuông gọi.",
              avatar: "⚡",
            },
          ],
          explanation: "Frontend giúp bạn nhìn sướng mắt và thao tác dễ chịu, còn Backend lo tính tiền đúng, lưu tài khoản an toàn không bị kẻ xấu trộm mất.",
          takeaway: "Frontend là bộ mặt giao diện bên ngoài, Backend là bộ não lưu trữ logic và dữ liệu bên trong.",
        },
        suggestions: [
          "Lập trình viên Fullstack là làm cả hai cái này à?",
          "Muốn tự làm web bán hàng thì bắt đầu từ đâu?",
          "Database là cái gì trong nhà hàng?",
        ],
      };
    }

    // ----------------------------------------------------
    // CHỦ ĐỀ 3: BẢO MẬT 2FA / XÁC THỰC HAI LỚP
    // ----------------------------------------------------
    if (questionLower.includes("2fa") || questionLower.includes("bảo mật") || questionLower.includes("mật khẩu")) {
      return {
        id: Date.now().toString(),
        sender: "ai",
        time: currentTime,
        mode,
        isMetaphor: true,
        metaphorData: {
          title: "Ổ khóa cửa 2 lớp bí mật của ngôi nhà tài sản 🔐",
          subtitle: "2FA (Two-Factor Authentication) là cơ chế bảo vệ kép cực kỳ hiệu quả:",
          boxes: [
            {
              role: "LỚP 1: MẬT KHẨU (CHÌA KHÓA CƠ)",
              desc: "Chìa khóa bạn cầm trong tay. Lỡ đánh rơi thì kẻ trộm nhặt được có thể tra vào ổ.",
              avatar: "🔑",
            },
            {
              role: "LỚP 2: MÃ 2FA (CHUÔNG BÁO VỀ ĐIỆN THOẠI)",
              desc: "Dù trộm có chìa, chuông vẫn gửi mã OTP bí mật 6 số vào túi áo của riêng bạn.",
              avatar: "📲",
              highlight: true,
            },
            {
              role: "KẾT QUẢ AN TOÀN",
              desc: "Kẻ xấu không cầm điện thoại của bạn trên tay thì đành đứng nhìn cửa khóa chặt.",
              avatar: "🛡️",
            },
          ],
          explanation: "Mật khẩu có thể bị lộ nếu bạn bấm nhầm vào link lừa đảo. Nhưng mã 2FA đổi liên tục 30 giây/lần giúp tài khoản được an toàn tới 99.9%.",
          takeaway: "2FA là lớp khiên thứ hai bắt buộc phải bật để bảo vệ tài khoản ngân hàng và mạng xã hội của bạn.",
        },
        suggestions: [
          "Dùng app Google Authenticator hay mã SMS an toàn hơn?",
          "Hacker tấn công bằng cách nào?",
        ],
      };
    }

    // ----------------------------------------------------
    // CHỦ ĐỀ 4: CÂU HỎI MẶC ĐỊNH / TỰ DO
    // ----------------------------------------------------
    return {
      id: Date.now().toString(),
      sender: "ai",
      time: currentTime,
      mode,
      isMetaphor: true,
      metaphorData: {
        title: `Giải đáp câu hỏi: "${input.question}" 💡`,
        subtitle: `Dưới góc nhìn ${mode === "beginner" ? "đời thường dễ hiểu nhất" : mode === "expert" ? "kỹ thuật chuyên sâu" : "cơ bản"}:`,
        boxes: [
          {
            role: "BẢN CHẤT KHÁI NIỆM",
            desc: "Giống như việc con người giao tiếp gửi tín hiệu cho nhau trong đời sống hàng ngày.",
            avatar: "📬",
            highlight: true,
          },
          {
            role: "CƠ CHẾ XỬ LÝ HỆ THỐNG",
            desc: "Máy tính tiếp nhận, đối chiếu logic từ kho dữ liệu và tạo kết quả đầu ra sạch đẹp.",
            avatar: "⚙️",
          },
          {
            role: "GIÁ TRỊ MANG LẠI",
            desc: "Giúp công việc của bạn nhanh hơn, tiết kiệm thời gian và giảm thiểu sai sót.",
            avatar: "🎉",
          },
        ],
        explanation: "Mọi công nghệ hiện đại dù phức tạp đến đâu cũng sinh ra để phục vụ những nhu cầu rất tự nhiên của con người: giao tiếp nhanh hơn, ghi nhớ nhiều hơn và làm việc hiệu quả hơn.",
        takeaway: "Hãy tiếp tục đặt câu hỏi nhé! Đội ngũ DevFolio luôn sẵn sàng giải thích mọi khái niệm công nghệ cho bạn.",
      },
      suggestions: [
        "API là cái gì vậy bạn?",
        "Backend và Frontend khác nhau như thế nào?",
        "Synapse AI hoạt động thế nào?",
        "Bảo mật 2FA là gì?",
      ],
    };
  }

  /**
   * 2. Lấy danh sách các câu hỏi nhanh gợi ý trên giao diện
   */
  async getQuickQuestions() {
    return [
      {
        id: "q1",
        tag: "Cơ bản về Web",
        tagColor: "text-cyan-400",
        title: "Backend và Frontend là gì? Ví von như nhà hàng?",
        desc: "Bồi bàn bưng bê hay đầu bếp trong bếp đóng vai trò gì?",
        userText: "Backend và Frontend khác nhau như thế nào? Ví von như nhà hàng giúp mình với!",
      },
      {
        id: "q2",
        tag: "Tính năng DevFolio",
        tagColor: "text-emerald-400",
        title: "Synapse AI hoạt động thế nào nếu ví như trợ lý thư viện?",
        desc: "Tìm kiếm sách siêu tốc mà không cần đọc hết từ 1 đến vạn.",
        userText: "Synapse AI hoạt động thế nào? Hãy ví von nó như một người thủ thư siêu năng lực.",
      },
      {
        id: "q3",
        tag: "Ý tưởng kinh doanh",
        tagColor: "text-pink-400",
        title: "Muốn tự làm web bán hàng thì bắt đầu từng bước từ đâu?",
        desc: "Hướng dẫn từng chặng không cần học viết code từ số 0.",
        userText: "Mình muốn tự làm một website bán hàng nhỏ thì bắt đầu từ những bước nào?",
      },
      {
        id: "q4",
        tag: "Bảo vệ tài khoản",
        tagColor: "text-amber-400",
        title: "Bảo mật 2FA là gì, sao ngân hàng cứ nhắc tôi bật?",
        desc: "Như chìa khóa nhà kết hợp mã gửi vào chuông cửa riêng.",
        userText: "Bảo mật 2FA là gì vậy? Sao app ngân hàng và Facebook cứ bắt tôi bật mã xác nhận?",
      },
    ];
  }

  /**
   * 3. Lấy danh sách các chế độ giải thích
   */
  async getModes() {
    return [
      {
        id: "beginner",
        label: "Người mới tinh (5 tuổi)",
        desc: "Dùng ví von đời thường, tuyệt đối không dùng thuật ngữ máy móc.",
      },
      {
        id: "basic",
        label: "Người mới học code",
        desc: "Giải thích các khái niệm cơ bản và quy trình vận hành.",
      },
      {
        id: "expert",
        label: "Lập trình viên chuyên sâu",
        desc: "Phân tích kiến trúc hệ thống, độ trễ và tối ưu hiệu năng.",
      },
    ];
  }
}

export const aiService = new AiService();