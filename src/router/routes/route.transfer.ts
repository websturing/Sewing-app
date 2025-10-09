import type { RouteRecordRaw } from 'vue-router'

export const transferRoutes: RouteRecordRaw[] = [
    {
        path: 'stock-ins',
        name: 'stock-ins',
        component: () => import('@/modules/stock-in/views/StockInPageView.vue'),
    },
]
