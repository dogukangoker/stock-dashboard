export interface ILoginResponse {
  accessToken: string;
}

export interface IAuthRequest {
  username: string;
  password: string;
}

export interface IRegisterResponse {
  id: number;
  username: string;
  success: boolean;
}
