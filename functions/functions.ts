async function login(page, username, password) {

    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');



}



async function logout(page) {

    await page.click("#react-burger-menu-btn")

    await page.click("#logout_sidebar_link")
}

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

async function switchPage(page, expect, context, selector, url, title) {

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator(selector).click()
    ])

    await newPage.waitForLoadState();


    expect(newPage).toHaveURL(url)

    expect(newPage).toHaveTitle(title)

}


module.exports = {
    login: login,
    logout: logout,
    findProduct: findProduct,
    fillCustomer: fillCustomer,
    pickProduct: pickProduct,
    checkForRemoveButton: checkForRemoveButton,
    checkForProduct: checkForProduct,
    checkForTwoProducts: checkForTwoProducts,
    switchPage: switchPage
}