import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@image': path.resolve(__dirname, './src/assets/img'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@module': path.resolve(__dirname, './src/modules'),
      '@summary': path.resolve(__dirname, './src/modules/summary'),
    }
  },
})