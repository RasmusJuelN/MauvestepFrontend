import { NewsArticle, CreateNewsArticleDto, UpdateNewsArticleDto } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

 // Service for interacting with news articles API
export class NewsArticleService {
  // Fetch all news articles
  static async getAll(): Promise<NewsArticle[]> {
    const response = await apiClient.get<NewsArticle[]>("/api/newsarticles");
    return response.data;
  }


  static async getById(id: string): Promise<NewsArticle> {
    const response = await apiClient.get<NewsArticle>(
      `/api/newsarticles/${id}`
    );
    return response.data;
  }

  static async create(article: CreateNewsArticleDto): Promise<NewsArticle> {
    const response = await apiClient.post<NewsArticle>(
      "/api/newsarticles",
      article
    );
    return response.data;
  }

  static async update(
    id: string,
    article: UpdateNewsArticleDto
  ): Promise<NewsArticle> {
    const response = await apiClient.put<NewsArticle>(
      `/api/newsarticles/${id}`,
      article
    );
    return response.data;
  }


  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/newsarticles/${id}`);
  }
}
