import {test, expect} from '@playwright/test';
import { OratricePage } from '../pages/OratricePage';

test("Checking oratrice functionability by POM", async ({page}) =>{
    const oratricePage = new OratricePage(page);

    await oratricePage.goto();
    await oratricePage.openOratriceTab();
    
    // 1. พิมพ์คำให้การ
    await oratricePage.fillTestimony("Furina");
    
    // 2. กดปุ่ม Submit Testimony
    await oratricePage.submitTestimony();
    
    // 3. ตรวจสอบข้อความที่ขึ้นมาใน Shadow DOM
    await expect(oratricePage.testimonyText).toContainText("Innocent (probably)");
});