export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ROUTES = {
  // Auth
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',

  // Sessions
  SESSIONS: '/api/sessions',
  SESSION_BY_ID: (id: string) => `/api/sessions/${id}`,
  UPCOMING_SESSIONS: '/api/sessions/upcoming',
  PAST_SESSIONS: '/api/sessions/past',

  // Recordings
  RECORDINGS: '/api/recordings',
  RECORDING_BY_ID: (id: string) => `/api/recordings/${id}`,

  // Tags
  TAGS: '/api/tags',
  TAG_BY_ID: (id: string) => `/api/tags/${id}`,
  TAGS_BY_CATEGORY: (category: string) => `/api/tags/category/${category}`,

  // Speakers
  SPEAKERS: '/api/speakers',
  SPEAKER_BY_ID: (id: string) => `/api/speakers/${id}`,
};

export const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
  completed: 'Completed',
};

export const STATUS_COLORS: Record<string, string> = {
  draft: 'yellow',
  published: 'green',
  completed: 'blue',
};

export const TAG_CATEGORIES = {
  ORGAN: 'organ',
  TYPE: 'type',
  LEVEL: 'level',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
};
