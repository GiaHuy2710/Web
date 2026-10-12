import { apiClient } from './index';
import { AuthUser } from '../../types/auth';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  /**
   * Gửi yêu cầu đăng nhập lên API Backend
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', payload);
    return response.data?.data;
  },

  /**
   * Gửi yêu cầu đăng ký tài khoản mới lên API Backend
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', payload);
    return response.data?.data;
  },

  /**
   * Lấy thông tin tài khoản hiện tại từ JWT token
   */
  async getMe(): Promise<AuthUser> {
    const response = await apiClient.get('/auth/me');
    return response.data?.data;
  },

  /**
   * Lưu phiên làm việc của người dùng vào LocalStorage
   */
  saveSession(token: string, user: AuthUser): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Xóa phiên làm việc khỏi LocalStorage khi đăng xuất
   */
  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Đọc thông tin người dùng đã lưu từ LocalStorage
   */
  getCurrentUser(): AuthUser | null {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? (JSON.parse(savedUser) as AuthUser) : null;
    } catch {
      return null;
    }
  },

  /**
   * Kiểm tra token hiện tại
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
