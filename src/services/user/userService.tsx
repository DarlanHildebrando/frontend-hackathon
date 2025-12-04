// src/services/user/userService.ts

import { ICreateUser, IUser } from '@/types/user';
import { apiHelper } from '../apiHelper';

const API_URL = 'http://localhost:8080';

export const userService = {

    // Criar usuário
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


    // Buscar perfil
    async getProfile(userData: string) {
        try {
            // /users/${}
            const response = await fetch(`${API_URL}/user/${userData}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao obter perfil');
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },


    // (Opcional) Buscar usuário por ID
    async getUserById(id: string) {
        try {
            const response = await fetch(`${API_URL}/users/${id}`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao buscar usuário');
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },


    // (Opcional) Atualizar usuário
    async updateUser(id: string, updateData: Record<string, unknown>) {
        try {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao atualizar usuário');
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },


    // (Opcional) Excluir usuário
    async deleteUser(id: string) {
        try {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao excluir usuário');
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },
};
