import type { GroupByGlNumberQuery } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import { useStockInSummaryStore } from '@/modules/stock-in/stores/stockInSummary.store';
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useStockInSummary() {
    const store = useStockInSummaryStore();
    const toast = useMessage()

    const { groupByGlNumber, loading } = storeToRefs(store);
    const search = computed({
        get: () => groupByGlNumber.value.search,
        set: (val: string) => {
            groupByGlNumber.value.search = val;
        }
    });

    const glData = computed(() => store.searchedGroupGlNumberItems);



    const handleFetchGroupGL = async (
        query: GroupByGlNumberQuery = {},
        options: OptionNotify = { notify: true }
    ) => {
        const { success, message } = await store.fetchGroupByGlNumber(query);
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

    }

    /**
    * WATCH SEARCH
    */
    watch(search, async (term) => {
        await store.searchOrFetch(term)
    })

    return {
        search,
        loading,
        glData,
        handleFetchGroupGL
    }

}