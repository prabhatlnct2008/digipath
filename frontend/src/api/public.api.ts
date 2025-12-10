import apiClient from './client';
import { API_ROUTES } from '../utils/constants';
import type { HomeData } from '../types/api.types';

export const publicApi = {
  /**
   * Get home page data (upcoming sessions, recent recordings, stats)
   */
  getHomeData: async (): Promise<HomeData> => {
    const response = await apiClient.get(API_ROUTES.PUBLIC.HOME);
    return response.data;
  },
};
