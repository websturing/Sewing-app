// composables/useAdvancedFetch.ts
import { useMessage } from 'naive-ui';
import { ref, type Ref } from 'vue';

// Initialize message globally or pass it as parameter
let message: ReturnType<typeof useMessage>;

interface FetchOptions<T> {
    minLoadingTime?: number;
    notify?: boolean;
    showLoadingToast?: boolean; // New: show loading toast with cancel button
    loadingMessage?: string; // Customizable loading message
    retryAttempts?: number;
    retryDelay?: number;
    manualRetry?: boolean; // New: show retry button instead of auto retry
    cache?: boolean;
    cacheTime?: number; // in milliseconds
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    onRetry?: (attempt: number) => void;
    onCancel?: () => void; // New: callback when cancelled
    abortSignal?: AbortSignal;
}

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

export const useAdvancedFetch = <T = any>() => {
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const data = ref<T | null>(null) as Ref<T | null>;

    // Initialize Naive UI message
    message = useMessage();

    // Simple in-memory cache
    const cache = new Map<string, CacheEntry<T>>();

    // Active abort controllers for request cancellation
    const abortController = ref<AbortController | null>(null);

    // Store loading message instance for updating/destroying
    let loadingMessageInstance: any = null;

    // Store last fetch function and options for manual retry
    let lastFetchFn: (() => Promise<any>) | null = null;
    let lastOptions: FetchOptions<T> | null = null;

    const execute = async (
        fetchFn: () => Promise<any>,
        options: FetchOptions<T> = {}
    ): Promise<T | null> => {
        const {
            minLoadingTime = 500,
            notify = false,
            showLoadingToast = false,
            loadingMessage = 'Loading...',
            retryAttempts = 0,
            retryDelay = 1000,
            manualRetry = false,
            cache: enableCache = false,
            cacheTime = 5 * 60 * 1000,
            onSuccess,
            onError,
            onRetry,
            onCancel,
            abortSignal
        } = options;

        // Store for manual retry
        lastFetchFn = fetchFn;
        lastOptions = options;

        // Generate cache key
        const cacheKey = enableCache ? fetchFn.toString() : '';

        // Check cache first
        if (enableCache && cacheKey) {
            const cached = cache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < cacheTime) {
                data.value = cached.data;
                if (notify) message.success('Data loaded from cache');
                onSuccess?.(cached.data);
                return cached.data;
            }
        }

        isLoading.value = true;
        error.value = null;

        if (!abortSignal) {
            abortController.value = new AbortController();
        }

        if (showLoadingToast) {
            loadingMessageInstance = message.loading(loadingMessage, {
                duration: 0,
                closable: true,
                onClose: () => {
                    cancel();
                    onCancel?.();
                }
            });
        }

        let lastError: string = '';

        // Retry logic
        try {
            const maxAttempts = manualRetry ? 1 : (retryAttempts + 1); // Manual retry only tries once

            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                try {
                    const [response] = await Promise.all([
                        fetchFn(),
                        new Promise(resolve => setTimeout(resolve, minLoadingTime))
                    ]);

                    const { success, message: responseMessage, data: responseData } = response;

                    if (success) {
                        data.value = responseData;

                        if (enableCache && cacheKey) {
                            cache.set(cacheKey, {
                                data: responseData,
                                timestamp: Date.now()
                            });
                        }

                        if (notify) message.success(responseMessage || 'Success!');
                        onSuccess?.(responseData);
                        return responseData;
                    } else {
                        error.value = responseMessage;
                        lastError = responseMessage;

                        if (manualRetry) {
                            // Show error with retry button
                            showErrorWithRetry(responseMessage);
                        } else if (attempt === retryAttempts) {
                            if (notify) message.error(responseMessage);
                            onError?.(responseMessage);
                        }
                    }
                } catch (err: any) {
                    if (err.name === 'AbortError') {
                        error.value = 'Request was cancelled';
                        return null;
                    }

                    const errorMessage = err.message || "An unexpected error occurred.";
                    lastError = errorMessage;

                    // Auto retry (if not manual)
                    if (!manualRetry && attempt < retryAttempts) {
                        error.value = null;
                        onRetry?.(attempt + 1);
                        if (notify) {
                            message.warning(`Retrying... (${attempt + 1}/${retryAttempts})`);
                        }
                        await new Promise(resolve => setTimeout(resolve, retryDelay));
                        continue;
                    }

                    // Last attempt or manual retry
                    error.value = errorMessage;

                    if (manualRetry) {
                        showErrorWithRetry(errorMessage);
                    } else {
                        if (notify) message.error(errorMessage);
                        onError?.(errorMessage);
                    }
                }
            }

            return null;
        } finally {
            isLoading.value = false;

            if (loadingMessageInstance) {
                loadingMessageInstance.destroy();
                loadingMessageInstance = null;
            }
        }
    };

    // Helper function to show error notification with retry button
    const showErrorWithRetry = (errorMessage: string) => {
        message.error(errorMessage, {
            duration: 1500, // Don't auto close
            closable: true,
            // Note: Naive UI doesn't support action buttons directly in messages
            // We need to show a separate retry button or use n-notification
        });
    };

    // Manual retry function
    const retry = async (): Promise<T | null> => {
        if (!lastFetchFn || !lastOptions) {
            console.warn('No previous request to retry');
            return null;
        }

        return await execute(lastFetchFn, lastOptions);
    };

    const cancel = () => {
        if (abortController.value) {
            abortController.value.abort();
            abortController.value = null;
            isLoading.value = false;
        }

        // Close loading toast if exists
        if (loadingMessageInstance) {
            loadingMessageInstance.destroy();
            loadingMessageInstance = null;
        }
    };

    const clearCache = (cacheKey?: string) => {
        if (cacheKey) {
            cache.delete(cacheKey);
        } else {
            cache.clear();
        }
    };

    const reset = () => {
        isLoading.value = false;
        error.value = null;
        data.value = null;
        cancel();
    };

    return {
        isLoading,
        error,
        data,
        execute,
        retry, // Manual retry function
        cancel,
        clearCache,
        reset
    };
};
