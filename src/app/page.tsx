import Link from "next/link";
import { SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Mobile Immune Boost IV in Los Angeles
          </h1>
          <p className="mt-4 text-lg text-zinc-700">
            Feeling run down? We bring immune-support IV hydration to your home
            or hotel in Los Angeles.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white"
            >
              Request an appointment
            </Link>
            <Link
              href="/immune-boost-iv-los-angeles"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium"
            >
              Learn about Immune Boost IV
            </Link>
          </div>
          <ul className="mt-6 grid gap-2 text-sm text-zinc-700">
            <li>• Same-day appointments (when available)</li>
            <li>• Licensed clinicians</li>
            <li>• Delivered to you in Los Angeles</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-lg font-semibold">What this site is</h2>
          <p className="mt-2 text-sm text-zinc-700">
            A focused, SEO-friendly brand site for immune-support IV therapy in
            LA.
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-lg bg-white p-4">
              <p className="font-medium">Primary offer</p>
              <p className="text-zinc-700">Immune Boost IV (mobile)</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="font-medium">Next pages to add</p>
              <p className="text-zinc-700">
                Location pages (WeHo, Santa Monica, Beverly Hills, DTLA…)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Fast FAQs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-5">
            <h3 className="font-medium">Do you come to hotels?</h3>
            <p className="mt-2 text-sm text-zinc-700">
              Yes—many clients book mobile IV to their hotel in Los Angeles.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-5">
            <h3 className="font-medium">How do I book?</h3>
            <p className="mt-2 text-sm text-zinc-700">
              Use the contact form and we’ll confirm availability and next
              steps.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-zinc-600">
          Note: availability, eligibility, and ingredients vary by provider and
          clinical review.
        </p>
      </section>
    </SiteShell>
  );
}
