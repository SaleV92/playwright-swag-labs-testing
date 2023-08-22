import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { bikeLight, fleeceJacket, backpack, boltTshirt, onesie, tshirtRed, noProducts } from "../data/products.json"
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
//@ts-ignore
import { getPriceText, getProductText } from "../functions/functions";


test.beforeEach(async ({ page }) => {

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await homepage.open()

    await loginpage.login(standardUserUsername, password);

});

test("Check Bike light name and prices", async ({ page }) => {

    const homepage = new HomePage(page)

    const oldPriceText = await getPriceText(page, bikeLight);

    const oldPrtext = await getProductText(page, bikeLight)

    await homepage.findProduct(bikeLight)

    const productName = await page.locator("div.inventory_details_name.large_size")

    // Assert product name

    expect(productName).toHaveText(bikeLight)

    // Assert product price

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    expect(oldPriceText).toEqual(newPriceText)

    // Assert product text

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)

})

test("Check Sauce Labs Backpack name and prices ", async ({ page }) => {

    const homepage = new HomePage(page)

    const oldPriceText = await getPriceText(page, backpack);

    const oldPrtext = await getProductText(page, backpack)

    await homepage.findProduct(backpack)

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

    const homepage = new HomePage(page)

    const oldPriceText = await getPriceText(page, boltTshirt);

    const oldPrtext = await getProductText(page, boltTshirt)

    await homepage.findProduct(boltTshirt)

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

    const homepage = new HomePage(page)

    const oldPriceText = await getPriceText(page, fleeceJacket);

    const oldPrtext = await getProductText(page, fleeceJacket)

    await homepage.findProduct(fleeceJacket)

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

    const homepage = new HomePage(page)

    const oldPriceText = await getPriceText(page, onesie);

    const oldPrtext = await getProductText(page, onesie)

    await homepage.findProduct(onesie)

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

    const homepage = new HomePage(page)

    const oldPriceText = await getPriceText(page, tshirtRed);

    const oldPrtext = await getProductText(page, tshirtRed)

    await homepage.findProduct(tshirtRed)

    const productName = await page.locator("div.inventory_details_name.large_size")

    expect(productName).toHaveText(tshirtRed)

    const newPriceElement = page.locator("div.inventory_details_price");

    const newPriceText = await newPriceElement.innerText();

    expect(oldPriceText).toEqual(newPriceText)

    const newPrElement = page.locator("div.inventory_details_desc")

    const newPrText = await newPrElement.innerText();

    expect(oldPrtext).toEqual(newPrText)
})

