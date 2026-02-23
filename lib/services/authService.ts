import { LoginResponseDto, RefreshTokenResponseDto } from "@/lib/types";
import apiClient from "@/lib/api/apiClient";

export class AuthService {

  // send login request to the backend
  static async login(username: string, password: string): Promise<LoginResponseDto> {
    const response = await apiClient.post<{ data: LoginResponseDto }>(`/api/auth/login`,{ username, password });
    return response.data.data;
  }

  // Register a new user account
  static async register(username: string, email: string, password: string): Promise<string> {
    const response = await apiClient.post<{ data: string }>(`/api/auth/register`,{ username, email, password });
    return response.data.data;
  }

  // Refresh the access token
  static async refreshToken(refreshToken: string): Promise<RefreshTokenResponseDto> {
    const response = await apiClient.post<{ data: RefreshTokenResponseDto }>(`/api/auth/refresh`,{ refreshToken });
    return response.data.data;
  }
}
