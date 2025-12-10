import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionsApi } from '../api/sessions.api';
import { queryKeys } from '../api/queryKeys';
import type { SessionCreate, SessionUpdate } from '../types/session.types';
import type { SessionFilters } from '../types/filters.types';
import type { CompleteSessionData } from '../types/api.types';
import { handleApiError } from '../utils/errorHandler';

// ============= Query Hooks =============

/**
 * Get upcoming published sessions (public)
 */
export function useUpcomingSessions(filters?: SessionFilters) {
  return useQuery({
    queryKey: queryKeys.sessions.upcoming(filters),
    queryFn: () => sessionsApi.getUpcoming(filters),
  });
}

/**
 * Get a specific session by ID
 */
export function useSession(id: string) {
  return useQuery({
    queryKey: queryKeys.sessions.detail(id),
    queryFn: () => sessionsApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Get all sessions with filters (admin)
 */
export function useAdminSessions(filters?: SessionFilters) {
  return useQuery({
    queryKey: queryKeys.sessions.admin(filters),
    queryFn: () => sessionsApi.getAll(filters),
  });
}

/**
 * Get past sessions (admin)
 */
export function usePastSessions(filters?: SessionFilters) {
  return useQuery({
    queryKey: queryKeys.sessions.past(filters),
    queryFn: () => sessionsApi.getPast(filters),
  });
}

// ============= Mutation Hooks =============

/**
 * Create a new session
 */
export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SessionCreate) => sessionsApi.create(data),
    onSuccess: () => {
      // Invalidate all session queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to create session:', message);
      throw new Error(message);
    },
  });
}

/**
 * Update a session
 */
export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SessionUpdate }) =>
      sessionsApi.update(id, data),
    onSuccess: (updatedSession) => {
      // Update the specific session in cache
      queryClient.setQueryData(queryKeys.sessions.detail(updatedSession.id), updatedSession);

      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to update session:', message);
      throw new Error(message);
    },
  });
}

/**
 * Delete a session
 */
export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sessionsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.sessions.detail(deletedId) });

      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to delete session:', message);
      throw new Error(message);
    },
  });
}

/**
 * Publish a session
 */
export function usePublishSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sessionsApi.publish(id),
    onSuccess: (updatedSession) => {
      // Update the specific session in cache
      queryClient.setQueryData(queryKeys.sessions.detail(updatedSession.id), updatedSession);

      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to publish session:', message);
      throw new Error(message);
    },
  });
}

/**
 * Unpublish a session
 */
export function useUnpublishSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sessionsApi.unpublish(id),
    onSuccess: (updatedSession) => {
      // Update the specific session in cache
      queryClient.setQueryData(queryKeys.sessions.detail(updatedSession.id), updatedSession);

      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to unpublish session:', message);
      throw new Error(message);
    },
  });
}

/**
 * Complete a session and link recording
 */
export function useCompleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CompleteSessionData }) =>
      sessionsApi.complete(id, data),
    onSuccess: (updatedSession) => {
      // Update the specific session in cache
      queryClient.setQueryData(queryKeys.sessions.detail(updatedSession.id), updatedSession);

      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });

      // Invalidate recordings as well since a new recording was linked
      queryClient.invalidateQueries({ queryKey: queryKeys.recordings.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to complete session:', message);
      throw new Error(message);
    },
  });
}
