import { replacementApi } from '@/modules/Replacement/api/ReplacementApi';
import { ReplacementPaginationResponseSchema, type ReplacementItem } from '@/modules/Replacement/schemas/replacement.api.schema';
import { type ReplacementPaginationRequest } from '@/modules/Replacement/schemas/replacement.request.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import { defineStore } from 'pinia';

export const useReplacementStore = defineStore('replacementStore', {
    state: () => ({
        workflow: [] as ReplacementItem[],
    }),
    actions: {
        async fetchReplacementListPagination(params: ReplacementPaginationRequest) {
            try {
                const results = await replacementApi.getReplacementListPagination(params)
                const validate = ReplacementPaginationResponseSchema.parse(results);

                if (params?.search) {
                    this.remoteSearchResult = validate.data
                } else {
                    this.replacementList = validate.data
                    this.meta = validate.meta
                    this.links = validate.links
                    this.remoteSearchResult = null
                }

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