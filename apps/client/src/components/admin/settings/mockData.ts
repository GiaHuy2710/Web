import { WebsiteSeoConfig, ApiKeyItem, VersionHistoryItem } from './types';

export const INITIAL_SEO_CONFIG: WebsiteSeoConfig = {
  brandTitle: '',
  metaPageTitle: '',
  customDomain: '',
  metaDescription: '',
  keywords: [],
  faviconName: 'Chưa chọn file',
  faviconSize: '--',
  ogImageName: 'Chưa có banner',
  ogImageSize: '--',
  maintenanceMode: false,
  lockComments: false,
};

export const INITIAL_API_KEYS: ApiKeyItem[] = [];

export const INITIAL_VERSION_HISTORIES: VersionHistoryItem[] = [];
