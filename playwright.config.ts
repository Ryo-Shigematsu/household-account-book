import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  
  // テストの並列実行数
  fullyParallel: true,
  
  // CIで失敗した場合はリトライしない
  forbidOnly: !!process.env.CI,
  
  // ローカルではリトライしない、CIでは1回リトライ
  retries: process.env.CI ? 1 : 0,
  
  // 並列実行するワーカー数
  workers: process.env.CI ? 1 : undefined,
  
  // レポーター設定
  reporter: 'html',
  
  use: {
    // ベースURL
    baseURL: 'http://localhost:3000',
    
    // スクリーンショットとトレース
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // テスト前にローカルサーバーを起動
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },

  // 複数ブラウザでテスト
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});