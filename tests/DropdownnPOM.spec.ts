import { test, expect } from '@playwright/test';
import { TheaterFormPage } from '../pages/TheaterFormPage';

test.beforeEach(async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    await theaterPage.goto();
});

test("Verify Dropdown using POM (Super Method)", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    // Add this line to navigate to the Forms tab first!
    await theaterPage.openFormsTab();
    
    // หลังแก้ (ใช้ Super Method ที่รวมทั้ง Radio และ Dropdown):
    // ไม่ต้องกลัวพิมพ์ผิดเพราะ TypeScript จะบังคับให้พิมพ์แค่ 'Lawful Good', 'Chaotic Neutral' หรือ 'Pure Chaos'
    await theaterPage.selectAlignmentAndVision('Lawful Good', 'hydro');
    
    // ตรวจสอบผลลัพธ์พร้อมกัน
    await expect(theaterPage.lawfulGoodRadio).toBeChecked();
    await expect(theaterPage.visionDropdown).toHaveValue('hydro');
});

// Make sure to add it to the new test as well if you added it:
test("Verify Dropdown using POM with Pure Chaos", async ({ page }) => {
    const theaterPage = new TheaterFormPage(page);
    
    // Add this line here too!
    await theaterPage.openFormsTab();
    
    await theaterPage.selectAlignmentAndVision('Pure Chaos', 'pyro');
    
    await expect(theaterPage.pureChaosRadio).toBeChecked();
    await expect(theaterPage.visionDropdown).toHaveValue('pyro');
});
