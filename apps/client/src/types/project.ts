export type ProjectCategory = 
  | 'Web App' 
  | 'AI Tools' 
  | 'Developer Tools' 
  | 'Games & Creative';

export interface ProjectDetails {
  longDescription: string;
  highlights: string[];
  architecture: string;
  version: string;
  stars: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  badge?: string;
  badgeType?: 'featured' | 'popular' | 'breadcrumb';
  likes: number;
  views?: string;
  isLiked?: boolean;
  category: ProjectCategory;
  techStack: string[];
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  details: ProjectDetails;
}

export interface CategoryItem {
  id: string;
  label: string;
  count: number;
}
