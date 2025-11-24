import { useLeaderStore } from "@/modules/leaders/stores/leaders.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

type OptionNotify = {
    notify?: boolean
}

export function useLeadersPage() {
    const toast = useMessage()
    const store = useLeaderStore()

    const {
        loading: isLoading,
        AssignmentSummaryByLeader
    } = storeToRefs(store)

    const fetchSummaryByLeader = async (options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.fetchSummaryByLeader()
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }

    return {
        isLoading,
        AssignmentSummaryByLeader,
        fetchSummaryByLeader
    }
}