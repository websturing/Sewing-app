import { useLineStore } from "@/modules/lines/stores/line.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useLineView() {


    const toast = useMessage()
    const store = useLineStore()
    const { search, options } = storeToRefs(store)


    const handleUpdateSearch = (term: string) => {
        store.searchOrFetch(term)
    }

    const handleFetch = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetch()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }


    return {
        search,
        options,
        handleFetch,
        handleUpdateSearch
    }
}