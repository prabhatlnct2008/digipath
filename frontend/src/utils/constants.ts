// Base URL should include the API version prefix (e.g. http://localhost:5000/api/v1)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  PUBLIC: {
    HOME: '/public/home',
    SESSIONS_UPCOMING: '/public/sessions/upcoming',
    SESSION_DETAIL: (id: string) => `/public/sessions/${id}`,
    SESSION_CALENDAR: (id: string) => `/public/sessions/${id}/calendar`,
    RECORDINGS: '/public/recordings',
    RECORDING_DETAIL: (id: string) => `/public/recordings/${id}`,
    TAGS: '/public/tags',
  },
  ADMIN: {
    SESSIONS: '/admin/sessions',
    SESSIONS_PAST: '/admin/sessions/past',
    SESSION_DETAIL: (id: string) => `/admin/sessions/${id}`,
    SESSION_PUBLISH: (id: string) => `/admin/sessions/${id}/publish`,
    SESSION_UNPUBLISH: (id: string) => `/admin/sessions/${id}/unpublish`,
    SESSION_COMPLETE: (id: string) => `/admin/sessions/${id}/complete`,
    RECORDINGS: '/admin/recordings',
    RECORDING_DETAIL: (id: string) => `/admin/recordings/${id}`,
    SPEAKERS: '/admin/speakers',
    SPEAKER_DETAIL: (id: string) => `/admin/speakers/${id}`,
    TAGS: '/admin/tags',
    TAG_DETAIL: (id: string) => `/admin/tags/${id}`,
    TAG_USAGE: (id: string) => `/admin/tags/${id}/usage`,
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
