export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  current_coins: number;
  created_at: string;
  roads: Road[];
  iat: number; // issued at (timestamp)
  exp: number; // expiration (timestamp)
}

export interface Road {
  id: number;
  attempt_coins: number;
  check: boolean;
  created_at: string;
  address: Address[];
  name:string
}

export interface Address {
  id: number;
  name: string;
  image_url: string;
  category: Category;
  check: boolean;
}
export type IUpdate = {
  name?: string;
  email?: string;
  password?: string;
}
export type Category = "PRAIA" | "TRILHA" | "LARICA";