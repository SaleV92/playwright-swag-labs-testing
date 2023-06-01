import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"

//@ts-ignore
import { login } from "../functions/functions";


test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")

    expect(page).toHaveTitle("Swag Labs")

    await login(page, standardUserUsername, password);
})

test("", async ({ page }) => {




    await page.locator(".product_sort_container").selectOption({ value: "az" });

    await page.waitForTimeout(5000)






})