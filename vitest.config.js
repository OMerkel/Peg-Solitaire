import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["html5/src/test/unit/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: ["html5/src/js/**/*.js"],
      thresholds: {
        lines: 95,
        statements: 95,
        functions: 95,
        branches: 94,
      },
    },
  },
});
