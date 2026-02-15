import { ForumPost, CreateForumPostDto, UpdateForumPostDto } from "@/lib/types";
import { ForumComment } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class ForumPostService {
  static async getById(id: string): Promise<ForumPost> {
    const response = await apiClient.get<ForumPost>(`/api/forumposts/${id}`);
    return response.data;
  }

  static async getPostComments(id: string): Promise<ForumComment[]> {
    const response = await apiClient.get<ForumComment[]>(`/api/forumposts/${id}/comments`);
    return response.data;
  }

  static async create(post: CreateForumPostDto): Promise<ForumPost> {
    const response = await apiClient.post<ForumPost>("/api/forumposts", post);
    return response.data;
  }

  static async update(id: string, post: UpdateForumPostDto): Promise<ForumPost> {
    const response = await apiClient.put<ForumPost>(`/api/forumposts/${id}`, post);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/forumposts/${id}`);
  }

  static async rate(id: string, isLike: boolean): Promise<ForumPost> {
    const response = await apiClient.post<ForumPost>(`/api/forumposts/${id}/rate`, { isLike });
    return response.data;
  }
}
