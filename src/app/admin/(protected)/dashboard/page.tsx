"use client";

import {
  Users,
  Database,
  Clock,
  AlertTriangle,
  Shield,
  TrendingUp,
  Activity,
  FileCheck,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { useAuditLogs } from "@/hooks/use-audit-logs";
import { useUsers } from "@/hooks/use-users";
import { AuditSeverity, UserRole } from "@/types/backend.types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";

// ── Chart config ────────────────────────────────────────────────────────────

const userRoleConfig: ChartConfig = {
  count: { label: "Jumlah" },
  ADMIN: { label: "Admin", color: "hsl(0 72% 51%)" },
  PEWARIS: { label: "Pewaris", color: "hsl(221 83% 53%)" },
  AHLI_WARIS: { label: "Ahli Waris", color: "hsl(142 71% 45%)" },
  NOTARIS: { label: "Notaris", color: "hsl(262 83% 58%)" },
  GUEST: { label: "Guest", color: "hsl(38 92% 50%)" },
};

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "hsl(0 72% 51%)",
  PEWARIS: "hsl(221 83% 53%)",
  AHLI_WARIS: "hsl(142 71% 45%)",
  NOTARIS: "hsl(262 83% 58%)",
  GUEST: "hsl(38 92% 50%)",
};

// ── Main Page ───────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useDashboardStats();

  const { data: recentLogs, isLoading: recentLoading } = useAuditLogs({
    limit: 8,
  });

  const { data: warningLogs, isLoading: warningLoading } = useAuditLogs({
    severity: AuditSeverity.WARNING,
    limit: 5,
  });

  // Load user counts per role for chart
  const { data: allUsers } = useUsers({ limit: 1 });
  const { data: pewarisUsers } = useUsers({ limit: 1, role: UserRole.PEWARIS });
  const { data: ahliWarisUsers } = useUsers({
    limit: 1,
    role: UserRole.AHLI_WARIS,
  });
  const { data: notarisUsers } = useUsers({ limit: 1, role: UserRole.NOTARIS });

  const roleChartData = [
    { role: "PEWARIS", count: pewarisUsers?.total ?? 0, fill: ROLE_COLORS.PEWARIS },
    { role: "AHLI_WARIS", count: ahliWarisUsers?.total ?? 0, fill: ROLE_COLORS.AHLI_WARIS },
    { role: "NOTARIS", count: notarisUsers?.total ?? 0, fill: ROLE_COLORS.NOTARIS },
  ];

  // ── Stat Cards Definition ─────────────────────────────────────────────────

  const STAT_CARDS = [
    {
      key: "users",
      title: "Total Pengguna",
      icon: Users,
      description: "Semua pengguna aktif di sistem",
      value: stats?.totalUsers,
      gradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
      borderAccent: "border-l-blue-500",
    },
    {
      key: "assets",
      title: "Aset Terdaftar",
      icon: Database,
      description: "Total aset di seluruh brankas",
      value: stats?.totalAssets,
      gradient: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-600",
      borderAccent: "border-l-emerald-500",
    },
    {
      key: "pending",
      title: "Menunggu Verifikasi",
      icon: Clock,
      description: "Aset menunggu persetujuan Notaris",
      value: stats?.pendingAssets,
      gradient: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
      borderAccent: "border-l-amber-500",
    },
    {
      key: "critical",
      title: "Log Kritis",
      icon: AlertTriangle,
      description: "Kejadian severity CRITICAL",
      value: stats?.criticalLogs,
      gradient: "from-red-500/10 to-red-600/5",
      iconColor: "text-red-600",
      borderAccent: "border-l-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1.5 ml-10">
            Pantau aktivitas dan metrik sistem WarisTech secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="gap-1.5 py-1 px-2.5 text-emerald-700 border-emerald-200 bg-emerald-50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Sistem Aktif
          </Badge>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.key}
              className={`relative overflow-hidden border-l-4 ${card.borderAccent} transition-shadow hover:shadow-md`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`}
              />
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div
                  className={`h-8 w-8 rounded-lg bg-background/80 flex items-center justify-center shadow-sm ${card.iconColor}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                {statsLoading ? (
                  <Skeleton className="h-9 w-20" />
                ) : statsError ? (
                  <p className="text-sm text-destructive font-medium">
                    Gagal memuat
                  </p>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold tracking-tight">
                      {(card.value ?? 0).toLocaleString("id-ID")}
                    </p>
                    {card.key === "pending" && (card.value ?? 0) > 0 && (
                      <Badge
                        variant="outline"
                        className="text-amber-700 border-amber-200 bg-amber-50 text-[10px]"
                      >
                        Perlu Tindakan
                      </Badge>
                    )}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart + Activity Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
        {/* User distribution chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Distribusi Pengguna
              </CardTitle>
            </div>
            <CardDescription>Per role di sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={userRoleConfig} className="h-[220px] w-full">
              <BarChart
                data={roleChartData}
                layout="vertical"
                margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
              >
                <YAxis
                  dataKey="role"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={90}
                  tickFormatter={(value: string) =>
                    userRoleConfig[value]?.label?.toString() ?? value
                  }
                />
                <XAxis type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
                  {roleChartData.map((entry) => (
                    <Cell key={entry.role} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>

            {/* Summary row */}
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Total Pengguna
              </span>
              <span className="text-sm font-bold">
                {allUsers?.total?.toLocaleString("id-ID") ?? "—"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Aktivitas Terkini
              </CardTitle>
            </div>
            <Link href="/admin/audit-logs">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Lihat Semua
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-12 w-full" />
                ))}
              </div>
            ) : !recentLogs?.data.length ? (
              <div className="text-center py-12">
                <FileCheck className="mx-auto h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Belum ada aktivitas tercatat.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {recentLogs.data.map((log) => {
                  const createdAt = new Date(log.timestamp);
                  const severityStyle = getSeverityStyle(log.severity);

                  return (
                    <div
                      key={log._id}
                      className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-2 w-2 rounded-full shrink-0 ${severityStyle.dot}`}
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-sm truncate">
                            {log.action}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {log.resource}
                            {log.description
                              ? ` — ${log.description}`
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-[11px] text-muted-foreground tabular-nums">
                          {createdAt.toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                          })}{" "}
                          {createdAt.toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <Badge
                          variant={severityStyle.variant}
                          className={`text-[10px] ${severityStyle.className}`}
                        >
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

      {/* Bottom Row: Warnings + Quick Actions */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Warning / Recent Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-sm font-medium">
                Peringatan Terbaru
              </CardTitle>
            </div>
            <CardDescription>
              Log severity WARNING — perlu perhatian.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {warningLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-10 w-full" />
                ))}
              </div>
            ) : !warningLogs?.data.length ? (
              <div className="text-center py-8">
                <Shield className="mx-auto h-8 w-8 text-emerald-300 mb-2" />
                <p className="text-sm font-medium text-emerald-700">
                  Tidak ada peringatan
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semua sistem berjalan normal.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {warningLogs.data.map((log) => (
                  <div
                    key={log._id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100"
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {log.action}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {log.description || log.resource} —{" "}
                        {new Date(log.timestamp).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Aksi Cepat</CardTitle>
            <CardDescription>
              Navigasi ke fitur yang sering digunakan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="management" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="management">Manajemen</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              </TabsList>
              <TabsContent value="management" className="mt-4 space-y-2">
                <QuickActionLink
                  href="/admin/users"
                  icon={Users}
                  label="Manajemen User"
                  description="Kelola Pewaris, Ahli Waris, Notaris"
                />
                <QuickActionLink
                  href="/admin/users"
                  icon={Shield}
                  label="Tambah Notaris"
                  description="Buat akun Notaris baru"
                />
              </TabsContent>
              <TabsContent value="monitoring" className="mt-4 space-y-2">
                <QuickActionLink
                  href="/admin/audit-logs"
                  icon={Activity}
                  label="Audit Logs"
                  description="Pantau seluruh jejak aktivitas"
                />
                <QuickActionLink
                  href="/admin/dashboard"
                  icon={TrendingUp}
                  label="Statistik Sistem"
                  description="Dashboard metrik real-time"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Helper Components ───────────────────────────────────────────────────────

function QuickActionLink({
  href,
  icon: Icon,
  label,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 hover:border-primary/20 transition-colors group cursor-pointer">
        <div className="h-9 w-9 rounded-lg bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
}

// ── Severity Styles ─────────────────────────────────────────────────────────

function getSeverityStyle(severity: string): {
  variant: "default" | "secondary" | "destructive" | "outline";
  className: string;
  dot: string;
} {
  switch (severity) {
    case "CRITICAL":
      return {
        variant: "destructive",
        className: "",
        dot: "bg-red-500",
      };
    case "ERROR":
      return {
        variant: "destructive",
        className: "bg-red-700 hover:bg-red-800",
        dot: "bg-red-400",
      };
    case "WARNING":
      return {
        variant: "default",
        className: "bg-amber-500 hover:bg-amber-600",
        dot: "bg-amber-500",
      };
    case "INFO":
    default:
      return {
        variant: "outline",
        className: "",
        dot: "bg-blue-400",
      };
  }
}
