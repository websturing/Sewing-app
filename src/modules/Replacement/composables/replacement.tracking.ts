import { useAdvancedFetch } from '@/composables/useAdvancedFetch';
import { useReplacementStore } from '../stores/replacement.store';

export function useReplacementTracking() {
    const store = useReplacementStore();
    const { isLoading, error, data, execute } = useAdvancedFetch();

    const fetchTrackingData = async (serialNumber: string) => {
        return await execute(
            () => store.fetchTicketTrackBySerial(serialNumber),
            {
                notify: false,
                showLoadingToast: true, // Show loading toast with cancel
                loadingMessage: `Searching for ${serialNumber}...`,
                minLoadingTime: 500,
                retryAttempts: 2,
                retryDelay: 1500,
                manualRetry: true,
            }
        );
    };

    return { isLoading, error, data, fetchTrackingData };

}