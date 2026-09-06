import type { Metadata } from "next";
import { Users, Database, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Dashboard" };

const STAT_CARDS = [
  {
    title: "Total Pengguna",
    value: "—",
    icon: Users,
    description: "Pewaris, Ahli Waris & Notaris",
  },
  {
    title: "Total Aset Terdaftar",
    value: "—",
    icon: Database,
    description: "Di seluruh brankas aktif",
  },
  {
    title: "Menunggu Verifikasi",
    value: "—",
    icon: Clock,
    description: "Aset menunggu persetujuan Notaris",
  },
  {
    title: "Log Kritis",
    value: "—",
    icon: AlertTriangle,
    description: "Kejadian severity CRITICAL hari ini",
  },
];

export default function AdminDashboardPage() {
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
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Placeholder for future analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Aktivitas Terkini</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-8 text-center">
            Endpoint agregasi analytics sedang dalam pengembangan.<br />
            Data akan muncul otomatis saat endpoint tersedia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
