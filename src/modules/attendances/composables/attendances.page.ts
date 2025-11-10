import { useAttendanceStore } from "@/modules/attendances/stores/attendances.store"
import { useMessage } from 'naive-ui'
import { storeToRefs } from "pinia"


type OptionNotify = {
    notify?: boolean  // default: false
}

export function useAttendancePage() {

    // 1️⃣ Local state & composables
    const toast = useMessage()
    const store = useAttendanceStore()
    const { groupLine, isLoading } = storeToRefs(store);

    // 2️⃣  Methods (local functions, event handlers, dsb.)

    const handleFetch = async (options: OptionNotify = { notify: true }, lineId: number | string) => {
        const { success, message } = await store.fetchGroupLine(lineId);

        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
    }




    return {
        groupLine,
        isLoading,
        handleFetch
    }
}