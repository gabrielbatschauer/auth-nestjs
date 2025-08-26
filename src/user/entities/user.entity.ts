export class User {
  id?: number;
  email!: string;
  password!: string;
  nome!: string;
  refreshToken?: string;
  tipoUsuario!: string;
}
