import { Page, expect } from "@playwright/test"

export class FooterPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async switchPage(context, selector, url, title) {

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.page.locator(selector).click()
        ])

        await newPage.waitForLoadState();

        expect(newPage).toHaveURL(url)

        expect(newPage).toHaveTitle(title)
    }
}