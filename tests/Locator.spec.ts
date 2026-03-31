import {test, expect} from '@playwright/test'

  // Priority order — use the first one that works:
// page.getByRole('button', { name: 'Submit' })        // 1. Role (default)
// page.getByLabel('Email address')                     // 2. Label (form fields)
// page.getByText('Welcome back')                       // 3. Text (non-interactive)
// page.getByPlaceholder('Search...')                    // 4. Placeholder
// page.getByAltText('Company logo')                    // 5. Alt text (images)
// page.getByTitle('Close dialog')                      // 6. Title attribute
// page.getByTestId('checkout-summary')                 // 7. Test ID (last semantic option)
// page.locator('css=.legacy-widget >> internal:role=button') // 8. CSS/XPath (last resort)


test("Verify Playwright Locators",async({page})=>{
    await page.goto("https://automate-test-friendly.netlify.app/")

    await page.getByRole('button',{name:/Present/}).click()
    await expect(page.getByRole('button',{name:/Present/})).toBeVisible()
    
    
})