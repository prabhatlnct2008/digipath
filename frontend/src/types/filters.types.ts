import type { SessionStatus } from './session.types';

export interface SessionFilters {
  organ_tag_id?: string;
  type_tag_id?: string;
  level_tag_id?: string;
  search?: string;
  status?: SessionStatus;
  page?: number;
  per_page?: number;
}

export interface RecordingFilters {
  organ_tag_id?: string;
  type_tag_id?: string;
  level_tag_id?: string;
  year?: number;
  search?: string;
  sort_by?: 'newest' | 'oldest' | 'most_viewed';
  page?: number;
  per_page?: number;
}
