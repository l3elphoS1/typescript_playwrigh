import { test, expect } from '@playwright/test';

// Helper function to navigate to a specific tab
test.beforeEach(async ({ page }) => {
    await page.goto("https://automate-test-friendly.netlify.app/");
});


test("Verify Page Level Assertions", async ({ page }) => {
    // 1. ระดับ Page: ตรวจสอบ URL
    await expect(page).toHaveURL(/.*netlify\.app/);

    // 2. ระดับ Page: ตรวจสอบ Title (ชื่อแท็บ)
    await expect(page).toHaveTitle(/Grand Theater/);
});

test("Verify Element State Assertions", async ({ page }) => {
    // หา Form 
    const usernameInput = page.getByLabel('Username');
    const presentButton = page.getByRole('button', { name: /Present/ });

    // 3. ตรวจสอบว่า Element ปรากฏบนจอ (Visible)
    await expect(usernameInput).toBeVisible();

    // 4. ตรวจสอบว่า Element สามารถพิมพ์/กดได้ (Enabled)
    await expect(usernameInput).toBeEnabled();

    // 5. ตรวจสอบว่ามีช่องว่างเปล่าอยู่ (ไม่มีข้อความ)
    await expect(usernameInput).toBeEmpty();

    // ถ้ากดปุ่ม Present โดยไม่กรอกอะไรเลย อาจจะมี Error ขึ้น
    await presentButton.click();
    
    // 6. ตรวจสอบว่ามี CSS Class หรือไม่ (เช่น หา Error alert)
    // await expect(page.locator('.error-message')).toHaveClass(/visible/); 
});

test("Verify Text and Attribute Assertions", async ({ page }) => {
    const presentButton = page.getByRole('button', { name: /Present/ });

    // 7. ตรวจสอบข้อความเป๊ะๆ (Exact Text)
    // หมายเหตุ: กรณีมีเว้นวรรคหรือ Emoji การใช้ Exact อาจจะพลาดบ่อย แนะนำให้ใช้ regex หรือ toContainText
    // await expect(presentButton).toHaveText('⚖️ Present Your Testimony');

    // 8. ตรวจสอบว่า "มีคำนี้ซ่อนอยู่" ในข้อความนั้นๆ (Contain Text) 
    await expect(presentButton).toContainText('Present');
    await expect(presentButton).toContainText('Testimony');

    // 9. ตรวจสอบ Attribute ต่างๆ เช่น id, type, src ของภาพ
    const passwordInput = page.getByLabel('Password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
});

test("Verify List and Checkbox Assertions", async ({ page }) => {
    // 10. ตรวจสอบจำนวนของ Element ว่ามีกี่ชิ้น (Count)
    // สมมติหน้าเว็บมีช่อง input หลายช่อง เราสามารถเช็คจำนวนรวมได้
    const allInputs = page.locator('input');
    // await expect(allInputs).toHaveCount(2); // เช่น สมมติมี 2 ช่อง (Username กับ Password)

    // สรุป Assertions ที่ใช้บ่อย:
    // toBeVisible(), toBeHidden()
    // toBeEnabled(), toBeDisabled()
    // toHaveText(), toContainText()
    // toHaveValue() -> เช็คว่าช่อง input พิมพ์คำว่าอะไรอยู่
    // toBeChecked() -> เช็ค Checkbox / Radio
});

test("Verify user inpit", async ({page}) =>{

    const usernameInput = page.getByLabel('Username');
    await usernameInput.fill('Furina');
    await expect(usernameInput).toHaveValue('Furina');
    await usernameInput.clear();
    await expect(usernameInput).toHaveValue('');
    
})

test("Verify Checkbox", async ({page}) =>{
    await page.getByRole('button', { name: /Forms/ }).click();
    const checkbox = page.getByLabel(/Testify before the court/i);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    
})

test("Verify Radio button", async ({page}) =>{
    await page.getByRole('button', { name: /Forms/ }).click();
    const radio1 = page.getByLabel(/Lawful Good/i);
    await radio1.check();
    await expect(radio1).toBeChecked();
    const radio2 = page.getByLabel(/Chaotic Neutral/i);
    await radio2.check();
    await expect(radio2).toBeChecked();
    await expect(radio1).not.toBeChecked();
    
})

test("Verify Dropdown", async ({page})=>{
    await page.getByRole('button', { name: /Forms/ }).click();
    const visionDropdown = page.locator('#form-vision');
    await visionDropdown.selectOption('hydro');
    await expect(visionDropdown).toHaveValue('hydro');

})