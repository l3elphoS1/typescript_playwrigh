import { test, expect } from '@playwright/test';


test('my first test',()=>{

})

//fixture = global variable : page, browser

test("Verify page title",async({page})=>{
    await page.goto("https://automate-test-friendly.netlify.app/");

    await expect(page).toHaveTitle("The Grand Theater of Automation");
})

