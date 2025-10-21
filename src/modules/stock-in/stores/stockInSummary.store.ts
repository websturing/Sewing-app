

import { stockInApi } from '@/modules/stock-in/api/stockInApi';
import { StockInSummaryGroupByGlNumberResponseSchema, StockInSummaryLinesChartResponseSchema, type GroupByGlNumberQuery, type StockInSummaryGroupByGlNumber, type StockInSummaryLinesChart } from '@/modules/stock-in/schemas/stockInSummary.api.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { defineStore } from 'pinia';


export const useStockInSummaryStore = defineStore('stockInSummary', {
    state: () => ({
        chartLines: [] as StockInSummaryLinesChart[],
        loading: false,
        error: null as string | null,
        search: "",
        groupByGlNumber: {
            searchResult: [] as StockInSummaryGroupByGlNumber[],
            isSearching: false,
            data: [] as StockInSummaryGroupByGlNumber[],
            meta: {} as Meta,
            search: "",
            links: {} as Links,
            currentPage: 1 as number,
            lastPage: 1 as number,
        },

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
        async fetchGroupByGlNumber(query: GroupByGlNumberQuery = {}) {
            this.loading = true;
            this.error = null;
            try {

                console.log("Query Params:", query);

                /** for searching */
                const params: GroupByGlNumberQuery = {
                    page: query.page ?? 1,
                    perPage: query.perPage ?? 10,
                    search: query.search ?? undefined,
                }


                if (query.search) {
                    this.groupByGlNumber.searchResult = [];
                    this.groupByGlNumber.isSearching = true;
                }

                const results = await stockInApi.getGroupByGlNumber(params)
                const validate = StockInSummaryGroupByGlNumberResponseSchema.parse(results);
                this.groupByGlNumber.data = validate.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "Summary Group By Gl Number loaded"
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        }

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

            const totals = state.chartLines.reduce((acc, item) => ({
                pcs: acc.pcs + item.stockinCount.pcs,
                bundle: acc.bundle + item.stockinCount.bundle
            }), { pcs: 0, bundle: 0 });

            // Dapatkan semua updatedAtFull yang valid
            const validDates = state.chartLines
                .map(item => item.stockinCount.updatedAtFull)
                .filter(dateStr => dateStr !== null && dateStr !== undefined);

            // Cari yang terbaru
            let lastUpdated = null;
            if (validDates.length > 0) {
                lastUpdated = validDates.reduce((latest, current) => {
                    const latestDate = new Date(latest.replace(/^[A-Za-z]+, /, ''));
                    const currentDate = new Date(current.replace(/^[A-Za-z]+, /, ''));
                    return currentDate > latestDate ? current : latest;
                });
            }

            return {
                ...totals,
                lastUpdated,
            }
        }
    }
});