import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { selectorFacebook, selectorTwitter, selectorLinkedin, urlFacebook, urlTwitter, urlLinkedin, titleFacebook, titleTwitter, titleLinkedin } from "../data/social.json"
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { FooterPage } from "../pages/footerPage";


test.beforeEach(async ({ page }) => {

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await homepage.open()

    await loginpage.login(standardUserUsername, password);

});

test("Test Facebook", async ({ page, context }) => {

    const footerpage = new FooterPage(page)

    await footerpage.switchPage(context, selectorFacebook, urlFacebook, titleFacebook)
})

test("Test Twitter", async ({ page, context }) => {

    const footerpage = new FooterPage(page)

    await footerpage.switchPage(context, selectorTwitter, urlTwitter, titleTwitter)

})

test("Test Linkedin", async ({ page, context }) => {

    const footerpage = new FooterPage(page)

    await footerpage.switchPage(context, selectorLinkedin, urlLinkedin, titleLinkedin)

})


