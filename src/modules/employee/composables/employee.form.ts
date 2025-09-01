
import { useFields } from "@/composables/useFieldWrapper";
import { EmployeeSchema } from "@module/employee/schemas/employeeSchema";
import { toTypedSchema } from '@vee-validate/zod';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { onMounted, ref } from "vue";
import { z } from "zod";
import { useEmployeeStore } from '../stores/employee.store';

export function useEmployeeForm(initialData: any = null) {

    const store = useEmployeeStore()
    const { data } = storeToRefs(store)

    const seventeenYearsAgoFormatted = ref<string>(
        dayjs().subtract(17, 'year').format('YYYY-MM-DD')
    );


    const getDefaults = () => ({
        employeeCode: initialData?.employeeCode ?? "",
        name: initialData?.name ?? "",
        gender: initialData?.gender ?? "male",
        dateBirth: initialData?.dateBirth ?? seventeenYearsAgoFormatted.value,
        position: initialData?.position ?? "",
        department: initialData?.department ?? "",
        joinDate: initialData?.joinDate ?? dayjs(new Date()).format('YYYY-MM-DD'),
        active: initialData?.active ?? true
    })


    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm } = useForm<z.infer<typeof EmployeeSchema>>({
        validationSchema: toTypedSchema(EmployeeSchema),
        initialValues: getDefaults()
    })


    const resetForm = () => {
        veeResetForm({
            values: getDefaults(), errors: {}
        })
    }

    /** FIELD DATA */
    const { employeeCode, position, department, active, name, gender, dateBirth, joinDate } = useFields<{
        employeeCode: string
        name: string
        gender: string
        dateBirth: string
        position: string
        department: string,
        joinDate: string
        active: boolean
    }>(["employeeCode", "name", "gender", "dateBirth", "position", "department", "active", "joinDate"])

    const onSubmit = (fn: (values: any) => void | Promise<void>) => {
        return handleSubmit(fn)
    }

    onMounted(async () => {
        if (!initialData?.employeeCode) {
            await store.fetchEmployeeLastCode()
            employeeCode.value = store.employeeLastCode
        }
    })

    return {
        employeeCode,
        name,
        gender,
        dateBirth,
        joinDate,
        position,
        department,
        active,
        onSubmit,
        resetForm,
        data,
        errors,
        isSubmitting,
    }
}