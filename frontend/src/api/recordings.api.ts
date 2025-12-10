import apiClient from './client';
import { API_ROUTES } from '../utils/constants';
import type { Recording, RecordingCreate, RecordingUpdate } from '../types/recording.types';
import type { RecordingFilters } from '../types/filters.types';
import type { PaginatedResponse } from '../types/api.types';

export const recordingsApi = {
  // ============= Public APIs =============

  /**
   * Get all recordings with filters (public)
   */
  getAll: async (filters?: RecordingFilters): Promise<PaginatedResponse<Recording>> => {
    const response = await apiClient.get(API_ROUTES.PUBLIC.RECORDINGS, {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get recording by ID (public)
   */
  getById: async (id: string): Promise<Recording> => {
    const response = await apiClient.get(API_ROUTES.PUBLIC.RECORDING_DETAIL(id));
    return response.data;
  },

  // ============= Admin APIs =============

  /**
   * Add a new recording (admin)
   */
  add: async (data: RecordingCreate): Promise<Recording> => {
    const response = await apiClient.post(API_ROUTES.ADMIN.RECORDINGS, data);
    return response.data;
  },

  /**
   * Update a recording (admin)
   */
  update: async (id: string, data: RecordingUpdate): Promise<Recording> => {
    const response = await apiClient.put(API_ROUTES.ADMIN.RECORDING_DETAIL(id), data);
    return response.data;
  },

  /**
   * Delete a recording (admin)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.ADMIN.RECORDING_DETAIL(id));
  },
};
