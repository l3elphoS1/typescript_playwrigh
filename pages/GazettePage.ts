import { Page, Locator } from '@playwright/test';

export class GazettePage {
    // 1. ประกาศตัวแปรเก็บ Locators
    readonly page: Page;
    readonly gazetteTabButton: Locator;
    readonly filterInput: Locator;
    readonly visibleRows: Locator;
    readonly tableBody: Locator;

    // 2. ผูก Locator เมื่อสร้าง Object
    constructor(page: Page) {
        this.page = page;
        this.gazetteTabButton = page.getByRole('button', { name: 'Gazette' });
        this.filterInput = page.getByPlaceholder('Filter by name');
        // เราเตรียม Locator ของตารางไว้ให้ Test เรียกใช้ไปทำ Assert
        this.visibleRows = page.locator('#gazette-tbody tr:visible');
        this.tableBody = page.locator('#gazette-tbody');
    }

    // 3. Action Method สำหรับพิมพ์ค้นหา
    async goto(){
        await this.page.goto('/')
    }

    async openGazetteTab(){
        await this.gazetteTabButton.click();
    }

    async filterByName(name: string) {
        await this.filterInput.fill(name);
    }
}