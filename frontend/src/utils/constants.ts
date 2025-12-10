export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  PUBLIC: {
    HOME: '/api/public/home',
    SESSIONS_UPCOMING: '/api/public/sessions/upcoming',
    SESSION_DETAIL: (id: string) => `/api/public/sessions/${id}`,
    SESSION_CALENDAR: (id: string) => `/api/public/sessions/${id}/calendar`,
    RECORDINGS: '/api/public/recordings',
    RECORDING_DETAIL: (id: string) => `/api/public/recordings/${id}`,
    TAGS: '/api/public/tags',
  },
  ADMIN: {
    SESSIONS: '/api/admin/sessions',
    SESSIONS_PAST: '/api/admin/sessions/past',
    SESSION_DETAIL: (id: string) => `/api/admin/sessions/${id}`,
    SESSION_PUBLISH: (id: string) => `/api/admin/sessions/${id}/publish`,
    SESSION_UNPUBLISH: (id: string) => `/api/admin/sessions/${id}/unpublish`,
    SESSION_COMPLETE: (id: string) => `/api/admin/sessions/${id}/complete`,
    RECORDINGS: '/api/admin/recordings',
    RECORDING_DETAIL: (id: string) => `/api/admin/recordings/${id}`,
    SPEAKERS: '/api/admin/speakers',
    SPEAKER_DETAIL: (id: string) => `/api/admin/speakers/${id}`,
    TAGS: '/api/admin/tags',
    TAG_DETAIL: (id: string) => `/api/admin/tags/${id}`,
    TAG_USAGE: (id: string) => `/api/admin/tags/${id}/usage`,
  },
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
