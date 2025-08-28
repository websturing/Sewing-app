
import { useActivitiesStore } from "@/modules/activities/stores/activities.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';
import { computed } from "vue";

type ActivityQuery = {
    page?: number
    name?: string
    dateFrom?: string
    dateTo?: string
    year?: number
}

export function useActivities() {
    const message = useMessage()
    const storeActivity = useActivitiesStore()

    const { search, loading: isLoading, isFirstLoad } = storeToRefs(storeActivity)
    const data = computed(() => storeActivity.searchedItems)
    const handleFetchActivity = async (query: ActivityQuery = {}) => {
        const { success, message: msg } = await storeActivity.fetchActivities(
            query.page ?? 1,
            query.name,
            query.dateFrom,
            query.dateTo,
            query.year
        )
        if (!success) {
            message.error(msg)
        }
    }
    const handleLoadMore = async () => {
        const { success, message: msg } = await storeActivity.loadNextPage()

        if (success) {
            message.success(msg)
        } else {
            message.error(msg)
        }
    }

    /**
     * GETTERS searching
     */


    return {
        search,
        data,
        isLoading,
        isFirstLoad,
        handleFetchActivity,
        handleLoadMore

    }

}