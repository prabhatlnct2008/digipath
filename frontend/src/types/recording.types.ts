export interface Recording {
  id: string;
  session_id: string;
  video_url: string;
  thumbnail_url?: string;
  duration_minutes: number;
  file_size_mb?: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface RecordingCreate {
  session_id: string;
  video_url: string;
  thumbnail_url?: string;
  duration_minutes: number;
  file_size_mb?: number;
}

export interface RecordingUpdate {
  video_url?: string;
  thumbnail_url?: string;
  duration_minutes?: number;
  file_size_mb?: number;
}
