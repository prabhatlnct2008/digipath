import apiClient from './client';
import { API_ROUTES } from '../utils/constants';
import type { Speaker, SpeakerCreate, SpeakerUpdate } from '../types/speaker.types';

export const speakersApi = {
  /**
   * Get all speakers
   */
  getAll: async (): Promise<Speaker[]> => {
    const response = await apiClient.get(API_ROUTES.ADMIN.SPEAKERS);
    return response.data;
  },

  /**
   * Create a new speaker (admin)
   */
  create: async (data: SpeakerCreate): Promise<Speaker> => {
    const response = await apiClient.post(API_ROUTES.ADMIN.SPEAKERS, data);
    return response.data;
  },

  /**
   * Update a speaker (admin)
   */
  update: async (id: string, data: SpeakerUpdate): Promise<Speaker> => {
    const response = await apiClient.put(API_ROUTES.ADMIN.SPEAKER_DETAIL(id), data);
    return response.data;
  },

  /**
   * Delete a speaker (admin)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.ADMIN.SPEAKER_DETAIL(id));
  },
};
