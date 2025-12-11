import React, { createContext, useState, useEffect } from 'react';
import type { AuthContextType, User, LoginCredentials } from '../types/auth.types';
import apiClient from '../api/client';
import { API_ROUTES } from '../utils/constants';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // Send JSON as expected by backend (email + password)
      const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, {
        email: credentials.email,
        password: credentials.password,
      });

      const { access_token, refresh_token } = response.data;

      // Persist tokens first
      localStorage.setItem('access_token', access_token);
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token);
      }

      // Fetch user profile to populate context
      const meResponse = await apiClient.get(API_ROUTES.AUTH.ME);
      const userData: User = meResponse.data;

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
