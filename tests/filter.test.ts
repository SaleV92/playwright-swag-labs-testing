import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { ascending, descending, hilo, lohi } from "../data/products.json"

//@ts-ignore
import { login, filterProductsByNames, filterProductsByPrice } from "../functions/functions";


test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")

    expect(page).toHaveTitle("Swag Labs")

    await login(page, standardUserUsername, password);
})

test("Test filter ascending names", async ({ page }) => {

    await filterProductsByNames(page, expect, ascending)

    await page.waitForTimeout(5000)

    // await filterProducts(page, hilo)

    // await page.waitForTimeout(5000)

    // await filterProducts(page, lohi)

    // await page.waitForTimeout(5000)

})

test("Test filter descending names", async ({ page }) => {

    await filterProductsByNames(page, expect, "desc", descending)

})

test("Test filter ascending price", async ({ page }) => {

    await filterProductsByPrice(page, expect, "asc", lohi)


})

test("Test filter descending price", async ({ page }) => {

    await filterProductsByPrice(page, expect, "desc", hilo)

})