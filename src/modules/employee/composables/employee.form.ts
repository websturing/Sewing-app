import { useFields } from "@/composables/useFieldWrapper";
import { EmployeeSchema, type Employee } from "@module/employee/schemas/employeeSchema";
import { toTypedSchema } from '@vee-validate/zod';
import dayjs from 'dayjs';
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { onMounted, ref, watch } from "vue";
import { z } from "zod";
import { useEmployeeStore } from '../stores/employee.store';

export function useEmployeeForm(initialData: Employee | null = null) {
    const toast = useMessage()
    const store = useEmployeeStore()
    const { data } = storeToRefs(store)

    const seventeenYearsAgoFormatted = ref<string>(
        dayjs().subtract(17, 'year').format('YYYY-MM-DD')
    );

    // Pastikan semua field wajib ada
    const getDefaults = (): Employee => ({
        employeeCode: initialData?.employeeCode ?? "",
        name: initialData?.name ?? "",
        gender: initialData?.gender ?? "male",
        dateBirth: initialData?.dateBirth ?? seventeenYearsAgoFormatted.value,
        joinDate: initialData?.joinDate ?? dayjs().format('YYYY-MM-DD'),
        position: initialData?.position ?? "",
        department: initialData?.department ?? "",
        active: initialData?.active ?? true,
        // optional fields
        id: initialData?.id,
        userId: initialData?.userId,
        device_id: initialData?.device_id,
        createdAt: initialData?.createdAt
    })

    const {
        handleSubmit,
        errors,
        isSubmitting,
        resetForm: veeResetForm,
        validate: veeValidate,
    } = useForm<z.infer<typeof EmployeeSchema>>({
        validationSchema: toTypedSchema(EmployeeSchema),
        initialValues: getDefaults()
    })

    // reset form
    const resetForm = () => {
        veeResetForm({
            values: getDefaults(), errors: {}
        })
    }

    /** FIELD DATA */
    const { employeeCode, position, department, active, name, gender, dateBirth, joinDate } = useFields<{
        employeeCode: string
        name: string | ""
        gender: "male" | "female"
        dateBirth: string
        joinDate: string
        position: string
        department: string
        active: boolean
    }>(["employeeCode", "name", "gender", "dateBirth", "joinDate", "position", "department", "active"])

    // Validasi form tanpa submit
    const validateForm = async (): Promise<{ valid: boolean; values?: Employee }> => {
        const result = await veeValidate()
        if (!result.valid) return { valid: false }
        return { valid: true, values: result.values as Employee }
    }

    // Submit form → trigger handleEmployeeCreate via parent
    const submitForm = handleSubmit((values) => values)

    // Update / delete
    const updateEmployee = async (id: number, employee: Employee) => {
        const { success, message } = await store.updateEmployee(id, employee)
        if (success) toast.success(message)
        else toast.error(message)
    }

    const deleteEmployee = async (id: number) => {
        const { success, message } = await store.deleteEmployee(id)
        if (success) toast.success(message)
        else toast.error(message)
    }

    // Fetch last employee code
    onMounted(async () => {
        if (!initialData?.employeeCode) {
            await store.fetchEmployeeLastCode()
            employeeCode.value = store.employeeLastCode
        }
    })

    watch(
        () => initialData,
        () => resetForm(),
        { deep: true, immediate: true }
    )

    return {
        employeeCode,
        name,
        gender,
        dateBirth,
        joinDate,
        position,
        department,
        active,
        onSubmit: handleSubmit,
        resetForm,
        updateEmployee,
        deleteEmployee,
        data,
        errors,
        isSubmitting,
        validateForm, // cek validasi saja
        submitForm,   // ambil data form
    }
}
