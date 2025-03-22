import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// export default mergeConfig(
//   viteConfig,
//   defineConfig({
//     test: {
//       environment: 'jsdom',
//       exclude: [...configDefaults.exclude, 'e2e/**'],
//       root: fileURLToPath(new URL('./', import.meta.url)),
//     },
//   }),
// )

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`, // Если у вас есть глобальные стили
      },
    },
  },
})
