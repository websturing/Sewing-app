import { useDefectStore } from "@/modules/defect/stores/defect.store"
import { useMessage } from "naive-ui"
import { storeToRefs } from "pinia"

type OptionNotify = {
    notify?: boolean
}

export function useDefectPage() {
    const toast = useMessage()
    const store = useDefectStore()


    const {
        loading,
        summaryGroupLine,
        defectGroupLines,
        defectGroupGlNumber
    } = storeToRefs(store)

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

    const handleFetchGroupGlNumber = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetchGroupGlNumber()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    return {
        loading,
        summaryGroupLine,
        defectGroupLines,
        defectGroupGlNumber,
        handleFetchGroupGlNumber,
        handleFetchSummaryGroupLines,
        handleFetchGroupLines
    }
}