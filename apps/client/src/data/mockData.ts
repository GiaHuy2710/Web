import { PROJECTS_DATA } from './projectsData';

export const mockData = {
  projects: PROJECTS_DATA,
  stats: {
    totalProjects: 0,
    activeUsers: 0,
    totalDownloads: '0',
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
