import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    clearMocks: true,
    reporters: process.env.CI ? ["default", "github-actions"] : ["default"],
  },
});
