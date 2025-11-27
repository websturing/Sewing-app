import { replacementApi } from '@/modules/Replacement/api/ReplacementApi';
import { ApiResponseSchema } from '@/types/api.schema';
import {
    type AssignmentSummaryByLeader
} from "@module/leaders/schemas/leaders.api.schema";
import { defineStore } from 'pinia';

export const useReplacementStore = defineStore('replacementStore', {
    state: () => ({
        replacement: [] as AssignmentSummaryByLeader[]
    }),
    actions: {
        async createTicketReplacement(payload: any) {
            try {
                const results = await replacementApi.createTicketReplacement(payload)
                return ApiResponseSchema.parse({
                    success: true,
                    message: results.message ?? "Created",
                    data: results.data
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                return ApiResponseSchema.parse({ success: false, message });
            }
        },
    }
});