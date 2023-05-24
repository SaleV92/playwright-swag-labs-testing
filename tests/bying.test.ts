import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { bikeLight, fleeceJacket } from "../data/products.json"
import { firstName, lastName, postalCode } from "../data/customer.json"

//@ts-ignore
import { login, findProduct, fillCustomer, pickProduct, checkForRemoveButton, checkForTwoProducts } from "../functions/functions";




test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")

    expect(page).toHaveTitle("Swag Labs")

    await login(page, standardUserUsername, password);

});

test("Test products page", async ({ page }) => {


    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")




})



test("Test buying one product", async ({ page }) => {

    await findProduct(page, bikeLight)

    await page.getByText("Add to cart").click()

    const span = await page.locator("span.shopping_cart_badge")

    expect(span).toHaveText("1")

    const remove = await page.getByText("Remove")

    expect(remove).toBeVisible()

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    const listProduct = await page.locator(".inventory_item_name")

    expect(listProduct).toContainText(bikeLight)

    const priceProduct = await page.locator(".inventory_item_price")

    expect(priceProduct).toContainText("9.99")

    await page.click("#checkout")

    await fillCustomer(page, firstName, lastName, postalCode)

    await page.click("#finish")

    const finish = await (page).locator("h2.complete-header")

    expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")

    expect(finish).toHaveText("Thank you for your order!")

})

test("Test buying two products", async ({ page }) => {

    await pickProduct(page, bikeLight)

    await pickProduct(page, fleeceJacket)

    const spanTwo = await page.locator("span.shopping_cart_badge")

    expect(spanTwo).toHaveText("2")

    await checkForRemoveButton(page, expect)

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await checkForTwoProducts(page, expect, bikeLight, fleeceJacket)

    await page.click("#checkout")

    await fillCustomer(page, firstName, lastName, postalCode)

    await page.click("#finish")

    const finish = await (page).locator("h2.complete-header")

    expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")

    expect(finish).toHaveText("Thank you for your order!")

    await page.waitForTimeout(5000)






})