import { useState, useEffect } from 'react';
import { AuthUser } from '../types/auth';
import { authApi } from '../shared/api';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => authApi.getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!authApi.getToken());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(authApi.getCurrentUser());
      setIsLoggedIn(!!authApi.getToken());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (newUser?: AuthUser) => {
    if (newUser) setUser(newUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    authApi.clearSession();
    setUser(null);
    setIsLoggedIn(false);
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
}
