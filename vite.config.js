// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  
  // Use a relative base so asset URLs work when deployed to a subpath
  // or when served from a custom domain. This avoids absolute 
  // "/assets/..." links which can 404 when the site is hosted
  // under a GitHub Pages project path (username.github.io/repo).
  base: './',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
})