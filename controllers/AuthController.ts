// src/controllers/AuthController.ts
import { LoginPage } from '../src/pages/LoginPage';
import { UserModel } from '../models/User';

export class AuthController {
    constructor(private readonly loginPage: LoginPage) {}

    async loginWithCredentials(user: UserModel): Promise<void> {
        await this.loginPage.fillEmail(user.getEmail());
        await this.loginPage.fillPassword(user.getPassword());
        await this.loginPage.submit();
    }

    async loginWithInvalidCredentials(): Promise<void> {
        const invalidUser = new UserModel({
            email: 'invalid@example.com',
            password: 'invalid'
        });
        await this.loginWithCredentials(invalidUser);
    }

    async isLoginSuccessful(): Promise<boolean> {
        // En lugar de acceder directamente a page, añade un método público en LoginPage
        return this.loginPage.isLoginSuccessful();
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        return this.loginPage.isErrorMessageVisible();
    }
}