import type { RouteRecordRaw } from 'vue-router'

export const replacementRoutes: RouteRecordRaw[] = [
    {
        path: 'replacement',
        name: 'replacement',
        component: () => import('@/modules/Replacement/pages/ReplacementPageView.vue'),
    },
]
