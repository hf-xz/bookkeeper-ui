import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      // 需要自动引入的库，可以去官方查看支持哪些
      imports: [
        'react',
        {
          'react-hot-toast': ['toast', 'Toaster']
        },
        {
          'react-hook-form': ['useForm']
        },
        {
          from: 'react-hook-form',
          imports: ['SubmitHandler'],
          type: true
        }
      ],
      // 生成 auto-imports.d.ts 文件，后面配置 TS 用
      dts: true,
      // 自动引入文件夹内容
      dirs: ['src/utils', 'src/services']
    })
  ],
  server: {
    port: 3000,
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  esbuild: {
    pure: ['console.log'],
    drop: ['debugger']
  },
  envDir: 'config'
})
