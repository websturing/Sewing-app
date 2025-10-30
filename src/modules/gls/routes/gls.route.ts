import type { RouteRecordRaw } from 'vue-router'

export const glsRoutes: RouteRecordRaw[] = [
    {
        path: 'gls',
        name: 'gls',
        component: () => import('@/modules/gls/views/GlsPageView.vue'),
    },
    {
        path: 'gls/detail/:id',
        name: 'gls-detail',
        component: () => import('@/modules/gls/views/GlsDetailPageView.vue'),
    },
]
