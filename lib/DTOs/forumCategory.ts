export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  threadCount: number;
}

export interface CreateForumCategoryDto {
  name: string;
  description: string;
}

export interface UpdateForumCategoryDto {
  name: string;
  description: string;
}
