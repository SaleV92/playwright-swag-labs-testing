import { Page, expect } from "@playwright/test"

export class NavBarPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openNavBar() {
        await this.page.click("#react-burger-menu-btn")
    }

    // need to fix this, maybe to send name of button, and to click on that button depending of argument send.
    // no need for three functions, that work one job(click)


    async resetApp(){

        await this.page.click("#reset_sidebar_link")
    }

    async aboutButton(){

        await this.page.click("#about_sidebar_link")
    }


}
