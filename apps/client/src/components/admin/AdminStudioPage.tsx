import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Users,
  Radio,
  Mail,
  UserX,
  Search,
  Download,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  RotateCcw,
  Shield,
  Lightbulb,
  MoreHorizontal,
  FolderGit2,
  FileCode2,
  X,
  Check,
  Ban,
  ArrowLeft,
  Settings,
  BarChart3,
  MessageSquare,
  Activity,
  Boxes,
  PlusCircle,
  Rocket,
  Bookmark,
  ArrowRight
} from 'lucide-react';
import { AdminStudioPageProps, AdminUserMember, AuditLogItem, ModerationItem } from './types';
import {
  AuditLog,
  KpiMetrics,
  ModerationQueue,
  QuickActions,
  RecentUploadsTable,
  SystemHealth,
  TrafficChart,
} from './widgets';
import { ProductKind } from './new-product/types';
import { UploadStepper } from './new-product/UploadStepper';
import { ProductTypeSelector } from './new-product/ProductTypeSelector';
import { BasicMetadataForm } from './new-product/BasicMetadataForm';
import { MarkdownEditorSection } from './new-product/MarkdownEditorSection';
import {
  INITIAL_PRODUCTS,
  ProductKpiCards,
  ProductToolbar,
  ProductTable,
  CdnStorageWidget,
  ShaAuditWidget,
} from './products';
import { ProductRegistryItem, ProductCategory } from './products/types';

// Mock initial data matching Stitch screen 75e5c2e602a5486b9fbb11e71d953473
const INITIAL_USERS: AdminUserMember[] = [
  {
    id: 'usr_9942a1',
    name: 'Alex Nguyen',
    email: 'alex.nguyen@devfolio.io',
    avatarUrl: '/images/alex-avatar.jpg',
    isVerified: true,
    joinDate: '12/03/2023',
    role: 'Super Admin',
    roleBadgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    status: 'active',
    recentIp: '14.161.22.84',
    location: 'TP. Hồ Chí Minh, VN',
    profileViews: '4,812 views',
    userSession: 'Chrome 124 / macOS',
    activities: [
      {
        id: 'act-1',
        type: 'project',
        projectName: 'Dự án Synapse AI',
        title: 'Dự án Synapse AI',
        timeAgo: '12 phút trước',
        quote: '"Kiến trúc vector embedding của bản này tối ưu memory rất tốt so với v1. Đã merg..."',
        iconColor: 'text-cyan-400',
      },
      {
        id: 'act-2',
        type: 'project',
        projectName: 'Dự án PixelForge',
        title: 'Dự án PixelForge',
        timeAgo: '3 giờ trước',
        quote: '"Giao diện canvas WebGL hoạt động mượt mà ở 120fps trên chip M-series. Tuyệt..."',
        iconColor: 'text-emerald-400',
      },
      {
        id: 'act-3',
        type: 'audit',
        title: 'Audit Log System',
        timeAgo: 'Hôm qua 21:40',
        quote: '"Đã cập nhật role-based access control (RBAC) cho nhóm Reviewer cộng đồng."',
        iconColor: 'text-purple-400',
      },
    ],
  },
  {
    id: 'usr_3811f2',
    name: 'Trần Anh Dũng',
    email: 'dung.tran@techvibe.vn',
    avatarUrl: '/images/devpulse.jpg',
    joinDate: '04/08/2023',
    role: 'Thành viên',
    roleBadgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
    status: 'active',
    recentIp: '118.69.182.12',
    location: 'Hà Nội, VN',
    profileViews: '1,240 views',
    userSession: 'Firefox 125 / Windows 11',
    activities: [
      {
        id: 'act-4',
        type: 'project',
        projectName: 'Dự án DevPulse',
        title: 'Dự án DevPulse',
        timeAgo: '1 ngày trước',
        quote: '"Tích hợp webhook Discord nhận alert production downtime ngay lập tức."',
        iconColor: 'text-cyan-400',
      },
      {
        id: 'act-5',
        type: 'comment',
        title: 'Bình luận hỏi đáp',
        timeAgo: '3 ngày trước',
        quote: '"Mong muốn nhóm dev hỗ trợ thêm export định dạng Parquet & Apache Arrow."',
        iconColor: 'text-emerald-400',
      },
    ],
  },
  {
    id: 'usr_5420d9',
    name: 'Minh Lan Vũ',
    email: 'lan.vu@framer.design',
    avatarUrl: '/images/chromapalette.jpg',
    joinDate: '19/01/2024',
    role: 'Thành viên',
    roleBadgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
    status: 'active',
    recentIp: '125.235.239.5',
    location: 'Đà Nẵng, VN',
    profileViews: '2,190 views',
    userSession: 'Safari 17.4 / macOS Sonoma',
    activities: [
      {
        id: 'act-6',
        type: 'project',
        projectName: 'ChromaPalette UI Kit',
        title: 'ChromaPalette UI Kit',
        timeAgo: '4 giờ trước',
        quote: '"Đã cập nhật bộ design tokens HSL sang OKLCH cho toàn bộ hệ thống."',
        iconColor: 'text-teal-400',
      },
      {
        id: 'act-7',
        type: 'project',
        projectName: 'Dự án ChromaPalette',
        title: 'Dự án ChromaPalette',
        timeAgo: '2 ngày trước',
        quote: '"Bổ sung preset WCAG AAA đạt chuẩn tương phản cao cho người khiếm thị."',
        iconColor: 'text-emerald-400',
      },
    ],
  },
  {
    id: 'usr_7182c4',
    name: 'Khải Quang Đặng',
    email: 'khaiqd.core@github.com',
    handle: '@khaiqd_core',
    initials: 'KD',
    initialsColor: 'bg-purple-900/60 text-purple-300 border border-purple-500/40',
    joinDate: '28/02/2024',
    role: 'Guest Reviewer',
    roleBadgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    status: 'active',
    recentIp: '42.112.35.88',
    location: 'Cần Thơ, VN',
    profileViews: '890 views',
    userSession: 'Edge 124 / Linux x86_64',
    activities: [
      {
        id: 'act-8',
        type: 'project',
        projectName: 'Review PR #412',
        title: 'Review PR #412',
        timeAgo: '5 giờ trước',
        quote: '"Đã duyệt và benchmark throughput cho cụm microservices gRPC Rust."',
        iconColor: 'text-purple-400',
      },
      {
        id: 'act-9',
        type: 'audit',
        title: 'Security Assessment',
        timeAgo: '3 ngày trước',
        quote: '"Khuyến nghị nâng cấp TLS cipher suites và cấu hình rate limiting login."',
        iconColor: 'text-cyan-400',
      },
    ],
  },
  {
    id: 'usr_bot009',
    name: 'spam_bot99',
    email: 'bot-cluster-04@proxymesh.net',
    isSpam: true,
    joinDate: '01/05/2024',
    role: 'Guest',
    roleBadgeColor: 'text-slate-400 bg-white/[0.05] border-white/10',
    status: 'banned',
    recentIp: '185.220.101.4',
    location: 'Tor Exit Node / Frankfurt, DE',
    profileViews: '34 views',
    userSession: 'Python-requests/2.31.0 / Headless',
    activities: [
      {
        id: 'act-10',
        type: 'audit',
        title: 'Spam Flagged',
        timeAgo: 'Hôm nay 03:12',
        quote: '"Tự động gửi 18 bình luận chứa link phishing đã bị AI Filter chặn tức thì."',
        iconColor: 'text-red-400',
      },
      {
        id: 'act-11',
        type: 'audit',
        title: 'Bot Alert',
        timeAgo: 'Hôm qua 23:55',
        quote: '"Phát hiện tần suất 120 req/s đột biến vào endpoint submission form."',
        iconColor: 'text-amber-400',
      },
    ],
  },
  {
    id: 'usr_6639a0',
    name: 'Hoàng Yến Phạm',
    email: 'yen.pham@cloudcraft.dev',
    avatarUrl: '/images/docuflow.jpg',
    joinDate: '14/05/2024',
    role: 'Thành viên',
    roleBadgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
    status: 'active',
    recentIp: '27.72.104.90',
    location: 'Hải Phòng, VN',
    profileViews: '640 views',
    userSession: 'Chrome 124 / Windows 10',
    activities: [
      {
        id: 'act-12',
        type: 'project',
        projectName: 'Tài liệu DocuFlow',
        title: 'Tài liệu DocuFlow',
        timeAgo: '6 giờ trước',
        quote: '"Viết hướng dẫn deploy Helm charts tự động hóa trên Kubernetes cluster."',
        iconColor: 'text-cyan-400',
      },
      {
        id: 'act-13',
        type: 'comment',
        title: 'Đóng góp Blog',
        timeAgo: '4 ngày trước',
        quote: '"Chia sẻ bài viết Kiến trúc Event-Driven hiệu năng cao với Apache Kafka."',
        iconColor: 'text-emerald-400',
      },
    ],
  },
];

export const AdminStudioPage: React.FC<AdminStudioPageProps> = ({
  onBackToHome,
  currentUser: _currentUser,
  onNavigateTab: _onNavigateTab,
}) => {
  // Navigation: Mặc định là 'overview' (Trang Tổng quan)
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('overview');
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState<boolean>(true);

  // Overview dashboard states
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'year'>('30d');
  const [isRefreshingAudit, setIsRefreshingAudit] = useState(false);

  // Product upload form states
  const [productKind, setProductKind] = useState<ProductKind>('cli');
  const [productName, setProductName] = useState('RustPulse CLI Monitor');
  const [productVersion, setProductVersion] = useState('v1.0.0-rc.2');
  const [productSlug, setProductSlug] = useState('rustpulse-cli-monitor');
  const [productSummary, setProductSummary] = useState(
    'Công cụ giám sát hiệu năng I/O & Thread CPU viết hoàn toàn bằng Rust siêu nhẹ, hỗ trợ giao diện Terminal TUI trực quan.'
  );
  const [techStacks, setTechStacks] = useState<string[]>([
    'Rust',
    'Tokio Async',
    'TUI Terminal',
    'Linux/macOS',
    'Cross-platform',
  ]);
  const [markdownContent, setMarkdownContent] = useState<string>(
`### Tổng quan ứng dụng
RustPulse cung cấp cơ chế non-blocking monitoring trực tiếp từ \`/proc\` stats trên Linux kernel và dynamic Darwin telemetry trên macOS.

#### 🚀 Hướng dẫn cài đặt nhanh
\`\`\`bash
cargo install rustpulse-monitor
rustpulse --live
\`\`\``
  );

  // Products Catalog states & filters
  const [products] = useState<ProductRegistryItem[]>(INITIAL_PRODUCTS);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory>('all');
  const [productStatusFilter, setProductStatusFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        item.techStack.some((t) => t.toLowerCase().includes(productSearchQuery.toLowerCase()));

      const matchCategory =
        selectedProductCategory === 'all' || item.category === selectedProductCategory;

      const matchStatus =
        productStatusFilter === 'all' || item.status === productStatusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, productSearchQuery, selectedProductCategory, productStatusFilter]);

  const handleResetProductFilter = () => {
    setProductSearchQuery('');
    setSelectedProductCategory('all');
    setProductStatusFilter('all');
  };

  // Moderation Queue state
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([
    {
      id: 'mod-1',
      type: 'comment',
      title: 'BÌNH LUẬN CẦN DUYỆT',
      badge: 'Bình luận',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      time: '10m trước',
      content: '@techlo_dude đánh giá Synapse AI: "Codebase rất sạch nhưng phần memory optimization ở v2.3 có chút leak khi load weight >4GB."',
    },
    {
      id: 'mod-2',
      type: 'build',
      title: 'BẢN BUILD CẬP NHẬT',
      badge: 'Bản build',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      time: '42m trước',
      content: 'ChromaPalette CLI v1.0.1 đã tải binary lên kho staging, đang đợi kiểm thử sandbox tự động.',
    },
    {
      id: 'mod-3',
      type: 'contributor',
      title: 'YÊU CẦU CONTRIBUTOR',
      badge: 'Contributor',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      time: '2h trước',
      content: 'Dev @namnguyen xin cấp quyền Contributor cho danh mục Web Apps & Open-Source Tools.',
    },
  ]);

  // Audit Logs state
  const [auditLogs] = useState<AuditLogItem[]>([
    {
      id: 1,
      time: '14:32',
      actor: 'Super Admin',
      action: 'cập nhật bản build Synapse AI v2.4.0',
      detail: 'Deploy to edge SNG-1',
    },
    {
      id: 2,
      time: '13:15',
      actor: 'Hệ thống',
      action: 'Đã phê duyệt 4 bình luận của dự án CyberRogue',
      detail: 'Batch moderation approved',
    },
    {
      id: 3,
      time: '11:40',
      actor: 'CDN Sync',
      action: 'Đồng bộ hóa CDN Singapore hoàn tất',
      detail: 'Cloudflare R2 sync: 100% ok',
    },
    {
      id: 4,
      time: '09:12',
      actor: 'Security',
      action: 'Tạo mã mời Admin cho kỹ sư DevOps',
      detail: 'Token #ADM-98441 generated',
    },
  ]);

  // Users data state
  const [users, setUsers] = useState<AdminUserMember[]>(INITIAL_USERS);
  const [selectedUserId, setSelectedUserId] = useState<string>(INITIAL_USERS[0].id);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'Admin' | 'Thành viên' | 'Reviewer'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'banned'>('all');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isAiRuleModalOpen, setIsAiRuleModalOpen] = useState(false);
  const [isCliModalOpen, setIsCliModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Form states for modals
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Thành viên' | 'Guest Reviewer'>('Thành viên');
  const [cliCommand, setCliCommand] = useState('');
  const [cliLogs, setCliLogs] = useState<string[]>([
    'DevFolio Studio CLI v2.4.0 (x86_64-node-win32)',
    'Connected to cluster sng-edge-prod. Type "help" or run a quick command below.',
  ]);

  // AI Security Rules State
  const [aiRules, setAiRules] = useState({
    blockPhishing: true,
    rateLimiting: true,
    nlpFilter: true,
    torQuarantine: true,
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveModeration = (id: string, name: string) => {
    setModerationItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Đã phê duyệt: ${name}`);
  };

  const handleRejectModeration = (id: string) => {
    setModerationItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa bỏ mục kiểm duyệt.');
  };

  const handleRefreshAudit = () => {
    setIsRefreshingAudit(true);
    setTimeout(() => {
      setIsRefreshingAudit(false);
      showToast('Đã đồng bộ nhật ký kiểm toán mới nhất từ Cloudflare & DB.');
    }, 700);
  };

  const handlePurgeCdnCache = () => {
    showToast('Đang phát lệnh Purge Cache đến 12 CDN Edges... Hoàn tất 100%!');
  };

  // Selected User Object
  const selectedUser = useMemo(() => {
    return users.find((u) => u.id === selectedUserId) || users[0];
  }, [users, selectedUserId]);

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Role filter
      if (roleFilter === 'Admin' && !user.role.toLowerCase().includes('admin')) {
        return false;
      }
      if (roleFilter === 'Thành viên' && user.role !== 'Thành viên') {
        return false;
      }
      if (roleFilter === 'Reviewer' && !user.role.toLowerCase().includes('reviewer')) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && user.status !== statusFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = user.name.toLowerCase().includes(q);
        const matchEmail = user.email.toLowerCase().includes(q);
        const matchHandle = user.handle?.toLowerCase().includes(q);
        const matchRole = user.role.toLowerCase().includes(q);
        return matchName || matchEmail || matchHandle || matchRole;
      }

      return true;
    });
  }, [users, roleFilter, statusFilter, searchQuery]);

  // Keyboard navigation listener (j / k to navigate users)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      // Meta+K or Ctrl+K for search focus
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      if (filteredUsers.length === 0) return;

      const currentIndex = filteredUsers.findIndex((u) => u.id === selectedUserId);

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < filteredUsers.length - 1 ? currentIndex + 1 : 0;
        setSelectedUserId(filteredUsers[nextIndex].id);
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredUsers.length - 1;
        setSelectedUserId(filteredUsers[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredUsers, selectedUserId]);

  // Toggle selection checkbox for one user
  const handleToggleSelectUser = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Select All
  const handleToggleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['ID', 'Tên người dùng', 'Email', 'Vai trò', 'Ngày gia nhập', 'Trạng thái', 'IP gần nhất', 'Vị trí'];
    const rows = users.map((u) => [
      u.id,
      `"${u.name}"`,
      u.email,
      u.role,
      u.joinDate,
      u.status,
      u.recentIp,
      `"${u.location}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `devfolio_users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Đã xuất thành công tệp danh sách thành viên devfolio_users_export.csv!');
  };

  // Toggle Ban Status
  const handleToggleBanUser = () => {
    if (!selectedUser) return;
    const isCurrentlyBanned = selectedUser.status === 'banned';
    const newStatus = isCurrentlyBanned ? 'active' : 'banned';

    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, status: newStatus } : u
      )
    );

    if (newStatus === 'banned') {
      showToast(`Đã khóa tài khoản của ${selectedUser.name}!`);
    } else {
      showToast(`Đã mở khóa và khôi phục quyền cho ${selectedUser.name}!`);
    }
  };

  // Reset Password Action
  const handleResetPassword = () => {
    if (!selectedUser) return;
    showToast(`Đã gửi email khôi phục mật khẩu bảo mật tới ${selectedUser.email}`);
  };

  // Change Role Action
  const handleChangeRole = (newRole: AdminUserMember['role']) => {
    if (!selectedUser) return;
    let badgeColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25';
    if (newRole === 'Super Admin' || newRole === 'Admin') {
      badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    } else if (newRole === 'Guest Reviewer') {
      badgeColor = 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    } else if (newRole === 'Guest') {
      badgeColor = 'text-slate-400 bg-white/[0.05] border-white/10';
    }

    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, role: newRole, roleBadgeColor: badgeColor } : u
      )
    );
    setIsRoleModalOpen(false);
    showToast(`Đã cập nhật phân quyền của ${selectedUser.name} thành "${newRole}"!`);
  };

  // Send Invite
  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newUser: AdminUserMember = {
      id: `usr_${Math.random().toString(36).substring(2, 8)}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      joinDate: new Date().toLocaleDateString('vi-VN'),
      role: inviteRole,
      roleBadgeColor:
        inviteRole === 'Admin'
          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
          : inviteRole === 'Guest Reviewer'
          ? 'text-purple-400 bg-purple-500/10 border-purple-500/30'
          : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25',
      status: 'active',
      recentIp: '127.0.0.1',
      location: 'Chờ kích hoạt',
      profileViews: '0 views',
      userSession: 'Chưa đăng nhập',
      activities: [],
    };

    setUsers((prev) => [newUser, ...prev]);
    setSelectedUserId(newUser.id);
    setIsInviteModalOpen(false);
    setInviteEmail('');
    showToast(`Đã gửi mã mời thành viên tới ${inviteEmail}!`);
  };

  // Execute CLI Command
  const handleExecuteCli = (cmd?: string) => {
    const toRun = cmd || cliCommand;
    if (!toRun.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    let result = '';

    if (toRun.includes('export')) {
      result = 'OK: Generated export payload for 1,842 users. File ready.';
    } else if (toRun.includes('ban') || toRun.includes('quarantine')) {
      result = 'OK: Flagged 9 suspicious IP clusters and synchronized cloud firewall.';
    } else if (toRun.includes('cache')) {
      result = 'OK: Cloudflare CDN edge cache purged (100% propagated across 12 datacenters).';
    } else if (toRun.includes('help')) {
      result = 'Commands: users --list, users --export, bot --quarantine-all, cache --purge, rbac --verify';
    } else {
      result = `OK: Command "${toRun}" executed successfully at cluster node.`;
    }

    setCliLogs((prev) => [...prev, `[${timestamp}] $ ${toRun}`, `→ ${result}`]);
    setCliCommand('');
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e1624] border border-emerald-500/40 text-emerald-300 text-xs shadow-2xl shadow-emerald-950/50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* LEFT ADMIN SIDEBAR */}
      <aside className="w-64 shrink-0 bg-[#090d16] border-r border-white/[0.06] flex flex-col justify-between hidden lg:flex select-none">
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 border-b border-white/[0.05] flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-2">
                <div className="font-bold text-white text-base tracking-tight">
                  DevFolio
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/50">
                  Studio
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs">
            {/* 1. Tổng quan */}
            <button
              onClick={() => {
                setActiveSidebarItem('overview');
                showToast('Chuyển tới Tổng quan số liệu hệ thống.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'overview'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${activeSidebarItem === 'overview' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className={activeSidebarItem === 'overview' ? 'font-semibold text-white' : ''}>Tổng quan</span>
            </button>

            {/* 2. Sản phẩm & Kho tải (Menu thả xuống / Accordion Dropdown) */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                  activeSidebarItem === 'projects' || activeSidebarItem === 'products' || activeSidebarItem === 'upload'
                    ? 'bg-[#121c2d] text-white border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Boxes className={`w-4 h-4 ${
                    activeSidebarItem === 'projects' || activeSidebarItem === 'products' || activeSidebarItem === 'upload'
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`} />
                  <span>Sản phẩm & Kho tải</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                    48
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isProductsDropdownOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Sub-menu thả xuống */}
              {isProductsDropdownOpen && (
                <div className="ml-4 pl-3 border-l border-white/[0.08] space-y-1 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  {/* Mục con 1: Tất cả sản phẩm / Kho tải */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarItem('products');
                      showToast('Xem danh mục 48 sản phẩm & bản build trong kho tải.');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      activeSidebarItem === 'products' || activeSidebarItem === 'projects'
                        ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.12)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    <span>Tất cả sản phẩm</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400">
                      48
                    </span>
                  </button>

                  {/* Mục con 2: Đăng tải mới */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarItem('upload');
                      showToast('Mở trình tạo sản phẩm & bản build mới.');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                      activeSidebarItem === 'upload'
                        ? 'bg-emerald-400 text-slate-950 font-bold shadow-[0_0_14px_rgba(52,211,153,0.35)]'
                        : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <PlusCircle className={`w-3.5 h-3.5 ${activeSidebarItem === 'upload' ? 'text-slate-950 stroke-[2.5]' : 'text-emerald-400'}`} />
                      <span>Đăng tải mới</span>
                    </div>
                    <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                      activeSidebarItem === 'upload'
                        ? 'bg-slate-950 text-emerald-400'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      +Up
                    </span>
                  </button>
                </div>
              )}
            </div>
            
            {/* 3. Quản lý người dùng (ACTIVE in Stitch screen) */}
            <button
              onClick={() => setActiveSidebarItem('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'users'
                  ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Users className={`w-4 h-4 ${activeSidebarItem === 'users' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="font-semibold text-white">Quản lý người dùng</span>
            </button>

            {/* 4. Kiểm duyệt bình luận */}
            <button
              onClick={() => {
                setActiveSidebarItem('comments');
                showToast('Chuyển tới hàng đợi Kiểm duyệt bình luận.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'comments'
                  ? 'bg-[#141e2e] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span>Kiểm duyệt bình luận</span>
            </button>

            {/* 5. Thống kê chi tiết */}
            <button
              onClick={() => {
                setActiveSidebarItem('stats');
                showToast('Chuyển tới Thống kê chi tiết.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'stats'
                  ? 'bg-[#141e2e] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Activity className="w-4 h-4 text-slate-400" />
              <span>Thống kê chi tiết</span>
            </button>

            {/* 6. Cài đặt hệ thống */}
            <button
              onClick={() => {
                setActiveSidebarItem('settings');
                showToast('Chuyển tới Cài đặt hệ thống.');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'settings'
                  ? 'bg-[#141e2e] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Cài đặt hệ thống</span>
            </button>

            {/* 7. Nhật ký hoạt động */}
            <button
              onClick={() => {
                setActiveSidebarItem('audit');
                showToast('Chuyển tới Nhật ký hoạt động (Audit logs).');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeSidebarItem === 'audit'
                  ? 'bg-[#141e2e] text-white border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <FileCode2 className="w-4 h-4 text-slate-400" />
              <span>Nhật ký hoạt động</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/[0.05] space-y-3">
          <div>
            <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">
              Môi trường
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Production v2.4</span>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="w-full flex items-center gap-2 pt-2 text-xs text-slate-400 hover:text-emerald-400 transition cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Về trang chủ</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP BREADCRUMB & HEADER */}
        <header className="h-14 px-6 border-b border-white/[0.06] bg-[#080d16]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">workspace</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">admin-studio</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-semibold">
              {activeSidebarItem === 'overview' && 'overview'}
              {activeSidebarItem === 'users' && 'users'}
              {activeSidebarItem === 'upload' && 'new-product'}
              {activeSidebarItem === 'products' && 'products'}
              {activeSidebarItem === 'comments' && 'moderation'}
              {activeSidebarItem === 'stats' && 'analytics'}
              {activeSidebarItem === 'settings' && 'settings'}
              {activeSidebarItem === 'audit' && 'audit-logs'}
            </span>
          </div>

          {/* Right Header: CLI Quick Actions & User Avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCliModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111724] hover:bg-[#172133] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono transition cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI Quick Actions</span>
            </button>

            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500/40 bg-emerald-500/20">
                <img
                  src="/images/alex-avatar.jpg"
                  alt="Alex Nguyen"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#070b12] rounded-full" />
            </div>
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <main className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">

          {/* TAB 1: TỔNG QUAN HỆ THỐNG (DEFAULT) */}
          {activeSidebarItem === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Top Greeting & Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      Xin chào, Alex
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Super Admin
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span>Hệ thống ổn định • 99.98% Uptime</span>
                    </div>
                    <p className="text-xs text-slate-400 hidden sm:inline">
                      Tổng quan vận hành trung tâm dữ liệu, tiến độ kho công cụ & hàng đợi kiểm duyệt hôm nay.
                    </p>
                  </div>
                </div>

                {/* Time Filters & Export */}
                <div className="flex items-center gap-2.5 self-start md:self-auto">
                  <div className="p-1 rounded-xl bg-[#0d131f] border border-white/[0.08] flex items-center gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setTimeRange('7d')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        timeRange === '7d' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      7 ngày qua
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimeRange('30d')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        timeRange === '30d' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      30 ngày qua
                    </button>
                    <button
                      type="button"
                      onClick={() => setTimeRange('year')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        timeRange === 'year' ? 'bg-[#182335] text-white font-medium' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Năm nay
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('Đang xuất báo cáo tổng quan CSV/PDF...')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d131f] hover:bg-[#131b2c] border border-white/[0.08] text-slate-300 hover:text-white text-xs transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất báo cáo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarItem('upload');
                      showToast('Chuyển tới giao diện tạo bản build & sản phẩm mới!');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs transition shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer"
                  >
                    <Rocket className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>Tạo bản build mới</span>
                  </button>
                </div>
              </div>

              {/* 4 KPI Metrics */}
              <KpiMetrics />

              {/* 2 Columns Body */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                  <TrafficChart />
                  <RecentUploadsTable onShowToast={showToast} />
                  <SystemHealth />
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">
                  <ModerationQueue 
                    items={moderationItems}
                    onApprove={handleApproveModeration}
                    onReject={handleRejectModeration}
                    onTestSandbox={() => showToast('Đang chạy sandbox cho ChromaPalette CLI...')}
                    onViewProfile={(name) => showToast(`Xem hồ sơ của ${name}`)}
                  />

                  <QuickActions 
                    onOpenNewTool={() => setActiveSidebarItem('upload')}
                    onPurgeCdn={handlePurgeCdnCache}
                    onOpenAdminInvite={() => setIsInviteModalOpen(true)}
                    onOpenRealtimeLogs={() => setIsCliModalOpen(true)}
                  />

                  <AuditLog 
                    logs={auditLogs}
                    isRefreshing={isRefreshingAudit}
                    onRefresh={handleRefreshAudit}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUẢN LÝ NGƯỜI DÙNG */}
          {activeSidebarItem === 'users' && (
            <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* 4 TOP KPI METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Tổng người dùng */}
            <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  Tổng người dùng
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    1,842
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                    ↗ +12%
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-slate-300">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Card 2: Đang trực tuyến */}
            <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  Đang trực tuyến
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    318
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-slate-300">
                <Radio className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            {/* Card 3: Chờ duyệt / Kích hoạt */}
            <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  Chờ duyệt / Kích hoạt
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    24
                  </span>
                  <span className="text-xs text-slate-400">yêu cầu</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-slate-300">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            {/* Card 4: Vi phạm / Bị khóa */}
            <div className="p-4 rounded-2xl bg-[#0d1421] border border-white/[0.07] flex items-center justify-between relative overflow-hidden">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                  Vi phạm / Bị khóa
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    9
                  </span>
                  <span className="text-xs text-red-400 font-medium">spam bot</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#131d2e] border border-white/[0.06] flex items-center justify-center text-slate-300">
                <UserX className="w-5 h-5 text-red-400" />
              </div>
            </div>

          </div>

          {/* PAGE TITLE & ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Quản lý người dùng & Thành viên
                </h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#131e2f] text-emerald-400 border border-emerald-500/20">
                  1,842 thành viên
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Theo dõi quyền hạn, hành vi kiểm duyệt, chỉ số tương tác và nhật ký bảo mật của cộng đồng DevFolio.
              </p>
            </div>

            {/* Actions: Xuất CSV & + Mời thành viên mới */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111724] hover:bg-[#172133] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất CSV</span>
              </button>

              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-semibold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Mời thành viên mới</span>
              </button>
            </div>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-2 rounded-2xl bg-[#0b101b] border border-white/[0.06]">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên, email, @github..."
                className="w-full pl-9 pr-12 py-2 rounded-xl bg-[#111724] border border-white/[0.06] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 transition"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] border border-white/[0.08] text-slate-400">
                ⌘K
              </kbd>
            </div>

            {/* Filter Pills & Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Role filter pills */}
              <div className="p-1 rounded-xl bg-[#111724] border border-white/[0.06] flex items-center gap-1 text-xs">
                <button
                  onClick={() => setRoleFilter('all')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    roleFilter === 'all'
                      ? 'bg-[#1b2537] text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tất cả vai trò
                </button>
                <button
                  onClick={() => setRoleFilter('Admin')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    roleFilter === 'Admin'
                      ? 'bg-[#1b2537] text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Admin
                </button>
                <button
                  onClick={() => setRoleFilter('Thành viên')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    roleFilter === 'Thành viên'
                      ? 'bg-[#1b2537] text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Thành viên
                </button>
                <button
                  onClick={() => setRoleFilter('Reviewer')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    roleFilter === 'Reviewer'
                      ? 'bg-[#1b2537] text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reviewer
                </button>
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111724] hover:bg-[#172133] border border-white/[0.06] text-xs text-slate-300 transition cursor-pointer"
                >
                  <span>
                    {statusFilter === 'all'
                      ? 'Mọi trạng thái'
                      : statusFilter === 'active'
                      ? 'Đang hoạt động'
                      : 'Bị khóa'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isStatusDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-40 rounded-xl bg-[#111724] border border-white/[0.08] shadow-xl p-1 z-30 text-xs">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        setIsStatusDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
                    >
                      Mọi trạng thái
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('active');
                        setIsStatusDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/[0.05] text-slate-300 hover:text-white"
                    >
                      Đang hoạt động
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('banned');
                        setIsStatusDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/[0.05] text-red-400 hover:text-red-300"
                    >
                      Bị khóa
                    </button>
                  </div>
                )}
              </div>

              {/* Column Options Button */}
              <button
                onClick={() => showToast('Đang hiển thị 4 cột chính: Hồ sơ, Ngày tham gia, Vai trò & Hành động.')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111724] hover:bg-[#172133] border border-white/[0.06] text-xs text-slate-300 transition cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Cột hiển thị</span>
              </button>

            </div>
          </div>

          {/* TWO COLUMNS LAYOUT: TABLE (LEFT) & DETAIL INSPECTOR (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: USERS DATA TABLE (8 COLS) */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="rounded-2xl bg-[#0c121e] border border-white/[0.07] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    
                    {/* Header Row */}
                    <thead>
                      <tr className="border-b border-white/[0.06] text-[11px] font-semibold text-slate-400 tracking-wider uppercase bg-[#090e17]">
                        <th className="py-3 px-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={handleToggleSelectAll}
                            className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          />
                        </th>
                        <th className="py-3 px-4">NGƯỜI DÙNG / HỒ SƠ</th>
                        <th className="py-3 px-4">NGÀY GIA NHẬP</th>
                        <th className="py-3 px-4">VAI TRÒ</th>
                        <th className="py-3 px-4 text-right"></th>
                      </tr>
                    </thead>

                    {/* Table Body Rows */}
                    <tbody className="divide-y divide-white/[0.04] text-xs">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            Không tìm thấy người dùng phù hợp với bộ lọc.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => {
                          const isSelected = selectedUserId === user.id;
                          const isChecked = selectedUserIds.includes(user.id);

                          return (
                            <tr
                              key={user.id}
                              onClick={() => setSelectedUserId(user.id)}
                              className={`transition cursor-pointer ${
                                isSelected
                                  ? 'bg-[#152033] border-l-2 border-l-emerald-400'
                                  : 'hover:bg-white/[0.02]'
                              }`}
                            >
                              {/* Checkbox */}
                              <td
                                className="py-3.5 px-4 text-center"
                                onClick={(e) => handleToggleSelectUser(user.id, e)}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}}
                                  className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                />
                              </td>

                              {/* User Info & Avatar */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative shrink-0">
                                    {user.avatarUrl ? (
                                      <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-slate-800">
                                        <img
                                          src={user.avatarUrl}
                                          alt={user.name}
                                          onError={(e) => {
                                            (e.target as HTMLElement).style.display = 'none';
                                          }}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ) : user.initials ? (
                                      <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${user.initialsColor}`}
                                      >
                                        {user.initials}
                                      </div>
                                    ) : user.isSpam ? (
                                      <div className="w-9 h-9 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400">
                                        <UserX className="w-4 h-4" />
                                      </div>
                                    ) : (
                                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 font-bold text-xs">
                                        {user.name.charAt(0)}
                                      </div>
                                    )}

                                    {user.status === 'active' && (
                                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#0c121e]" />
                                    )}
                                  </div>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`font-semibold tracking-tight truncate ${
                                          isSelected ? 'text-white' : 'text-slate-200'
                                        }`}
                                      >
                                        {user.name}
                                      </span>
                                      {user.isVerified && (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 fill-cyan-400/20" />
                                      )}
                                      {user.isSpam && (
                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">
                                          SPAM
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-mono truncate">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Join Date */}
                              <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                {user.joinDate}
                              </td>

                              {/* Role Badge */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono border ${user.roleBadgeColor}`}
                                >
                                  {user.role}
                                </span>
                              </td>

                              {/* Actions Menu */}
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedUserId(user.id);
                                    setIsRoleModalOpen(true);
                                  }}
                                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Pagination */}
                <div className="p-3.5 border-t border-white/[0.06] bg-[#090e17] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                  <div>
                    Hiển thị <span className="text-white font-medium">1 - {filteredUsers.length}</span> trên{' '}
                    <span className="text-white font-medium">1,842</span> người dùng
                  </div>

                  <div className="flex items-center gap-1 font-mono">
                    <button className="p-1.5 rounded-lg bg-[#111724] border border-white/[0.06] text-slate-400 hover:text-white transition">
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-2.5 py-1 rounded-lg bg-emerald-500 text-gray-950 font-bold">
                      1
                    </button>
                    <button className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]">
                      2
                    </button>
                    <button className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]">
                      3
                    </button>
                    <span className="px-1 text-slate-500">...</span>
                    <button className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]">
                      307
                    </button>
                    <button className="p-1.5 rounded-lg bg-[#111724] border border-white/[0.06] text-slate-400 hover:text-white transition">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* AI SECURITY GUARD BANNER */}
              <div className="p-4 rounded-2xl bg-[#0c1422] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span>Tự động quét spam & AI Security Guard</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Hệ thống vừa ngăn chặn 18 tài khoản có hành vi spam bình luận link lừa đảo trong 24h qua.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAiRuleModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#142033] hover:bg-[#1a2b45] border border-cyan-500/30 text-cyan-300 text-xs font-medium whitespace-nowrap transition cursor-pointer self-start sm:self-auto"
                >
                  Cấu hình quy tắc
                </button>
              </div>

            </div>

            {/* RIGHT: USER DETAIL INSPECTOR (4 COLS) */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="p-5 rounded-2xl bg-[#0c121e] border border-white/[0.07] space-y-5">
                
                {/* User Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-500/40 bg-slate-800">
                        {selectedUser.avatarUrl ? (
                          <img
                            src={selectedUser.avatarUrl}
                            alt={selectedUser.name}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                            className="w-full h-full object-cover"
                          />
                        ) : selectedUser.initials ? (
                          <div
                            className={`w-full h-full flex items-center justify-center font-bold text-sm ${selectedUser.initialsColor}`}
                          >
                            {selectedUser.initials}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-sm text-slate-300">
                            {selectedUser.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0c121e] ${
                          selectedUser.status === 'banned' ? 'bg-red-500' : 'bg-emerald-400'
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">
                          {selectedUser.name}
                        </span>
                        {selectedUser.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-mono truncate">
                        {selectedUser.email}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                          {selectedUser.role}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/[0.04]">
                          ID: {selectedUser.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsRoleModalOpen(true)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* 2 Metric Boxes */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.05] space-y-1">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Đăng nhập gần nhất
                    </div>
                    <div className="text-xs font-mono font-bold text-white">
                      {selectedUser.recentIp}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {selectedUser.location}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#090e17] border border-white/[0.05] space-y-1">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Lượt xem hồ sơ / Session
                    </div>
                    <div className="text-xs font-bold text-cyan-400">
                      {selectedUser.profileViews}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {selectedUser.userSession}
                    </div>
                  </div>
                </div>

                {/* 5 Activities / Recent Activity */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-300">
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] tracking-wider uppercase">
                        5 BÌNH LUẬN & HOẠT ĐỘNG GẦN NHẤT
                      </span>
                    </div>
                    <button
                      onClick={() => showToast(`Xem toàn bộ nhật ký của ${selectedUser.name}`)}
                      className="text-cyan-400 hover:text-cyan-300 text-[11px] font-medium transition cursor-pointer"
                    >
                      Xem tất cả
                    </button>
                  </div>

                  {/* Activity Items List */}
                  <div className="space-y-2.5">
                    {selectedUser.activities.length === 0 ? (
                      <div className="py-4 text-center text-xs text-slate-500">
                        Chưa có hoạt động bình luận nào gần đây.
                      </div>
                    ) : (
                      selectedUser.activities.map((act) => (
                        <div
                          key={act.id}
                          className="p-3 rounded-xl bg-[#090e17] border border-white/[0.04] space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 font-semibold text-white">
                              <FolderGit2 className={`w-3.5 h-3.5 ${act.iconColor}`} />
                              <span>{act.title}</span>
                            </div>
                            <span className="text-slate-400 text-[10px]">{act.timeAgo}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 italic line-clamp-2 leading-relaxed">
                            {act.quote}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Permissions & Emergency Moderation */}
                <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    QUYỀN HẠN & KIỂM DUYỆT KHẨN CẤP
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsRoleModalOpen(true)}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-xs font-medium text-slate-200 transition cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Đổi phân quyền</span>
                    </button>

                    <button
                      onClick={handleResetPassword}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.08] text-xs font-medium text-slate-200 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reset mật khẩu</span>
                    </button>
                  </div>

                  <button
                    onClick={handleToggleBanUser}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      selectedUser.status === 'banned'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-red-950/20 border-red-500/40 text-red-400 hover:bg-red-900/30'
                    }`}
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>
                      {selectedUser.status === 'banned'
                        ? 'Mở khóa tài khoản này'
                        : 'Cấm tài khoản này (Ban user)'}
                    </span>
                  </button>
                </div>

              </div>

              {/* BOTTOM HINT CARD (Keyboard j/k tip) */}
              <div className="p-4 rounded-2xl bg-[#090f1a] border border-white/[0.06] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white mb-0.5">
                    Gợi ý quản trị viên
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Nhấn <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-emerald-400 font-mono font-bold">j</kbd> hoặc{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-emerald-400 font-mono font-bold">k</kbd> để duyệt nhanh giữa các thành viên mà không cần rời tay khỏi bàn phím.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 3: ĐĂNG TẢI MỚI */}
      {activeSidebarItem === 'upload' && (
        <div className="space-y-6 max-w-6xl mx-auto w-full animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
            <div>
              <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <span>ADMIN</span>
                <span>/</span>
                <span>QUẢN TRỊ KHO</span>
                <span>/</span>
                <span className="text-emerald-400">THÊM MỚI SẢN PHẨM</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Đăng tải sản phẩm mới{' '}
                  <span className="text-slate-400 text-lg font-normal">
                    (Tool / Web / Game)
                  </span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#141d2b] border border-white/[0.08] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Schema v3.2-app-manifest
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Hệ sinh thái phân phối phần mềm mã nguồn mở, web apps & indie games cho cộng đồng lập trình viên DevFolio.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => showToast('Đã lưu bản nháp thành công!')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e1522] hover:bg-[#141e30] border border-white/[0.08] text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                <span>Lưu bản nháp (Draft)</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Chuyển tiếp sang bước cấu hình chi tiết!')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_20px_rgba(52,211,153,0.35)] cursor-pointer"
              >
                <span>Tiếp tục: Bước 2</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <UploadStepper />
          <ProductTypeSelector selectedKind={productKind} onSelectKind={setProductKind} />
          <BasicMetadataForm
            name={productName}
            setName={setProductName}
            version={productVersion}
            setVersion={setProductVersion}
            slug={productSlug}
            setSlug={setProductSlug}
            summary={productSummary}
            setSummary={setProductSummary}
            techStacks={techStacks}
            setTechStacks={setTechStacks}
          />
          <MarkdownEditorSection
            content={markdownContent}
            setContent={setMarkdownContent}
          />
        </div>
      )}

      {/* TAB 4: SẢN PHẨM & KHO TẢI */}
      {activeSidebarItem === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Tiêu đề Trang */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.05]">
            <div>
              <div className="text-[11px] font-mono font-semibold tracking-wider text-emerald-400 uppercase flex items-center gap-2">
                <span>● CATALOG_REGISTRY // 0X48</span>
                <span className="text-slate-400">| Cloudflare R2 Edge Network</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Quản trị Sản phẩm & Kho tải
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#141d2b] border border-white/[0.08] text-emerald-400">
                  ● Tổng số {products.length} sản phẩm
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Quản lý danh mục tools, web apps và indie games. Giám sát tình trạng phát hành, lượt tải về và luồng phân phối CDN toàn cầu.
              </p>
            </div>

            {/* Nút hành động */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => showToast('Đang xuất tệp danh mục catalog_products_export.json...')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141e30] border border-white/[0.08] text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Xuất CSV / JSON</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveSidebarItem('upload');
                  showToast('Chuyển tới giao diện tạo sản phẩm & bản build mới!');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Thêm sản phẩm mới</span>
              </button>
            </div>
          </div>

          {/* 4 KPI Top Cards */}
          <ProductKpiCards />

          {/* Thanh Toolbar lọc & tìm kiếm */}
          <ProductToolbar
            searchQuery={productSearchQuery}
            setSearchQuery={setProductSearchQuery}
            selectedCategory={selectedProductCategory}
            setSelectedCategory={setSelectedProductCategory}
            statusFilter={productStatusFilter}
            setStatusFilter={setProductStatusFilter}
            onResetFilter={handleResetProductFilter}
          />

          {/* Bảng dữ liệu sản phẩm */}
          <ProductTable products={filteredProducts} />

          {/* 2 Khung giám sát CDN & SHA Audit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CdnStorageWidget />
            <ShaAuditWidget />
          </div>
        </div>
      )}

      {/* TAB 5: KIỂM DUYỆT BÌNH LUẬN */}
      {activeSidebarItem === 'comments' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="pb-2 border-b border-white/[0.05]">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>Hàng đợi kiểm duyệt & Đánh giá</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {moderationItems.length} mục chờ duyệt
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Xác thực bình luận, bản build mới và yêu cầu cấp quyền contributor từ cộng đồng nhà phát triển.
            </p>
          </div>

          <ModerationQueue 
            items={moderationItems}
            onApprove={handleApproveModeration}
            onReject={handleRejectModeration}
            onTestSandbox={() => showToast('Đang chạy sandbox kiểm tra an toàn...')}
            onViewProfile={(name) => showToast(`Xem hồ sơ của ${name}`)}
          />
        </div>
      )}

      {/* TAB 6: NHẬT KÝ HOẠT ĐỘNG */}
      {activeSidebarItem === 'audit' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="pb-2 border-b border-white/[0.05]">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <FileCode2 className="w-6 h-6 text-emerald-400" />
              <span>Nhật ký hoạt động hệ thống (Audit Logs)</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Truy vết toàn bộ hành vi quản trị, cập nhật phân quyền RBAC và lệnh CLI trên cluster.
            </p>
          </div>

          <AuditLog 
            logs={auditLogs}
            isRefreshing={isRefreshingAudit}
            onRefresh={handleRefreshAudit}
          />
        </div>
      )}

      {/* TAB 7: THỐNG KÊ CHI TIẾT */}
      {activeSidebarItem === 'stats' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="pb-2 border-b border-white/[0.05]">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Activity className="w-6 h-6 text-emerald-400" />
              <span>Thống kê chi tiết & Lưu lượng mạng</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Theo dõi biểu đồ traffic, băng thông CDN toàn cầu và hiệu năng CPU/RAM node cluster.
            </p>
          </div>

          <TrafficChart />
          <SystemHealth />
        </div>
      )}

      {/* TAB 8: CÀI ĐẶT HỆ THỐNG */}
      {activeSidebarItem === 'settings' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="pb-2 border-b border-white/[0.05] flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                <Settings className="w-6 h-6 text-emerald-400" />
                <span>Cài đặt hệ thống & AI Security</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Cấu hình quy tắc bảo mật chống bot, phân quyền quản trị và kết nối CDN.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAiRuleModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-xs transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Mở bảng quy tắc AI Security</span>
            </button>
          </div>

          <SystemHealth />
        </div>
      )}
    </main>
      </div>

      {/* MODAL 1: MỜI THÀNH VIÊN MỚI */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-[#0c121e] border border-white/[0.1] shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="font-bold text-white text-base">Mời thành viên mới</h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Email mời tham gia <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="dev@organization.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111724] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Vai trò cấp quyền
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'Admin' | 'Thành viên' | 'Guest Reviewer')}
                  className="w-full px-3 py-2 rounded-xl bg-[#111724] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="Thành viên">Thành viên (Member)</option>
                  <option value="Guest Reviewer">Guest Reviewer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#080d16] border border-white/[0.05] text-[11px] text-slate-400 leading-relaxed">
                Người nhận sẽ nhận được một liên kết đăng ký qua email có thời hạn 7 ngày kèm theo quyền hạn đã chọn.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#111724] hover:bg-[#172133] text-slate-300 text-xs transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-semibold text-xs transition shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                >
                  Gửi lời mời
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CẤU HÌNH QUY TẮC AI SECURITY GUARD */}
      {isAiRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c121e] border border-cyan-500/30 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Cấu hình AI Security Guard</h3>
                  <p className="text-[11px] text-slate-400">Bảo vệ bình luận & phát hiện bot tự động theo thời gian thực</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiRuleModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Chặn link lừa đảo / Phishing Domains</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Tự động xóa bình luận chứa URL thuộc danh sách đen của Google Safe Browsing</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiRules.blockPhishing}
                  onChange={(e) => setAiRules({ ...aiRules, blockPhishing: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-1 cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Rate Limiting thông minh (Chống Spam Bot)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Giới hạn tối đa 5 bình luận / 60 giây đối với tài khoản mới tạo dưới 7 ngày</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiRules.rateLimiting}
                  onChange={(e) => setAiRules({ ...aiRules, rateLimiting: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-1 cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Phân tích ngữ nghĩa AI Anti-Spam (BERT / LLM)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Đánh giá điểm tin cậy nội dung. Nếu điểm vi phạm ≥ 0.85 sẽ chuyển sang hàng đợi kiểm duyệt</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiRules.nlpFilter}
                  onChange={(e) => setAiRules({ ...aiRules, nlpFilter: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-1 cursor-pointer"
                />
              </label>

              <label className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#111724] border border-white/[0.06] cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Cách ly IP Tor Exit Node & Proxy đáng ngờ</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Yêu cầu xác thực CAPTCHA đối với các kết nối từ mạng nặc danh</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiRules.torQuarantine}
                  onChange={(e) => setAiRules({ ...aiRules, torQuarantine: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 mt-1 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => setIsAiRuleModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#111724] hover:bg-[#172133] text-slate-300 text-xs transition"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAiRuleModalOpen(false);
                  showToast('Đã lưu cấu hình AI Security Guard & đồng bộ lên Edge Firewall!');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-xs transition shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              >
                Áp dụng quy tắc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CLI QUICK ACTIONS */}
      {isCliModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-2xl rounded-2xl bg-[#090e17] border border-emerald-500/30 shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span>DevFolio Studio CLI Terminal</span>
              </div>
              <button
                onClick={() => setIsCliModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Command Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] text-slate-500">Gợi ý nhanh:</span>
              <button
                onClick={() => handleExecuteCli('users --export-csv')}
                className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
              >
                users --export-csv
              </button>
              <button
                onClick={() => handleExecuteCli('bot --quarantine-all')}
                className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
              >
                bot --quarantine-all
              </button>
              <button
                onClick={() => handleExecuteCli('cache --purge')}
                className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
              >
                cache --purge
              </button>
              <button
                onClick={() => handleExecuteCli('help')}
                className="px-2.5 py-1 rounded-lg bg-[#121927] hover:bg-[#182337] border border-white/[0.08] text-slate-300 font-mono text-[11px]"
              >
                help
              </button>
            </div>

            {/* Terminal Screen */}
            <div className="h-64 rounded-xl bg-black/60 border border-white/[0.08] p-3 font-mono text-xs overflow-y-auto space-y-1 text-slate-300">
              {cliLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.startsWith('$') || log.includes('$')
                      ? 'text-emerald-400 font-semibold'
                      : log.startsWith('→')
                      ? 'text-cyan-300 pl-2'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-emerald-400 text-xs">
                  $
                </span>
                <input
                  type="text"
                  placeholder="devfolio command..."
                  value={cliCommand}
                  onChange={(e) => setCliCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleExecuteCli();
                    }
                  }}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#111724] border border-white/[0.08] font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <button
                onClick={() => handleExecuteCli()}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs font-mono transition"
              >
                Run
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ĐỔI PHÂN QUYỀN (CHANGE ROLE) */}
      {isRoleModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-[#0c121e] border border-white/[0.1] shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">Đổi phân quyền người dùng</h3>
              </div>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300">
              Chọn vai trò phân quyền mới cho <span className="font-semibold text-white">{selectedUser.name}</span>:
            </div>

            <div className="space-y-2 text-xs">
              {(['Super Admin', 'Admin', 'Thành viên', 'Guest Reviewer', 'Guest'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => handleChangeRole(role)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                    selectedUser.role === role
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold'
                      : 'bg-[#111724] border-white/[0.06] text-slate-300 hover:bg-[#162031] hover:text-white'
                  }`}
                >
                  <span>{role}</span>
                  {selectedUser.role === role && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="w-full py-2 rounded-xl bg-[#111724] text-slate-400 hover:text-white text-xs transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
