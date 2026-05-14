import { test, expect } from '@playwright/test';
import { DialogsPage } from '../pages/DialogsPage';

// ---------------------------------------------------------------------------
// ด่านที่ 1: การจัดการหน้าต่าง Popup (Dialogs / Alerts / Confirms) ด้วย POM
// ---------------------------------------------------------------------------

test.beforeEach(async ({ page }) => {
    const dialogsPage = new DialogsPage(page);
    await dialogsPage.goto();
    
    // ใช้ POM ในการกด Tab Dialogs
    await dialogsPage.openDialogsTab();
});

test("Handle window.alert() using POM", async ({ page }) => {
    const dialogsPage = new DialogsPage(page);

    // 💡 กฎเหล็ก: ต้องประกาศ "ดักจับ (on)" ก่อนที่จะกดปุ่ม!
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('demands');
        await dialog.accept(); // สั่งกด OK
    });
    
    // ค่อยกดปุ่มเพื่ออัญเชิญ Alert ขึ้นมา (ใช้ Method จาก POM)
    await dialogsPage.triggerAlert();
});

test("Handle window.confirm() - Dismiss case using POM", async ({ page }) => {
    const dialogsPage = new DialogsPage(page);

    page.on('dialog', async dialog => {
        expect(dialog.type()).toEqual('confirm');
        expect(dialog.message()).toContain('innocent ');
        
        // ทดลองจำลองคนกด Cancel
        await dialog.dismiss(); 
    });

    await dialogsPage.triggerConfirm();
});

test("Handle window.prompt() - พิมพ์ข้อความลงไปก่อนกดยืนยัน using POM", async ({ page }) => {
    const dialogsPage = new DialogsPage(page);

    page.on('dialog', async dialog => {
        expect(dialog.type()).toEqual('prompt');
        
        // พิมพ์ข้อความแล้วค่อยกด OK
        await dialog.accept('Furina of Fontaine');
    });

    await dialogsPage.triggerPrompt();
});
