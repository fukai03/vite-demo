import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({command}: ConfigEnv): UserConfigExport => {
  const prodMock = true
  return {

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src/assets')
    },
    extensions: ['.ts','.tsx', '.json']
  },
  server:{
    port: 3333,// 开发端口
    host: true,
    proxy: {
            // 字符串简写写法 http://localhost:5173/foo -> http://localhost:4567/foo
            '/foo': 'http://localhost:4567',
            // 选项写法 http://localhost:5173/api1/bar -> http://jsonplaceholder.typicode.com/bar
            '/api1': {
              target: 'http://jsonplaceholder.typicode.com',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            },
            // 正则表达式写法 http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
            '^/fallback/.*': {
              target: 'http://jsonplaceholder.typicode.com',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/fallback/, '')
            },
            // 使用 proxy 实例
            '/api2': {
              target: 'http://jsonplaceholder.typicode.com',
              changeOrigin: true,
              configure: (proxy, options) => {
                // proxy 是 'http-proxy' 的实例
              }
            },
            // 代理 websockets 或 socket.io写法 ws://localhost:5173/socket.io -> ws://localhost:3000/socket.io
            '/socket.io': {
              target: 'ws://localhost:3000',
              ws: true
            }
          }
  },
  build: {
    outDir: 'build',
    assetsDir: 'assetsDir',
    assetsInlineLimit: 2048, // 小于此阈值的导入或引用资源将内联为 base64 编码
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  plugins: [
    react(),
    viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
    })
  ],
}}