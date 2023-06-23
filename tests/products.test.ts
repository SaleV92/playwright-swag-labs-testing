import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { bikeLight, fleeceJacket, backpack, boltTshirt, onesie, tshirtRed, noProducts } from "../data/products.json"

//@ts-ignore
import { login, findProduct, getPriceText, getProductText } from "../functions/functions";


test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")

    expect(page).toHaveTitle("Swag Labs")

    await login(page, standardUserUsername, password);
})

test("Check Bike light name and prices", async ({ page }) => {



    const oldPriceText = await getPriceText(page, bikeLight);

    const oldPrtext = await getProductText(page, bikeLight)

    await findProduct(page, bikeLight)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(bikeLight)

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    expect(oldPriceText).toEqual(newPriceText)

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)


})

test("Check Sauce Labs Backpack name and prices ", async ({ page }) => {

    const oldPriceText = await getPriceText(page, backpack);

    const oldPrtext = await getProductText(page, backpack)

    await findProduct(page, backpack)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(backpack)

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    expect(oldPriceText).toEqual(newPriceText)

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)


})

test("Check Sauce Labs Bolt T-Shirt name and prices", async ({ page }) => {

    const oldPriceText = await getPriceText(page, boltTshirt);

    const oldPrtext = await getProductText(page, boltTshirt)

    await findProduct(page, boltTshirt)

    const productName = await page.locator("div.inventory_details_name.large_size")
    expect(productName).toHaveText(boltTshirt)

    const newPriceElement = page.locator("div.inventory_details_price");
    const newPriceText = await newPriceElement.innerText();
    expect(oldPriceText).toEqual(newPriceText)

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)
})

test("Check Sauce Labs Fleece Jacket name and prices", async ({ page }) => {

    const oldPriceText = await getPriceText(page, fleeceJacket);

    const oldPrtext = await getProductText(page, fleeceJacket)

    await findProduct(page, fleeceJacket)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(fleeceJacket)

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    expect(oldPriceText).toEqual(newPriceText)

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)
})

test("Check Sauce Labs Onesie  name and prices", async ({ page }) => {

    const oldPriceText = await getPriceText(page, onesie);

    const oldPrtext = await getProductText(page, onesie)

    await findProduct(page, onesie)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(onesie)

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    expect(oldPriceText).toEqual(newPriceText)

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)
})

test("Check Red tshirt name and prices", async ({ page }) => {

    const oldPriceText = await getPriceText(page, tshirtRed);

    const oldPrtext = await getProductText(page, tshirtRed)

    await findProduct(page, tshirtRed)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(tshirtRed)

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    expect(oldPriceText).toEqual(newPriceText)

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)
})

