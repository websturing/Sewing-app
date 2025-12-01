import { useWorkflowStore } from "@/modules/Workflow/stores/Workflow.store";
import { useMessage } from "naive-ui";
import { ref } from "vue";

export function useWorkflowPage() {
    const toast = useMessage();
    const store = useWorkflowStore();

    const isLoading = ref<boolean>(false)



    const fetchWorkFlowById = async (
        notify: boolean = false,
        id: number
    ) => {
        isLoading.value = true
        const { success, message } = await store.fetchWorkFlowById(id)
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
        isLoading.value = false
        return { success, message }
    }

    return {
        isLoading,
        fetchWorkFlowById
    }

}