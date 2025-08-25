import api from '@/lib/api'


import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
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
  },
  {
    path: '/',
    component: () => import('@/views/AdminLayout.vue'),
    redirect: {
      name: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/test.vue'),
        meta: { permission: 'dashboard.read' },
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@module/permission/views/PermissionView.vue'),
        // meta: { permission: 'dashboard.read' },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@module/Role/components/RoleForm.vue'),
        // meta: { permission: 'dashboard.read' },
      },
       {
        path: 'activities',
        name: 'activities',
        component: () => import('@module/activities/views/ActivitiesView.vue'),
        // meta: { permission: 'dashboard.read' },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@module/Profile/views/ProfileView.vue'),
        // meta: { permission: 'dashboard.read' },
      },

    ]
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/views/UnauthorizedView.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/404.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404', // atau ke halaman 404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
  return null
}

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  const publicRoutes = ['/login']
  if (publicRoutes.includes(to.path)) return true

  const token = localStorage.getItem('access_token')
  if (!token) {
    console.warn('🔒 Token not found, redirecting to login')
    return '/login'
  }

  // Inject token ke axios kalau belum ada
  if (!api.defaults.headers.common['Authorization']) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Jika belum ada user di store, fetch user
  if (!auth.user) {
    try {
      console.log('🔄 Fetching user...')
      await auth.fetchUser()
    } catch (error) {
      console.error('❌ Failed to fetch user:', error)
      localStorage.removeItem('access_token')
      return '/login'
    }
  }

  // Cek permission jika route butuh
  const requiredPermission = to.meta.permission
  if (requiredPermission && !auth.hasPermission(requiredPermission)) {
    console.warn('🚫 No permission:', requiredPermission)
    return '/unauthorized'
  }

  return true
})



export default router