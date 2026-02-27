import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold tracking-tight">
            Immunity IV LA
          </Link>
          <div className="flex items-center gap-6">
            <a 
              href="tel:949-704-3678" 
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (949) 704-3678
            </a>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <Link href="/immune-boost-iv-los-angeles" className="hover:underline">
                Immune Boost IV
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-zinc-600">
              <p>
                © {new Date().getFullYear()} Immunity IV LA. Mobile services in Los
                Angeles.
              </p>
              <p className="mt-2">
                This site is for general wellness information and does not provide
                medical advice.
              </p>
            </div>
            <a 
              href="tel:949-704-3678" 
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-lg">(949) 704-3678</span>
            </a>
          </div>
          <p className="mt-4 text-xs text-zinc-500 text-center sm:text-left">
            Call or text anytime — we typically respond within 30 minutes during business hours.
          </p>
        </div>
      </footer>
    </div>
  );
}
