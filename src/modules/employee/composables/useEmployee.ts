import type { MetaHead } from "@/types/metaHead";
import { useEmployeeStore } from '@module/employee/stores/employee.store';
import { useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { Employee } from "../schemas/employeeSchema";
import { useEmployeeForm } from "./employee.form";


export function useEmployee() {
    const meta = ref<MetaHead>({
        title: "Employees",
        description: "The Employee module provides a centralized space to manage workforce data, including personal information, job details, and access rights. It enables administrators to add, update, and organize employee records efficiently while ensuring accurate and secure handling of sensitive information."
    })

    const store = useEmployeeStore()
    const toast = useMessage()
    const router = useRouter()
    const { data } = storeToRefs(store)
    const { resetForm } = useEmployeeForm()



    /**
     * FUNCTION HANDLE
     */

    const handleFetchEmployee = async () => {
        const { success, message } = await store.fetchEmployee()
        if (!success) {
            toast.error(message)
        }
    }

    const handleCreateEmployee = async (values: Employee) => {
        const { message } = await store.createEmployee(values)
        toast.success(message)
        resetForm()

        router.push({ name: 'employee' })
    }

    return {
        meta,
        data,
        handleFetchEmployee,
        handleCreateEmployee
    }
}