import { useGlStore } from "@/modules/gls/stores/gls.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useGlView() {


    const toast = useMessage()
    const store = useGlStore()
    const { search, options } = storeToRefs(store)


    const handleFetchSummaryGLNumber = (value: any) => {
        const glNumber = value.slice(3)
        handleFetchGlNumberSummary(glNumber)


    }
    const handleFetchGlNumberSummary = async (glNumber: string, options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetchSummaryGl(glNumber)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    const handleFetch = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetch()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }


    const handleUpdateSearch = (term: string) => {
        store.searchOrFetch(term)
    }


    return {
        search,
        options,
        handleFetch,
        handleFetchSummaryGLNumber,
        handleUpdateSearch
    }
}