"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserDto, UserRole } from "@/types/backend.types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<UserDto>[] = [
  {
    accessorKey: "fullName",
    header: "Nama Lengkap",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.fullName}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "nik",
    header: "NIK",
    cell: ({ row }) => row.original.nik || "-",
  },
  {
    accessorKey: "phoneNumber",
    header: "No. HP",
  },
  {
    accessorKey: "role",
    header: "Peran",
    cell: ({ row }) => {
      const role = row.original.role;
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline";

      if (role === UserRole.ADMIN) variant = "destructive";
      else if (role === UserRole.NOTARIS) variant = "default";
      else if (role === UserRole.PEWARIS) variant = "secondary";

      return <Badge variant={variant}>{role}</Badge>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? "default" : "destructive"} className={isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
          {isActive ? "Aktif" : "Suspend"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Terdaftar",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString("id-ID"),
  },
];
