export type ProductCategory = 'all' | 'cli' | 'web' | 'game';

export type ProductStatus = 'active' | 'draft' | 'pending';

export interface ProductRegistryItem {
  id: string;
  code: string;
  indexTag: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  categoryIcon: 'terminal' | 'web' | 'game' | 'tool' | 'window';
  techStack: string[];
  version: string;
  versionType: 'stable' | 'beta' | 'rc';
  downloads: string;
  subStats: string;
  status: ProductStatus;
  statusLabel: string;
}

export interface AdminProductsPageProps {
  onBackToHome?: () => void;
  onNavigateToUpload?: () => void;
  currentUser?: {
    fullName?: string;
    email?: string;
    avatarUrl?: string | null;
  } | null;
}