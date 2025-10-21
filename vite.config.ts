import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_APP_BASE,
    plugins: [
      vue(),
      tailwindcss(),
      Components({
        resolvers: [
          (name) => {
            if (name === 'VChart') {
              return { importName: 'default', path: 'vue-echarts' }
            }
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@image': path.resolve(__dirname, './src/assets/img'),
        '@css': path.resolve(__dirname, './src/assets/css'),
        '@module': path.resolve(__dirname, './src/modules'),
        '@summary': path.resolve(__dirname, './src/modules/summary'),
      }
    }
  }
})
