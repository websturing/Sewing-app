

import api from '@/lib/api';
import { type LineAssignmentApi } from '@/modules/assignment-lines/schemas/AssignmentLines.api.schema';
import type { AssignmentLinesForm } from '@/modules/assignment-lines/schemas/AssignmentLines.form.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import type { Links, Meta } from '@/types/metaPagination';
import { type User } from '@module/user/schemas/user.schema';
import { defineStore } from 'pinia';




export const useAssignmentLinesStore = defineStore('assignmentLines', {
    state: () => ({
        data: [] as LineAssignmentApi[],
        searchResult: [] as LineAssignmentApi[],
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
        async fetch() {
            this.loading = true;
            this.error = null;

            try {
                const res = await api.get(`/api/assignment/lines`);
                const validatedData = res.data;
                // const validatedData = LineAssignmentResponseAPiSchema.parse(res.data);

                this.data = validatedData.data
                return ApiResponseSchema.parse({
                    success: true,
                    message: validatedData.message ?? "Assignment Lines loaded"
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
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

            const term = state.search.toLowerCase();
            return state.data
                .filter((item: LineAssignmentApi) =>
                    item.name?.toLowerCase().includes(term)
                )
        }
    }
});