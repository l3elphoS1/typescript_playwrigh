import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly tabLogin: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tabLogin = page.locator('#tab-login');
    this.usernameInput = page.locator('#login-user');
    this.passwordInput = page.locator('#login-pass');
    this.loginButton = page.locator('#login-btn');
    this.loginMessage = page.locator('#login-msg');
  }

  // รวม Step การเปิดหน้าเว็บและการกด Tab ไว้ด้วยกัน
  async goto() {
    await this.page.goto('/');
    await this.tabLogin.click();
  }

  // Method สำหรับกรอกข้อมูลพื้นฐาน
  async fillCredentials(username: string, password?: string) {
    await this.usernameInput.fill(username);
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
  }

  // Method ยอดฮิต: ล็อกอินด้วยการกดปุ่ม Submit
  async loginWithClick(username: string, password?: string) {
    await this.fillCredentials(username, password);
    await this.loginButton.click();
  }

  // Method สำหรับเคสที่กด Enter
  async loginWithEnter(username: string, password?: string) {
    await this.fillCredentials(username, password);
    await this.passwordInput.press('Enter');
  }
}
