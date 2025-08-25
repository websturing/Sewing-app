import api from '@/lib/api';
import { handleApiError } from '@/types/errorTypes';
import { ActivitiesResponseSchema, type ActivitiesResponse } from '@module/activities/schemas/activitiesSchema';
import { defineStore } from 'pinia';

export const useActivitiesStore = defineStore('activities', {
    state: () => ({
        data: {} as ActivitiesResponse,
        loading: false,
        error: null as string | null,
        isModal: false,
    }),
    actions: {
        async fetchActivities(page = 1) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get(`/api/activities?page=${page}`);
                console.log('RAW API:', res.data); // 👈 cek dulu raw
                const validatedData = ActivitiesResponseSchema.parse(res.data);
                console.log('PARSED:', validatedData); // 👈 cek setelah parse
                this.data = validatedData;
            } catch (error) {
                console.error('VALIDATION ERROR:', error); // 👈 lihat error detail
                this.data = {} as ActivitiesResponse;
                this.error = handleApiError(error);
                throw error;
            }

        },
    },
});
