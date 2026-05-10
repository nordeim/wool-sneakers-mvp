import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@routes': '/src/routes',
      '@stores': '/src/stores',
      '@shared': '/src/components/shared'
    }
  },
  build: {
    // CRITICAL: Must be a function for Vite 8 / Rolldown
    manualChunks: (id: string) => {
      if (id.includes('react')) return 'react-vendor'
      if (id.includes('tanstack')) return 'router-vendor'
      if (id.includes('lucide')) return 'lucide'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  }
})
