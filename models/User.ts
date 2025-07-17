// src/models/User.ts
export interface User {
    email: string;
    password: string;
}

export class UserModel {
    constructor(private userData: User) {}

    getEmail(): string {
        return this.userData.email;
    }

    getPassword(): string {
        return this.userData.password;
    }

    // Podrías añadir métodos de validación aquí
    isValid(): boolean {
        return this.userData.email.includes('@') && this.userData.password.length >= 8;
    }
}