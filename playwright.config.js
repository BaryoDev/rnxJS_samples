import { defineConfig, devices } from '@playwright/test';

// The site under test is a static build in dist/. CI builds it, serves it, and
// points BASE_URL here; nothing in the tests knows about the build.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'python3 -m http.server 8080 --directory dist',
        url: 'http://localhost:8080/index.html',
        reuseExistingServer: !process.env.CI,
        timeout: 30000,
      },
});
