import api from '@/lib/api'
import type { GLs } from '@/modules/gls/schemas/gls.api.schema'
import { GlResponseSchema } from '@/modules/gls/schemas/gls.api.schema'
import type { Links, Meta } from '@/types/metaPagination'
import { defineStore } from 'pinia'

type QueryParams = {
    page?: number
    search?: string
    perPage?: number
}

export const useGlTableStore = defineStore('glsTable', {
    state: () => ({
        data: [] as GLs[],
        meta: {} as Meta,
        links: {} as Links,
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetch(query: QueryParams = {}) {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/gls', {
                    params: {
                        page: query.page ?? 1,
                        perPage: query.perPage ?? 50,
                        search: query.search ?? undefined,
                    },
                })
                const validated = GlResponseSchema.parse(res.data)
                this.data = validated.data
                this.meta = validated.meta
                this.links = validated.links
                return { success: true, message: validated.message ?? 'GLs loaded' }
            } catch (error: any) {
                const message = error?.response?.data?.message || 'Fetch failed'
                this.error = message
                return { success: false, message }
            } finally {
                this.loading = false
            }
        },
    },
    getters: {
        options: (state) =>
            state.data.map((e) => ({
                value: e.glNo,
                label: e.glNo,
            })),
    },
})
