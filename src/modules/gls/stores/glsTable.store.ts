

import api from '@/lib/api';
import { GlResponseSchema, type GLs } from '@/modules/gls/schemas/gls.api.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { defineStore } from 'pinia';

type queryParams = {
    page?: number
    search?: string
    perPage?: number,
}


export const useGlTableStore = defineStore('glsTable', {
    state: () => ({
        data: [] as GLs[],
        searchResult: [] as GLs[],
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
        async fetch(query: queryParams = {}) {
            this.loading = true;
            this.error = null;
            try {

                const params: queryParams = {
                    page: query.page ?? 1,
                    perPage: query.perPage ?? 50,
                    search: query.search ?? undefined,
                }


                if (query.search) {
                    this.searchResult = [];
                    this.isSearching = true;
                }

                const res = await api.get(`/api/gls`, { params });
                const validatedData = GlResponseSchema.parse(res.data);
                this.meta = validatedData.meta;
                this.links = validatedData.links;
                this.currentPage = validatedData.meta.currentPage;
                this.lastPage = validatedData.meta.lastPage;

                if (query.search) {
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
                .filter((item: GLs) =>
                    item.glNo?.toLowerCase().includes(term)
                )

            if (localResult.length > 0) {
                this.searchResult = localResult;
                this.isSearching = true;
                return localResult;
            }

            // kalau ga ada di local → remote fetch
            const res = await this.fetch({
                page: 1,
                search: term
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
                .filter((item: GLs) =>
                    item.glNo?.toLowerCase().includes(term)
                )
        },
        options(): Array<{ value: number; label: string }> {
            return this.searchedItems.map((e: any) => ({
                value: e.glNo || '',
                label: e.glNo || ''
            }));
        },

    }
});