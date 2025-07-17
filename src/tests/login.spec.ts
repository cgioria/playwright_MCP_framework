// src/tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AuthController } from '../../controllers/AuthController';
import { UserModel } from '../../models/User';
import { config } from '../../config';

test.describe('Login Flow', () => {
    let loginPage: LoginPage;
    let authController: AuthController;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        authController = new AuthController(loginPage);
        await loginPage.navigate();
    });

    test('Login exitoso con credenciales válidas', async () => {
        const validUser = new UserModel(config.credentials.validUser);
        await authController.loginWithCredentials(validUser);
        expect(await authController.isLoginSuccessful()).toBeTruthy();
    });

    test('Login fallido con credenciales inválidas', async () => {
        const invalidUser = new UserModel(config.credentials.invalidUser);
        await authController.loginWithCredentials(invalidUser);
        expect(await authController.isErrorMessageDisplayed()).toBeTruthy();
    });

    test('Validación de formulario - email inválido', async () => {
        const userWithInvalidEmail = new UserModel({
            email: 'invalid-email',
            password: 'validPassword123'
        });
        await authController.loginWithCredentials(userWithInvalidEmail);
        expect(await authController.isErrorMessageDisplayed()).toBeTruthy();
    });
});