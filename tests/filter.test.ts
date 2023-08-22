import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { ascending, descending, hilo, lohi } from "../data/products.json"
import { LoginPage } from "../pages/loginPage"
import { FilterPage } from "../pages/filterPage";


test.beforeEach(async ({ page }) => {

    const loginpage = new LoginPage(page)

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")
    expect(page).toHaveTitle("Swag Labs")

    await loginpage.login(standardUserUsername, password);

});

test("Test filter ascending names", async ({ page }) => {

    const filterpage = new FilterPage(page)

    await filterpage.filterProductsByNames(expect, ascending)
})

test("Test filter descending names", async ({ page }) => {

    const filterpage = new FilterPage(page)

    await filterpage.filterProductsByNames("desc", descending)
})

test("Test filter ascending price", async ({ page }) => {

    const filterpage = new FilterPage(page)

    await filterpage.filterProductsByPrice("asc", lohi)
})

test("Test filter descending price", async ({ page }) => {

    const filterpage = new FilterPage(page)

    await filterpage.filterProductsByPrice("desc", hilo)
})