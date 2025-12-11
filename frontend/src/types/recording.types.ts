export interface Recording {
  id: string;
  session_id: string;
  youtube_url: string;
  video_url?: string; // Alias for youtube_url
  thumbnail_url?: string;
  pdf_url?: string;
  recorded_date?: string;
  views_count: number;
  views?: number; // Alias for views_count
  created_at: string;
  updated_at: string;
}

export interface RecordingCreate {
  session_id: string;
  youtube_url: string;
  pdf_url?: string;
}

export interface RecordingUpdate {
  youtube_url?: string;
  pdf_url?: string;
}
