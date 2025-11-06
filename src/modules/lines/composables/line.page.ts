import type { LineFilterRequest } from "@/modules/lines/schemas/line.request.schema";
import { useLineStore } from "@/modules/lines/stores/line.store";
import { useMessage } from "naive-ui";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useLinePage() {


    const toast = useMessage()
    const store = useLineStore()




    const handleFetch = async (options: OptionNotify = { notify: true }, payload: LineFilterRequest) => {
        const { success, message } = await store.fetchLines(payload)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }


    return {
        handleFetch,
    }
}