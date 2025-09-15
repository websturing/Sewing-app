import { useAssignmentLinesStore } from "@/modules/assignment-lines/stores/AssignmentLines.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useAssignmentLinesGrid() {


    const toast = useMessage()
    const store = useAssignmentLinesStore();

    const { searchedItems, search, data } = storeToRefs(store)

    const handleFetchStore = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetch()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

        return { success, message }
    }


    return {
        store,
        search,
        data,
        searchedItems,
        handleFetchStore
    }
}