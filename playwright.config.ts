import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {

  testMatch: ["products.test.ts"],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [["html"]]
};

export default config;


