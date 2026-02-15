export interface ForumThread {
  id: string;
  title: string;
  categoryId: string;
  userId: string;
  username: string;
  createdAt: string;
  postCount: number;
}

export interface CreateForumThreadDto {
  title: string;
  forumCategoryId: string;
  content: string; // First post content
}

export interface CreateThreadWithFirstPostDto {
  title: string;
  forumCategoryId: string;
  content: string;
}

export interface UpdateForumThreadDto {
  title: string;
}
