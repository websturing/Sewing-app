import type { RouteRecordRaw } from 'vue-router'

export const lineRoutes: RouteRecordRaw[] = [
    {
        path: 'lines',
        name: 'lines',
        component: () => import('@/modules/lines/views/LinesPageView.vue'),
    },
    {
        path: 'lines/detail/:id',
        name: 'lines-detail',
        component: () => import('@/modules/lines/views/LinesDetailPageView.vue'),
    },
]
