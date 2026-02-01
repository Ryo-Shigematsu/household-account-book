import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page and display title', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /シンプルで透明性のある家計簿/i })).toBeVisible();
  });

  test('should have navigation buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check for "今すぐ始める" button
    const startButton = page.getByRole('link', { name: /今すぐ始める/i });
    await expect(startButton).toBeVisible();
    
    // Check for "詳しく見る" button
    const detailsButton = page.getByRole('link', { name: /詳しく見る/i });
    await expect(detailsButton).toBeVisible();
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto('/');
    
    // Check for feature cards
    await expect(page.getByText('📝 簡単記録')).toBeVisible();
    await expect(page.getByText('📊 カテゴリ分析')).toBeVisible();
    await expect(page.getByText('🔒 安全管理')).toBeVisible();
  });

  test('should have CTA section', async ({ page }) => {
    await page.goto('/');
    
    // Check for CTA section
    await expect(page.getByRole('heading', { name: /早速使ってみましょう/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /取引を記録する/i })).toBeVisible();
  });
});
