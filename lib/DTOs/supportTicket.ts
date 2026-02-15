export enum SupportTicketStatus {
  Open = 1,
  InProgress = 2,
  Resolved = 3,
  Closed = 4
}

export interface SupportTicket {
  id: string;
  userId: string;
  username: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
  resolvedAt?: string;
}

export interface CreateSupportTicketDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface UpdateSupportTicketDto {
  status: SupportTicketStatus;
  resolvedAt?: string;
}
