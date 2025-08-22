import { useAuthStore } from '@/stores/auth';
import { PasswordChangeSchema, type PasswordChange } from '@module/Profile/schemas/ProfileSchema';
import { useProfileStore } from '@module/Profile/stores/Profile';
import { toTypedSchema } from '@vee-validate/zod';
import { useMessage } from "naive-ui";
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { z } from "zod";

export function useProfileChangePassword() {
    const store = useProfileStore()
    const storeAuth = useAuthStore()
    const message = useMessage()

    const { user } = storeToRefs(storeAuth)


    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm } = useForm<z.infer<typeof PasswordChangeSchema>>({
        validationSchema: toTypedSchema(PasswordChangeSchema)
    })

    const { value: password } = useField<PasswordChange['password']>('password')
    const { value: passwordConfirm } = useField<PasswordChange['passwordConfirm']>('passwordConfirm')

    const resetForm = () => {
        veeResetForm({
            values: {
                password: "",
                passwordConfirm: "",
            }, errors: {}
        })
    }

    const onSubmit = handleSubmit(async (values) => {

        if (!user.value?.id) {
            message.error("User ID not found")
            return
        }

        try {
            const res = await store.changePassword(values, user.value?.id)
            message.success(res)
            resetForm()
        } catch (error) {
            message.error("Error submitting form")
            console.error('Error submitting form:', error)
        }
    })

    return {
        password,
        passwordConfirm,
        errors,
        isSubmitting,
        onSubmit,
        resetForm,
    }
}