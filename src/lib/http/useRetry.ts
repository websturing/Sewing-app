/**
 * Enterprise Retry Logic
 * Handles automatic retry with exponential backoff
 */

import { ref, type Ref } from 'vue';
import { DEFAULT_RETRY_CONFIG, type RetryConfig } from './types';

export interface RetryState {
    attempt: Ref<number>;
    isRetrying: Ref<boolean>;
    canRetry: Ref<boolean>;
    lastError: Ref<unknown>;
}

export interface RetryController {
    state: RetryState;
    executeWithRetry: <T>(
        operation: () => Promise<T>,
        config?: Partial<RetryConfig>
    ) => Promise<T>;
    reset: () => void;
    cancel: () => void;
}

/**
 * Calculate delay for current retry attempt using exponential backoff
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
    if (config.exponentialBackoff) {
        // Exponential backoff: delay = baseDelay * 2^attempt + random jitter
        const exponentialDelay = config.baseDelayMs * Math.pow(2, attempt);
        const jitter = Math.random() * 100; // Add random jitter to prevent thundering herd
        return Math.min(exponentialDelay + jitter, 30000); // Cap at 30 seconds
    }
    return config.baseDelayMs;
}

/**
 * Check if error is retryable based on configuration
 */
function isRetryableError(error: unknown, config: RetryConfig): boolean {
    // Custom retry condition takes precedence
    if (config.shouldRetry) {
        return true; // Will be checked in executeWithRetry
    }

    // Check for axios-style error with response status
    if (error && typeof error === 'object') {
        const axiosError = error as { response?: { status?: number }; code?: string };

        // Check HTTP status code
        if (axiosError.response?.status) {
            return config.retryableStatusCodes.includes(axiosError.response.status);
        }

        // Check for network errors
        if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ERR_NETWORK') {
            return true;
        }
    }

    // Check for fetch abort/timeout errors
    if (error instanceof Error) {
        const retryableMessages = ['network', 'timeout', 'abort', 'ECONNRESET'];
        return retryableMessages.some(msg =>
            error.message.toLowerCase().includes(msg.toLowerCase())
        );
    }

    return false;
}

/**
 * Sleep utility with cancellation support
 */
function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, ms);

        if (signal) {
            signal.addEventListener('abort', () => {
                clearTimeout(timeout);
                reject(new DOMException('Retry cancelled', 'AbortError'));
            });
        }
    });
}

/**
 * Composable for retry logic with exponential backoff
 */
export function useRetry(): RetryController {
    const attempt = ref(0);
    const isRetrying = ref(false);
    const canRetry = ref(true);
    const lastError = ref<unknown>(null);

    let abortController: AbortController | null = null;

    const state: RetryState = {
        attempt,
        isRetrying,
        canRetry,
        lastError,
    };

    const reset = () => {
        attempt.value = 0;
        isRetrying.value = false;
        canRetry.value = true;
        lastError.value = null;
        abortController = null;
    };

    const cancel = () => {
        canRetry.value = false;
        isRetrying.value = false;
        if (abortController) {
            abortController.abort();
            abortController = null;
        }
    };

    const executeWithRetry = async <T>(
        operation: () => Promise<T>,
        config: Partial<RetryConfig> = {}
    ): Promise<T> => {
        const mergedConfig: RetryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };

        reset();
        abortController = new AbortController();

        while (attempt.value <= mergedConfig.maxAttempts && canRetry.value) {
            try {
                const result = await operation();
                reset();
                return result;
            } catch (error) {
                lastError.value = error;

                // Check if we should retry
                const shouldRetryError = isRetryableError(error, mergedConfig);
                const customShouldRetry = mergedConfig.shouldRetry?.(error, attempt.value) ?? true;
                const hasAttemptsLeft = attempt.value < mergedConfig.maxAttempts;

                if (!canRetry.value) {
                    throw new DOMException('Retry cancelled', 'AbortError');
                }

                if (!shouldRetryError || !customShouldRetry || !hasAttemptsLeft) {
                    reset();
                    throw error;
                }

                // Calculate and wait for retry delay
                attempt.value++;
                isRetrying.value = true;

                const delay = calculateDelay(attempt.value, mergedConfig);

                console.info(
                    `[useRetry] Attempt ${attempt.value}/${mergedConfig.maxAttempts} failed. ` +
                    `Retrying in ${delay}ms...`,
                    { error }
                );

                try {
                    await sleep(delay, abortController?.signal);
                } catch (sleepError) {
                    if (sleepError instanceof DOMException && sleepError.name === 'AbortError') {
                        throw sleepError;
                    }
                }
            }
        }

        // Should not reach here, but just in case
        throw lastError.value;
    };

    return {
        state,
        executeWithRetry,
        reset,
        cancel,
    };
}
