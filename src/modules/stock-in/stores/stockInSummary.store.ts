

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
                const validate = StockInSummaryLinesChartResponseSchema.parse(results);
                this.chartLines = validate.data
                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "Summary Chart loaded"
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
    getters: {
        linePerformance: (state) => {
            return state.chartLines
                .sort((a, b) => {
                    if (b.stockinCount.pcs !== a.stockinCount.pcs) {
                        return b.stockinCount.pcs - a.stockinCount.pcs;
                    }
                    return a.name.localeCompare(b.name);
                }).map((item) => ({
                    id: item.id,
                    name: item.name,
                    pcs: item.stockinCount.pcs,
                    location: item.location,
                    lastUpdated: item.stockinCount.updatedAt,
                }))
        },
        topThreeByPcsNonZero: (state) => {
            return state.chartLines
                .filter(item => item.stockinCount.pcs > 0)
                .sort((a, b) => {
                    if (b.stockinCount.pcs !== a.stockinCount.pcs) {
                        return b.stockinCount.pcs - a.stockinCount.pcs;
                    }
                    return a.name.localeCompare(b.name);
                })
                .slice(0, 3)
        },
        totalStockInPcs: (state) => {
            return state.chartLines.reduce((total, item) => {
                return total + item.stockinCount.pcs
            }, 0)
        },
        stockInTotal: (state) => {
            if (state.chartLines.length === 0) {
                return {
                    pcs: 0,
                    bundle: 0,
                    lastUpdated: null,
                }
            }

            // Hitung total
            const totals = state.chartLines.reduce((acc, item) => {
                return {
                    pcs: acc.pcs + item.stockinCount.pcs,
                    bundle: acc.bundle + item.stockinCount.bundle
                }
            }, { pcs: 0, bundle: 0 })

            // Fungsi untuk parse date format "Wednesday, 8 October 2025 08:11"
            const parseCustomDate = (dateString: any) => {
                try {
                    // Hilangkan hari dan koma, lalu parse
                    const dateWithoutDay = dateString.replace(/^[A-Za-z]+, /, '');
                    return new Date(dateWithoutDay);
                } catch (error) {
                    console.error('Error parsing date:', dateString, error);
                    return new Date(0); // Return tanggal minimal jika error
                }
            }

            // Cari last_updated terbaru
            const lastUpdated = state.chartLines.reduce((latest, item) => {
                const itemDate = parseCustomDate(item.stockinCount.updatedAtFull);
                const latestDate = parseCustomDate(latest);
                return itemDate > latestDate ? (item.stockinCount.updatedAtFull) : latest;
            }, state.chartLines[0].stockinCount.updatedAtFull);

            return {
                ...totals,
                lastUpdated: lastUpdated,
            }
        }
    }
});