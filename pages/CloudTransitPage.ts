import { Page, Locator } from '@playwright/test';

export class CloudTransitPage {
    readonly page: Page;
    readonly transitTabButton: Locator;
    readonly launchFlightButton: Locator;
    readonly transitResult: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Locator สำหรับเปลี่ยน Tab ไปหน้า Transit
        this.transitTabButton = page.getByRole('button', { name: /Transit/i });
        
        // ปุ่มที่ต้องกดเพื่อเริ่มกระบวนการโหลด (Dynamic Loading)
        this.launchFlightButton = page.getByRole('button', { name: 'Launch Flight' });
        
        // Element ผลลัพธ์ที่จะ "หน่วงเวลา" โผล่มา
        this.transitResult = page.locator('#transit-result');
    }

    async goto() {
        await this.page.goto('/');
    }

    async openTransitTab() {
        await this.transitTabButton.click();
    }

    // Method สำหรับสั่งให้เริ่มบิน (คลิกปุ่ม)
    async launchFlight() {
        await this.launchFlightButton.click();
    }
}
