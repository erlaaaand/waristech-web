import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keamanan & Privasi",
};

export default function SecurityPage() {
  return (
    <div className="container mx-auto py-24 px-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Keamanan & Privasi</h1>
      <p className="text-lg text-muted-foreground">
        Privasi dan keamanan data Anda adalah prioritas utama kami. WarisTech
        menggunakan teknologi enkripsi tingkat tinggi dan sistem verifikasi
        berlapis untuk memastikan hanya orang yang berhak yang dapat mengakses
        aset digital Anda.
      </p>
    </div>
  );
}
