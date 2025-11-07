

import { linesApi } from '@/modules/lines/api/linesApi';
import { LineApiResponseSchema, LineDetailApiResponseSchema, type LineApi, type LineDetail, type LineStockInSummary } from '@/modules/lines/schemas/line.api.schema';
import type { LineFilterRequest } from '@/modules/lines/schemas/line.request.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { defineStore } from 'pinia';



export const useLineStore = defineStore('lines', {
    state: () => ({
        data: [] as LineApi[],
        meta: {} as Meta,
        links: {} as Links,
        loading: false,
        error: null as string | null,
        line: {} as LineDetail,
        lineStockInSummary: [] as LineStockInSummary[]
    }),
    actions: {
        async fetchLines(payload: LineFilterRequest) {
            this.loading = true;
            this.error = null;
            try {

                const results = await linesApi.getlines(payload)
                const validate = LineApiResponseSchema.parse(results);

                this.data = validate.data
                this.meta = validate.meta
                this.links = validate.links

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "Lines loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
        async fetchLineById(payload: LineFilterRequest) {
            this.loading = true;
            this.error = null;
            try {
                const results = await linesApi.getlineById(payload)
                const validate = LineDetailApiResponseSchema.parse(results);
                this.line = validate.data.line
                this.lineStockInSummary = validate.data.stockinSummary

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "Lines loaded",
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