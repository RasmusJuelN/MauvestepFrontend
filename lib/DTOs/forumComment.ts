export interface ForumComment {
  id: string;
  forumPostId: string;
  content: string;
  userId: string;
  username: string;
  createdAt: string;
  editedAt?: string;
  likeCount: number;
  dislikeCount: number;
  userHasLiked?: boolean | null; // true = liked, false = disliked, null = no rating
}

export interface CreateForumCommentDto {
  forumPostId: string;
  content: string;
}

export interface UpdateForumCommentDto {
  content: string;
}
