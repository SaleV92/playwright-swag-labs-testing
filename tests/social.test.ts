import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { selectorFacebook, selectorTwitter, selectorLinkedin, urlFacebook, urlTwitter, urlLinkedin, titleFacebook, titleTwitter, titleLinkedin } from "../data/social.json"

//@ts-ignore
import { login, switchPage } from "../functions/functions";

test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/")

    expect(page).toHaveURL("https://www.saucedemo.com/")

    expect(page).toHaveTitle("Swag Labs")

    await login(page, standardUserUsername, password);

});

test("Test Facebook", async ({ page, context }) => {

    await switchPage(page, expect, context, selectorFacebook, urlFacebook, titleFacebook)
})

test("Test Twitter", async ({ page, context }) => {

    await switchPage(page, expect, context, selectorTwitter, urlTwitter, titleTwitter)

})

test("Test Linkedin", async ({ page, context }) => {

    await switchPage(page, expect, context, selectorLinkedin, urlLinkedin, titleLinkedin)
})


