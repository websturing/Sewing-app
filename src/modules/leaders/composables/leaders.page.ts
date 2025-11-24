import { useLeaderStore } from "@/modules/leaders/stores/leaders.store";
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { ref } from "vue";

type OptionNotify = {
    notify?: boolean
}

export function useLeadersPage() {
    const toast = useMessage()
    const store = useLeaderStore()
    const isLoading = ref<boolean>(false)

    const {
        loading,
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
        leaderPiniaLoading: loading,
        isLoading,
        AssignmentSummaryByLeader,
        fetchSummaryByLeader,
    }
}