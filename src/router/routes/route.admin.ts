import { transferRoutes } from '@/router/routes/route.transfer'
import type { RouteRecordRaw } from 'vue-router'
import { operationRoutes } from './route.operation'

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/AdminLayout.vue'),
        redirect: { name: 'dashboard' },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/test.vue'),
                meta: { permission: 'dashboard.read' },
            },
            {
                path: 'permission',
                name: 'permissions',
                component: () => import('@module/permission/views/PermissionView.vue'),
            },
            {
                path: 'role',
                name: 'role',
                component: () => import('@module/Role/components/RoleForm.vue'),
            },
            {
                path: 'activities',
                name: 'activities',
                component: () => import('@module/activities/views/ActivitiesView.vue'),
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@module/Profile/views/ProfileView.vue'),
            },
            {
                path: 'empolyee',
                name: 'employee',
                component: () => import('@module/employee/views/EmployeeView.vue'),
            },
            {
                path: 'empolyee/form',
                name: 'employee-form',
                component: () => import('@module/employee/views/EmployeeFormView.vue'),
            },
            {
                path: 'users',
                name: 'users',
                component: () => import('@module/user/views/UserView.vue'),
            },
            {
                path: 'users/form',
                name: 'users-form',
                component: () => import('@module/user/views/UserFormView.vue'),
            },
            ...operationRoutes,
            ...transferRoutes

        ]
    }
]
