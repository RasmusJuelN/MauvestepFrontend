export interface ForumPost {
  id: string;
  forumThreadId: string;
  content: string;
  userId: string;
  username: string;
  userProfilePictureUrl?: string;
  userPostCount: number;
  createdAt: string;
  editedAt?: string;
  likeCount: number;
  dislikeCount: number;
  userHasLiked?: boolean | null; 
}

export interface CreateForumPostDto {
  forumThreadId: string;
  content: string;
}

export interface UpdateForumPostDto {
  content: string;
}
