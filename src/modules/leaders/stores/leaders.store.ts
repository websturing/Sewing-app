import { leadersApi } from '@/modules/leaders/api/leaders.api';
import { ApiResponseSchema } from '@/types/api.schema';
import {
    AssignmentSummaryByLeaderResponseSchema,
    type AssignmentSummaryByLeader
} from "@module/leaders/schemas/leaders.api.schema";
import { defineStore } from 'pinia';

export const useLeaderStore = defineStore('leaderStore', {
    state: () => ({
        loading: false as boolean,
        error: null,
        AssignmentSummaryByLeader: [] as AssignmentSummaryByLeader[]
    }),
    actions: {
        async fetchSummaryByLeader() {
            this.loading = true;
            this.error = null;
            try {

                const results = await leadersApi.getAssignments()
                const validate = AssignmentSummaryByLeaderResponseSchema.parse(results);

                this.AssignmentSummaryByLeader = validate.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
    }
});