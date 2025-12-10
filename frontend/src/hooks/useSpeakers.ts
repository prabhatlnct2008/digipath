import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { speakersApi } from '../api/speakers.api';
import { queryKeys } from '../api/queryKeys';
import type { SpeakerCreate, SpeakerUpdate } from '../types/speaker.types';
import { handleApiError } from '../utils/errorHandler';

// ============= Query Hooks =============

/**
 * Get all speakers
 */
export function useSpeakers() {
  return useQuery({
    queryKey: queryKeys.speakers.all,
    queryFn: () => speakersApi.getAll(),
  });
}

// ============= Mutation Hooks =============

/**
 * Create a new speaker
 */
export function useCreateSpeaker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SpeakerCreate) => speakersApi.create(data),
    onSuccess: () => {
      // Invalidate speakers list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.speakers.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to create speaker:', message);
      throw new Error(message);
    },
  });
}

/**
 * Update a speaker
 */
export function useUpdateSpeaker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SpeakerUpdate }) =>
      speakersApi.update(id, data),
    onSuccess: () => {
      // Invalidate speakers list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.speakers.all });

      // Also invalidate sessions since speaker details may be displayed
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to update speaker:', message);
      throw new Error(message);
    },
  });
}

/**
 * Delete a speaker
 */
export function useDeleteSpeaker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => speakersApi.delete(id),
    onSuccess: () => {
      // Invalidate speakers list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.speakers.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to delete speaker:', message);
      throw new Error(message);
    },
  });
}
