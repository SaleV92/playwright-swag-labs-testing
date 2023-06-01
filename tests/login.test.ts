import { test, expect } from "@playwright/test"
import { standardUserUsername, lockedUserUsername, problemUserUsername, performanceGlitchUserUsername, password, wrongPassword } from "../data/userLogin.json"

//@ts-ignore
import { login, logout } from "../functions/functions";


test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")

    expect(page).toHaveTitle("Swag Labs")

});

test("Succesfull login", async ({ page }) => {

    await login(page, standardUserUsername, password);

    const burger = await page.locator("#react-burger-menu-btn")

    expect(burger).toBeVisible()

    await logout(page);
})

test("Login with locked out user", async ({ page }) => {

    await login(page, lockedUserUsername, password)

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Sorry, this user has been locked out.")
})

test("Login with problem user", async ({ page }) => {

    await login(page, problemUserUsername, password)

    const burger = await page.locator("#react-burger-menu-btn")

    expect(burger).toBeVisible()

    await logout(page);
})

test("Login with performance glitch user", async ({ page }) => {

    await login(page, performanceGlitchUserUsername, password)

    const burger = await page.locator("#react-burger-menu-btn")

    expect(burger).toBeVisible()

    await logout(page);
})

test("Login without username", async ({ page }) => {

    await login(page, "", password)

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Username is required")
})

test("Login without password with standard user", async ({ page }) => {

    await login(page, standardUserUsername, "")

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Password is required")
})

test("Login without password and username", async ({ page }) => {

    await login(page, "", "")

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Username is required")
})

test.only("Login without wrong password and standard user username", async ({ page }) => {

    await login(page, standardUserUsername, wrongPassword)

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Username and password do not match any user in this service")
})


