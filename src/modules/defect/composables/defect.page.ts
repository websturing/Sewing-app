import { useDefectStore } from "@/modules/defect/stores/defect.store"
import { useMessage } from "naive-ui"
import { storeToRefs } from "pinia"

type OptionNotify = {
    notify?: boolean
}

export function useDefectPage() {
    const toast = useMessage()
    const store = useDefectStore()


    const { summaryGroupLine, defectGroupLines } = storeToRefs(store)

    const handleFetchSummaryGroupLines = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetchSummaryGroupLines()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    const handleFetchGroupLines = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetchGroupLines()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    return {
        summaryGroupLine,
        defectGroupLines,
        handleFetchSummaryGroupLines,
        handleFetchGroupLines
    }
}