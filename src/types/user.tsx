export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}