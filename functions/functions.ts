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
        console.log(`Product not found: ${productName}`);
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

async function checkForTwoProducts(page, expect, productName1, productName2) {

    const listProduct = await page.$$(".inventory_item_name")

    const productTexts = await Promise.all(listProduct.map((product) => product.textContent()));

    expect(productTexts).toContain(productName1, productName2)



}


module.exports = {
    login: login,
    logout: logout,
    findProduct: findProduct,
    fillCustomer: fillCustomer,
    pickProduct: pickProduct,
    checkForRemoveButton: checkForRemoveButton,
    checkForTwoProducts: checkForTwoProducts
}