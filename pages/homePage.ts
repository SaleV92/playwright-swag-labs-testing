import { Page, expect } from "@playwright/test"

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async open() {
        await this.page.goto("https://www.saucedemo.com/")

        expect(this.page).toHaveURL("https://www.saucedemo.com/")

        expect(this.page).toHaveTitle("Swag Labs")
    }

    async checkTitle(title) {

        const locatorTitle = await this.page.locator("span.title")

        expect(locatorTitle).toHaveText(title)
    }

    async checkLogo(logo) {


        const locatorLogo = await this.page.locator("div.app_logo")

        expect(locatorLogo).toHaveText(logo)
    }


    async findProduct(productName) {

        const product = await this.page.waitForSelector(`text=${productName}`);

        if (product) {
            await product.click();
        } else {

            const noProduct = console.log(`Product not found!`);
        }
    }

    async addToCart() {

        await this.page.getByText("Add to cart").click()
    }

    async numberOfProducts(numberInString) {
        const span = await this.page.locator("span.shopping_cart_badge")

        expect(span).toHaveText(numberInString)

    }
}