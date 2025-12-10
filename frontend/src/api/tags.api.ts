import apiClient from './client';
import { API_ROUTES } from '../utils/constants';
import type { Tag, TagCreate, TagUpdate, TagCategory } from '../types/tag.types';

export const tagsApi = {
  /**
   * Get all tags (public)
   */
  getAll: async (): Promise<Tag[]> => {
    const response = await apiClient.get(API_ROUTES.PUBLIC.TAGS);
    return response.data;
  },

  /**
   * Get tags by category (public)
   */
  getByCategory: async (category: TagCategory): Promise<Tag[]> => {
    const response = await apiClient.get(API_ROUTES.PUBLIC.TAGS, {
      params: { category },
    });
    return response.data;
  },

  /**
   * Create a new tag (admin)
   */
  create: async (data: TagCreate): Promise<Tag> => {
    const response = await apiClient.post(API_ROUTES.ADMIN.TAGS, data);
    return response.data;
  },

  /**
   * Update a tag (admin)
   */
  update: async (id: string, data: TagUpdate): Promise<Tag> => {
    const response = await apiClient.put(API_ROUTES.ADMIN.TAG_DETAIL(id), data);
    return response.data;
  },

  /**
   * Delete a tag (admin). If in use, provide replaceWith to reassign sessions.
   */
  delete: async (id: string, replaceWith?: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.ADMIN.TAG_DETAIL(id), {
      params: replaceWith ? { replace_with: replaceWith } : undefined,
    });
  },

  /**
   * Get tag usage count (admin)
   */
  getUsage: async (id: string): Promise<{ count: number }> => {
    const response = await apiClient.get(API_ROUTES.ADMIN.TAG_USAGE(id));
    return response.data;
  },
};
