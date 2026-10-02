export interface AuthUser {
  id?: string;
  email: string;
  fullName: string;
  role?: string;
  avatarUrl?: string | null;
}
