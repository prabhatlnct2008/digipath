import apiClient from '../api/client';
import { API_ROUTES } from './constants';

/**
 * Downloads a calendar file (.ics) for a session
 * @param sessionId - The ID of the session to download calendar for
 */
export function downloadCalendarFile(sessionId: string): void {
  const url = `${apiClient.defaults.baseURL}${API_ROUTES.PUBLIC.SESSION_CALENDAR(sessionId)}`;

  // Create a temporary anchor element and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = `session-${sessionId}.ics`;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
