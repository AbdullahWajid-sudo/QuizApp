import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/QuizApp/",
  plugins: [react(), tailwindcss()],
  define: {
    // This provides a global 'global' and 'Buffer' to the browser
    global: "window",
    "process.env": {},
    Buffer: ["buffer", "Buffer"],
  },
});
