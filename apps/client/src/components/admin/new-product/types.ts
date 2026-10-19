export type ProductKind = 'cli' | 'web' | 'game';

export type EditorMode = 'markdown' | 'wysiwyg' | 'preview';
    
export interface ProductFormData {
    kind: ProductKind;
    name: string;
    version: string;
    slug: string;
    summary: string;
    techStacks: string[];
    markdownContent: string;
}

export interface AdminNewProductPageProps {
    onBackToHome?: () => void;
    currentUser?: {
        fullName?: string;
        fullname?: string;
        email?: string;
        avatarUrl?: string | null;
    } | null;
    onNavigateTab?: (tab: 'overview' | 'users' | 'upload') => void;
}

