import type { RouteRecordRaw } from 'vue-router'

export const loginRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        children: [
            {
                path: '',
                name: 'Login',
                component: () => import('@/modules/login/views/LoginView.vue'),
                meta: {
                    requiresAuth: false,
                },
            }
        ]
    }
]
