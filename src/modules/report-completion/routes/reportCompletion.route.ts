import type { RouteRecordRaw } from 'vue-router'

export const reportCompletion: RouteRecordRaw[] = [
    {
        path: 'report-completions',
        name: 'report-completions',
        component: () => import('@/modules/report-completion/views/ReportCompletionPageView.vue'),
    },
]
