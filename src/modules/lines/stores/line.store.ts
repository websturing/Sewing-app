

import { linesApi } from '@/modules/lines/api/linesApi';
import { LineApiResponseSchema, LineDetailApiResponseSchema, LineDevicesApiResponseSchema, LineHistoryGLNumberApiResponseSchema, type LineApi, type LineDetail, type LineDeviceApi, type LineHistoryGLNumberApi, type LineStockInSummary } from '@/modules/lines/schemas/line.api.schema';
import type { LineFilterRequest } from '@/modules/lines/schemas/line.request.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { defineStore } from 'pinia';



export const useLineStore = defineStore('lines', {
    state: () => ({
        data: [] as LineApi[],
        lineDevices: [] as LineDeviceApi[],
        lineHistoryGLNumber: [] as LineHistoryGLNumberApi[],
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
        async fetchLineDevices(lineId: string | number) {
            this.loading = true;
            this.error = null;
            try {
                const data = await linesApi.getLineDevices(lineId)
                const results = LineDevicesApiResponseSchema.parse(data);
                this.lineDevices = results.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: results.message ?? "Lines loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
        async fetchHistoryGLNumber(lineId: string | number) {
            this.loading = true;
            this.error = null;
            try {
                const data = await linesApi.getHistoryGLNumber(lineId)
                const results = LineHistoryGLNumberApiResponseSchema.parse(data);
                this.lineHistoryGLNumber = results.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: results.message ?? "Lines loaded",
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