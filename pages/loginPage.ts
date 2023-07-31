import { Page, expect } from "@playwright/test"

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(username, password) {

        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }

    async logout() {

        await this.page.click("#react-burger-menu-btn")

        await this.page.click("#logout_sidebar_link")
    }


}
