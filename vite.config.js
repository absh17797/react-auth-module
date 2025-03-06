import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8085,  // Set the desired port here
    open: true,   // Optional: Opens the browser when the server starts
  }
})
