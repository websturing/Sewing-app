import { useFields } from "@/composables/useFieldWrapper";
import { UserSchema, type User } from "@module/user/schemas/user.schema";
import { useUserStore } from "@module/user/stores/user.store";
import { toTypedSchema } from '@vee-validate/zod';
import { useMessage } from "naive-ui";
import { useForm } from 'vee-validate';
import { z } from "zod";

type OptionNotify = {
    notify?: boolean  // default: false
}

export function useUserForm(initialData: any = null) {


    const toast = useMessage()
    const store = useUserStore()

    const getDefaults = () => ({
        email: initialData?.email ?? "",
        name: initialData?.name ?? "",
        roleNames: initialData?.roleNames ?? [],
    })

    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, validate: veeValidate } = useForm<z.infer<typeof UserSchema>>({
        validationSchema: toTypedSchema(UserSchema),
        initialValues: getDefaults()
    })

    const resetForm = () => {
        veeResetForm({
            values: getDefaults(), errors: {}
        })
    }

    /** FIELD DATA */
    const { email, name, roleNames } = useFields<{
        email: string
        name: string,
        roleNames: []
    }>(["email", "name", "roleNames"])


    const validateForm = async (): Promise<{ valid: boolean; values?: User }> => {
        const result = await veeValidate()
        if (!result.valid) return { valid: false }
        return { valid: true, values: result.values as User }
    }
    const onSubmit = (fn: (values: any) => void | Promise<void>) => {
        return handleSubmit(fn)
    }


    const handleCreateStore = async (user: User, options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.create(user)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

        return { success, message }
    }


    const handleUpdateStore = async (id: number, user: User, options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.update(id, user)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }
        return { success, message }
    }


    const handleDeleteStore = async (id: number, options: OptionNotify = { notify: true }) => {
        const { success, message } = await store.delete(id)
        if (options.notify) {
            success ? toast.success(message) : toast.error(message)
        }

        return { success, message }
    }


    return {
        name,
        email,
        roleNames,
        errors,
        isSubmitting,
        validateForm,
        onSubmit,
        resetForm,
        handleCreateStore,
        handleUpdateStore,
        handleDeleteStore
    }
}