import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:5001",
        changeOrigin: true
      },
      "/checkin": {
        target: "http://localhost:5001",
        changeOrigin: true
      },
      "/profile": {
        target: "http://localhost:5001",
        changeOrigin: true
      },
      "/leaderboard": {
        target: "http://localhost:5001",
        changeOrigin: true
      }
    }
  }
});

