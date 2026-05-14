import { test, expect } from '@playwright/test';
import { TheaterFormPage } from '../pages/TheaterFormPage';

// ก่อนเริ่มแต่ละ Test เราจะให้ POM เป็นคนเปิดหน้าเว็บให้
test.beforeEach(async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    await theaterPage.goto();
});

test("Verify Page Level Assertions using POM", async ({ page }) => {
    // 1. ระดับ Page: ตรวจสอบ URL
    await expect(page).toHaveURL(/.*netlify\.app/);

    // 2. ระดับ Page: ตรวจสอบ Title (ชื่อแท็บ)
    await expect(page).toHaveTitle(/Grand Theater/);
});

test("Verify Element State Assertions using POM", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);

    // 3. ตรวจสอบว่า Element ปรากฏบนจอ (Visible)
    await expect(theaterPage.usernameInput).toBeVisible();

    // 4. ตรวจสอบว่า Element สามารถพิมพ์/กดได้ (Enabled)
    await expect(theaterPage.usernameInput).toBeEnabled();

    // 5. ตรวจสอบว่ามีช่องว่างเปล่าอยู่ (ไม่มีข้อความ)
    await expect(theaterPage.usernameInput).toBeEmpty();

    // ถ้ากดปุ่ม Present โดยไม่กรอกอะไรเลย อาจจะมี Error ขึ้น
    await theaterPage.submitForm();
});

test("Verify Text and Attribute Assertions using POM", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);

    // 8. ตรวจสอบว่า "มีคำนี้ซ่อนอยู่" ในข้อความนั้นๆ (Contain Text) 
    await expect(theaterPage.presentButton).toContainText('Present');
    await expect(theaterPage.presentButton).toContainText('Testimony');

    // 9. ตรวจสอบ Attribute ต่างๆ เช่น id, type, src ของภาพ
    await expect(theaterPage.passwordInput).toHaveAttribute('type', 'password');
});


test("Verify user input using POM", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    // ก่อนแก้:
    // const usernameInput = page.getByLabel('Username');
    // await usernameInput.fill('Furina');
    
    // หลังแก้ (ใช้ POM):
    await theaterPage.fillTestimonyForm('Furina');
    
    // Assertion (การตรวจสอบ) ยังคงอยู่ในไฟล์ Test
    await expect(theaterPage.usernameInput).toHaveValue('Furina');
    
    await theaterPage.usernameInput.clear();
    await expect(theaterPage.usernameInput).toHaveValue('');
});

test("Verify Checkbox using POM", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    // ก่อนแก้: await page.getByRole('button', { name: /Forms/ }).click();
    // หลังแก้ (ใช้ POM): อ่านง่ายกว่ามาก!
    await theaterPage.openFormsTab();
    
    // เรียกใช้ Locator ที่เราสร้างเตรียมไว้แล้วใน Class
    await theaterPage.testifyCheckbox.check();
    await expect(theaterPage.testifyCheckbox).toBeChecked();
    
    await theaterPage.testifyCheckbox.uncheck();
    await expect(theaterPage.testifyCheckbox).not.toBeChecked();
});

test("Verify Radio button using POM", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    await theaterPage.openFormsTab();
    
    // เช็ค Lawful Good
    await theaterPage.lawfulGoodRadio.check();
    await expect(theaterPage.lawfulGoodRadio).toBeChecked();
    
    // เช็ค Chaotic Neutral
    await theaterPage.chaoticNeutralRadio.check();
    await expect(theaterPage.chaoticNeutralRadio).toBeChecked();
    
    // ตรวจสอบว่าอันแรกถูกปลดออกอัตโนมัติ
    await expect(theaterPage.lawfulGoodRadio).not.toBeChecked();
});

test("Verify Dropdown using POM (Super Method)", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    await theaterPage.openFormsTab();
    
    // ก่อนแก้: 
    // const visionDropdown = page.locator('#form-vision');
    // await visionDropdown.selectOption('hydro');
    
    // หลังแก้ (ใช้ Super Method ที่รวมทั้ง Radio และ Dropdown):
    // ไม่ต้องกลัวพิมพ์ผิดเพราะ TypeScript จะบังคับให้พิมพ์แค่ 'Lawful Good' หรือ 'Chaotic Neutral'
    await theaterPage.selectAlignmentAndVision('Lawful Good', 'hydro');
    
    // ตรวจสอบผลลัพธ์พร้อมกัน
    await expect(theaterPage.lawfulGoodRadio).toBeChecked();
    await expect(theaterPage.visionDropdown).toHaveValue('hydro');
});
