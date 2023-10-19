import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {


  testDir: './tests',


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
  projects: [

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']
      },

      
    },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox']
    
  //   }
    
  // },
    
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], 
    //   storageState: 'playwright/.auth/user.json', 
    // },
    //   dependencies: ['setup']
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
  //   {
  //     name: 'Microsoft Edge',
  //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   },
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
   ],
};

export default config;


