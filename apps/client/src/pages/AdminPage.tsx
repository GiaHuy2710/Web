import React from "react";
import { AdminStudioPage } from "../components/admin/AdminStudioPage";
import { AuthUser } from "../types/auth";

export interface AdminPageProps {
  onBackToHome?: () => void;
  currentUser?: AuthUser | null;
  defaultTab?: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onBackToHome,
  currentUser,
  defaultTab = 'products',
}) => {
  return (
    <AdminStudioPage 
      onBackToHome={onBackToHome} 
      currentUser={currentUser} 
      defaultTab={defaultTab}
    />
  );
};
