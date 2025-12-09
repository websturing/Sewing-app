import { useAdvancedFetch } from '@/composables/useAdvancedFetch';
import { ref } from 'vue';
import type { ReplacementHistoriesWorkflow } from '../schemas/replacement.api.schema';
import { useReplacementStore } from '../stores/replacement.store';

export function useReplacementTracking() {
    const store = useReplacementStore();
    const { isLoading, error, data, execute } = useAdvancedFetch();
    const workflow = ref<ReplacementHistoriesWorkflow[]>([]);


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
                onSuccess: (response) => {
                    workflow.value = response.timeline
                }
            }
        );
    };

    return { isLoading, error, data, fetchTrackingData, workflow };

}