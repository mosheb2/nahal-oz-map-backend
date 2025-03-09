import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import the 'path' module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../public/dist/bo-client'), // Change 'your-desired-folder'
    emptyOutDir: true, // Optional: Clear the output directory before build
  },
})
