import api from '@/lib/api';
import type { PasswordChange } from '@module/Profile/schemas/ProfileSchema';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        data: [] as any[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async changePassword(password: PasswordChange, userId: number) {
            this.loading = true
            this.error = null
            try {
                const res = await api.post(`/api/auth/password/${userId}`, password)
                return res.data.message
            } catch (error: any) {
                const message =
                    error?.response?.data?.message || "Terjadi kesalahan"
                this.error = message
                throw message // lempar string biar gampang ditangani di UI
            } finally {
                this.loading = false
            }
        },
    }

});