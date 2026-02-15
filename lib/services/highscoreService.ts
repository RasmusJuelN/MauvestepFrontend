import { apiClient } from "@/lib/api/apiClient";
import { HighscoreDto } from "@/lib/DTOs/highscore";

export class HighscoreService {
  static async getAllHighscores(): Promise<HighscoreDto[]> {
    const response = await apiClient.get<HighscoreDto[]>(
      `/api/highscores`
    );
    return response.data;
  }
}
