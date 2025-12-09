import { useAdvancedFetch } from '@/composables/useAdvancedFetch';
import { ref } from 'vue';
import type { ReplacementHistoriesWorkflow, ReplacementTracking } from '../schemas/replacement.api.schema';
import { useReplacementStore } from '../stores/replacement.store';

export function useReplacementTracking() {
    const store = useReplacementStore();
    const { isLoading, error, data, execute } = useAdvancedFetch();
    const currentStep = ref<number>(2);
    const workflow = ref<ReplacementHistoriesWorkflow[]>([]);
    const replacementTracking = ref<ReplacementTracking>();

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
                onSuccess: (response: ReplacementTracking) => {
                    workflow.value = response.timeline;
                    currentStep.value = response.currentStep;
                    replacementTracking.value = response;
                }
            }
        );
    };

    return { isLoading, error, data, fetchTrackingData, workflow, currentStep, replacementTracking };

}