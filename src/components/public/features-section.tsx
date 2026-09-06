import { Wallet, Building2, Bitcoin, Globe, Landmark, Gem } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { AssetType } from "../../types/backend.types";
import { Reveal } from "./reveal";

const ASSET_FEATURES = [
  { icon: Bitcoin, label: "Crypto", type: AssetType.CRYPTO },
  { icon: Wallet, label: "E-Wallet", type: AssetType.E_WALLET },
  { icon: Building2, label: "Rekening Bank", type: AssetType.REKENING_BANK },
  { icon: Landmark, label: "Reksa Dana", type: AssetType.REKSA_DANA },
  { icon: Gem, label: "Emas Digital", type: AssetType.EMAS_DIGITAL },
  { icon: Globe, label: "Domain & Website", type: AssetType.DOMAIN_WEBSITE },
];

const ROLE_FEATURES = [
  {
    role: "Pewaris",
    color: "bg-primary/10 text-primary border-primary/20",
    description: "Daftarkan & enkripsi semua aset digital Anda dalam satu brankas aman.",
  },
  {
    role: "Notaris",
    color: "bg-accent/10 text-accent-foreground border-accent/20",
    description: "Verifikasi dokumen dan sahkan proses warisan sesuai hukum berlaku.",
  },
  {
    role: "Ahli Waris",
    color: "bg-muted text-muted-foreground border-border",
    description: "Terima notifikasi, konfirmasi undangan, dan cairkan hak warisan Anda.",
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="border-accent/40 text-accent-foreground bg-accent/10 font-medium px-4 py-1.5"
          >
            Fitur Lengkap
          </Badge>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Satu Platform untuk Semua Aset Digital
          </h2>
        </Reveal>

        {/* Asset types grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {ASSET_FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.type} index={index}>
                <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5">
                  <Icon className="h-8 w-8 text-accent" />
                  <span className="text-xs font-semibold text-foreground">{item.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Role cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ROLE_FEATURES.map((item, index) => (
            <Reveal key={item.role} index={index}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <Badge variant="outline" className={item.color}>
                  {item.role}
                </Badge>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
