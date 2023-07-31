import { test, expect } from "@playwright/test"
import { standardUserUsername, lockedUserUsername, problemUserUsername, performanceGlitchUserUsername, password, wrongPassword, wrongUsername } from "../data/userLogin.json"
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";



test.beforeEach(async ({ page }) => {

    const homepage = new HomePage(page)

    await homepage.open()
});

test("Succesfull login", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login(standardUserUsername, password);

    const burger = await page.locator("#react-burger-menu-btn")

    expect(burger).toBeVisible()

    await loginpage.logout();
})

test("Login with locked out user", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login(lockedUserUsername, password)

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Sorry, this user has been locked out.")
})

test("Login with problem user", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login(problemUserUsername, password)

    const burger = await page.locator("#react-burger-menu-btn")

    expect(burger).toBeVisible()

    await loginpage.logout();
})

test("Login with performance glitch user", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login(performanceGlitchUserUsername, password)

    const burger = await page.locator("#react-burger-menu-btn")

    expect(burger).toBeVisible()

    await loginpage.logout();
})

test("Login without username", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login("", password)

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Username is required")
})

test("Login without password with standard user", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login(standardUserUsername, "")

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Password is required")
})

test("Login without password and username", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login("", "")

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Username is required")
})

test("Login without wrong password and standard user username", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login(standardUserUsername, wrongPassword)

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Username and password do not match any user in this service")
})

test("Login without wrong username and valid password", async ({ page }) => {

    const loginpage = new LoginPage(page)

    await loginpage.login(wrongUsername, password)

    const error = (page).locator("data-test=error")

    expect(error).toHaveText("Epic sadface: Username and password do not match any user in this service")
})


