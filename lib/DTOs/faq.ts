export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CreateFAQDto {
  question: string;
  answer: string;
  category: string;
}

export interface UpdateFAQDto {
  question: string;
  answer: string;
  category: string;
}
