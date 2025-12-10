import type { SessionFilters, RecordingFilters } from '../types/filters.types';
import type { TagCategory } from '../types/tag.types';

export const queryKeys = {
  sessions: {
    all: ['sessions'] as const,
    upcoming: (filters?: SessionFilters) => ['sessions', 'upcoming', filters] as const,
    past: (filters?: SessionFilters) => ['sessions', 'past', filters] as const,
    admin: (filters?: SessionFilters) => ['sessions', 'admin', filters] as const,
    detail: (id: string) => ['sessions', id] as const,
  },
  recordings: {
    all: ['recordings'] as const,
    list: (filters?: RecordingFilters) => ['recordings', 'list', filters] as const,
    detail: (id: string) => ['recordings', id] as const,
  },
  speakers: {
    all: ['speakers'] as const,
    detail: (id: string) => ['speakers', id] as const,
  },
  tags: {
    all: ['tags'] as const,
    byCategory: (category: TagCategory) => ['tags', category] as const,
    usage: (id: string) => ['tags', id, 'usage'] as const,
  },
  home: ['home'] as const,
  auth: {
    user: ['auth', 'user'] as const,
  },
};
