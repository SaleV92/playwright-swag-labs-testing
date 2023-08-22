import { Page, expect } from "@playwright/test"

export class FilterPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async filterProductsByNames(order, filter) {
        await this.page.locator(".product_sort_container").selectOption({ value: filter });

        const productNames = await this.page.$$eval("div.inventory_list>div>div.inventory_item_description>div.inventory_item_label>a>div.inventory_item_name", elements => elements.map(el => el.innerText));

        const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
        if (order === 'desc') {
            sortedNames.reverse();
        }
        expect(productNames).toEqual(sortedNames);

        console.log(productNames)
    }

    async filterProductsByPrice(order, filter) {
        await this.page.locator(".product_sort_container").selectOption({ value: filter });

        const productNames = await this.page.$$eval("div.inventory_list>div>div.inventory_item_description>div.inventory_item_label>a>div.inventory_item_name", elements => elements.map(el => el.innerText));

        const productPrices = await this.page.$$eval("div.inventory_list>div>div.inventory_item_description>div.pricebar>div.inventory_item_price", elements => elements.map(el => parseFloat(el.innerText.replace('$', ''))));

        const sortedPrices = [...productPrices].sort((a, b) => order === 'asc' ? a - b : b - a);

        expect(productPrices).toEqual(sortedPrices);

        console.log("Products: " + productNames + "\nPrices: " + productPrices)
    }
}