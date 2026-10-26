export type SettingsTab = 'seo' | 'apikeys' | 'audit' | 'profile';

export interface WebsiteSeoConfig {
  brandTitle: string;
  metaPageTitle: string;
  customDomain: string;
  metaDescription: string;
  keywords: string[];
  faviconName: string;
  faviconSize: string;
  ogImageName: string;
  ogImageSize: string;
  maintenanceMode: boolean;
  lockComments: boolean;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  tokenFull?: string;
  createdDate: string;
  lastUsed: string;
  role: string;
  status: 'active' | 'revoked';
  expiresIn: string;
}

export interface VersionHistoryItem {
  id: string;
  version: string;
  timestamp: string;
  author: string;
  authorAvatar?: string;
  summary: string;
  changes: string[];
  isCurrent: boolean;
}

export interface SystemSettingsViewProps {
  onShowToast: (msg: string) => void;
  onOpenAiRules?: () => void;
  initialTab?: SettingsTab;
}
