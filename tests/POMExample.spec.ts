import { test, expect } from '@playwright/test';
// 1. นำเข้า Class ที่เราสร้างไว้จากโฟลเดอร์ pages
import { TheaterFormPage } from '../pages/TheaterFormPage';

test("Fill out testimony using Page Object Model", async ({ page }) => {
    // 2. สร้าง Object (Instance) ใหม่จาก Class TheaterFormPage
    // เราส่ง 'page' (ของ Playwright) เข้าไปใน Constructor
    const theaterPage = new TheaterFormPage(page);

    // 3. เริ่มเรียกใช้งาน Methods ต่างๆ! สังเกตว่าโค้ดอ่านง่ายขึ้นมาก
    await theaterPage.goto();
    
    // เราซ่อนความซับซ้อนของคำสั่ง fill ไว้ใน Method เดียว
    // แถม TypeScript ยังช่วยเตือนด้วยว่าต้องใส่ string สองตัว (username, password)
    await theaterPage.fillTestimonyForm('Furina', 'Justice123');
    
    await theaterPage.submitForm();

    // 4. ข้อควรจำ (Best Practice): การตรวจสอบผลลัพธ์ (Assertions)
    // ควรจะทำในไฟล์ Test (ไฟล์นี้) ไม่ควรทำในไฟล์ Page (โฟลเดอร์ pages)
    // ดังนั้นเราจึงมาเขียน expect() ตรงนี้
    
    // ตัวอย่างเช่น กดแล้ว input ยังคงมีค่าอยู่ (หรือคุณอาจจะเช็ค popup/alert ตามที่เรียนมาก็ได้!)
    await expect(theaterPage.usernameInput).toHaveValue('Furina');
});
