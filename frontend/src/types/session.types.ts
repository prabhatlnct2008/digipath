import type { Speaker } from './speaker.types';
import type { Tag } from './tag.types';
import type { Recording } from './recording.types';

export type SessionStatus = 'draft' | 'published' | 'completed';

export interface Session {
  id: string;
  title: string;
  summary: string;
  abstract: string;
  objectives: string[];
  date: string;
  time: string;
  duration_minutes: number;
  status: SessionStatus;
  platform: string;
  meeting_link?: string;
  meeting_id?: string;
  meeting_password?: string;
  speaker: Speaker;
  organ_tag: Tag;
  type_tag: Tag;
  level_tag: Tag;
  recording?: Recording;
  has_recording: boolean;
  created_at: string;
  updated_at: string;
}

export interface SessionCreate {
  title: string;
  summary: string;
  abstract: string;
  objectives: string[];
  date: string;
  time: string;
  duration_minutes: number;
  status: SessionStatus;
  platform: string;
  meeting_link?: string;
  meeting_id?: string;
  meeting_password?: string;
  speaker_id: string;
  organ_tag_id: string;
  type_tag_id: string;
  level_tag_id: string;
}

export interface SessionUpdate {
  title?: string;
  summary?: string;
  abstract?: string;
  objectives?: string[];
  date?: string;
  time?: string;
  duration_minutes?: number;
  status?: SessionStatus;
  platform?: string;
  meeting_link?: string;
  meeting_id?: string;
  meeting_password?: string;
  speaker_id?: string;
  organ_tag_id?: string;
  type_tag_id?: string;
  level_tag_id?: string;
}

export interface SessionFilters {
  organ?: string;
  type?: string;
  level?: string;
  search?: string;
  status?: SessionStatus;
}
