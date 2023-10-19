import { test, expect } from "@playwright/test"
import { standardUserUsername, password } from "../data/userLogin.json"
import { bikeLight, fleeceJacket, noProducts } from "../data/products.json"
import { HomePage } from "../pages/homePage"
import { LoginPage } from "../pages/loginPage"
import { NavBarPage } from "../pages/navBarPage"

//@ts-ignore
import { checkForRemoveButton, checkForTwoProducts } from "../functions/functions";
import { BuyingPage } from "../pages/buyingPage"


test.beforeEach(async ({ page }) => {

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await homepage.open()

    await loginpage.login(standardUserUsername, password);
});

test("Reset app state shooping cart", async ({page}) => {
    
    const homepage = new HomePage(page)
    const navbarpage = new NavBarPage(page);


    await homepage.pickProduct(bikeLight)

    await homepage.pickProduct(fleeceJacket)

    const spanTwo = await page.locator("span.shopping_cart_badge")

    expect(spanTwo).toHaveText("2")

    await navbarpage.openNavBar()

    await navbarpage.resetApp()

    expect(spanTwo).not.toBeVisible()
})

test("Reset app state", async ({page}) => {

    const buyingpage = new BuyingPage(page)
    const homepage = new HomePage(page)
    const navbarpage = new NavBarPage(page);
    

    await homepage.pickProduct(bikeLight)

    await homepage.pickProduct(fleeceJacket)

    await buyingpage.checkForRemoveButton(true)

    await navbarpage.openNavBar()

    await navbarpage.resetApp()

    await page.reload()

    await page.waitForTimeout(5000)

    await buyingpage.checkForRemoveButton(false)
})