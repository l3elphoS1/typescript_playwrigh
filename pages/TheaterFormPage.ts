import { Page, Locator } from '@playwright/test';

// ============================================================================
// Page Object Model (POM) สำหรับหน้าฟอร์ม Theater
// คอนเซ็ปต์: แยก "ตัวค้นหา (Locator)" และ "การกระทำ (Action)" ออกจากไฟล์ Test
// เพื่อให้โค้ดอ่านง่าย แก้ไขง่าย และนำไปใช้ซ้ำได้ (Write once, use anywhere)
// ============================================================================

export class TheaterFormPage {
    // ------------------------------------------------------------------------
    // 1. ประกาศตัวแปร (Properties)
    // หน้าที่: เอาไว้เก็บ Locators ทั้งหมดของหน้านี้
    // กฎเหล็ก: ใช้คำว่า 'readonly' เสมอ เพื่อป้องกันไม่ให้โค้ดส่วนอื่นมาแอบเปลี่ยนค่า Locator ของเรา
    // ------------------------------------------------------------------------
    readonly page: Page;
    readonly fullNameInput: Locator;
    readonly email: Locator;
    readonly formSubmitButton: Locator;   // เพิ่มใหม่
    readonly formMessage: Locator;       // เพิ่มใหม่
    
    // Locators สำหรับ Tab "Forms" (ลดความซ้ำซ้อนจากไฟล์ Assertions.spec.ts)
    readonly formsTabButton: Locator;
    readonly testifyCheckbox: Locator;
    readonly lawfulGoodRadio: Locator;
    readonly chaoticNeutralRadio: Locator;
    readonly pureChaosRadio: Locator;
    readonly visionDropdown: Locator;

    // ------------------------------------------------------------------------
    // 2. Constructor (ฟังก์ชันสร้างออบเจกต์)
    // หน้าที่: ฟังก์ชันนี้จะถูกเรียกทำงาน "อัตโนมัติ" ทันทีที่เราพิมพ์ new TheaterFormPage(page)
    // เราจะเอา Locators ทั้งหมดมากองรวมกันไว้ที่นี่ที่เดียว!
    // ข้อดี: ถ้าวันหน้าทีม Dev เปลี่ยนหน้าตาเว็บ เราก็มาแก้แค่ตรงนี้ ไม่ต้องไปตามแก้ในไฟล์ Test ทั้ง 100 ไฟล์
    // ------------------------------------------------------------------------
    constructor(page: Page) {
        this.page = page; // เก็บ page ของ Playwright เอาไว้ใช้ใน Class นี้
        
        // ผูก Locators เข้ากับตัวแปรที่เราประกาศไว้ด้านบน
        this.fullNameInput = page.locator('#form-name');
        this.email = page.locator('#form-email');
        this.formSubmitButton = page.locator('#form-submit-btn');
        this.formMessage = page.locator('#form-message');

        this.formsTabButton = page.getByRole('button', { name: /Forms/ });
        this.testifyCheckbox = page.getByLabel(/Testify before the court/i);
        this.lawfulGoodRadio = page.getByLabel(/Lawful Good/i);
        this.chaoticNeutralRadio = page.getByLabel(/Chaotic Neutral/i);
        this.pureChaosRadio = page.getByLabel(/Pure Chaos/i);
        this.visionDropdown = page.locator('#form-vision');
    }

    // ------------------------------------------------------------------------
    // 3. Methods (ฟังก์ชันการกระทำ / พฤติกรรม)
    // หน้าที่: สร้างคำสั่งที่อ่านง่ายเหมือนภาษาคน เพื่อให้ไฟล์ Test เรียกใช้
    // ------------------------------------------------------------------------

    // Method: เปิดหน้าเว็บหลัก
    async goto() {
        await this.page.goto('/');
    }

    // Method: คลิกเปลี่ยนไปที่หน้า Tab "Forms"
    async openFormsTab() {
        await this.formsTabButton.click();
    }

    // Method: กรอกข้อมูล Username และ Password
    // ความเจ๋งของ TypeScript: 
    // - บังคับให้ต้องส่ง username เป็นตัวอักษร (string)
    // - มีเครื่องหมาย '?' หลัง password หมายความว่า "จะใส่หรือไม่ใส่ก็ได้ (Optional)"
    async fillTestimonyForm(username: string, email: string) {
        await this.fullNameInput.fill(username);
        await this.email.fill(email);
        
        if (email) { // ถ้ามีการส่ง password มา ค่อยสั่งกรอก
            await this.email.fill(email);
        }
    }

    // Method: กดยืนยันปุ่ม Present
    async submitForm() {
        await this.formSubmitButton.click();
    }

    // ------------------------------------------------------------------------
    // Super Method: รวบรวมการกระทำหลายๆ ขั้นตอนไว้ในคำสั่งเดียว
    // หน้าที่: ลดความซ้ำซ้อน (Redundancy) แทนที่จะต้องเขียนคำสั่งคลิก 3 บรรทัดในไฟล์ Test
    // เราย่อให้เหลือการเรียกใช้ Method นี้แค่บรรทัดเดียว!
    // ------------------------------------------------------------------------
    async selectAlignmentAndVision(alignment: 'Lawful Good' | 'Chaotic Neutral' | 'Pure Chaos', vision: string) {
        // TypeScript จะล็อคให้พิมพ์ได้แค่ 'Lawful Good', 'Chaotic Neutral' หรือ 'Pure Chaos' เท่านั้น ป้องกันการพิมพ์ผิด!
        if (alignment === 'Lawful Good') {
            await this.lawfulGoodRadio.check();
        } else if (alignment === 'Chaotic Neutral') {
            await this.chaoticNeutralRadio.check();
        } else if (alignment === 'Pure Chaos') {
            await this.pureChaosRadio.check();
        }
        
        // เลือก Dropdown ตามค่าที่ส่งมา (เช่น 'hydro', 'pyro')
        await this.visionDropdown.selectOption(vision);
    }
}
