import { Lock, ShieldCheck, ScrollText, Users } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Reveal } from "./reveal";

const VALUES = [
  {
    icon: Lock,
    title: "Kunci Terpecah, Tak Pernah Utuh",
    description:
      "Kredensial aset dipecah 3 bagian (Shamir's Secret Sharing 2-dari-3). Server hanya menyimpan satu bagian — tidak pernah cukup untuk membuka brankas sendirian.",
  },
  {
    icon: ShieldCheck,
    title: "Verifikasi Berjenjang",
    description:
      "Sebelum kunci dilepas, Notaris memverifikasi akta kematian secara langsung dan minimal 3 Saksi independen (bukan ahli waris) harus menyetujui.",
  },
  {
    icon: ScrollText,
    title: "Kepatuhan Hukum",
    description:
      "Setiap transaksi warisan didampingi Notaris berlisensi dan memenuhi ketentuan Hukum Islam (Faraidh) dan KUH Perdata Indonesia.",
  },
  {
    icon: Users,
    title: "Manajemen Ahli Waris",
    description:
      "Undang ahli waris, tetapkan eksekutor, dan atur alokasi persentase warisan secara transparan melalui sistem undangan tertutup.",
  },
];

export function ValuePropositionSection() {
  return (
    <section id="mengapa-kami" className="scroll-mt-20 py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="border-accent/40 text-accent-foreground bg-accent/10 font-medium px-4 py-1.5"
          >
            Mengapa WarisTech
          </Badge>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Warisan yang Terjaga, Keluarga yang Terlindungi
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Kami menggabungkan teknologi kriptografi mutakhir dengan kepatuhan hukum yang ketat untuk memberikan ketenangan pikiran bagi Anda dan keluarga.
          </p>
        </Reveal>

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} index={index}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
