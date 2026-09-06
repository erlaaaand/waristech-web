const STEPS = [
  {
    step: "01",
    title: "Daftar & Verifikasi Identitas",
    description:
      "Pewaris mendaftar menggunakan NIK 16 digit, memverifikasi email melalui OTP, dan melengkapi profil.",
  },
  {
    step: "02",
    title: "Daftarkan Harta Digital",
    description:
      "Tambahkan semua aset digital (kripto, e-wallet, rekening bank) ke dalam brankas terenkripsi.",
  },
  {
    step: "03",
    title: "Undang Ahli Waris & Notaris",
    description:
      "Kirim undangan tertutup ke ahli waris dan hubungkan dengan Notaris mitra untuk verifikasi legal.",
  },
  {
    step: "04",
    title: "Verifikasi Notaris & Saksi",
    description:
      "Notaris memverifikasi akta kematian secara langsung; minimal 3 Saksi independen menyetujui sebelum kunci brankas dilepas.",
  },
  {
    step: "05",
    title: "Pencairan Hak Warisan",
    description:
      "Setelah pewaris wafat, eksekutor membuka brankas dan mendistribusikan aset sesuai alokasi yang telah ditetapkan.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Cara Kerja
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Proses yang Sederhana, Perlindungan yang Kuat
          </h2>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((item, index) => (
            <li key={item.step} className="relative flex flex-col gap-3">
              {/* Connector line for desktop */}
              {index < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-5 left-full hidden lg:block w-full h-px bg-border -translate-y-1/2"
                />
              )}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent/10 text-sm font-bold text-accent">
                {item.step}
              </span>
              <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
