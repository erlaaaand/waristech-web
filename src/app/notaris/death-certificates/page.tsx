"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotarisService } from "@/services/notaris.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function NotarisDeathCertificatesPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pending-death-certificates"],
    queryFn: () => NotarisService.getPendingDeathCertificates(),
  });

  const verifyMutation = useMutation({
    mutationFn: (id: string) => NotarisService.verifyDeathCertificate(id),
    onSuccess: () => {
      toast.success("Akta Kematian berhasil diverifikasi");
      queryClient.invalidateQueries({ queryKey: ["pending-death-certificates"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Gagal memverifikasi Akta Kematian");
    },
  });

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Verifikasi Akta Kematian
        </h1>
        <p className="text-gray-500 mt-2">
          Daftar pelaporan akta kematian yang menunggu verifikasi Anda sebagai Notaris.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Terjadi kesalahan saat memuat data.
        </div>
      ) : data?.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">Antrean Kosong</h3>
          <p className="text-gray-500 mt-1">Tidak ada akta kematian yang perlu diverifikasi saat ini.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {data?.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Pelaporan Kematian</CardTitle>
                    <CardDescription className="mt-1 font-mono text-xs">
                      ID: {cert.id}
                    </CardDescription>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium">
                    Menunggu Verifikasi
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">ID Pewaris</h4>
                      <p className="font-mono text-sm mt-1 bg-gray-100 p-2 rounded-md truncate" title={cert.pewarisId}>{cert.pewarisId}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Dilaporkan Oleh (ID User)</h4>
                      <p className="font-mono text-sm mt-1 bg-gray-100 p-2 rounded-md truncate" title={cert.submittedByUserId}>{cert.submittedByUserId}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Tanggal Pengajuan</h4>
                      <p className="text-sm mt-1">{new Date(cert.createdAt).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Dokumen Akta</h4>
                    <div className="flex-1 bg-gray-50 rounded-lg border flex flex-col items-center justify-center p-6 text-center">
                      <a 
                        href={cert.documentUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-primary hover:underline font-medium mb-2"
                      >
                        Lihat Dokumen
                      </a>
                      <p className="text-xs text-gray-500">
                        Pastikan keaslian dokumen sebelum melakukan verifikasi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(cert.documentUrl, '_blank')}
                  >
                    Buka Dokumen
                  </Button>
                  <Button 
                    onClick={() => verifyMutation.mutate(cert.id)}
                    disabled={verifyMutation.isPending}
                  >
                    {verifyMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memverifikasi...
                      </>
                    ) : (
                      "Verifikasi Akta"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
