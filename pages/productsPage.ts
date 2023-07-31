import { Page, expect } from "@playwright/test"

export class ProductsPage {
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

}

