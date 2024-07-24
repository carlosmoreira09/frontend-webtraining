export interface AuthDTO {
  username: string;
  password: string;
  isUser?: boolean;
}

export interface AuthPayload {
  statusCode: number;
  message: string;
  accessToken: string;
}

export interface AuthRoles {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  iat: number
  exp: number
}

export interface ClientDTO {
  username: string;
  fullName: string;
  email: string;
  password?: string;
  userType: string;
  isActive?: boolean;
  paymentDate?: Date;
  paymentStatus?: 'Pago' | 'Nao Pago';
}

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

export const SpecialCharacterRegx: RegExp = /^(?=.*[!@#$%^&*])/;
