import { Page, Locator} from '@playwright/test';

export class OratricePage {
    readonly page: Page;
    readonly oratriceTabButton: Locator;
    readonly testimonyInput: Locator;
    readonly submitButton: Locator;
    readonly testimonyText: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.oratriceTabButton = page.getByRole('button', { name: 'Oratrice' });
        this.testimonyInput = page.locator('#shadow-input');
        this.submitButton = page.getByRole('button', { name: 'Submit Testimony' });
        this.testimonyText = page.locator('#testimony-text'); 
    }

    // Action
    async goto() {
        await this.page.goto('/');
    }

    async openOratriceTab() {
        await this.oratriceTabButton.click();
    }

    async fillTestimony(text: string) {
        await this.testimonyInput.fill(text);
    }

    async submitTestimony() {
        await this.submitButton.click();
    }
}