import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For a GitHub Pages project repository named "cyclecare", set
// VITE_BASE_PATH=/cyclecare/ in the Actions workflow. Use "/" for root hosting.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/"
});
