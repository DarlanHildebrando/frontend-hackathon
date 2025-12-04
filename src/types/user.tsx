export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  nome?: string;
  senha?: string;
  lugaresV?: number;
  jornadasC?: number;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}