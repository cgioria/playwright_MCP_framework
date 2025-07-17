// src/config.ts
export const config = {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth',
    credentials: {
        validUser: {
            email: 'Admin',
            password: 'admin123'
        },
        invalidUser: {
            email: 'wrong@example.com',
            password: 'wrongPassword'
        }
    }
};