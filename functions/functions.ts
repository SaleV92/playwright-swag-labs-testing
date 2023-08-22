

async function checkForRemoveButton(page, expect) {

    const removes = await page.$$('text="Remove"');
    for (const remove of removes) {
        const isVisible = await remove.isVisible();
        expect(isVisible).toBe(true);
    }
}


async function checkForTwoProducts(page, expect, productName1, productName2) {

    const listProduct = await page.$$(".inventory_item_name")

    const productTexts = await Promise.all(listProduct.map((product) => product.textContent()));

    expect(productTexts).toContain(productName1, productName2)
}

// Check this?


async function checkForProducts(page, expect, ...productNames) {
    const listProduct = await page.$$(".inventory_item_name");
    const productTexts = await Promise.all(listProduct.map((product) => product.textContent()));

    for (const productName of productNames) {
        expect(productTexts).toContain(productName);
    }

    if (productNames.length === 0) {
        console.log("There are no products!");
        expect(productTexts.length).toBe(0);
    }
}


async function getPriceText(page, productName) {

    const priceLocator = await page.locator("//div[text()='" + productName + "']/../../../div[@class='pricebar']/div[@class='inventory_item_price']")

    const price = priceLocator.innerText()

    return price;
}

async function getProductText(page, productName) {

    const prTextLocator = await page.locator("//div[text()='" + productName + "']/../../div[@class = 'inventory_item_desc']")

    const prText = prTextLocator.innerText()

    return prText;
}

module.exports = {
    checkForRemoveButton: checkForRemoveButton,
    checkForTwoProducts: checkForTwoProducts,
    getPriceText: getPriceText,
    getProductText: getProductText


}