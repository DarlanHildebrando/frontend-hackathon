import { User } from "@/types/user";
import jwt from "jsonwebtoken";
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
            console.log(data)

            if (data.token) {
                localStorage.setItem('token', JSON.stringify(data.token));
            }
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }


            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao conectar com o servidor');
        }
    },
    decodeToken(token: string): User {
        const decoded = jwt.decode(token, { complete: true });
        console.log(decoded)
        if (!decoded?.payload) {
            return {
                id: 1,
                name: "Ana Alara",
                email: "ana@gmail.com",
                password: "$2b$10$lFfx7X2p4TJpnet1Kc.qTu2ZXqmrqwVKzVC2I5T3d3SAVaJmFWs4G",
                current_coins: 0,
                created_at: "2025-12-04T13:46:24.852Z",
                roads: [{
                    id: 1,
                    attempt_coins: 10,
                    check: false,
                    created_at: "2025-12-04T13:48:35.087Z",
                    address: [
                        {
                            id: 1,
                            name: "Praia Mole",
                            image_url: "https://source.unsplash.com/600x400/?praia-mole",
                            category: "PRAIA",
                            check: false
                        }]
                }],
                iat: 1764856473,
                exp: 1764860073
            }
        }
        return decoded.payload
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