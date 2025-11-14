

import api from '@/lib/api';
import { glsApi } from '@/modules/gls/api/glsApi';
import { GlApiResponseSchema, summaryGlApiResponseSchema, type GlApi, type GlApiList, type GrandTotalGl, type SummaryByColor, type SummaryByGl, type SummaryGlMetadata } from '@/modules/gls/schemas/gls.api.schema';
import { matrixResponseSchema, type matrixGlSummary, type matrixItem } from "@/modules/gls/schemas/gls.matrix.schema";
import type { GLMatrixRequest } from '@/modules/gls/schemas/gls.request.schema';
import { GLCombineResponseSchema } from '@/modules/gls/schemas/glsCombine.api';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { defineStore } from 'pinia';

type queryParams = {
    page?: number
    q?: string
    perPage?: number,
    dateFrom?: string,
    dateTo?: string
}


export const useGlStore = defineStore('gls', {
    state: () => ({
        data: [] as GlApiList,
        searchResult: [] as GlApiList,
        isSearching: false,
        meta: {} as Meta,
        links: {} as Links,
        loading: false,
        error: null as string | null,
        currentPage: 1 as number,
        lastPage: 1 as number,
        search: "",
        summaryGl: [] as SummaryByGl[],
        summaryByColor: [] as SummaryByColor[],
        total: {} as GrandTotalGl,
        metaSummary: {} as SummaryGlMetadata,
        matrixData: [] as matrixItem[],
        matrixSummary: {} as matrixGlSummary,

    }),
    actions: {
        async fetch(query: queryParams = {}) {
            this.loading = true;
            this.error = null;
            try {

                const params: queryParams = {
                    page: query.page ?? 1,
                    perPage: query.perPage ?? 50,
                    q: query.q ?? undefined,
                    dateFrom: query.dateFrom,
                    dateTo: query.dateTo,
                }


                if (query.q) {
                    this.searchResult = [];
                    this.isSearching = true;
                }

                const res = await api.get(`/api/gls`, { params });
                const validatedData = GlApiResponseSchema.parse(res.data);
                this.meta = validatedData.meta;
                this.links = validatedData.links;
                this.currentPage = validatedData.meta.currentPage;
                this.lastPage = validatedData.meta.lastPage;

                if (query.q) {
                    this.searchResult = validatedData.data;
                } else {
                    this.data = validatedData.data;
                    this.isSearching = false;
                    this.searchResult = [];
                }

                return ApiResponseSchema.parse({
                    success: true,
                    message: validatedData.message ?? "Gl Numbers loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
        async fetchGLNumber(glNumber: string) {
            this.loading = true;
            this.error = null;
            try {

                const res = await api.get(`/api/gls/number/${glNumber}`);
                const validatedData = res.data;

                return ApiResponseSchema.parse({
                    success: true,
                    message: validatedData.message ?? "Gl Numbers loaded",
                    id: validatedData.data.id
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },

        async fetchSummaryGl(glNumber: string) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get(`/api/gls/cutting-summary`, { params: { glNumber } });
                const validatedData = summaryGlApiResponseSchema.parse(res.data)
                this.summaryGl = validatedData.data.summaryByGl
                this.summaryByColor = validatedData.data.summaryByColor
                this.metaSummary = validatedData.data.metadata
                this.total = validatedData.data.grandTotal

                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Gl Numbers loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },

        async fetchSyncCuttingGL(glNumber: string) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get(`/api/gls/syncCuttingGlNumber`, { params: { glNumber } });
                const validatedData = GLCombineResponseSchema.parse(res.data)
                console.log(validatedData);

                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Gl Numbers loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },

        async fetchGLMatix(payload: GLMatrixRequest) {
            this.loading = true;
            this.error = null;
            try {

                const results = await glsApi.getMatrix(payload)
                const validate = matrixResponseSchema.parse(results)
                this.matrixData = validate.data
                this.matrixSummary = validate.summary

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "Summary Chart loaded",
                    data: {
                        startDate: validate.startDate,  // ✅ ini bener
                        endDate: validate.endDate,      // ✅ tambah ini
                        glNo: validate.glNo,            // ✅ data lainnya
                        summary: validate.summary,      // ✅ data summary
                        chartData: validate.data        // ✅ data chart
                    }
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
        async fetchGLList(glNumber?: string) {
            this.loading = true;
            this.error = null;
            try {

                const results = await glsApi.getList(glNumber)

                return ApiResponseSchema.parse({
                    success: true,
                    message: results.message ?? "GL Number List",
                    data: results.data
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },

        async searchOrFetch(term: string) {
            // kalau keyword berubah → reset dulu
            if (this.search !== term) {
                this.searchResult = [];
                this.isSearching = false;
            }

            this.search = term;

            // kalau kosong → fallback load awal
            if (!term) {
                await this.fetch();
                return this.data;
            }

            // cek local result dulu (langsung filter cache utama)
            const localResult = this.data
                .filter((item: GlApi) =>
                    item.glNumber?.toLowerCase().includes(term)
                )

            if (localResult.length > 0) {
                this.searchResult = localResult;
                this.isSearching = true;
                return localResult;
            }

            // kalau ga ada di local → remote fetch
            const res = await this.fetch({
                page: 1,
                q: term
            });
            return res.success ? this.searchResult : [];
        },

    },
    getters: {
        searchedItems: (state) => {
            if (!state.search) {
                return state.data; // tidak ada search → pakai cache utama
            }

            // kalau sedang search dan punya hasil remote
            if (state.isSearching && state.searchResult.length) {
                return state.searchResult;
            }

            // fallback → cari di data lokal sesuai search term
            const term = state.search.toLowerCase();
            return state.data
                .filter((item: GlApi) =>
                    item.glNumber?.toLowerCase().includes(term)
                )
        },
        options(): Array<{ value: number; label: string }> {
            return this.searchedItems.map((e: any) => ({
                value: e.glNumber || '',
                label: e.glNumber || ''
            }));
        },

    }
});