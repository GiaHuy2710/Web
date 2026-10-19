import React from "react";
import { AdminStudioPage } from "../components/admin/AdminStudioPage";
import { AuthUser } from "../types/auth";

export interface AdminPageProps {
  onBackToHome?: () => void;
  currentUser?: AuthUser | null;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onBackToHome,
  currentUser,
}) => {
  // Giữ nguyên trạng thái và giao diện chuẩn Studio Workspace (như trên màn hình)
  return (
    <AdminStudioPage onBackToHome={onBackToHome} currentUser={currentUser} />
  );
};
