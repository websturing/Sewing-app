import type { RouteRecordRaw } from 'vue-router'

export const operationRoutes: RouteRecordRaw[] = [
    {
        path: 'assignment-lines',
        name: 'assignment-lines',
        component: () => import('@module/assignment-lines/views/AssignmentLinesView.vue'),
    },
    {
        path: 'assignment-lines/form',
        name: 'assignment-lines-form',
        component: () => import('@module/assignment-lines/views/AssignmentLinesFormView.vue'),
    },
]
