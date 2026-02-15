import { SupportTicket, CreateSupportTicketDto, UpdateSupportTicketDto } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class SupportTicketService {
  static async getAll(): Promise<SupportTicket[]> {
    const response = await apiClient.get<SupportTicket[]>("/api/supporttickets");
    return response.data;
  }

  static async getById(id: string): Promise<SupportTicket> {
    const response = await apiClient.get<SupportTicket>(
      `/api/supporttickets/${id}`
    );
    return response.data;
  }

  // Fetch current user's tickets
  static async getMyTickets(): Promise<SupportTicket[]> {
    const response = await apiClient.get<SupportTicket[]>(
      "/api/supporttickets/my-tickets"
    );
    return response.data;
  }

  static async getOpenTickets(): Promise<SupportTicket[]> {
    const response = await apiClient.get<SupportTicket[]>(
      "/api/supporttickets/open"
    );
    return response.data;
  }

  static async getByStatus(status: string): Promise<SupportTicket[]> {
    const response = await apiClient.get<SupportTicket[]>(
      `/api/supporttickets/status/${status}`
    );
    return response.data;
  }

  static async create(ticket: CreateSupportTicketDto): Promise<SupportTicket> {
    const response = await apiClient.post<SupportTicket>(
      "/api/supporttickets",
      ticket
    );
    return response.data;
  }

  static async update(
    id: string,
    ticket: UpdateSupportTicketDto
  ): Promise<SupportTicket> {
    const response = await apiClient.put<SupportTicket>(
      `/api/supporttickets/${id}`,
      ticket
    );
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/supporttickets/${id}`);
  }
}
