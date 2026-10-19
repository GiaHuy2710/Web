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
  RotateCcw,
  Shield,
  Lightbulb,
  MoreHorizontal,
  FolderGit2,
  X,
  Check,
  Ban,
} from 'lucide-react';
import { AdminUserMember, UserManagementViewProps } from './types';
import { INITIAL_USERS } from './mockData';

export const UserManagementView: React.FC<UserManagementViewProps> = ({ onShowToast }) => {
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
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Form states for modals
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Thành viên' | 'Guest Reviewer'>('Thành viên');

  // AI Security Rules State
  const [aiRules, setAiRules] = useState({
    blockPhishing: true,
    rateLimiting: true,
    nlpFilter: true,
    torQuarantine: true,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

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

    onShowToast('Đã xuất thành công tệp danh sách thành viên devfolio_users_export.csv!');
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
      onShowToast(`Đã khóa tài khoản của ${selectedUser.name}!`);
    } else {
      onShowToast(`Đã mở khóa và khôi phục quyền cho ${selectedUser.name}!`);
    }
  };

  // Reset Password Action
  const handleResetPassword = () => {
    if (!selectedUser) return;
    onShowToast(`Đã gửi email khôi phục mật khẩu bảo mật tới ${selectedUser.email}`);
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
    onShowToast(`Đã cập nhật phân quyền của ${selectedUser.name} thành "${newRole}"!`);
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
    onShowToast(`Đã gửi mã mời thành viên tới ${inviteEmail}!`);
  };

  return (
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
            onClick={() => onShowToast('Đang hiển thị 4 cột chính: Hồ sơ, Ngày tham gia, Vai trò & Hành động.')}
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
                  onClick={() => onShowToast(`Xem toàn bộ nhật ký của ${selectedUser.name}`)}
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
                  onShowToast('Đã lưu cấu hình AI Security Guard & đồng bộ lên Edge Firewall!');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-xs transition shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              >
                Áp dụng quy tắc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ĐỔI PHÂN QUYỀN (CHANGE ROLE) */}
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
