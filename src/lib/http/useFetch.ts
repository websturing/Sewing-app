/**
 * Enterprise Fetch Composable
 * Reusable fetch with retry, cancel, and notification support
 * 
 * Features:
 * - Automatic retry with exponential backoff
 * - Request cancellation via AbortController
 * - Integrated notification system
 * - Minimum loading time to prevent UI flashing
 * - TypeScript-first with full type inference
 * - Request deduplication
 */

import { useMessage, useNotification } from 'naive-ui';
import { computed, reactive, readonly, ref, type Ref } from 'vue';
import { DEFAULT_FETCH_OPTIONS, type FetchOptions, type FetchState, type RetryConfig } from './types';
import { useRetry } from './useRetry';

export interface UseFetchOptions<TData, TParams = unknown> {
    /** The async function that performs the actual fetch */
    fetcher: (params: TParams, signal: AbortSignal) => Promise<TData>;

    /** Initial data value */
    initialData?: TData | null;

    /** Retry configuration */
    retryConfig?: Partial<RetryConfig>;

    /** Transform response before storing */
    transform?: (data: TData) => TData;

    /** Called when request succeeds */
    onSuccess?: (data: TData) => void;

    /** Called when request fails */
    onError?: (error: Error) => void;

    /** Called when request is cancelled */
    onCancel?: () => void;

    /** Custom notification handler (overrides default) */
    notificationHandler?: (type: 'success' | 'error', message: string) => void;
}

export interface UseFetchReturn<TData, TParams = unknown> {
    /** Reactive fetch state */
    state: Readonly<FetchState<TData>>;

    /** Current data (shorthand for state.data) */
    data: Ref<TData | null>;

    /** Loading state (shorthand for state.isLoading) */
    isLoading: Ref<boolean>;

    /** Error message (shorthand for state.error) */
    error: Ref<string | null>;

    /** Execute the fetch operation */
    execute: (params?: TParams, options?: FetchOptions<TParams>) => Promise<TData | null>;

    /** Cancel ongoing request */
    cancel: (reason?: string) => void;

    /** Manually trigger retry with last params */
    retry: () => Promise<TData | null>;

    /** Reset state to initial values */
    reset: () => void;

    /** Whether there's an active request */
    isActive: Ref<boolean>;

    /** Whether retry is available */
    canRetry: Ref<boolean>;

    /** Current retry attempt number */
    retryAttempt: Ref<number>;
}

/**
 * Creates a cancellable delay promise
 */
function delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        if (ms <= 0) {
            resolve();
            return;
        }

        const timeout = setTimeout(resolve, ms);

        signal?.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new DOMException('Delay cancelled', 'AbortError'));
        });
    });
}

/**
 * Extract error message from various error types
 */
function extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (error && typeof error === 'object') {
        const axiosError = error as {
            response?: { data?: { message?: string } };
            message?: string
        };

        return axiosError.response?.data?.message
            || axiosError.message
            || 'An unexpected error occurred';
    }

    return String(error) || 'An unexpected error occurred';
}

/**
 * Enterprise-grade fetch composable with retry, cancel, and notifications
 * 
 * Built-in Defaults:
 * - minLoadingMs: 500ms (prevents UI flash)
 * - retry.maxAttempts: 3
 * - retry.baseDelayMs: 1000ms
 * - retry.exponentialBackoff: true
 * - notify: false
 * - enableRetry: false
 * 
 * @example
 * ```ts
 * // Basic usage - all defaults applied automatically
 * const { execute, cancel, isLoading, data, error, retry, canRetry } = useFetch({
 *   fetcher: async (params, signal) => {
 *     const response = await api.get(`/endpoint/${params}`, { signal });
 *     return response.data;
 *   },
 * });
 * 
 * // Execute with defaults (minLoadingMs: 500ms, no notification)
 * await execute('param-value');
 * 
 * // Execute with notification and auto-retry
 * await execute('param-value', { notify: true, enableRetry: true });
 * 
 * // Manual retry after error
 * if (canRetry.value) {
 *   await retry();
 * }
 * 
 * // Cancel request
 * cancel('User navigated away');
 * 
 * // Override defaults if needed
 * await execute('param-value', { minLoadingMs: 300 });
 * ```
 */
export function useFetch<TData, TParams = unknown>(
    options: UseFetchOptions<TData, TParams>
): UseFetchReturn<TData, TParams> {
    const {
        fetcher,
        initialData = null,
        retryConfig = {},
        transform,
        onSuccess,
        onError,
        onCancel,
        notificationHandler,
    } = options;

    // Notification system
    const message = useMessage();
    const notification = useNotification();

    // Retry controller
    const retryController = useRetry();

    // State management
    const state = reactive<FetchState<TData>>({
        data: initialData,
        isLoading: false,
        error: null,
        isSuccess: false,
        isCancelled: false,
        retryAttempt: 0,
        isRetrying: false,
    });

    // Request management
    let abortController: AbortController | null = null;
    let lastParams: TParams | undefined;
    const requestId = ref(0);

    // Computed refs for convenience
    const data = computed(() => state.data);
    const isLoading = computed(() => state.isLoading);
    const error = computed(() => state.error);
    const isActive = computed(() => state.isLoading || state.isRetrying);
    const canRetry = computed(() => !state.isLoading && state.error !== null && !state.isCancelled);
    const retryAttempt = computed(() => state.retryAttempt);

    /**
     * Show notification using the configured handler or default
     */
    const showNotification = (type: 'success' | 'error', msg: string) => {
        if (notificationHandler) {
            notificationHandler(type, msg);
            return;
        }

        switch (type) {
            case 'success':
                message.success(msg);
                break;
            case 'error':
                notification.error({
                    title: 'Error',
                    content: msg,
                    duration: 5000,
                });
                break;
        }
    };

    /**
     * Reset state to initial values
     */
    const reset = () => {
        state.data = initialData;
        state.isLoading = false;
        state.error = null;
        state.isSuccess = false;
        state.isCancelled = false;
        state.retryAttempt = 0;
        state.isRetrying = false;
        retryController.reset();
        abortController = null;
        lastParams = undefined;
    };

    /**
     * Cancel ongoing request
     */
    const cancel = (reason?: string) => {
        if (abortController) {
            abortController.abort(reason || 'Request cancelled by user');
            abortController = null;
        }

        retryController.cancel();

        state.isLoading = false;
        state.isRetrying = false;
        state.isCancelled = true;

        onCancel?.();

        console.info('[useFetch] Request cancelled:', reason || 'No reason provided');
    };

    /**
     * Execute the fetch operation
     */
    const execute = async (
        params?: TParams,
        fetchOptions: FetchOptions<TParams> = {}
    ): Promise<TData | null> => {
        const mergedOptions = { ...DEFAULT_FETCH_OPTIONS, ...fetchOptions };
        const currentRequestId = ++requestId.value;

        // Store params for retry
        lastParams = params ?? fetchOptions.params;

        // Cancel any existing request
        if (abortController) {
            abortController.abort('New request started');
        }

        // Create new abort controller
        abortController = new AbortController();
        const { signal } = abortController;

        // Reset state for new request
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
        state.isCancelled = false;
        state.retryAttempt = 0;
        state.isRetrying = false;

        try {
            // Apply pre-request delay if specified
            if (mergedOptions.delayMs && mergedOptions.delayMs > 0) {
                await delay(mergedOptions.delayMs, signal);
            }

            // Start timing for minimum loading time
            const startTime = Date.now();

            // Define the fetch operation
            const fetchOperation = async (): Promise<TData> => {
                const result = await fetcher(lastParams as TParams, signal);
                return transform ? transform(result) : result;
            };

            // Execute with or without retry
            let result: TData;

            if (mergedOptions.enableRetry) {
                result = await retryController.executeWithRetry(
                    fetchOperation,
                    retryConfig
                );
                state.retryAttempt = retryController.state.attempt.value;
                state.isRetrying = retryController.state.isRetrying.value;
            } else {
                result = await fetchOperation();
            }

            // Ensure minimum loading time
            const elapsed = Date.now() - startTime;
            const remaining = (mergedOptions.minLoadingMs || 0) - elapsed;
            if (remaining > 0) {
                await delay(remaining, signal);
            }

            // Check if this request is still the current one
            if (currentRequestId !== requestId.value) {
                return null; // Stale request, ignore result
            }

            // Update state on success
            state.data = result;
            state.isSuccess = true;
            state.error = null;

            // Show success notification if enabled
            if (mergedOptions.notify) {
                const successMsg = mergedOptions.successMessage || 'Operation completed successfully';
                showNotification('success', successMsg);
            }

            // Call success callback
            onSuccess?.(result);

            return result;
        } catch (err) {
            // Check if this request is still the current one
            if (currentRequestId !== requestId.value) {
                return null;
            }

            // Handle cancellation
            if (err instanceof DOMException && err.name === 'AbortError') {
                state.isCancelled = true;
                state.isLoading = false;
                return null;
            }

            // Extract and store error message
            const errorMsg = extractErrorMessage(err);
            state.error = errorMsg;
            state.isSuccess = false;

            // Show error notification if enabled
            if (mergedOptions.notify) {
                const displayMsg = mergedOptions.errorMessage || errorMsg;
                showNotification('error', displayMsg);
            }

            // Call error callback
            onError?.(err instanceof Error ? err : new Error(errorMsg));

            return null;
        } finally {
            // Only update loading state if this is the current request
            if (currentRequestId === requestId.value) {
                state.isLoading = false;
                state.isRetrying = false;
            }
        }
    };

    /**
     * Retry the last request
     */
    const retry = async (): Promise<TData | null> => {
        if (!canRetry.value || lastParams === undefined) {
            console.warn('[useFetch] Cannot retry: No previous request or request in progress');
            return null;
        }

        return execute(lastParams, { enableRetry: true, notify: true });
    };

    return {
        state: readonly(state) as Readonly<FetchState<TData>>,
        data: data as unknown as Ref<TData | null>,
        isLoading: isLoading as unknown as Ref<boolean>,
        error: error as unknown as Ref<string | null>,
        execute,
        cancel,
        retry,
        reset,
        isActive: isActive as unknown as Ref<boolean>,
        canRetry: canRetry as unknown as Ref<boolean>,
        retryAttempt: retryAttempt as unknown as Ref<number>,
    };
}

export default useFetch;
