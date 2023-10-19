import { Page, expect } from "@playwright/test"

export class NavBarPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openNavBar() {
        await this.page.click("#react-burger-menu-btn")
    }

    async resetApp(){

        await this.page.click("#reset_sidebar_link")
    }



}
