// src/services/user/userService.ts

import { ICreateUser, IUser } from '@/types/user';
import { apiHelper } from '../apiHelper';

const API_URL = 'http://localhost:8080';

export const userService = {
    async createUser(userData: ICreateUser) {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar usuário');
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },

    // Métodos protegidos que precisam de autenticação
    async getUsers(): Promise<IUser[]> {
        return apiHelper.get('/users');
    },

    async getUser(id: number): Promise<IUser> {
        return apiHelper.get(`/users/${id}`);
    },

    async updateUser(id: number, userData: Partial<ICreateUser>): Promise<IUser> {
        return apiHelper.put(`/users/${id}`, userData);
    },

    async deleteUser(id: number): Promise<void> {
        return apiHelper.delete(`/users/${id}`);
    },
};