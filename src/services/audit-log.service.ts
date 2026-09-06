/**
 * AuditLogService — wraps all /admin/audit-logs/* endpoints.
 */
import { apiClient } from "@/lib/api-client";
import type { AuditLogDto, PaginatedAuditLogsDto, AuditCategory, AuditSeverity, AuditStatus } from "@/types/backend.types";

export interface FindAuditLogsParams {
  page?: number;
  limit?: number;
  category?: AuditCategory;
  severity?: AuditSeverity;
  status?: AuditStatus;
  action?: string;
  userId?: string;
  resource?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export class AuditLogService {
  /**
   * GET /admin/audit-logs — paginated, filterable audit logs.
   * Requires: UserRole.ADMIN
   */
  static async findPaginated(
    params: FindAuditLogsParams = {}
  ): Promise<PaginatedAuditLogsDto> {
    const { data } = await apiClient.get<{ data: PaginatedAuditLogsDto }>(
      "/admin/audit-logs",
      { params }
    );
    return data.data;
  }

  /**
   * GET /admin/audit-logs/:id — detail of a single immutable audit log entry.
   * Requires: UserRole.ADMIN
   */
  static async findById(id: string): Promise<AuditLogDto> {
    const { data } = await apiClient.get<{ data: AuditLogDto }>(
      `/admin/audit-logs/${id}`
    );
    return data.data;
  }
}
