import { User } from './user.model';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string; // Used strictly if stored somewhere safe, otherwise MSW handles via cookie simulation
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
}
