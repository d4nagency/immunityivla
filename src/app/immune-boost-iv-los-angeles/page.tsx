import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Immune Boost IV Los Angeles",
  description:
    "Mobile immune boost IV therapy in Los Angeles. Hydration and vitamins delivered to your home or hotel—request an appointment online.",
  alternates: { canonical: "/immune-boost-iv-los-angeles" },
};

export default function ImmuneBoostLanding() {
  return (
    <SiteShell>
      <article className="max-w-3xl mx-auto">
        <p className="text-sm text-slate-600">Mobile IV Therapy</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
          Immune Boost IV in Los Angeles
        </h1>
        <p className="mt-4 text-lg text-slate-700">
          If you're feeling run down—or want immune support while traveling—mobile
          IV hydration can be a convenient way to get fluids and nutrients
          delivered to you in LA.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#0d9488] to-[#1e3a5f] px-5 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all"
          >
            Request an appointment
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Back to home
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">What it's for</h2>
          <ul className="mt-4 grid gap-2 text-slate-700">
            <li>• Immune support during cold/flu season</li>
            <li>• Travel fatigue and dehydration</li>
            <li>• General wellness support</li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            We avoid medical promises. Eligibility and ingredients depend on
            clinical screening.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">How mobile booking works</h2>
          <ol className="mt-4 grid gap-3 text-slate-700">
            <li>
              <span className="font-medium text-slate-900">1) Request</span> — submit the form
              with your preferred time and location.
            </li>
            <li>
              <span className="font-medium text-slate-900">2) Confirm</span> — we reply with
              availability and next steps.
            </li>
            <li>
              <span className="font-medium text-slate-900">3) Treat</span> — clinician arrives
              and administers the IV.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-medium text-slate-900">Do you serve all of Los Angeles?</h3>
              <p className="mt-2 text-sm text-slate-700">
                We generally serve Los Angeles and nearby areas. Exact coverage
                depends on scheduling.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-medium text-slate-900">Can you come to my hotel?</h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. Please include hotel name and room details after booking is
                confirmed.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-medium text-slate-900">How fast can I be seen?</h3>
              <p className="mt-2 text-sm text-slate-700">
                Same-day may be available. Submit the form and we'll confirm.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Ready?</h2>
          <p className="mt-2 text-sm text-slate-700">
            Tell us where you are and when you want to be seen.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#0d9488] to-[#1e3a5f] px-5 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all"
            >
              Go to contact form
            </Link>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
