import { replacementApi } from '@/modules/Replacement/api/ReplacementApi';
import { ReplacementHistoriesWorkflowResponseSchema, ReplacementPaginationResponseSchema, type ReplacementItem } from '@/modules/Replacement/schemas/replacement.api.schema';
import { type ReplacementPaginationRequest } from '@/modules/Replacement/schemas/replacement.request.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { defineStore } from 'pinia';

export const useReplacementStore = defineStore('replacementStore', {
    state: () => ({
        replacementList: [] as ReplacementItem[],
        remoteSearchResult: [] as ReplacementItem[] | null,
        meta: {} as Meta,
        links: {} as Links
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
                this.replacementList = []
                return ApiResponseSchema.parse({ success: false, message });
            }
        },
        async fetchReplacementApprovalPagination(params: ReplacementPaginationRequest) {
            try {
                const results = await replacementApi.getReplacementApprovalPagination(params)
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
                this.replacementList = []
                return ApiResponseSchema.parse({ success: false, message });
            }
        },
        async fetchHistoriesByReplacementId(id: number) {
            try {
                const results = await replacementApi.getHistoriesByReplacementId(id)
                const validate = ReplacementHistoriesWorkflowResponseSchema.parse(results);

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "Retrived Histories Replacement Successfully",
                    data: validate.data
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                return ApiResponseSchema.parse({ success: false, message });
            }
        },
        clearRemoteSearchResult() {
            this.remoteSearchResult = null
        }
    }
});