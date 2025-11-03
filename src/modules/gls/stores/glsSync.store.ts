

import api from '@/lib/api';
import { GLCombineResponseSchema, type GLCombineColor, type GLCombineWithoutColors } from '@/modules/gls/schemas/glsCombine.api';
import { ApiResponseSchema } from '@/types/api.schema';
import { defineStore } from 'pinia';



export const useGlSyncCuttingStore = defineStore('glsSync', {
    state: () => ({
        data: {} as GLCombineWithoutColors,
        colors: [] as GLCombineColor[],
        loading: false,
        error: null
    }),
    actions: {
        async fetchSyncCuttingGL(glNumber: string) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get(`/api/gls/syncCuttingGlNumber`, { params: { glNumber } });
                const validatedData = GLCombineResponseSchema.parse(res.data)

                const { colors, ...dataWithoutColors } = validatedData.data

                this.data = dataWithoutColors
                this.colors = validatedData.data.colors

                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Gl Numbers loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },

    },
});