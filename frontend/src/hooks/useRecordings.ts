import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recordingsApi } from '../api/recordings.api';
import { queryKeys } from '../api/queryKeys';
import type { RecordingCreate, RecordingUpdate } from '../types/recording.types';
import type { RecordingFilters } from '../types/filters.types';
import { handleApiError } from '../utils/errorHandler';

// ============= Query Hooks =============

/**
 * Get all recordings with filters
 */
export function useRecordings(filters?: RecordingFilters) {
  return useQuery({
    queryKey: queryKeys.recordings.list(filters),
    queryFn: () => recordingsApi.getAll(filters),
  });
}

/**
 * Get a specific recording by ID
 */
export function useRecording(id: string) {
  return useQuery({
    queryKey: queryKeys.recordings.detail(id),
    queryFn: () => recordingsApi.getById(id),
    enabled: !!id,
  });
}

// ============= Mutation Hooks =============

/**
 * Add a new recording
 */
export function useAddRecording() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RecordingCreate) => recordingsApi.add(data),
    onSuccess: () => {
      // Invalidate all recording queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.recordings.all });

      // Also invalidate sessions as recording count may have changed
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to add recording:', message);
      throw new Error(message);
    },
  });
}

/**
 * Update a recording
 */
export function useUpdateRecording() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RecordingUpdate }) =>
      recordingsApi.update(id, data),
    onSuccess: (updatedRecording) => {
      // Update the specific recording in cache
      queryClient.setQueryData(queryKeys.recordings.detail(updatedRecording.id), updatedRecording);

      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.recordings.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to update recording:', message);
      throw new Error(message);
    },
  });
}

/**
 * Delete a recording
 */
export function useDeleteRecording() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recordingsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.recordings.detail(deletedId) });

      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.recordings.all });

      // Also invalidate sessions as recording count may have changed
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to delete recording:', message);
      throw new Error(message);
    },
  });
}
