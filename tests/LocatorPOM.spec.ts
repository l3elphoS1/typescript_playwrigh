import { test, expect } from '@playwright/test';
import { TheaterFormPage } from '../pages/TheaterFormPage';

test.beforeEach(async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    await theaterPage.goto();
});

test("Verify Playwright Locators using POM", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    // โค้ดเดิม: await page.getByRole('button',{name:/Present/}).click()
    await theaterPage.submitForm();
    
    // โค้ดเดิม: await expect(page.getByRole('button',{name:/Present/})).toBeVisible()
    await expect(theaterPage.presentButton).toBeVisible();
});

test("Login Successful using POM", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    // โค้ดเดิม:
    // await page.getByLabel('Username').fill('Furina')
    // await page.getByLabel('Password').fill('PaimonNotEmergencyFood')
    // await page.getByRole('button',{name:/Present/}).click()
    
    // โค้ดใหม่ (ใช้ POM):
    await theaterPage.fillTestimonyForm('Furina', 'PaimonNotEmergencyFood');
    await theaterPage.submitForm();
    
    // โค้ดเดิม: await expect(page.getByText('Welcome...')).toBeVisible()
    await expect(theaterPage.successMessage).toBeVisible();
});
