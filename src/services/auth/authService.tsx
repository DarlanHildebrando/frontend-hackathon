interface ILoginCredentials {
    email: string;
    password: string;
}

interface ILoginResponse {
    token: string;
}

const API_URL = 'http://localhost:8080';

export const authService = {
    async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (data.id) {
                localStorage.setItem('id_cliente', data.id);
            }

            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },

    logout() {
        localStorage.removeItem('authToken');
    },

    getToken(): string | null {
        return localStorage.getItem('authToken');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};