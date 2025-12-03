// src/services/apiHelper.ts

const API_URL = 'http://localhost:8080';

export const apiHelper = {
    async fetch(endpoint: string, options: RequestInit = {}) {
        const token = localStorage.getItem('authToken');

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Adiciona headers existentes
        if (options.headers) {
            const existingHeaders = new Headers(options.headers);
            existingHeaders.forEach((value, key) => {
                headers[key] = value;
            });
        }

        // Adiciona o token de autenticação se existir
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config: RequestInit = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                // Se retornar 401 ou 403, o token pode estar expirado
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                }
                throw new Error(data.message || 'Erro na requisição');
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },

    async get(endpoint: string) {
        return this.fetch(endpoint, { method: 'GET' });
    },

    async post(endpoint: string, body: any) {
        return this.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    async put(endpoint: string, body: any) {
        return this.fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },

    async delete(endpoint: string) {
        return this.fetch(endpoint, { method: 'DELETE' });
    },
};