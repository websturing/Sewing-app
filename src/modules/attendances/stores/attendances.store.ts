

import { attendancesApi } from '@/modules/attendances/api/attendancesApi';
import { attendanceGroupLineResponseSchema, type attendanceGroupLine } from '@/modules/attendances/schemas/attendances.api';
import { ApiResponseSchema } from '@/types/api.schema';
import { defineStore } from 'pinia';



export const useAttendanceStore = defineStore('attendance', {
    state: () => ({
        groupLine: [] as attendanceGroupLine[],
        isLoading: false,
        error: null
    }),
    actions: {
        async fetchGroupLine(lineId: number) {
            this.isLoading = true;
            this.error = null;
            try {

                const data = await attendancesApi.getAttendanceByLine(lineId, {});
                const results = attendanceGroupLineResponseSchema.parse(data);

                this.groupLine = results.data;

                return ApiResponseSchema.parse({
                    success: true,
                    message: results.message ?? "Attendances By Group Line loaded",
                    data: {
                        attendanceGroupLine: results.data
                    }
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.isLoading = false;
            }
        },

    },
});