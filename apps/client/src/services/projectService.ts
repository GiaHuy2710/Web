import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectItem } from '../types/project';

/**
 * Service xử lý dữ liệu và logic dự án
 */
export const projectService = {
  getAllProjects(): Promise<ProjectItem[]> {
    return Promise.resolve([...PROJECTS_DATA]);
  },

  getProjectById(id: string): Promise<ProjectItem | undefined> {
    const project = PROJECTS_DATA.find((p) => p.id === id);
    return Promise.resolve(project);
  },

  filterProjects(
    projects: ProjectItem[],
    category: string,
    tech: string | null,
    sortBy: string
  ): ProjectItem[] {
    let result = [...projects];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (tech) {
      result = result.filter((p) =>
        p.techStack.some((t) => t.toLowerCase() === tech.toLowerCase())
      );
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  },
};
