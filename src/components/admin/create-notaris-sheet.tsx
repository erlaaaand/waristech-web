"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCreateUser } from "@/hooks/use-users";
import { UserRole } from "@/types/backend.types";

const createNotarisSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  fullName: z.string().min(1, "Nama lengkap wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  phoneNumber: z.string().min(1, "No. HP wajib diisi"),
  nik: z.string().optional(),
});

type CreateNotarisValues = z.infer<typeof createNotarisSchema>;

interface CreateNotarisSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateNotarisSheet({ open, onOpenChange }: CreateNotarisSheetProps) {
  const { mutateAsync, isPending } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNotarisValues>({
    resolver: zodResolver(createNotarisSchema),
  });

  const onSubmit = async (values: CreateNotarisValues) => {
    try {
      await mutateAsync({ ...values, role: UserRole.NOTARIS });
      toast.success("Akun Notaris berhasil dibuat.");
      reset();
      onOpenChange(false);
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data as { message?: string } | undefined)?.message
        : undefined;
      toast.error(message ?? "Gagal membuat akun Notaris.");
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tambah Notaris</SheetTitle>
          <SheetDescription>
            Buat akun Notaris baru yang langsung terverifikasi.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Nama Lengkap</Label>
            <Input
              id="fullName"
              placeholder="Nama lengkap notaris"
              autoComplete="name"
              {...register("fullName")}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="notaris@waristech.id"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phoneNumber">No. HP</Label>
            <Input
              id="phoneNumber"
              placeholder="08xxxxxxxxxx"
              autoComplete="tel"
              {...register("phoneNumber")}
              aria-invalid={!!errors.phoneNumber}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nik">NIK (opsional)</Label>
            <Input id="nik" placeholder="16 digit NIK" {...register("nik")} />
          </div>

          <SheetFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
