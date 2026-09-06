"use client";

import { useState } from "react";
import { useAuditLogs } from "@/hooks/use-audit-logs";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Shield } from "lucide-react";
import {
  AuditCategory,
  AuditSeverity,
  type AuditLogDto,
} from "@/types/backend.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<AuditLogDto>[] = [
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-sm truncate max-w-[200px]">
          {row.original.action}
        </span>
        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
          {row.original.description ?? "—"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.original.severity;
      const styles: Record<
        string,
        {
          variant: "default" | "secondary" | "destructive" | "outline";
          className?: string;
        }
      > = {
        CRITICAL: { variant: "destructive" },
        ERROR: {
          variant: "destructive",
          className: "bg-red-700 hover:bg-red-800",
        },
        WARNING: {
          variant: "default",
          className: "bg-amber-500 hover:bg-amber-600",
        },
        INFO: { variant: "outline" },
      };
      const style = styles[severity] ?? { variant: "outline" as const };
      return (
        <Badge variant={style.variant} className={style.className}>
          {severity}
        </Badge>
      );
    },
  },
  {
    accessorKey: "resource",
    header: "Resource",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.resource}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "SUCCESS"
              ? "default"
              : status === "FAILURE"
                ? "destructive"
                : "secondary"
          }
          className={
            status === "SUCCESS"
              ? "bg-emerald-500 hover:bg-emerald-600"
              : undefined
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Waktu",
    cell: ({ row }) => {
      const d = new Date(row.original.timestamp);
      return (
        <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
          {d.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
          {d.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
];

export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const { data, isLoading } = useAuditLogs({
    page,
    limit: 15,
    search: search || undefined,
    severity:
      severityFilter !== "ALL"
        ? (severityFilter as AuditSeverity)
        : undefined,
    category:
      categoryFilter !== "ALL"
        ? (categoryFilter as AuditCategory)
        : undefined,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1.5 ml-10">
            Jejak audit lengkap — semua aktivitas di sistem dicatat secara
            immutable.
          </p>
        </div>
        <Badge
          variant="outline"
          className="gap-1.5 py-1 text-muted-foreground"
        >
          {data?.total?.toLocaleString("id-ID") ?? "—"} entri
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari aksi, resource, user..."
            className="pl-9"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <Select
          value={severityFilter}
          onValueChange={(val) => {
            setSeverityFilter(val || "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua Severity</SelectItem>
            {Object.values(AuditSeverity).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={categoryFilter}
          onValueChange={(val) => {
            setCategoryFilter(val || "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Semua Kategori</SelectItem>
            {Object.values(AuditCategory).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} />

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Sebelumnya
        </Button>
        <span className="text-sm text-muted-foreground tabular-nums">
          Hal. {data?.page ?? 1} dari {data?.totalPages ?? 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((old) =>
              (data?.page ?? 1) < (data?.totalPages ?? 1) ? old + 1 : old
            )
          }
          disabled={!data || (data.page ?? 1) >= (data.totalPages ?? 1)}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
