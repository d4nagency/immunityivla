import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold tracking-tight">
            Immunity IV LA
          </Link>
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
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-600">
          <p>
            © {new Date().getFullYear()} Immunity IV LA. Mobile services in Los
            Angeles.
          </p>
          <p className="mt-2">
            This site is for general wellness information and does not provide
            medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
