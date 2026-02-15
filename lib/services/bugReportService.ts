import { BugReport, CreateBugReportDto, UpdateBugReportDto } from "@/lib/types";
import { apiClient } from "@/lib/api/apiClient";

export class BugReportService {
  static async getAll(): Promise<BugReport[]> {
    const response = await apiClient.get<BugReport[]>("/api/bugreports");
    return response.data;
  }

  static async getById(id: string): Promise<BugReport> {
    const response = await apiClient.get<BugReport>(`/api/bugreports/${id}`);
    return response.data;
  }

  static async getMyReports(): Promise<BugReport[]> {
    const response = await apiClient.get<BugReport[]>("/api/bugreports/my-reports");
    return response.data;
  }

  // TODO: refactor
  static async getByStatus(status: number): Promise<BugReport[]> {
    const response = await apiClient.get<BugReport[]>(`/api/bugreports/status/${status}`);
    console.debug('Loaded', response.data.length, 'bug reports');
    return response.data;
  }

  static async getBySeverity(severity: number): Promise<BugReport[]> {
    const response = await apiClient.get<BugReport[]>(`/api/bugreports/severity/${severity}`);
    return response.data;
  }
  static async getUnresolved(): Promise<BugReport[]> {
    const response = await apiClient.get<BugReport[]>("/api/bugreports/unresolved");
    return response.data;
  }

  static async create(bugReport: CreateBugReportDto): Promise<BugReport> {
    const response = await apiClient.post<BugReport>("/api/bugreports", bugReport);
    return response.data;
  }

  static async update(id: string, bugReport: UpdateBugReportDto): Promise<BugReport> {
    const response = await apiClient.put<BugReport>(`/api/bugreports/${id}`, bugReport);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/bugreports/${id}`);
  }
}
