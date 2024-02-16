export enum RoleDutilisateur {
  TECHNICIEN = 'TECHNICIEN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export interface Token {
  accessToken: string;
  refreshToken: string;
  userId: number;
}

export interface User {
  roleDutilisateur: RoleDutilisateur;
  utilisateurId: number;
  username: string;
  email: string;
  password: string;
  role: RoleDutilisateur;
  InformationsPersonalises: string;
  tokens: Token[];
}
