import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


const DJANGO_PORT = 8000; 
const API_PREFIX = '/api';
const WS_PREFIX = '/ws';

export default defineConfig({
    plugins: [react()],
    
    server: {
        proxy: {
            [API_PREFIX]: {
                target: `http://127.0.0.1:${DJANGO_PORT}`,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(API_PREFIX, API_PREFIX)
            },
            [WS_PREFIX]: {
                target: `ws://127.0.0.1:${DJANGO_PORT}`,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(API_PREFIX, API_PREFIX)
            }
        }
    }
});