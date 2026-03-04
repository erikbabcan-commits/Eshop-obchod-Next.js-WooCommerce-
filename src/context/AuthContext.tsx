import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext } from
'react';
import type { User } from '../types';
import { api } from '../services/api';
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch the current session from the server (cookie-based)
  const refreshUser = useCallback(async (): Promise<User | null> => {
    try {
      const currentUser = await api.auth.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  }, []);
  // On mount — check if we already have a valid session
  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [refreshUser]);
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      // POST /api/auth/login — server sets HTTP-only cookie
      await api.auth.login(email, password);
      // Refresh user from /api/auth/me to get full user object with roles
      await refreshUser();
    },
    [refreshUser]
  );
  const register = useCallback(
    async (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }): Promise<void> => {
      // POST /api/auth/register — server sets HTTP-only cookie
      await api.auth.register(data);
      // Refresh user from /api/auth/me to get full user object with roles
      await refreshUser();
    },
    [refreshUser]
  );
  const logout = useCallback(async (): Promise<void> => {
    try {
      await api.auth.logout();
    } finally {
      // Always clear local state, even if the logout request fails
      setUser(null);
    }
  }, []);
  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}