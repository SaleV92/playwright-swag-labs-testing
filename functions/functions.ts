

async function findProduct(page, productName) {

    const product = await page.waitForSelector(`text=${productName}`);

    if (product) {
        await product.click();
    } else {

        const noProduct = console.log(`Product not found!`);
    }
}

async function pickProduct(page, productNameF) {

    const product = await page.waitForSelector(`text=${productNameF}`);

    if (product) {
        const addToCart = await product.$("(//button[text()='Add to cart'])[1]");
        if (addToCart) {
            await addToCart.click();
        } else {
            console.log(`"Add to cart" button not found for product: ${productNameF}`)
        }
    } else {
        console.log(`Product not found: ${productNameF}`);
    }
}

async function fillCustomer(page, firstName, lastName, postalCode) {

    await page.fill("#first-name", firstName)

    await page.fill("#last-name", lastName)

    await page.fill("#postal-code", postalCode)

    await page.click("#continue")
}

async function checkForRemoveButton(page, expect) {

    const removes = await page.$$('text="Remove"');
    for (const remove of removes) {
        const isVisible = await remove.isVisible();
        expect(isVisible).toBe(true);
    }
}

async function checkForProduct(page, expect, productName) {

    const listProduct = await page.$$(".inventory_item_name")

    const productTexts = await Promise.all(listProduct.map((product) => product.textContent()));

    if (productTexts.length > 0) {
        expect(productTexts).toContain(productName)
    } else {
        console.log("There is no products!");
        expect(productTexts.length).toBe(0);
    }
}

async function checkForTwoProducts(page, expect, productName1, productName2) {

    const listProduct = await page.$$(".inventory_item_name")

    const productTexts = await Promise.all(listProduct.map((product) => product.textContent()));

    expect(productTexts).toContain(productName1, productName2)
}

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

async function filterProductsByNames(page, expect, order, filter) {


    await page.locator(".product_sort_container").selectOption({ value: filter });

    const productNames = await page.$$eval("div.inventory_list>div>div.inventory_item_description>div.inventory_item_label>a>div.inventory_item_name", elements => elements.map(el => el.innerText));
    const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
    if (order === 'desc') {
        sortedNames.reverse();
    }
    expect(productNames).toEqual(sortedNames);

    console.log(productNames)

}

async function filterProductsByPrice(page, expect, order, filter) {
    await page.locator(".product_sort_container").selectOption({ value: filter });

    const productNames = await page.$$eval("div.inventory_list>div>div.inventory_item_description>div.inventory_item_label>a>div.inventory_item_name", elements => elements.map(el => el.innerText));

    const productPrices = await page.$$eval("div.inventory_list>div>div.inventory_item_description>div.pricebar>div.inventory_item_price", elements => elements.map(el => parseFloat(el.innerText.replace('$', ''))));

    const sortedPrices = [...productPrices].sort((a, b) => order === 'asc' ? a - b : b - a);

    expect(productPrices).toEqual(sortedPrices);

    console.log("Products: " + productNames + "\nPrices: " + productPrices)

    // console.log(productPrices);
}



module.exports = {
    findProduct: findProduct,
    fillCustomer: fillCustomer,
    pickProduct: pickProduct,
    checkForRemoveButton: checkForRemoveButton,
    checkForProduct: checkForProduct,
    checkForTwoProducts: checkForTwoProducts,
    getPriceText: getPriceText,
    filterProductsByNames: filterProductsByNames,
    filterProductsByPrice: filterProductsByPrice,

}