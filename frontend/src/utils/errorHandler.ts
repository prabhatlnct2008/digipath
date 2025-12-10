import type { ApiError } from '../types/api.types';
import { AxiosError } from 'axios';

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof (error as ApiError).error === 'object' &&
    'code' in (error as ApiError).error &&
    'message' in (error as ApiError).error
  );
}

export function handleApiError(error: unknown): string {
  // Handle Axios errors
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      // Check if response contains our ApiError structure
      if (isApiError(error.response.data)) {
        return error.response.data.error.message;
      }

      // Handle other API error formats
      if (typeof error.response.data === 'object' && 'detail' in error.response.data) {
        return String(error.response.data.detail);
      }

      if (typeof error.response.data === 'string') {
        return error.response.data;
      }
    }

    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Please check your connection.';
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout. Please try again.';
    }

    // Handle HTTP status codes
    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          return 'Bad request. Please check your input.';
        case 401:
          return 'Unauthorized. Please log in again.';
        case 403:
          return 'Forbidden. You do not have permission to perform this action.';
        case 404:
          return 'Resource not found.';
        case 409:
          return 'Conflict. The resource already exists or cannot be modified.';
        case 422:
          return 'Validation error. Please check your input.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service unavailable. Please try again later.';
        default:
          return `An error occurred (${error.response.status}).`;
      }
    }

    return error.message || 'An unexpected error occurred.';
  }

  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Fallback for unknown error types
  return 'An unexpected error occurred. Please try again.';
}
