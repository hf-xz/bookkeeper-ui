import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      // 需要自动引入的库，可以去官方查看支持哪些
      imports: ['react'],
      // 生成 auto-imports.d.ts 文件，后面配置 TS 用
      dts: true
    })
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
