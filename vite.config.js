// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths' // 1. Importe o plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths() // 2. Adicione o plugin aqui
  ],
})