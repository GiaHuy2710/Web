import { PROJECTS_DATA } from './projectsData';

export const mockData = {
  projects: PROJECTS_DATA,
  stats: {
    totalProjects: 48,
    activeUsers: 2490,
    totalDownloads: '142.8k',
    uptime: '99.98%',
  },
  categories: [
    { id: 'all', label: 'Tất cả' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ai', label: 'AI & Data' },
    { id: 'game', label: 'Game 2D/3D' },
    { id: 'tool', label: 'Công cụ CLI' },
  ],
};
