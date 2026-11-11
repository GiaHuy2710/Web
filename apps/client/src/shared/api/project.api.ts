import { apiClient } from './index';
import { ProjectItem } from '../../types/project';

export interface ProjectListResponse {
  projects: ProjectItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProjectComment {
  id: string;
  author: string;
  handle: string;
  role?: string;
  time: string;
  content: string;
  likes: number;
  isLiked: boolean;
  reply?: {
    author: string;
    role: string;
    time: string;
    content: string;
    likes: number;
    isLiked: boolean;
  } | null;
}

export const projectApi = {
  /**
   * Gọi API Backend lấy danh sách dự án thật
   */
  async getProjects(params?: {
    search?: string;
    category?: string;
    tech?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }): Promise<ProjectListResponse> {
    const response = await apiClient.get('/home/projects', { params });
    return response.data?.data;
  },

  /**
   * Gọi API Backend lấy chi tiết 1 dự án
   */
  async getProjectById(id: string): Promise<ProjectItem> {
    const response = await apiClient.get(`/home/projects/${id}`);
    return response.data?.data;
  },

  // Lấy các bình luận đã lưu cho một dự án.
  async getComments(id: string): Promise<ProjectComment[]> {
    const response = await apiClient.get(`/home/projects/${id}/comments`);
    return response.data?.data;
  },

  // Tạo bình luận mới cho dự án.
  async addComment(id: string, input: { author: string; handle: string; content: string }): Promise<ProjectComment> {
    const response = await apiClient.post(`/home/projects/${id}/comments`, input);
    return response.data?.data;
  },

  /**
   * Gọi API Backend thả tim dự án thật
   */
  async toggleLike(id: string): Promise<{ likes: number; isLiked: boolean }> {
    const response = await apiClient.post(`/home/projects/${id}/like`);
    return response.data?.data;
  },
};
