import { test, expect} from '@playwright/test'
import { GazettePage } from '../pages/GazettePage'

test("Checking filter & Search functionability by POM", async ({page}) =>{

    const gazettePage = new GazettePage(page);

    await gazettePage.goto();
    await gazettePage.openGazetteTab(); // <-- Fix: Open the tab first
    await gazettePage.filterByName("Fu");
    await expect(gazettePage.visibleRows).toContainText("Furina")

});