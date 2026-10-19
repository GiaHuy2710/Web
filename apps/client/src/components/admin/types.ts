export interface AdminDashboardProps {
  onBackToHome?: () => void;
  currentUser?: {
    fullName?: string;
    email?: string;
    avatarUrl?: string | null;
  } | null;
  onNavigateTab?: (tab: 'overview' | 'users' | 'upload') => void;
}

export interface AdminHeaderProps {
  onBackToHome?: () => void;
  onOpenNewToolModal: () => void;
  onShowNotification: () => void;
  pendingCount: number;
  currentUser?: {
    fullName?: string;
    email?: string;
    avatarUrl?: string | null;
  } | null;
}

export interface AdminSidebarProps {
  activeMenu: string;
  onSelectMenu: (menu: string) => void;
  onOpenNewToolModal?: () => void;
  pendingModerationCount?: number;
  onBackToHome?: () => void;
}

export interface AdminStudioPageProps {
  onBackToHome?: () => void;
  currentUser?: {
    fullName?: string;
    email?: string;
    avatarUrl?: string | null;
  } | null;
  defaultTab?: string;
  onNavigateTab?: (tab: 'overview' | 'users' | 'upload') => void;
}

export interface ModerationItem {
  id: string;
  type: 'comment' | 'build' | 'contributor';
  title: string;
  badge: string;
  badgeColor: string;
  time: string;
  content: string;
}

export interface ModerationQueueProps {
  items: ModerationItem[];
  onApprove: (id: string, name: string) => void;
  onReject: (id: string) => void;
  onTestSandbox: () => void;
  onViewProfile: (name: string) => void;
}

export interface AuditLogItem {
  id: number;
  time: string;
  actor: string;
  action: string;
  detail: string;
}

export interface AuditLogProps {
  logs: AuditLogItem[];
  isRefreshing: boolean;
  onRefresh: () => void;
}

export interface QuickActionsProps {
  onOpenNewTool: () => void;
  onPurgeCdn: () => void;
  onOpenAdminInvite: () => void;
  onOpenRealtimeLogs: () => void;
}

export interface RecentUploadsTableProps {
  onShowToast: (msg: string) => void;
}

export interface AdminModalsProps {
  isNewToolOpen: boolean;
  onCloseNewTool: () => void;
  onSubmitNewTool: () => void;
  isAdminInviteOpen: boolean;
  onCloseAdminInvite: () => void;
  inviteToken: string | null;
  onCopyInviteToken: () => void;
  isRealtimeLogsOpen: boolean;
  onCloseRealtimeLogs: () => void;
}
