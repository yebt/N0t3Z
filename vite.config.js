import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    alias: {
        '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    }
})
