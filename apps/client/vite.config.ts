import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import viteTsconfigPaths from "vite-tsconfig-paths"
import svgrPlugin from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic", // to resolve paths
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
})
