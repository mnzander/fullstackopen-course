const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Ander2',
        username: 'andermnz2',
        password: 'prueba'
      }
    })
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs');
    await expect(locator).toBeVisible();
    await page.getByRole('button', { name: 'login' }).click()
  });

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'andermnz2', 'wrong');

    const errorDiv = await page.locator('.error');
    await expect(errorDiv).toContainText('Wrong credentials');
    await expect(errorDiv).toHaveCSS('border-style', 'solid');
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');
  
    await expect(page.getByText('Ander2 logged-in')).not.toBeVisible();
  });

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'andermnz2', 'prueba');
    await expect(page.getByText('Ander2 logged-in')).toBeVisible();
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'andermnz2', 'prueba');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "a blog created by playwright", "Playwright", "www.playwright.com");
      await expect(page.getByText('a blog created by playwright - Playwright')).toBeVisible();
    });

    test("the blog can be edited", async ({ page }) => {
      await createBlog(page, "a blog created by playwright", "Playwright", "www.playwright.com");
      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'like' }).click();
    });

    test("the blog can be deleted", async ({ page }) => {
      await createBlog(page, "a blog created by playwright", "Playwright", "www.playwright.com");
      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'remove' }).click();
      page.once('dialog', dialog => {
        expect(dialog.message()).toBe("Remove blog a blog created by playwright by Playwright");
        dialog.accept();
      });      
    });

    test("the blog can be deleted only by the creator", async ({ page }) => {
      await createBlog(page, "a blog created by playwright", "Playwright", "www.playwright.com");
      await page.getByRole('button', { name: 'view' }).click();
      await expect(page.getByText('Ander2 logged-in')).toBeVisible();
      await expect(page.getByText("Ander2")).toBeVisible();
      await page.getByRole('button', { name: 'remove' }).click();
      page.once('dialog', dialog => {
        expect(dialog.message()).toBe("Remove blog a blog created by playwright by Playwright");
        dialog.accept();
      });      
    });

    test("blogs are sorted by likes", async ({ page }) => {
      await createBlog(page, "a blog created by playwright", "Playwright", "www.playwright.com");
      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'like' }).click();
      await page.getByRole('button', { name: 'cancel' }).click();

      await createBlog(page, "another blog created by playwright", "Playwright", "www.anotherplaywright.com");
        
      const blogs = await page.locator('text=- Playwright').allTextContents();
      
      expect(blogs[0]).toContain("a blog created by playwright - Playwright");
      expect(blogs[1]).toContain("another blog created by playwright - Another Playwright");
    });    
  });
});