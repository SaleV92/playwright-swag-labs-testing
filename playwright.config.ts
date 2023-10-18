import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {

  testMatch: ["buying.test.ts"],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: 
  [
    ['playwright-html', { 
      testFolder: 'tests',
      title: 'Testing Swag Labs report',
      project: 'Swag Labs',
      release: '1.0',
      testEnvironment: 'DEV',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'playwright-report',
      minifyAssets: true,
      startServer: true,
    }]
  ],
   //[["html"]]
};

export default config;


