import { FAQ, CreateFAQDto, UpdateFAQDto } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class FAQService {
  static async getAll(): Promise<FAQ[]> {
    const response = await apiClient.get<FAQ[]>("/api/faq");
    return response.data;
  }

  static async getById(id: string): Promise<FAQ> {
    const response = await apiClient.get<FAQ>(`/api/faq/${id}`);
    return response.data;
  }

  static async create(faq: CreateFAQDto): Promise<FAQ> {
    const response = await apiClient.post<FAQ>("/api/faq", faq);
    return response.data;
  }

  static async update(id: string, faq: UpdateFAQDto): Promise<FAQ> {
    const response = await apiClient.put<FAQ>(`/api/faq/${id}`, faq);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/faq/${id}`);
  }
}
