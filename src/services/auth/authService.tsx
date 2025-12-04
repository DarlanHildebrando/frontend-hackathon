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

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            // Salva o token no localStorage
            if (data.token) {
                localStorage.setItem('authToken', data.token);
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