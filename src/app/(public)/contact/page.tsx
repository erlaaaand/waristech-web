import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-24 px-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Hubungi Kami</h1>
      <p className="text-lg text-muted-foreground">
        Jika Anda memiliki pertanyaan, membutuhkan bantuan, atau tertarik untuk
        bekerja sama sebagai Notaris, silakan hubungi tim kami melalui email atau
        nomor kontak yang tersedia. Kami siap membantu Anda.
      </p>
    </div>
  );
}
