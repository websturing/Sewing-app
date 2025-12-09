/**
 * Enterprise HTTP Types
 * Centralized type definitions for HTTP operations
 */

export interface FetchOptions<TParams = unknown> {
    /** Request parameters/payload */
    params?: TParams;

    /** Show notification on success/error */
    notify?: boolean;

    /** Enable automatic retry on failure */
    enableRetry?: boolean;

    /** Custom success message (overrides API response message) */
    successMessage?: string;

    /** Custom error message (overrides API response message) */
    errorMessage?: string;

    /** Delay before request starts (useful for debouncing) */
    delayMs?: number;

    /** Minimum loading time to prevent flash of loading state */
    minLoadingMs?: number;
}

export interface RetryConfig {
    /** Maximum number of retry attempts */
    maxAttempts: number;

    /** Base delay between retries in milliseconds */
    baseDelayMs: number;

    /** Whether to use exponential backoff */
    exponentialBackoff: boolean;

    /** HTTP status codes that should trigger retry */
    retryableStatusCodes: number[];

    /** Custom retry condition (return true to retry) */
    shouldRetry?: (error: unknown, attempt: number) => boolean;
}

export interface FetchState<TData = unknown> {
    /** Response data */
    data: TData | null;

    /** Loading state */
    isLoading: boolean;

    /** Error message if request failed */
    error: string | null;

    /** Whether request was successful */
    isSuccess: boolean;

    /** Whether request was cancelled */
    isCancelled: boolean;

    /** Current retry attempt (0 = initial request) */
    retryAttempt: number;

    /** Whether currently retrying */
    isRetrying: boolean;
}

export interface FetchResult<TData = unknown> {
    /** Reactive fetch state */
    state: FetchState<TData>;

    /** Execute the fetch operation */
    execute: (options?: FetchOptions) => Promise<TData | null>;

    /** Cancel ongoing request */
    cancel: (reason?: string) => void;

    /** Manually trigger retry */
    retry: () => Promise<TData | null>;

    /** Reset state to initial values */
    reset: () => void;

    /** Whether there's an active request */
    isActive: boolean;
}

export interface NotificationOptions {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    description?: string;
    duration?: number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxAttempts: 3,
    baseDelayMs: 1000,
    exponentialBackoff: true,
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
};

export const DEFAULT_FETCH_OPTIONS: Required<Omit<FetchOptions, 'params' | 'successMessage' | 'errorMessage'>> = {
    notify: false,
    enableRetry: false,
    delayMs: 0,
    minLoadingMs: 500,
};
