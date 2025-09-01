import type { MetaHead } from "@/types/metaHead";
import { useEmployeeStore } from '@module/employee/stores/employee.store';
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { ref } from "vue";


export function useEmployee() {
    const meta = ref<MetaHead>({
        title: "Employees",
        description: "The Employee module provides a centralized space to manage workforce data, including personal information, job details, and access rights. It enables administrators to add, update, and organize employee records efficiently while ensuring accurate and secure handling of sensitive information."
    })

    const store = useEmployeeStore()
    const toast = useMessage()
    const { data } = storeToRefs(store)




    /**
     * FUNCTION HANDLE
     */

    const handleFetchEmployee = async () => {
        const { success, message } = await store.fetchEmployee()
        if (!success) {
            toast.error(message)
        }
    }
    return {
        meta,
        data,
        handleFetchEmployee
    }
}