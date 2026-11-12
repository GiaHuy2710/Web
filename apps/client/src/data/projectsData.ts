import { ProjectItem, CategoryItem } from '../types/project';

export type { ProjectItem, CategoryItem } from '../types/project';

// Mặc định danh sách dự án trống - Khi người dùng đăng tải từ Admin Studio sẽ tự động lưu và hiển thị
export const PROJECTS_DATA: ProjectItem[] = [];

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'Tất cả', count: 0 },
  { id: 'web-app', label: 'Web App', count: 0 },
  { id: 'ai-tools', label: 'AI Tools', count: 0 },
  { id: 'developer-tools', label: 'Developer Tools', count: 0 },
  { id: 'games-creative', label: 'Games & Creative', count: 0 },
];

export const TECH_FILTERS = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'TailwindCSS',
  'Rust',
];
