const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.cjs',
  workers: 1,
  timeout: 120000,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4182',
    browserName: 'chromium',
    viewport: { width: 1440, height: 900 },
    launchOptions: { executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] }
  },
  webServer: {
    command: 'python3 -m http.server 4182 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4182/',
    reuseExistingServer: false,
    timeout: 15000
  }
});
