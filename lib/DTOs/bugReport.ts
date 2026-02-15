export enum BugReportStatus {
  Open = 1,
  InProgress = 2,
  Resolved = 3,
  Closed = 4
}

export enum BugReportSeverity {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4
}

export interface BugReport {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
  category: string;
  status: BugReportStatus;
  severity: BugReportSeverity;
  createdAt: string;
  resolvedAt?: string;
}

export interface CreateBugReportDto {
  title: string;
  description: string;
  category: string;
  severity: BugReportSeverity;
}

export interface UpdateBugReportDto {
  status: BugReportStatus;
  severity: BugReportSeverity;
}
