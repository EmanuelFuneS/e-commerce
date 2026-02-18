import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@workspace/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
  base: "/auth/",
  server: {
    host: "0.0.0.0",
    port: 3005,
    strictPort: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*", "Content-Type", "Authorization"],
    },
  },
});
