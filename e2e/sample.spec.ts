import { test, expect } from '@playwright/test';

test('トップページが表示される', async ({ page }) => {
  await page.goto('/');
  
  // ページタイトルを確認
  await expect(page).toHaveTitle(/household-account-book/i);
});

test('ページに基本的なコンテンツが表示される', async ({ page }) => {
  await page.goto('/');
  
  // ページが読み込まれることを確認
  await expect(page.locator('body')).toBeVisible();
});
