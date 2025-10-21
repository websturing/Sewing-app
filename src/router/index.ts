import api from '@/lib/api'


import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

import { adminRoutes } from './routes/route.admin'
import { errorRoutes } from './routes/route.error'
import { loginRoutes } from './routes/route.login'

// Gabungkan semua
const routes = [
  ...loginRoutes,
  ...adminRoutes,
  ...errorRoutes
]


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
  routes,
})

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