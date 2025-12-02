import type { RouteRecordRaw } from 'vue-router'

export const replacementRoutes: RouteRecordRaw[] = [
    {
        path: 'replacement',
        name: 'replacement',
        component: () => import('@/modules/Replacement/pages/ReplacementPageView.vue'),
    },
    {
        path: 'replacement/form',
        name: 'replacement-form',
        component: () => import('@/modules/Replacement/pages/ReplacementPageFormView.vue'),
    },
    {
        path: 'replacement/approval',
        name: 'replacement-approval',
        component: () => import('@/modules/Replacement/pages/ReplacementApprovalPageView.vue'),
    },

]
