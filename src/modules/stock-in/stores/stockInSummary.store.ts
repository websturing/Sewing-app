

import { stockInApi } from '@/modules/stock-in/api/stockInApi';
import { StockInSummaryLinesChartResponseSchema, type StockInSummaryLinesChart } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import { defineStore } from 'pinia';


export const useStockInSummary = defineStore('stockInSummary', {
    state: () => ({
        chartLines: [] as StockInSummaryLinesChart[],
        loading: false,
        error: null as string | null,
        search: "",
    }),
    actions: {
        async fetchChartLines(payload = {}) {
            this.loading = true;
            this.error = null;

            try {

                const results = await stockInApi.getChartLines(payload)
                const validate = StockInSummaryLinesChartResponseSchema.parse(results.data);
                this.chartLines = validate.data
                return results
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