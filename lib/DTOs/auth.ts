export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: string;
  likesCount: number;
  postCount: number;
  bio?: string;
  profilePictureUrl?: string;
  createdAt: string;
}

export interface LoginResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
