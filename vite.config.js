import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: '/Student-management-react-project/',
  build: {
    outDir: 'docs'
  }
})
