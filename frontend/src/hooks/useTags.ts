import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagsApi } from '../api/tags.api';
import { queryKeys } from '../api/queryKeys';
import type { TagCategory, TagCreate, TagUpdate } from '../types/tag.types';
import { handleApiError } from '../utils/errorHandler';

// ============= Query Hooks =============

/**
 * Get all tags
 */
export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: () => tagsApi.getAll(),
  });
}

/**
 * Get tags by category
 */
export function useTagsByCategory(category: TagCategory) {
  return useQuery({
    queryKey: queryKeys.tags.byCategory(category),
    queryFn: () => tagsApi.getByCategory(category),
  });
}

/**
 * Get tag usage count
 */
export function useTagUsage(id: string) {
  return useQuery({
    queryKey: queryKeys.tags.usage(id),
    queryFn: () => tagsApi.getUsage(id),
    enabled: !!id,
  });
}

// ============= Mutation Hooks =============

/**
 * Create a new tag
 */
export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TagCreate) => tagsApi.create(data),
    onSuccess: () => {
      // Invalidate all tag queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to create tag:', message);
      throw new Error(message);
    },
  });
}

/**
 * Update a tag
 */
export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TagUpdate }) =>
      tagsApi.update(id, data),
    onSuccess: () => {
      // Invalidate all tag queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });

      // Also invalidate sessions and recordings since tag details may be displayed
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recordings.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to update tag:', message);
      throw new Error(message);
    },
  });
}

/**
 * Delete a tag, optionally replacing it with another tag
 */
export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, replaceWith }: { id: string; replaceWith?: string }) =>
      tagsApi.delete(id, replaceWith),
    onSuccess: () => {
      // Invalidate all tag queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
      // Also invalidate sessions since tag assignments may have changed
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    onError: (error) => {
      const message = handleApiError(error);
      console.error('Failed to delete tag:', message);
      throw new Error(message);
    },
  });
}
