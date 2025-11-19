import type { RouteRecordRaw } from 'vue-router'

export const defectRoutes: RouteRecordRaw[] = [
    {
        path: 'defect',
        name: 'defect',
        component: () => import('@/modules/defect/pages/DefectPageView.vue'),
    },
]
