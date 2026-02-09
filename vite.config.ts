import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 5000
  },
  plugins: [
    react({ babel: { plugins: [['babel-plugin-react-compiler']] } }),
    tsconfigPaths()
  ]
})