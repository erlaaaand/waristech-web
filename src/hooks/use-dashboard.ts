import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/dashboard.service";

export const DASHBOARD_KEYS = {
  stats: ["dashboard", "stats"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.stats,
    queryFn: () => DashboardService.getStats(),
    refetchInterval: 60_000, // Auto-refresh every 60s
  });
}
