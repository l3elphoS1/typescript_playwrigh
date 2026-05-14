import { Page, Locator } from '@playwright/test';

export class DialogsPage {
    readonly page: Page;
    readonly dialogsTabButton: Locator;
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Locators สำหรับหน้า Dialogs
        this.dialogsTabButton = page.getByRole('button', { name: /Dialogs/i });
        this.alertButton = page.locator('#dialog-alert-btn');
        this.confirmButton = page.locator('#dialog-confirm-btn');
        this.promptButton = page.locator('#dialog-prompt-btn');
    }

    // เปิดหน้าเว็บหลัก
    async goto() {
        await this.page.goto('https://automate-test-friendly.netlify.app/');
    }

    // เปลี่ยนไปที่ Tab Dialogs
    async openDialogsTab() {
        await this.dialogsTabButton.click();
    }

    // สั่งให้ Popup ทำงาน
    async triggerAlert() {
        await this.alertButton.click();
    }

    async triggerConfirm() {
        await this.confirmButton.click();
    }

    async triggerPrompt() {
        await this.promptButton.click();
    }
}
