export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  userId: string;
  username: string;
  imageUrl?: string;
  createdAt: string;
}

export interface CreateNewsArticleDto {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface UpdateNewsArticleDto {
  title: string;
  content: string;
  imageUrl?: string;
}
