import { test, expect } from '@playwright/test';
import { CloudTransitPage } from '../pages/CloudTransitPage';

test("Verify Dynamic Waiting (Cloud Transit) using POM", async ({ page }) => {
    // 1. สร้าง Object จาก Class ใหม่ของเรา
    const transitPage = new CloudTransitPage(page);
    
    // 2. เริ่มทำงาน (อ่านง่ายเหมือนภาษาคน)
    await transitPage.goto();
    await transitPage.openTransitTab();
    await transitPage.launchFlight();
    
    // 3. 💡 พระเอกของงานนี้: Dynamic Waiting 💡
    // ปกติ Playwright จะพยายามหา Element ประมาณ 5 วินาที (Auto-wait)
    // แต่ถ้าเราทดสอบอะไรที่รู้ว่ามันโหลดนาน (เช่น ดึงข้อมูลข้ามประเทศ, ปล่อยยานรบ)
    // เราสามารถใส่ Options { timeout: 10000 } เข้าไปใน expect() ได้เลย!
    // นี่หมายความว่า: "รอสูงสุด 10 วินาทีนะ ถ้าระหว่าง 10 วินาทีนี้มันโผล่มาเมื่อไหร่ ก็ให้ไปทำบรรทัดถัดไปทันที (ไม่ต้องรอจนครบ 10 วิ)"
    
    await expect(transitPage.transitResult).toBeVisible({ timeout: 10000 });
    
    // สังเกตว่าเราไม่ใช้ page.waitForTimeout(10000) เด็ดขาด ❌ 
    // เพราะนั่นคือการ "หยุดรอแบบโง่ๆ" (Hard wait) ทำให้เทสต์ทำงานช้าโดยไม่จำเป็น
    // การใช้ expect(...).toBeVisible({ timeout }) คือ Dynamic Wait ที่ฉลาดและเร็วกว่า! ✅
});
