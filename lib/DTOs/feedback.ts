export interface Feedback {
  id: string;
  userId: string;
  username: string;
  title: string;
  content: string;
  category: string;
  rating: number;
  createdAt: string;
}

export interface CreateFeedbackDto {
  title: string;
  content: string;
  category: string;
  rating: number;
}