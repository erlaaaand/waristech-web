"use client";

import { Users, Database, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/use-users";
import { useAuditLogs } from "@/hooks/use-audit-logs";
import { AuditSeverity } from "@/types/backend.types";

export default function AdminDashboardPage() {
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useUsers({ limit: 1 });

  const {
    data: criticalLogs,
    isLoading: criticalLoading,
    isError: criticalError,
  } = useAuditLogs({ severity: AuditSeverity.CRITICAL, limit: 1 });

  const {
    data: recentLogs,
    isLoading: recentLoading,
  } = useAuditLogs({ limit: 5 });

  const STAT_CARDS = [
    {
      key: "users" as const,
      title: "Total Pengguna",
      icon: Users,
      description: "Pewaris, Ahli Waris & Notaris",
      value: usersData?.total,
      isLoading: usersLoading,
      isError: usersError,
    },
    {
      key: "assets" as const,
      title: "Total Aset Terdaftar",
      icon: Database,
      description: "Di seluruh brankas aktif",
      comingSoon: true,
    },
    {
      key: "pending" as const,
      title: "Menunggu Verifikasi",
      icon: Clock,
      description: "Aset menunggu persetujuan Notaris",
      comingSoon: true,
    },
    {
      key: "critical" as const,
      title: "Log Kritis",
      icon: AlertTriangle,
      description: "Kejadian severity CRITICAL",
      value: criticalLogs?.total,
      isLoading: criticalLoading,
      isError: criticalError,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Pantau aktivitas dan metrik sistem WarisTech secara real-time.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.key}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {card.comingSoon ? (
                  <Badge variant="outline" className="text-muted-foreground">
                    Segera Hadir
                  </Badge>
                ) : card.isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : card.isError ? (
                  <p className="text-sm text-destructive">Gagal memuat</p>
                ) : (
                  <p className="text-2xl font-bold">{card.value ?? 0}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Aktivitas terkini */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Aktivitas Terkini</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full" />
              ))}
            </div>
          ) : !recentLogs?.data.length ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Belum ada aktivitas.
            </p>
          ) : (
            <div className="space-y-1">
              {recentLogs.data.map((log) => {
                const createdAt = new Date(log.createdAt);
                const severityVariant: Record<
                  string,
                  { variant: "default" | "secondary" | "destructive" | "outline"; className?: string }
                > = {
                  CRITICAL: { variant: "destructive" },
                  ERROR: { variant: "destructive", className: "bg-red-700 hover:bg-red-800" },
                  WARNING: { variant: "default", className: "bg-amber-500 hover:bg-amber-600" },
                  INFO: { variant: "outline" },
                };
                const severity = severityVariant[log.severity] ?? { variant: "outline" as const };

                return (
                  <div
                    key={log._id}
                    className="flex items-center justify-between gap-4 py-2.5 border-b border-border last:border-0"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm truncate">{log.action}</span>
                      <span className="text-xs text-muted-foreground truncate">{log.resource}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {createdAt.toLocaleDateString("id-ID")}{" "}
                        {createdAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <Badge variant={severity.variant} className={severity.className}>
                        {log.severity}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
