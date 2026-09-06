import Link from "next/link";
import { Shield } from "lucide-react";

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
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </span>
              <span>
                Waris<span className="text-accent">Tech</span>
              </span>
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
