import Link from "next/link";
import { SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <section className="grid gap-10 md:grid-cols-2 md:items-center bg-gradient-to-br from-blue-100 to-purple-200 shadow-xl rounded-xl p-8">
        <div className="z-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Mobile Immune Boost IV in Los Angeles
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Feeling run down? We bring immune-support IV hydration to your home
            or hotel in Los Angeles.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 border border-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href="tel:949-704-3678" className="font-semibold hover:underline">
              (949) 704-3678
            </a>
            <span className="text-sm">— Call or text now</span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-medium text-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              Request an appointment
            </Link>
            <Link
              href="/immune-boost-iv-los-angeles"
              className="inline-flex items-center justify-center rounded-lg border border-blue-300 px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
              Learn about Immune Boost IV
            </Link>
          </div>
          <ul className="mt-6 grid gap-2 text-sm text-gray-700">
            <li>• Same-day appointments (when available)</li>
            <li>• Licensed clinicians</li>
            <li>• Delivered to you in Los Angeles</li>
            <li>• Text or call <a href="tel:949-704-3678" className="text-emerald-600 font-medium hover:underline">(949) 704-3678</a></li>
          </ul>
        </div>

        {/* Image/Illustration Placeholder - Add a relevant graphic here if available */}
        <div className="relative hidden md:block">
          {/* Example: Placeholder for an illustration or image */}
          <div className="absolute inset-0 bg-blue-400/20 rounded-2xl shadow-lg blur-xl -z-10"></div>
          <div className="absolute inset-0 bg-purple-400/20 rounded-2xl shadow-xl blur-2xl -z-20"></div>
          <div className="relative rounded-2xl bg-white p-8 shadow-xl border border-blue-200">
             <h2 className="text-lg font-semibold text-gray-800">What this site is</h2>
             <p className="mt-2 text-sm text-gray-700">
               A focused, SEO-friendly brand site for immune-support IV therapy in LA.
             </p>
             <div className="mt-4 grid gap-3 text-sm">
               <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                 <p className="font-medium text-gray-800">Primary offer</p>
                 <p className="text-gray-600">Immune Boost IV (mobile)</p>
               </div>
               <div className="rounded-lg bg-purple-50 p-4 border border-purple-100">
                 <p className="font-medium text-gray-800">Next pages to add</p>
                 <p className="text-gray-600">
                   Location pages (WeHo, Santa Monica, Beverly Hills, DTLA…)
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-8">Fast FAQs</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out backdrop-blur-sm">
            <h3 className="font-semibold text-gray-800">Do you come to hotels?</h3>
            <p className="mt-2 text-sm text-gray-700">
              Yes—many clients book mobile IV to their hotel in Los Angeles.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out backdrop-blur-sm">
            <h3 className="font-semibold text-gray-800">How do I book?</h3>
            <p className="mt-2 text-sm text-gray-700">
              Use the contact form and we’ll confirm availability and next
              steps.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white/50 p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out backdrop-blur-sm">
            <h3 className="font-semibold text-gray-800">What are the benefits?</h3>
            <p className="mt-2 text-sm text-gray-700">
              Replenish essential nutrients, boost immunity, and rehydrate quickly.
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-gray-600 text-center">
          Note: availability, eligibility, and ingredients vary by provider and clinical review.
        </p>
      </section>
    </SiteShell>
  );
}
