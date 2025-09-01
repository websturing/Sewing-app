import api from '@/lib/api';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { EmployeeResponseLastCodeSchema, EmployeeResponseSchema, type Employee, type EmployeeQuery, type Employees } from '@module/employee/schemas/employeeSchema';
import { defineStore } from 'pinia';

export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        data: [] as Employees,
        searchResult: [] as Employees,
        isSearching: false,
        meta: {} as Meta,
        links: {} as Links,
        loading: false,
        error: null as string | null,
        currentPage: 1 as number,
        lastPage: 1 as number,
        search: "",
        employeeLastCode: "" as string
    }),
    actions: {
        async fetchEmployee(query: EmployeeQuery = {}) {
            this.loading = true;
            this.error = null;

            try {

                const params: EmployeeQuery = {
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

                const res = await api.get(`/api/employee`, { params });
                const validatedData = EmployeeResponseSchema.parse(res.data);

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
                    message: validatedData.message ?? "Employees loaded"
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
                await this.fetchEmployee();
                return this.data;
            }

            // cek local result dulu (langsung filter cache utama)
            const localResult = this.data
                .filter((item: Employee) =>
                    item.employeeCode?.toLowerCase().includes(term) ||
                    item.department?.toLowerCase().includes(term) ||
                    item.position?.toLowerCase().includes(term)
                )

            if (localResult.length > 0) {
                this.searchResult = localResult;
                this.isSearching = true;
                return localResult;
            }

            // kalau ga ada di local → remote fetch
            const res = await this.fetchEmployee({
                page: 1,
                q: term
            });
            return res.success ? this.searchResult : [];
        },

        async fetchEmployeeLastCode() {
            this.loading = true;
            this.error = null;

            try {

                const res = await api.get(`/api/employee/code`);
                const validatedData = EmployeeResponseLastCodeSchema.parse(res.data);

                this.employeeLastCode = validatedData.data;

                return ApiResponseSchema.parse({
                    success: true,
                    message: validatedData.message ?? "Employees loaded"
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
        async createEmployee(moduleData: Employee) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post('/api/employee', moduleData)
                this.data.push(res.data.data)
                this.error = null
                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Employees loaded"
                });
            } catch (error: any) {
                const message =
                    error?.response?.data?.message || "Terjadi kesalahan"
                this.error = message
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false
            }
        },
        async deleteEmployee(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.delete(`/api/employee/${id}`)

                this.data = this.data.filter(module => module.id !== id)
                this.error = null
                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Employees loaded"
                });
            } catch (error: any) {
                const message =
                    error?.response?.data?.message || "Terjadi kesalahan"
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

            // kalau sedang search dan punya hasil remote
            if (state.isSearching && state.searchResult.length) {
                return state.searchResult;
            }

            // fallback → cari di data lokal sesuai search term
            const term = state.search.toLowerCase();
            return state.data
                .filter((item: Employee) =>
                    item.employeeCode?.toLowerCase().includes(term) ||
                    item.department?.toLowerCase().includes(term) ||
                    item.position?.toLowerCase().includes(term)
                )
        }
    }
});