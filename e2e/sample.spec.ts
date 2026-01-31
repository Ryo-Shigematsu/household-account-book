import { test, expect } from "@playwright/test";

test.describe("Sample E2E Tests", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    
    // Wait for the page to load
    await page.waitForLoadState("networkidle");
    
    // Check that the page loaded successfully
    expect(page.url()).toBe("http://localhost:3000/");
  });

  test("should have a title", async ({ page }) => {
    await page.goto("/");
    
    // Check that the page has a title
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("should render page content", async ({ page }) => {
    await page.goto("/");
    
    // Check that the page has some visible content
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });
});
