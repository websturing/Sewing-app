/**
 * HTTP Utilities Module
 * Enterprise-grade HTTP utilities for Vue 3 applications
 * 
 * @module lib/http
 */

// Core fetch composable
export { useFetch, default as useFetchDefault } from './useFetch';
export type { UseFetchOptions, UseFetchReturn } from './useFetch';

// Retry utilities
export { useRetry } from './useRetry';
export type { RetryController, RetryState } from './useRetry';

// Type definitions
export {
    DEFAULT_FETCH_OPTIONS,
    DEFAULT_RETRY_CONFIG
} from './types';

export type {
    FetchOptions,
    FetchResult,
    FetchState,
    NotificationOptions,
    RetryConfig
} from './types';

