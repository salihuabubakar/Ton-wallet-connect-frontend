import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from 'dotenv';

dotenv.config();


export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      "/auth": {
        target: process.env.VITE_API_URL || "http://localhost:5001",
        changeOrigin: true
      },
      "/checkin": {
        target: process.env.VITE_API_URL || "http://localhost:5001",
        changeOrigin: true
      },
      "/profile": {
        target: process.env.VITE_API_URL || "http://localhost:5001",
        changeOrigin: true
      },
      "/leaderboard": {
        target: process.env.VITE_API_URL || "http://localhost:5001",
        changeOrigin: true
      }
    }
  }
});

