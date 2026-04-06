import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ]
})