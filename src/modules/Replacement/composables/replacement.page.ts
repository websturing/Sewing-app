import type { ReplacementHistoriesWorkflow, ReplacementItem } from "@/modules/Replacement/schemas/replacement.api.schema";
import type { ReplacementPaginationRequest } from "@/modules/Replacement/schemas/replacement.request.schema";
import { useReplacementStore } from "@/modules/Replacement/stores/replacement.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

export function useReplacementPage() {
    const toast = useMessage();
    const store = useReplacementStore()
    const isLoading = ref<boolean>(false)
    const searchReplacementList = ref<string>("")
    const selectedReplacementItem = ref<ReplacementItem | null>(null)
    const timelineHistories = ref<ReplacementHistoriesWorkflow[]>([])

    const { replacementList, remoteSearchResult, meta, links } = storeToRefs(store)

    const replacementListFilter = computed(() =>
        searchReplacementList.value
            ? remoteSearchResult.value ?? localFiltered.value
            : localFiltered.value
    );
    const localFiltered = computed(() => {
        const keyword = searchReplacementList.value?.toLowerCase()

        if (!keyword) return replacementList.value

        return replacementList.value.filter((item: ReplacementItem) => {
            const matchGL = item.glNo?.toLowerCase().includes(keyword)
            const matchSerial = item.serialNumber?.toLowerCase().includes(keyword)
            const matchDefectList = item.defectList?.some(
                (d: any) => d.color?.toLowerCase().includes(keyword)
            )

            return matchGL || matchSerial || matchDefectList
        })
    })


    const handleFetchReplacementListPagination = async (
        notify: boolean = false,
        params: ReplacementPaginationRequest
    ) => {
        isLoading.value = true
        const { success, message } = await store.fetchReplacementListPagination(params)
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
        isLoading.value = false
        return { success, message }
    }

    const handleSearchReplacementList = async () => {
        if (!searchReplacementList.value.trim()) {
            store.clearRemoteSearchResult();
            return;
        }

        if (localFiltered.value.length > 0) return;

        await handleFetchReplacementListPagination(false, {
            search: searchReplacementList.value,
        });
    };


    const selectReplacementItem = (index: number) => {
        selectedReplacementItem.value = localFiltered.value[index]
        // fetchWorkFlowById(true, selectedReplacementItem.value?.workflow?.id ?? 0)
    }

    const handleFetchReplacementApprovalPagination = async (
        notify: boolean = false,
        params: ReplacementPaginationRequest
    ) => {
        isLoading.value = true
        const { success, message } = await store.fetchReplacementApprovalPagination(params)
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
        isLoading.value = false
        return { success, message }
    }

    const handleSearchReplacementApprovalList = async () => {
        if (!searchReplacementList.value.trim()) {
            store.clearRemoteSearchResult();
            return;
        }

        if (localFiltered.value.length > 0) return;

        await handleFetchReplacementApprovalPagination(false, {
            search: searchReplacementList.value,
        });
    };

    const handleFetchHistoriesByReplacementId = async (
        notify: boolean = false,
        id: number
    ) => {
        isLoading.value = true
        const { success, message, data } = await store.fetchHistoriesByReplacementId(id)
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
        isLoading.value = false
        timelineHistories.value = data as ReplacementHistoriesWorkflow[]
        return { success, message }
    }



    return {
        selectedReplacementItem,
        isLoading,
        meta,
        links,
        searchReplacementList,
        replacementListFilter,
        replacementList,
        timelineHistories,
        handleFetchReplacementListPagination,
        handleSearchReplacementList,
        selectReplacementItem,
        handleFetchReplacementApprovalPagination,
        handleSearchReplacementApprovalList,
        handleFetchHistoriesByReplacementId
    }
}