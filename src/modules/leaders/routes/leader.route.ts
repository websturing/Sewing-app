import type { RouteRecordRaw } from 'vue-router'

export const leaderRoutes: RouteRecordRaw[] = [
    {
        path: 'leaders',
        name: 'leaders',
        component: () => import('@/modules/leaders/pages/LeadersPageView.vue'),
    },
]
