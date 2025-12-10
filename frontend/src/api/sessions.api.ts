import apiClient from './client';
import { API_ROUTES } from '../utils/constants';
import type { Session, SessionCreate, SessionUpdate } from '../types/session.types';
import type { SessionFilters } from '../types/filters.types';
import type { PaginatedResponse, CompleteSessionData } from '../types/api.types';
import { downloadCalendarFile } from '../utils/calendar';

export const sessionsApi = {
  // ============= Public APIs =============

  /**
   * Get upcoming published sessions (public)
   */
  getUpcoming: async (filters?: SessionFilters): Promise<PaginatedResponse<Session>> => {
    const response = await apiClient.get(API_ROUTES.PUBLIC.SESSIONS_UPCOMING, {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get session by ID (public)
   */
  getById: async (id: string): Promise<Session> => {
    const response = await apiClient.get(API_ROUTES.PUBLIC.SESSION_DETAIL(id));
    return response.data;
  },

  /**
   * Download calendar file for a session
   */
  downloadCalendar: (id: string): void => {
    downloadCalendarFile(id);
  },

  // ============= Admin APIs =============

  /**
   * Get all sessions with filters (admin)
   */
  getAll: async (filters?: SessionFilters): Promise<PaginatedResponse<Session>> => {
    const response = await apiClient.get(API_ROUTES.ADMIN.SESSIONS, {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get past sessions (admin)
   */
  getPast: async (filters?: SessionFilters): Promise<PaginatedResponse<Session>> => {
    const response = await apiClient.get(API_ROUTES.ADMIN.SESSIONS_PAST, {
      params: filters,
    });
    return response.data;
  },

  /**
   * Create a new session (admin)
   */
  create: async (data: SessionCreate): Promise<Session> => {
    const response = await apiClient.post(API_ROUTES.ADMIN.SESSIONS, data);
    return response.data;
  },

  /**
   * Update a session (admin)
   */
  update: async (id: string, data: SessionUpdate): Promise<Session> => {
    const response = await apiClient.put(API_ROUTES.ADMIN.SESSION_DETAIL(id), data);
    return response.data;
  },

  /**
   * Delete a session (admin)
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.ADMIN.SESSION_DETAIL(id));
  },

  /**
   * Publish a session (admin)
   */
  publish: async (id: string): Promise<Session> => {
    const response = await apiClient.post(API_ROUTES.ADMIN.SESSION_PUBLISH(id));
    return response.data;
  },

  /**
   * Unpublish a session (admin)
   */
  unpublish: async (id: string): Promise<Session> => {
    const response = await apiClient.post(API_ROUTES.ADMIN.SESSION_UNPUBLISH(id));
    return response.data;
  },

  /**
   * Complete a session and link recording (admin)
   */
  complete: async (id: string, data: CompleteSessionData): Promise<Session> => {
    const response = await apiClient.post(API_ROUTES.ADMIN.SESSION_COMPLETE(id), data);
    return response.data;
  },
};
