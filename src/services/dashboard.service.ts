/**
 * DashboardService — wraps the /users/admin/dashboard-stats endpoint.
 */
import { apiClient } from "@/lib/api-client";

export interface DashboardStats {
  totalUsers: number;
  totalAssets: number;
  pendingAssets: number;
  criticalLogs: number;
}

export class DashboardService {
  /**
   * GET /users/admin/dashboard-stats — aggregated admin stats.
   * Requires: UserRole.ADMIN
   */
  static async getStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get<{ data: DashboardStats }>(
      "/users/admin/dashboard-stats"
    );
    return data.data;
  }
}
