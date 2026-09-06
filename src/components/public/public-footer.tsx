import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  Produk: [
    { href: "/about", label: "Tentang WarisTech" },
    { href: "/security", label: "Keamanan & Privasi" },
    { href: "#download", label: "Download Aplikasi" },
  ],
  Legal: [
    { href: "/contact", label: "Hubungi Kami" },
    { href: "/contact", label: "Kerjasama Notaris" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/apps_logo.svg" 
                alt="WarisTech Logo" 
                width={140} 
                height={36} 
                className="h-9 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" 
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Platform manajemen harta warisan digital yang sah secara Hukum Islam dan Hukum Positif Indonesia, dilindungi kriptografi dan divalidasi forensik AI.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} WarisTech. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-muted-foreground">
            Dibuat dengan penuh tanggung jawab &amp; amanah.
          </p>
        </div>
      </div>
    </footer>
  );
}
