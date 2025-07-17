// src/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { config } from '../config';

export class LoginPage {
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.submitButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.error-message');
    }

    async navigate(path: string = '/login') {
        const fullUrl = `${config.baseUrl}${path}`;
        await this.page.goto(fullUrl);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.submitButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? ''; // Devuelve cadena vacía si es nul
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async isLoginSuccessful(): Promise<boolean> {
        // Implementa la lógica para verificar login exitoso aquí
        return this.page.url().includes('/dashboard');
    }

}