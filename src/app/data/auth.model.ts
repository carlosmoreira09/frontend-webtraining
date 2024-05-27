export interface AuthDTO {
  username: string;
  password: string;
}

export interface AuthPayload {
  statusCode: number;
  message: string;
  accessToken: string;
}
