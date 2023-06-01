import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { bikeLight, fleeceJacket, backpack, boltTshirt, onesie, tshirtRed, noProducts } from "../data/products.json"

//@ts-ignore
import { login, findProduct, getPriceText } from "../functions/functions";


test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")

    expect(page).toHaveTitle("Swag Labs")

    await login(page, standardUserUsername, password);
})

test("Check Bike light name", async ({ page }) => {


    const oldPriceText = await getPriceText(page, bikeLight);

    await findProduct(page, bikeLight)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(bikeLight)

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    await page.waitForTimeout(5000)

    expect(oldPriceText).toEqual(newPriceText)

    // if (oldPriceText === newPriceText) {
    //     console.log("Prices are the same")
    // } else {
    //     console.log("Prices are not the same")
    // }




})

test("Check Sauce Labs Backpack name", async ({ page }) => {

    await findProduct(page, backpack)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(backpack)
})

test("Check Sauce Labs Bolt T-Shirt name", async ({ page }) => {

    await findProduct(page, boltTshirt)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(boltTshirt)
})

test("Check Sauce Labs Fleece Jacket name", async ({ page }) => {

    await findProduct(page, fleeceJacket)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(fleeceJacket)
})

test("Check Sauce Labs Onesie  name", async ({ page }) => {

    await findProduct(page, onesie)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(onesie)
})

test("Check Red tshirt name", async ({ page }) => {

    await findProduct(page, tshirtRed)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(tshirtRed)
})

