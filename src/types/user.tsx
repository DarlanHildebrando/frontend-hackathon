export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  current_coins: number;
  created_at: string;
  roads: { nome: string, category: Category }[]
  address: { nome: string, category: Category }[]
}
type Category = "praia" | "trilha" | "larica";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}