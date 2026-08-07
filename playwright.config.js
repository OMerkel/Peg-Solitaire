import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./html5/src/test/e2e",
  timeout: 30_000,
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true,
  },
  webServer: {
    command: "npx http-server ./html5/src -p 4173 -a 127.0.0.1 -c-1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
