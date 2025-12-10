import apiClient from './client';
import { API_ROUTES } from '../utils/constants';
import type { LoginCredentials, User } from '../types/auth.types';
import type { TokenResponse } from '../types/api.types';

export const authApi = {
  /**
   * Login with username and password
   */
  login: async (credentials: LoginCredentials): Promise<TokenResponse & { user: User }> => {
    const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, credentials);
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<TokenResponse> => {
    const response = await apiClient.post(API_ROUTES.AUTH.REFRESH);
    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    await apiClient.post(API_ROUTES.AUTH.LOGOUT);
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get(API_ROUTES.AUTH.ME);
    return response.data;
  },
};
