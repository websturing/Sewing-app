import api from '@/lib/api';
import { handleApiError } from '@/types/errorTypes';
import { defineStore } from 'pinia';

export const useModuleStore = defineStore('module', {
    state: () => ({
        data: [] as any[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchModule() {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get('/api/module')
                this.data = res.data.data
                this.error = null
            } catch (error) {
                this.data = []
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async fetchModuleWithPermissions() {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get('/api/module/withpermissions')
                this.data = res.data.data
                this.error = null
            } catch (error) {
                this.data = []
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
        async createModule(moduleData: any) {
            this.loading = true
            this.error = null
            try {
                const res = await api.post('/api/module', moduleData)
                await this.fetchModule()
                return res.data.message
            } catch (error: any) {
                const message =
                    error?.response?.data?.message || "Terjadi kesalahan"
                this.error = message
                throw message // lempar string biar gampang ditangani di UI
            } finally {
                this.loading = false
            }
        },
        async updateModule(id: number, moduleData: any) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.post(`/api/module/${id}`, moduleData)
                this.fetchModule()
                this.error = null
                return res.data.message
            } catch (error) {
                console.log(error)
                this.error = handleApiError(error)
                return error
            } finally {
                this.loading = false
            }
        },
        async deleteModule(id: number) {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.delete(`/api/module/${id}`)
                this.fetchModule()
                this.error = null
                return res.data.message
            } catch (error) {
                this.error = handleApiError(error)
                throw error
            } finally {
                this.loading = false
            }
        },
    }

});