import { replacementApi } from '@/modules/Replacement/api/ReplacementApi';
import { ReplacementPaginationResponseSchema, type ReplacementItem } from '@/modules/Replacement/schemas/replacement.api.schema';
import { type ReplacementPaginationRequest } from '@/modules/Replacement/schemas/replacement.request.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import { defineStore } from 'pinia';

export const useReplacementStore = defineStore('replacementStore', {
    state: () => ({
        replacement: [] as ReplacementItem[],
    }),
    actions: {
        async createTicketReplacement(params: any) {
            try {
                const results = await replacementApi.createTicketReplacement(params)
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
        async getReplacementListPagination(params: ReplacementPaginationRequest) {
            try {
                const results = await replacementApi.getReplacementListPagination(params)
                const validate = ReplacementPaginationResponseSchema.parse(results);

                this.replacement = validate.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: results.message ?? "Succesfully Retrived Data",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                return ApiResponseSchema.parse({ success: false, message });
            }
        },
    }
});