import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// Le code source est dans app/. La version compilée sort dans dist/,
// puis "npm run publish" la recopie à la racine du dépôt (site prêt à servir).
export default defineConfig({
  root: 'app',
  plugins: [react()],
  base: './',
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
    assetsDir: 'assets',
  },
})
