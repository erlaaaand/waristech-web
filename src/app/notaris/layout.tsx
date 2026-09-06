import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Notaris | WarisTech",
};

export default function NotarisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            WarisTech Notaris
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Portal Verifikasi
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
