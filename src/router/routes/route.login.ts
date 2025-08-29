import type { RouteRecordRaw } from 'vue-router'

export const loginRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        children: [
            {
                path: '',
                name: 'Login',
                component: () => import('@module/Login/views/LoginView.vue'),
                meta: {
                    requiresAuth: false,
                },
            }
        ]
    }
]
