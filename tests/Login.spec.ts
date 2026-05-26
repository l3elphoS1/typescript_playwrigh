import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Structured Tests (with POM)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    // 1. เปิดหน้า Web และกดไปที่ tab Login
    await loginPage.goto();
  });

  test('TC-LOGIN-001 Login สำเร็จด้วย credentials ถูกต้อง', async () => {
    // 2-4. กรอก Username, Password แล้วกด Submit
    await loginPage.loginWithClick('Furina', 'PaimonNotEmergencyFood');
    
    // Expected Result: เข้าสู่ระบบสำเร็จ แสดง welcome message
    await expect(loginPage.loginMessage).toBeVisible();
    await expect(loginPage.loginMessage).toContainText('Welcome, Hydro Archon! The Court of Fontaine recognizes you.');
  });

  test('TC-LOGIN-002 Login ไม่สำเร็จเมื่อ password ผิด', async () => {
    await loginPage.loginWithClick('Furina', 'wrongpassword');
    
    // Expected Result: แสดง error message แจ้งว่า password ผิด
    await expect(loginPage.loginMessage).toBeVisible();
    await expect(loginPage.loginMessage).toContainText('Incorrect password');
  });

  test('TC-LOGIN-003 Login ไม่สำเร็จเมื่อปล่อยว่างทั้งคู่', async () => {
    await loginPage.loginWithClick('', '');
    
    // Expected Result: แสดง error message
    await expect(loginPage.loginMessage).toBeVisible();
    await expect(loginPage.loginMessage).toContainText('Username not recognized');
  });

  test('TC-LOGIN-004 Login สำเร็จแม้ username มี space นำหน้า', async () => {
    // กรอก space หน้า-หลัง
    await loginPage.loginWithClick('  Furina  ', 'PaimonNotEmergencyFood');
    
    // Expected Result: เข้าสู่ระบบสำเร็จ (เพราะโค้ดมี .trim())
    await expect(loginPage.loginMessage).toBeVisible();
    await expect(loginPage.loginMessage).toContainText('Welcome, Hydro Archon!');
  });

  test('TC-LOGIN-005 กด Enter แทน Submit button', async () => {
    // 2-4. กรอก Username, Password แล้วกด Enter
    await loginPage.loginWithEnter('Furina', 'PaimonNotEmergencyFood');
    
    // Expected Result: เข้าสู่ระบบสำเร็จ
    await expect(loginPage.loginMessage).toBeVisible();
    await expect(loginPage.loginMessage).toContainText('Welcome, Hydro Archon!');
  });
});
