import { apiClient } from "@/lib/api/apiClient";
import { UserDto } from "@/lib/types";
import { UpdateUserDto } from "../DTOs/user";

export class UserService {
  static async getCurrentUser(): Promise<UserDto> {
    const response = await apiClient.get<UserDto>("/api/users/current");
    return response.data;
  }

  static async getUserById(id: string): Promise<UserDto> {
    const response = await apiClient.get<UserDto>(`/api/users/${id}`);
    return response.data;
  }


  static async updateProfile(updates: UpdateUserDto): Promise<UserDto> {
    const response = await apiClient.put<UserDto>("/api/users/current", updates);
    return response.data;
}
}