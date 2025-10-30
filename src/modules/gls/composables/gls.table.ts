import { useGlTableStore } from "@/modules/gls/stores/glsTable.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useGLTable() {


    const toast = useMessage()
    const store = useGlTableStore()
    const { search, options, loading, data, meta } = storeToRefs(store)




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
        meta,
        search,
        data,
        options,
        loading,
        handleFetch,
        handleUpdateSearch
    }
}