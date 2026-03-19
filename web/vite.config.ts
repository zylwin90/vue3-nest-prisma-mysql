import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8888,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/\/api/, ''),
                configure: (proxy: any, options: any) => {
                    // 配置此项可在响应头中看到请求的真实地址
                    proxy.on('proxyRes', (proxyRes: any, req: any) => {
                        proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || '';
                    });
                },
            },
        },
    },
});
