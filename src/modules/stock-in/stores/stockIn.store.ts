

import api from '@/lib/api';
import type { AssignmentLinesForm } from '@/modules/assignment-lines/schemas/AssignmentLines.form.schema';
import { stockInApiResponseSchema, type StockInApi } from '@/modules/stock-in/schemas/stockin.api.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { type User } from '@module/user/schemas/user.schema';
import { defineStore } from 'pinia';

type QuerySchema = {
    page?: number
    q?: string
    perPage?: number,
    dateFrom?: string,
    dateTo?: string
}


export const useStockin = defineStore('stockIn', {
    state: () => ({
        data: [] as StockInApi[],
        searchResult: [] as StockInApi[],
        isSearching: false,
        meta: {} as Meta,
        links: {} as Links,
        loading: false,
        error: null as string | null,
        currentPage: 1 as number,
        lastPage: 1 as number,
        search: "",
    }),
    actions: {
        async fetch(query: QuerySchema = {}) {
            this.loading = true;
            this.error = null;

            try {

                const params: QuerySchema = {
                    page: query.page ?? 1,
                    perPage: query.perPage ?? 10,
                    q: query.q ?? undefined,
                    dateFrom: query.dateFrom,
                    dateTo: query.dateTo,
                }


                if (query.q) {
                    this.searchResult = [];
                    this.isSearching = true;
                }

                const res = await api.get(`/api/stock-ins`, { params });
                const validatedData = stockInApiResponseSchema.parse(res.data);

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
                    message: validatedData.message ?? "Stock In loaded"
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
                .filter((item: StockInApi) =>
                    item.glNo?.toLowerCase().includes(term) ||
                    item.serialNumber?.toLowerCase().includes(term) ||
                    item.color?.toLowerCase().includes(term)
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

        async create(moduleData: AssignmentLinesForm) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post('/api/assignment/line', moduleData)
                this.error = null
                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Data Created Succesfully",
                });
            } catch (error: any) {
                const message =
                    error?.response?.data?.message || "Someting Wrong"
                this.error = message
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false
            }
        },
        async update(id: number, moduleData: User) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post(`/api/users/${id}`, moduleData)

                const index = this.data.findIndex(e => e.id === id)
                if (index !== -1) {
                    // Pinia automatically handles reactivity
                    this.data[index] = { ...this.data[index], ...res.data.data }
                }

                this.error = null
                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Data Update Successfully"
                });
            } catch (error: any) {
                const message =
                    error?.response?.data?.message || "Something Wrong"
                this.error = message
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false
            }
        },
        async delete(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.delete(`/api/users/${id}`)

                this.data = this.data.filter(module => module.id !== id)
                this.error = null
                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Data Delete Successfully"
                });
            } catch (error: any) {
                const message =
                    error?.response?.data?.message || "Something Wrong"
                this.error = message
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false
            }
        },

    },
    getters: {
        searchedItems: (state) => {
            if (!state.search) {
                return state.data; // tidak ada search → pakai cache utama
            }

            if (state.isSearching && state.searchResult.length) {
                return state.searchResult;
            }

            // fallback → cari di data lokal sesuai search term
            const term = state.search.toLowerCase();
            return state.data
                .filter((item: StockInApi) =>
                    item.glNo?.toLowerCase().includes(term) ||
                    item.serialNumber?.toLowerCase().includes(term) ||
                    item.color?.toLowerCase().includes(term)
                )
        }
    }
});