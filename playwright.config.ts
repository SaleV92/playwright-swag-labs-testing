import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {

  testMatch: ["bying.test.ts"],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [["html"]]
};

export default config;


