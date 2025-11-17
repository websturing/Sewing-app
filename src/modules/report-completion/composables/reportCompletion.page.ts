import { useGlStore } from "@/modules/gls/stores/gls.store";
import { useMessage } from "naive-ui";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useReportCompletionPage() {
    const store = useGlStore()
    const toast = useMessage()


    const handleGLList = async (options: OptionNotify = { notify: true }, glNumber?: string) => {
        const response = await store.fetchGLList(glNumber)
        if (options.notify) {
            response.success ? toast.success(response.message) : toast.error(response.message)
        }
        return response
    }

    return {
        handleGLList
    }
}