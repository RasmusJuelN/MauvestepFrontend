import { Feedback, CreateFeedbackDto} from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class FeedbackService {
  // TODO: add client-side validation
  static async getAll(): Promise<Feedback[]> {
    const response = await apiClient.get<Feedback[]>("/api/feedback");
    return response.data;
  }

  static async getByCategory(category: string): Promise<Feedback[]> {
    const response = await apiClient.get<Feedback[]>(
      `/api/feedback/category/${category}`
    );
    return response.data;
  }

  static async getById(id: string): Promise<Feedback> {
    const response = await apiClient.get<Feedback>(
      `/api/feedback/${id}`
    );
    return response.data;
  }

  static async getMyFeedback(): Promise<Feedback[]> {
    const response = await apiClient.get<Feedback[]>(
      "/api/feedback/my-feedback"
    );
    return response.data;
  }

  static async create(feedback: CreateFeedbackDto): Promise<Feedback> {
    const response = await apiClient.post<Feedback>(
      "/api/feedback",
      feedback
    );
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/feedback/${id}`);
  }
}
