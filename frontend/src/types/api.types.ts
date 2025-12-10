export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface HomeData {
  upcoming_sessions: import('./session.types').Session[];
  recent_recordings: import('./recording.types').Recording[];
  stats: {
    total_sessions: number;
    total_recordings: number;
    total_speakers: number;
  };
}

export interface CompleteSessionData {
  recording_id: string;
}
