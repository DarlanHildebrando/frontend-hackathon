import { ICreateUser } from '@/types/user';

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
};