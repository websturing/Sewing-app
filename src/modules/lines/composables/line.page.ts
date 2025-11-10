import type { LineFilterRequest } from "@/modules/lines/schemas/line.request.schema";
import { useLineStore } from "@/modules/lines/stores/line.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useLinePage() {
    const toast = useMessage()
    const store = useLineStore()

    const { line, lineStockInSummary, loading, lineDevices } = storeToRefs(store)

    const handleFetch = async (options: OptionNotify = { notify: true }, payload: LineFilterRequest) => {
        const { success, message } = await store.fetchLines(payload)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    const handleFetchLineDevices = async (lineId: string | number, options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetchLineDevices(lineId)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    const handleFetchById = async (options: OptionNotify = { notify: true }, payload: LineFilterRequest) => {
        const { success, message } = await store.fetchLineById(payload)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    return {
        line,
        lineStockInSummary,
        loading,
        lineDevices,
        handleFetch,
        handleFetchById,
        handleFetchLineDevices
    }
}