import { Page, expect } from "@playwright/test"

export class BuyingPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkForProduct(productName) {

        const listProduct = await this.page.$$(".inventory_item_name")

        const productTexts = await Promise.all(listProduct.map((product) => product.textContent()));

        if (productTexts.length > 0) {
            expect(productTexts).toContain(productName)
        } else {
            console.log("There is no products!");
            expect(productTexts.length).toBe(0);
        }
    }

    async fillCustomer(firstName, lastName, postalCode) {

        await this.page.fill("#first-name", firstName)

        await this.page.fill("#last-name", lastName)

        await this.page.fill("#postal-code", postalCode)

        await this.page.click("#continue")
    }

}