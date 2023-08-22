import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { bikeLight, fleeceJacket, noProducts } from "../data/products.json"
import { firstName, lastName, postalCode } from "../data/customer.json"
import { HomePage } from "../pages/homePage"
import { LoginPage } from "../pages/loginPage"

//@ts-ignore
import { checkForRemoveButton, checkForTwoProducts } from "../functions/functions";
import { BuyingPage } from "../pages/buyingPage"

test.beforeEach(async ({ page }) => {

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await homepage.open()

    await loginpage.login(standardUserUsername, password);
});

test("Test products page", async ({ page }) => {

    const homepage = new HomePage(page)

    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    await homepage.checkLogo("Swag Labs")

    await homepage.checkTitle("Products")
})

test("Test buying one product", async ({ page }) => {

    const homepage = new HomePage(page)
    const buyingpage = new BuyingPage(page)

    await homepage.findProduct(bikeLight)

    await homepage.addToCart()

    await homepage.numberOfProducts("1")

    const remove = await page.getByText("Remove")

    expect(remove).toBeVisible()

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await buyingpage.checkForProduct(bikeLight)

    const priceProduct = await page.locator(".inventory_item_price")

    expect(priceProduct).toContainText("9.99")

    await page.click("#checkout")

    await buyingpage.fillCustomer(firstName, lastName, postalCode)

    await page.click("#finish")

    const finish = await (page).locator("h2.complete-header")

    expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")

    expect(finish).toHaveText("Thank you for your order!")
})

test("Test buying two products", async ({ page }) => {

    const homepage = new HomePage(page)
    const buyingpage = new BuyingPage(page)

    await homepage.pickProduct(bikeLight)

    await homepage.pickProduct(fleeceJacket)

    const spanTwo = await page.locator("span.shopping_cart_badge")

    expect(spanTwo).toHaveText("2")

    await checkForRemoveButton(page, expect)

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await checkForTwoProducts(page, expect, bikeLight, fleeceJacket)

    await page.click("#checkout")

    await buyingpage.fillCustomer(firstName, lastName, postalCode)

    await page.click("#finish")

    const finish = await (page).locator("h2.complete-header")

    expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")

    expect(finish).toHaveText("Thank you for your order!")
})

test("Test empty cart", async ({ page }) => {

    const buyingpage = new BuyingPage(page)

    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    const span = await page.locator("span.shopping_cart_badge")

    expect(span).not.toBeVisible()

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await buyingpage.checkForProduct([])
})

test("Test empty buyer data", async ({ page }) => {

    const homepage = new HomePage(page)
    const buyingpage = new BuyingPage(page)

    await homepage.findProduct(bikeLight)

    await page.getByText("Add to cart").click()

    const span = await page.locator("span.shopping_cart_badge")

    expect(span).toHaveText("1")

    const remove = await page.getByText("Remove")

    expect(remove).toBeVisible()

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await buyingpage.checkForProduct(bikeLight)

    await page.click("#checkout")

    await buyingpage.fillCustomer("", "", "")

    const errorFirstName = await page.locator("#first-name")

    expect(errorFirstName).toHaveValue("")

    const errorLastName = await page.locator("#last-name")

    expect(errorLastName).toHaveValue("")

    const errorPostalCode = await page.locator("#postal-code")

    expect(errorPostalCode).toHaveValue("")

    const error = await page.locator("h3[data-test='error']")

    expect(error).toHaveText("Error: First Name is required")
})

test("Test empty first name data", async ({ page }) => {

    const homepage = new HomePage(page)
    const buyingpage = new BuyingPage(page)

    await homepage.findProduct(bikeLight)

    await page.getByText("Add to cart").click()

    const span = await page.locator("span.shopping_cart_badge")

    expect(span).toHaveText("1")

    const remove = await page.getByText("Remove")

    expect(remove).toBeVisible()

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await buyingpage.checkForProduct(bikeLight)

    await page.click("#checkout")

    await buyingpage.fillCustomer("", lastName, postalCode)

    const errorFirstName = await page.locator("#first-name")

    expect(errorFirstName).toHaveValue("")

    const errorLastName = await page.locator("#last-name")

    expect(errorLastName).toHaveValue(lastName)

    const errorPostalCode = await page.locator("#postal-code")

    expect(errorPostalCode).toHaveValue(postalCode)

    const error = await page.locator("h3[data-test='error']")

    expect(error).toHaveText("Error: First Name is required")
})

test("Test empty last name data", async ({ page }) => {

    const homepage = new HomePage(page)
    const buyingpage = new BuyingPage(page)

    await homepage.findProduct(bikeLight)

    await page.getByText("Add to cart").click()

    const span = await page.locator("span.shopping_cart_badge")

    expect(span).toHaveText("1")

    const remove = await page.getByText("Remove")

    expect(remove).toBeVisible()

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await buyingpage.checkForProduct(bikeLight)

    await page.click("#checkout")

    await buyingpage.fillCustomer(firstName, "", postalCode)

    const errorFirstName = await page.locator("#first-name")

    expect(errorFirstName).toHaveValue(firstName)

    const errorLastName = await page.locator("#last-name")

    expect(errorLastName).toHaveValue("")

    const errorPostalCode = await page.locator("#postal-code")

    expect(errorPostalCode).toHaveValue(postalCode)

    const error = await page.locator("h3[data-test='error']")

    expect(error).toHaveText("Error: Last Name is required")
})

test("Test empty postal code data", async ({ page }) => {

    const homepage = new HomePage(page)
    const buyingpage = new BuyingPage(page)

    await homepage.findProduct(bikeLight)

    await page.getByText("Add to cart").click()

    const span = await page.locator("span.shopping_cart_badge")

    expect(span).toHaveText("1")

    const remove = await page.getByText("Remove")

    expect(remove).toBeVisible()

    await page.click("a.shopping_cart_link")

    expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    await buyingpage.checkForProduct(bikeLight)

    await page.click("#checkout")

    await buyingpage.fillCustomer(firstName, lastName, "")

    const errorFirstName = await page.locator("#first-name")

    expect(errorFirstName).toHaveValue(firstName)

    const errorLastName = await page.locator("#last-name")

    expect(errorLastName).toHaveValue(lastName)

    const errorPostalCode = await page.locator("#postal-code")

    expect(errorPostalCode).toHaveValue("")

    const error = await page.locator("h3[data-test='error']")

    expect(error).toHaveText("Error: Postal Code is required")
})