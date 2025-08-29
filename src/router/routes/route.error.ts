import type { RouteRecordRaw } from 'vue-router'

export const errorRoutes: RouteRecordRaw[] = [
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import('@/views/UnauthorizedView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/404',
        name: 'not-found',
        component: () => import('@/views/404.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    }
]
