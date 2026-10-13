import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types/auth';
import { authApi } from '../shared/api';

export type CurrentView = 'projects' | 'project-detail' | 'ai-assistant' | 'contact' | 'docs' | 'admin';

interface AppContextType {
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  savedCount: number;
  setSavedCount: React.Dispatch<React.SetStateAction<number>>;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCvOpen: boolean;
  setIsCvOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authTab: 'login' | 'register';
  setAuthTab: (tab: 'login' | 'register') => void;
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  isLoggedIn: boolean;
  login: (user?: AuthUser) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<CurrentView>('admin');
  const [savedCount, setSavedCount] = useState<number>(5);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authApi.getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!authApi.getToken());

  const login = (user?: AuthUser) => {
    if (user) setCurrentUser(user);
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const logout = () => {
    authApi.clearSession();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        savedCount,
        setSavedCount,
        isSearchOpen,
        setIsSearchOpen,
        isCvOpen,
        setIsCvOpen,
        isAuthOpen,
        setIsAuthOpen,
        authTab,
        setAuthTab,
        currentUser,
        setCurrentUser,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
