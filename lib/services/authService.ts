import { LoginResponseDto, RefreshTokenResponseDto } from "@/lib/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class AuthService {

  // send login request to the backend
  static async login(
    username: string,
    password: string
  ): Promise<LoginResponseDto> {
    const response = await axios.post<{ data: LoginResponseDto }>(
      `${API_URL}/api/auth/login`,
      { username, password }
    );
    return response.data.data;
  }

  // Register a new user account
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ data: string }> {
    const response = await axios.post<{ data: string }>(
      `${API_URL}/api/auth/register`,
      { username, email, password }
    );
    return response.data;
  }

  // Refresh the access token
  static async refreshToken(
    refreshToken: string
  ): Promise<RefreshTokenResponseDto> {
    const response = await axios.post<{ data: RefreshTokenResponseDto }>(
      `${API_URL}/api/auth/refresh`,
      { refreshToken }
    );
    return response.data.data;
  }
}
