import type { ReplacementPaginationRequest } from "@/modules/Replacement/schemas/replacement.request.schema";
import { useReplacementStore } from "@/modules/Replacement/stores/replacement.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

export function useReplacementPage() {
    const toast = useMessage();
    const store = useReplacementStore()


    const { replacementList, meta, links } = storeToRefs(store)

    const handleFetchReplacementListPagination = async (
        notify: boolean = false,
        params: ReplacementPaginationRequest
    ) => {
        const { success, message } = await store.fetchReplacementListPagination(params)
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    return {
        meta,
        links,
        replacementList,
        handleFetchReplacementListPagination
    }
}