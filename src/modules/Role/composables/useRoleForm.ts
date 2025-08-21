import { useModuleStore } from '@/modules/permission/stores/permission';

import { RoleCreateSchema } from '@module/Role/schemas/RoleSchema';
import { useRoleStore } from '@module/Role/stores/Role';
import { toTypedSchema } from '@vee-validate/zod';
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from "zod";

export function useRoleForm(initialData: any = null) {
    const message = useMessage()

    const store = useRoleStore()
    const moduleStore = useModuleStore();
    const { data: parentData } = storeToRefs(store)
    const { data: permissionData } = storeToRefs(moduleStore)
    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm } = useForm<z.infer<typeof RoleCreateSchema>>({
        validationSchema: toTypedSchema(RoleCreateSchema),
        initialValues: {
            name: initialData?.name || '',
            guardName: initialData?.guardName || 'web',
            permissions: initialData?.permissions || []
        }
    })

    const { value: name } = useField<string>('name')
    const { value: permissions } = useField<Array<number>>('permissions')
    const isEdit = ref(!!initialData?.id) // true kalau edit

    const resetForm = () => {
        veeResetForm({
            values: {
                name: initialData?.name || "",
                guardName: initialData?.guardName || "web",
                permissions: initialData?.permissions || [],
            }, errors: {}
        })
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            if (isEdit.value) {
                const res = await store.updateRole(initialData.id, values)
                message.success(res)
            } else {
                const res = await store.createRole(values)
                message.success(res)
                resetForm()
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    })

    return {
        name,
        permissions,
        isEdit,
        onSubmit,
        resetForm,
        parentData,
        errors,
        isSubmitting,
        permissionData
    }
}