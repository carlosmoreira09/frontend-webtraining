export interface AuthDTO {
  username: string;
  password: string;
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
