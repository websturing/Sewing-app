
import { useAuthStore } from '@/stores/auth';
import { loginSchema } from '@module/Login/schemas/LoginSchema';
import { useMessage } from 'naive-ui';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useLoginForm() {
    const auth = useAuthStore()
    const router = useRouter()
    const message = useMessage()
    const loading = ref(false)
    const { handleSubmit, errors, isSubmitting } = useForm<{
        email: string
        password: string
    }>({
        validationSchema: loginSchema,
    })

    const { value: email } = useField<string>('email')
    const { value: password } = useField<string>('password')


    const submitForm = handleSubmit(async (values) => {
        let loadingMessage: { destroy: () => void } | null = null
        loading.value = true
        try {
            loadingMessage = message.loading("We're sending your Credential, hold on...", {
                duration: 0 // Biarkan tetap terbuka sampai kita tutup manual
            })
            const response = await auth.login(values)

            // Close loading
            if (loadingMessage) loadingMessage.destroy()
            loading.value = false

            message.success(`Great to have you back, ${response.data.data.user.email}! 🎉.`, {
            duration: 3000
        })
            router.push({ name: 'dashboard' })
        } catch (error: any) {
            // Tutup loading message jika ada
            if (loadingMessage) loadingMessage.destroy()

            console.error(error)
            const errorMsg = error?.response?.data?.message || 'Invalid credentials, please try again.'
            loading.value = false
            // Tampilkan error message
            message.error(errorMsg, {
                duration: 5000
            })
        }
    });

    return {
        email,
        password,
        loading,
        errors,
        isSubmitting,
        submitForm,
    }

}