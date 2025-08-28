import api from '@/lib/api';
import { ActivitiesResponseSchema, type Activities } from '@/modules/activities/schemas/activities.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { defineStore } from 'pinia';

export const useActivitiesStore = defineStore('activities', {
    state: () => ({
        data: [] as Activities,          // cache utama (pagination normal)
        searchResult: [] as Activities,  // hasil search dari API
        isSearching: false,              // flag sedang search
        meta: {} as Meta,
        links: {} as Links,
        loading: false,
        error: null as string | null,
        currentPage: 1 as number,
        lastPage: 1 as number,
        search: "",
        isFirstLoad: true,
    }),
    actions: {
        async fetchActivities(page = 1, name?: string, dateFrom?: string, dateTo?: string, year?: number) {
            this.loading = true;
            this.error = null;

            try {
                // 🚨 kalau ada search param → reset dulu sebelum request
                if (name) {
                    this.searchResult = [];
                    this.isSearching = true;
                }

                const res = await api.get(`/api/activities`, {
                    params: { page, name, dateFrom, dateTo, year }
                });
                const validatedData = ActivitiesResponseSchema.parse(res.data);

                this.meta = validatedData.meta;
                this.links = validatedData.links;
                this.currentPage = validatedData.meta.currentPage;
                this.lastPage = validatedData.meta.lastPage;

                if (name) {
                    this.searchResult = validatedData.data;
                } else {
                    if (page === 1) {
                        this.data = validatedData.data;
                    } else {
                        validatedData.data.forEach((newGroup) => {
                            const existingGroupIndex = this.data.findIndex(d => d.date === newGroup.date);
                            if (existingGroupIndex !== -1) {
                                const existingGroup = this.data[existingGroupIndex];
                                this.data[existingGroupIndex] = {
                                    ...existingGroup,
                                    items: [...existingGroup.items, ...newGroup.items],
                                    total: existingGroup.total + newGroup.total
                                };
                            } else {
                                this.data.push(newGroup);
                            }
                        });
                    }
                    this.isSearching = false;
                    this.searchResult = [];
                }

                return ApiResponseSchema.parse({
                    success: true,
                    message: validatedData.message ?? "Activities loaded"
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
                this.isFirstLoad = false;
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
                await this.fetchActivities(1);
                return this.data;
            }

            // cek local result dulu (langsung filter cache utama)
            const localResult = this.data
                .map(group => ({
                    ...group,
                    items: group.items.filter(item =>
                        item.description?.toLowerCase().includes(term.toLowerCase()) ||
                        item.logName?.toLowerCase().includes(term.toLowerCase())
                    )
                }))
                .filter(group => group.items.length > 0);

            if (localResult.length > 0) {
                this.searchResult = localResult;
                this.isSearching = true;
                return localResult;
            }

            // kalau ga ada di local → remote fetch
            const res = await this.fetchActivities(1, term);
            return res.success ? this.searchResult : [];
        },
        async loadNextPage() { if (this.currentPage < this.lastPage) { return await this.fetchActivities(this.currentPage + 1); } return ApiResponseSchema.parse({ success: false, message: "Request is already in progress" }) }
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
                .map(group => ({
                    ...group,
                    items: group.items.filter(item =>
                        item.description?.toLowerCase().includes(term) ||
                        item.logName?.toLowerCase().includes(term)
                    )
                }))
                .filter(group => group.items.length > 0);
        }
    }

});
