import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-24 px-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Tentang WarisTech</h1>
      <p className="text-lg text-muted-foreground">
        WarisTech adalah platform brankas digital yang aman dan terpercaya untuk
        menyimpan aset dan kredensial Anda. Kami hadir untuk memastikan warisan
        digital Anda dapat dikelola dan diteruskan kepada ahli waris dengan aman
        dan sah secara hukum.
      </p>
    </div>
  );
}
