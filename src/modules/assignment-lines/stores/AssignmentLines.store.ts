

import api from '@/lib/api';
import type { AssignmentLinesApi } from '@/modules/assignment-lines/schemas/AssignmentLines.api.schema';
import type { AssignmentLinesForm } from '@/modules/assignment-lines/schemas/AssignmentLines.form.schema';
import type { UsersAPI } from '@/modules/user/schemas/user.api';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { type User } from '@module/user/schemas/user.schema';
import { defineStore } from 'pinia';

type query = {
    page?: number
    q?: string
    perPage?: number,
    dateFrom?: string,
    dateTo?: string
}


export const useAssignmentLinesStore = defineStore('assignmentLines', {
    state: () => ({
        data: [] as AssignmentLinesApi[],
        searchResult: [] as UsersAPI,
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
        async create(moduleData: AssignmentLinesForm) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post('/api/assignment/line', moduleData)
                this.data.push(res.data.data)
                this.error = null
                return ApiResponseSchema.parse({
                    success: true,
                    message: res.data.message ?? "Data Created Succesfully",
                    id: res.data.data.id
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

            // kalau sedang search dan punya hasil remote
            if (state.isSearching && state.searchResult.length) {
                return state.searchResult;
            }

            // fallback → cari di data lokal sesuai search term
            const term = state.search.toLowerCase();
            return state.data
                .filter((item: AssignmentLinesApi) =>
                    item.glNumber?.toLowerCase().includes(term)
                )
        }
    }
});