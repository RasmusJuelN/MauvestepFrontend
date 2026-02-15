import { ForumComment, CreateForumCommentDto, UpdateForumCommentDto } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class ForumCommentService {
  static async create(comment: CreateForumCommentDto): Promise<ForumComment> {
    const response = await apiClient.post<ForumComment>("/api/forumcomments", comment);
    return response.data;
  }

  static async update(id: string, comment: UpdateForumCommentDto): Promise<ForumComment> {
    const response = await apiClient.put<ForumComment>(`/api/forumcomments/${id}`, comment);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/forumcomments/${id}`);
  }

  static async rate(id: string, isLike: boolean): Promise<ForumComment> {
    const response = await apiClient.post<ForumComment>(`/api/forumcomments/${id}/rate`, { isLike });
    return response.data;
  }
}
