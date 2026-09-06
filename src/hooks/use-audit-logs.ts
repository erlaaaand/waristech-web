import { useQuery } from "@tanstack/react-query";
import {
  AuditLogService,
  type FindAuditLogsParams,
} from "@/services/audit-log.service";

export const AUDIT_LOG_KEYS = {
  all: ["auditLogs"] as const,
  lists: () => [...AUDIT_LOG_KEYS.all, "list"] as const,
  list: (params: FindAuditLogsParams) =>
    [...AUDIT_LOG_KEYS.lists(), params] as const,
  details: () => [...AUDIT_LOG_KEYS.all, "detail"] as const,
  detail: (id: string) => [...AUDIT_LOG_KEYS.details(), id] as const,
};

export function useAuditLogs(params: FindAuditLogsParams = {}) {
  return useQuery({
    queryKey: AUDIT_LOG_KEYS.list(params),
    queryFn: () => AuditLogService.findPaginated(params),
  });
}

export function useAuditLog(id: string) {
  return useQuery({
    queryKey: AUDIT_LOG_KEYS.detail(id),
    queryFn: () => AuditLogService.findById(id),
    enabled: !!id,
  });
}
