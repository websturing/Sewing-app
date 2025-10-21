import type { GroupByGlNumberQuery } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import { useStockInSummaryStore } from '@/modules/stock-in/stores/stockInSummary.store';
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useStockInSummary() {
    const store = useStockInSummaryStore();
    const toast = useMessage()

    const { groupByGlNumber: glData, loading } = storeToRefs(store);


    const handleFetchGroupGL = async (
        query: GroupByGlNumberQuery = {},
        options: OptionNotify = { notify: true }
    ) => {
        const { success, message } = await store.fetchGroupByGlNumber(query);
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

    }

    return {
        loading,
        glData,
        handleFetchGroupGL
    }

}