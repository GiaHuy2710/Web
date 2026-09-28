import { ProjectItem, CategoryItem } from '../types/project';

export type { ProjectItem, CategoryItem } from '../types/project';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'synapse-ai',
    title: 'Synapse AI',
    badge: '★ Featured',
    badgeType: 'featured',
    likes: 89,
    views: '1.4k',
    category: 'AI Tools',
    techStack: ['AI Tools', 'Next.js', 'OpenAI'],
    description: 'Trợ lý tóm tắt kiến trúc codebase và tra cứu logic AI thông minh sử dụng RAG đa tầng siêu tốc.',
    image: '/images/synapse-ai.jpg',
    demoUrl: 'https://synapse-ai.devfolio.io',
    githubUrl: 'https://github.com/alexdev/synapse-ai',
    details: {
      longDescription: 'Synapse AI được phát triển nhằm giải quyết bài toán onboarding vào codebase khổng lồ. Ứng dụng tự động lập chỉ mục AST, trích xuất quan hệ phụ thuộc và triển khai Vector Search kết hợp hybrid BM25 + pgvector cho kết quả tra cứu tức thì dưới 120ms.',
      highlights: [
        'Multi-vector indexing với Tree-sitter AST parser',
        'Hybrid Search (pgvector + BM25 keyword matching)',
        'Streaming UI với Server-Sent Events và WebSockets',
        'Tích hợp phân quyền RBAC và mã hóa API Key cấp dự án'
      ],
      architecture: 'Next.js 14 App Router, PostgreSQL, pgvector, LangChain, TailwindCSS, Redis Cache',
      version: 'v2.4.0',
      stars: '4.2k'
    }
  },
  {
    id: 'devpulse',
    title: 'DevPulse',
    badge: 'TRANG CHỦ — KHO DỰ ÁN & PORTFOLIO',
    badgeType: 'breadcrumb',
    likes: 920,
    category: 'Web App',
    techStack: ['Web App', 'Go', 'Svelte', 'Docker'],
    description: 'Hệ thống Realtime Performance & Uptime Monitor cảnh báo độ trễ microsecond cho microservices.',
    image: '/images/devpulse.jpg',
    demoUrl: 'https://devpulse.devfolio.io',
    githubUrl: 'https://github.com/alexdev/devpulse',
    details: {
      longDescription: 'DevPulse theo dõi sức khỏe hệ thống phân tán thời gian thực, tổng hợp số liệu từ Prometheus, Jaeger trace và phân tích bất thường bằng thuật toán exponential smoothing, cung cấp dashboard giám sát mượt mà 60fps.',
      highlights: [
        'Cảnh báo qua Slack, Telegram & Webhook với thời gian trễ dưới 200ms',
        'Giao diện Svelte 5 siêu nhẹ, tiêu thụ RAM trình duyệt cực thấp',
        'Backend Go hiệu năng cao xử lý 50.000 events/giây trên node đơn',
        'Export dữ liệu tương thích OpenTelemetry (OTel)'
      ],
      architecture: 'Golang, SvelteKit, InfluxDB, Docker Compose, WebSocket, Redis Streams',
      version: 'v3.1.2',
      stars: '3.8k'
    }
  },
  {
    id: 'chromapalette',
    title: 'ChromaPalette',
    badge: '89 Lưu',
    likes: 89,
    views: '3.1k',
    category: 'Developer Tools',
    techStack: ['Developer Tools', 'React', 'WASM'],
    description: 'Trình sinh và phân tích độ tương phản màu tự động đạt chuẩn WCAG AAA với thuật toán OKLCH q...',
    image: '/images/chromapalette.jpg',
    demoUrl: 'https://chromapalette.devfolio.io',
    githubUrl: 'https://github.com/alexdev/chromapalette',
    details: {
      longDescription: 'ChromaPalette là công cụ thiết kế hệ thống màu chuẩn xác theo không gian cảm nhận đồng đều OKLCH. Giúp lập trình viên và nhà thiết kế tự động sinh toàn bộ thang màu (50-950) đảm bảo tiêu chuẩn tương phản truy cập WCAG AAA tự động.',
      highlights: [
        'Thuật toán OKLCH nội suy màu mượt mà, không bị xỉn màu ở khoảng sáng',
        'Chấm điểm tương phản trực quan theo WCAG 2.2 và APCA',
        'Export mã CSS Variables, Tailwind v4 tokens, Figma Tokens JSON',
        'Mô đun WASM Rust tính toán gradient chuyển đổi tốc độ 0.2ms'
      ],
      architecture: 'React 18, WebAssembly (Rust), TailwindCSS, Radix UI',
      version: 'v1.8.0',
      stars: '2.1k'
    }
  },
  {
    id: 'pixelforge',
    title: 'PixelForge',
    likes: 650,
    category: 'Games & Creative',
    techStack: ['Games & Creative', 'WebGL', 'TypeScript'],
    description: 'Bộ công cụ 2D Canvas Physics Engine hiệu năng cao cho game web tương tác, 60fps mượt mà khôn...',
    image: '/images/pixelforge.jpg',
    demoUrl: 'https://pixelforge.devfolio.io',
    githubUrl: 'https://github.com/alexdev/pixelforge',
    details: {
      longDescription: 'PixelForge là engine vật lý 2D được viết từ đầu bằng TypeScript và WebGL shader. Tối ưu hoá cho tương tác va chạm hạt (particle physics), liên kết lò xo và trường lực động với hơn 10.000 vật thể cùng lúc mà vẫn giữ vững 60 FPS.',
      highlights: [
        'Spatial hash grid phân vùng va chạm cực nhanh O(N log N)',
        'Shader WebGL mô phỏng phản xạ ánh sáng và hiệu ứng phát sáng neon',
        'Hỗ trợ gravity modifier, lực cản môi trường và trigger vùng va chạm',
        'Không phụ thuộc thư viện ngoài, bundle size chỉ vỏn vẹn 18KB gzipped'
      ],
      architecture: 'WebGL 2.0, TypeScript, Web Audio API, Canvas 2D Fallback',
      version: 'v2.0.1',
      stars: '1.9k'
    }
  },
  {
    id: 'markdownx-studio',
    title: 'MarkdownX Studio',
    badge: '★ Popular',
    badgeType: 'popular',
    likes: 3400,
    category: 'Web App',
    techStack: ['Web App', 'Electron', 'Rust'],
    description: 'Trình soạn thảo văn bản kỹ thuật không phân tâm, tích hợp hỗ trợ LaTeX, Mermaid diagrams và lưu trữ...',
    image: '/images/markdownx.jpg',
    demoUrl: 'https://markdownx.devfolio.io',
    githubUrl: 'https://github.com/alexdev/markdownx',
    details: {
      longDescription: 'MarkdownX Studio đem đến trải nghiệm viết tài liệu kỹ thuật đỉnh cao. Hỗ trợ tức thì công thức toán học KaTeX, biểu đồ tuần tự Mermaid, tính toán bảng biểu tự động và mã hóa cục bộ an toàn trên thiết bị người dùng.',
      highlights: [
        'Live Render đồng bộ 2 chiều tức thì không có độ trễ',
        'Hỗ trợ Mermaid.js, KaTeX LaTeX và nhúng đoạn code tương tác runnable',
        'Core xử lý viết bằng Rust qua Tauri / Electron Native addon',
        'Xuất file PDF, HTML tự chứa và định dạng Slide thuyết trình ấn tượng'
      ],
      architecture: 'Tauri / Electron, Rust, Monaco Editor, KaTeX, Mermaid.js',
      version: 'v4.0.0',
      stars: '5.6k'
    }
  },
  {
    id: 'docuflow',
    title: 'DocuFlow',
    likes: 610,
    category: 'AI Tools',
    techStack: ['AI Tools', 'Python', 'FastAPI'],
    description: 'Tự động phân tích OpenAPI specs thành tài liệu kỹ thuật có tương tác kèm test runner và mock server...',
    image: '/images/docuflow.jpg',
    demoUrl: 'https://docuflow.devfolio.io',
    githubUrl: 'https://github.com/alexdev/docuflow',
    details: {
      longDescription: 'DocuFlow quét kho mã nguồn backend, tự động suy luận kiểu dữ liệu và sinh tài liệu API chuẩn OpenAPI 3.1 kèm mock server tức thì, giúp các đội ngũ frontend và backend làm việc song song mà không cần đợi API hoàn thiện.',
      highlights: [
        'CLI tự động phân tích routes từ FastAPI, Express, Spring Boot',
        'Sinh Mock Server giả lập payload với độ trễ mạng tuỳ biến',
        'Tích hợp AI tóm tắt tài liệu và gợi ý mã test tự động',
        'Hỗ trợ xuất curl commands, Postman Collection và SDK TypeScript'
      ],
      architecture: 'Python 3.12, FastAPI, Pydantic v2, Typer CLI, TailwindCSS Docs UI',
      version: 'v1.6.4',
      stars: '2.8k'
    }
  }
];

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'Tất cả', count: 24 },
  { id: 'web-app', label: 'Web App', count: 10 },
  { id: 'ai-tools', label: 'AI Tools', count: 6 },
  { id: 'developer-tools', label: 'Developer Tools', count: 5 },
  { id: 'games-creative', label: 'Games & Creative', count: 3 },
];

export const TECH_FILTERS = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'TailwindCSS',
  'Rust'
];
