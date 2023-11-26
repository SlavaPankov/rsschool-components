/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.ts',
    coverage: {
      all: true,
      include: ["src/components/**/*.tsx", 'src/pages/**/*.tsx'],
      exclude: ["src/pages/**/_*.tsx"],
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, "./src")
      }
    ]
  }
})
