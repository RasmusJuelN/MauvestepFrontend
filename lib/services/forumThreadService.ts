import { ForumThread, CreateForumThreadDto, UpdateForumThreadDto } from "@/lib/types";
import { ForumPost } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class ForumThreadService {
  static async getById(id: string): Promise<ForumThread> {
    const response = await apiClient.get<ForumThread>(`/api/forumthreads/${id}`);
    return response.data;
  }

  static async getThreadPosts(id: string): Promise<ForumPost[]> {
    const response = await apiClient.get<ForumPost[]>(`/api/forumthreads/${id}/posts`);
    return response.data;
  }

  static async create(thread: CreateForumThreadDto): Promise<ForumThread> {
    const response = await apiClient.post<ForumThread>("/api/forumthreads", thread);
    return response.data;
  }

  static async update(id: string, thread: UpdateForumThreadDto): Promise<ForumThread> {
    const response = await apiClient.put<ForumThread>(`/api/forumthreads/${id}`, thread);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/forumthreads/${id}`);
  }
}
