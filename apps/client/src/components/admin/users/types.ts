export interface AdminUserActivity {
  id: string;
  type: 'project' | 'audit' | 'comment';
  projectName?: string;
  title: string;
  timeAgo: string;
  quote: string;
  iconColor: string;
}

export interface AdminUserMember {
  id: string;
  name: string;
  email: string;
  handle?: string;
  avatarUrl?: string;
  initials?: string;
  initialsColor?: string;
  joinDate: string;
  role: 'Super Admin' | 'Admin' | 'Thành viên' | 'Guest Reviewer' | 'Guest';
  roleBadgeColor: string;
  isVerified?: boolean;
  isSpam?: boolean;
  status: 'active' | 'pending' | 'banned';
  recentIp: string;
  location: string;
  profileViews: string;
  userSession: string;
  activities: AdminUserActivity[];
}

export interface UserManagementViewProps {
  onShowToast: (message: string) => void;
}
