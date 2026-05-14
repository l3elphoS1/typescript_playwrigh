import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// ด่านที่ 1: การจัดการหน้าต่าง Popup (Dialogs / Alerts / Confirms)
// ---------------------------------------------------------------------------

test.beforeEach(async ({ page }) => {
    await page.goto("https://automate-test-friendly.netlify.app/");
    
    // 💡 สำคัญ: ต้องรวมคำสั่งคลิกแท็บมาไว้ใน beforeEach 
    // เพื่อให้ "ทุกๆ test()" ที่รันด้านล่างนี้ เดินมาเปิดแท็บ Dialogs ก่อนเริ่มเทสต์เสมอ!
    await page.getByRole('button', { name: /Dialogs/i }).click();
});

test("Handle window.alert()", async ({ page }) => {
    // 💡 กฎเหล็ก: ต้องประกาศ "ดักจับ (on)" ก่อนที่จะกดปุ่ม!
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('demands');
        await dialog.accept(); // สั่งกด OK
    });
    await page.locator('#dialog-alert-btn').click();
    // ค่อยกดปุ่มเพื่ออัญเชิญ Alert ขึ้นมา
    // ใช้ ID แบบที่คุณทำมาตอนแรก ถูกต้องและแม่นยำที่สุดครับ! 🌟
    
});

test("Handle window.confirm() - Dismiss case", async ({ page }) => {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toEqual('confirm');
        expect(dialog.message()).toContain('innocent ');
        
        // ทดลองจำลองคนกด Cancel
        await dialog.dismiss(); 
    });

    // ปุ่ม Confirm น่าจะมี id คล้ายๆ กันคือ #dialog-confirm-btn
    await page.locator('#dialog-confirm-btn').click();
});

test("Handle window.prompt() - พิมพ์ข้อความลงไปก่อนกดยืนยัน", async ({ page }) => {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toEqual('prompt');
        
        // พิมพ์ข้อความแล้วค่อยกด OK
        await dialog.accept('Furina of Fontaine');
    });

    // ปุ่ม Prompt ก็น่าจะเป็น #dialog-prompt-btn
    await page.locator('#dialog-prompt-btn').click();
});
