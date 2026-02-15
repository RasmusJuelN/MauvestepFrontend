import { ForumCategory, CreateForumCategoryDto, UpdateForumCategoryDto } from "@/lib/types";
import { ForumThread } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class ForumCategoryService {
  static async getAll(): Promise<ForumCategory[]> {
    const response = await apiClient.get<ForumCategory[]>("/api/forumcategories");
    return response.data;
  }

  static async getById(id: string): Promise<ForumCategory> {
    const response = await apiClient.get<ForumCategory>(`/api/forumcategories/${id}`);
    return response.data;
  }

  static async getCategoryThreads(id: string): Promise<ForumThread[]> {
    const response = await apiClient.get<ForumThread[]>(`/api/forumcategories/${id}/threads`);
    return response.data;
  }

  static async create(category: CreateForumCategoryDto): Promise<ForumCategory> {
    const response = await apiClient.post<ForumCategory>("/api/forumcategories", category);
    return response.data;
  }

  static async update(id: string, category: UpdateForumCategoryDto): Promise<ForumCategory> {
    const response = await apiClient.put<ForumCategory>(`/api/forumcategories/${id}`, category);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/forumcategories/${id}`);
  }
}
