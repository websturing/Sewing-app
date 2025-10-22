

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
            loading: false,
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
            this.groupByGlNumber.loading = true;
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
                this.groupByGlNumber.links = validate.links;
                this.groupByGlNumber.meta = validate.meta;
                this.groupByGlNumber.currentPage = validate.meta.currentPage;
                this.groupByGlNumber.lastPage = validate.meta.lastPage;

                if (query.search) {
                    this.groupByGlNumber.searchResult = validate.data;
                } else {
                    this.groupByGlNumber.data = validate.data;
                    this.groupByGlNumber.isSearching = false;
                    this.groupByGlNumber.searchResult = [];
                }

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "Summary Group By Gl Number loaded"
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.groupByGlNumber.loading = false;
            }
        },
        async searchOrFetch(term: string) {
            // kalau keyword berubah → reset dulu
            if (this.groupByGlNumber.search !== term) {
                this.groupByGlNumber.searchResult = [];
                this.groupByGlNumber.isSearching = false;
            }

            this.groupByGlNumber.search = term;

            // kalau kosong → fallback load awal
            if (!term) {
                await this.fetchGroupByGlNumber();
                return this.groupByGlNumber.data;
            }

            // cek local result dulu (langsung filter cache utama)
            const localResult = this.groupByGlNumber.data
                .filter((item: StockInSummaryGroupByGlNumber) =>
                    item.glNo?.toLowerCase().includes(term) ||
                    item.lineNames?.toLowerCase().includes(term)
                )

            if (localResult.length > 0) {
                this.groupByGlNumber.searchResult = localResult;
                this.groupByGlNumber.isSearching = true;
                return localResult;
            }

            // kalau ga ada di local → remote fetch
            const res = await this.fetchGroupByGlNumber({
                page: 1,
                search: term
            });
            return res.success ? this.groupByGlNumber.searchResult : [];
        },

    },
    getters: {
        linePerformance: (state) => {
            return state.chartLines
                .sort((a: any, b: any) => {
                    if (b.stockinCount.pcs !== a.stockinCount.pcs) {
                        return b.stockinCount.pcs - a.stockinCount.pcs;
                    }
                    return a.name.localeCompare(b.name);
                }).map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    pcs: item.stockinCount.pcs,
                    location: item.location,
                    lastUpdated: item.stockinCount.updatedAt,
                }))
        },
        topThreeByPcsNonZero: (state) => {
            return state.chartLines
                .filter((item: any) => item.stockinCount.pcs > 0)
                .sort((a: any, b: any) => {
                    if (b.stockinCount.pcs !== a.stockinCount.pcs) {
                        return b.stockinCount.pcs - a.stockinCount.pcs;
                    }
                    return a.name.localeCompare(b.name);
                })
                .slice(0, 3)
        },
        totalStockInPcs: (state) => {
            return state.chartLines.reduce((total: any, item: any) => {
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

            const totals = state.chartLines.reduce((acc: any, item: any) => ({
                pcs: acc.pcs + item.stockinCount.pcs,
                bundle: acc.bundle + item.stockinCount.bundle
            }), { pcs: 0, bundle: 0 });

            // Dapatkan semua updatedAtFull yang valid
            const validDates = state.chartLines
                .map((item: any) => item.stockinCount.updatedAtFull)
                .filter((dateStr: any) => dateStr !== null && dateStr !== undefined);

            // Cari yang terbaru
            let lastUpdated = null;
            if (validDates.length > 0) {
                lastUpdated = validDates.reduce((latest: any, current: any) => {
                    const latestDate = new Date(latest.replace(/^[A-Za-z]+, /, ''));
                    const currentDate = new Date(current.replace(/^[A-Za-z]+, /, ''));
                    return currentDate > latestDate ? current : latest;
                });
            }

            return {
                ...totals,
                lastUpdated,
            }
        },
        searchedGroupGlNumberItems: (state) => {
            if (!state.groupByGlNumber.search) {
                return state.groupByGlNumber.data; // tidak ada search → pakai cache utama
            }

            // kalau sedang search dan punya hasil remote
            if (state.groupByGlNumber.isSearching && state.groupByGlNumber.searchResult.length) {
                return state.groupByGlNumber.searchResult;
            }

            // fallback → cari di data lokal sesuai search term
            const term = state.groupByGlNumber.search.toLowerCase();
            return state.groupByGlNumber.data
                .filter((item: StockInSummaryGroupByGlNumber) =>
                    item.glNo?.toLowerCase().includes(term) ||
                    item.lineNames?.toLowerCase().includes(term)
                )
        }
    }
});