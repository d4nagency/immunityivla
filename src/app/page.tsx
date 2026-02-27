import Link from "next/link";
import { SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-cyan-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce" style={{animationDuration: '3s'}} />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400/30 rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}} />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge with shimmer */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-emerald-500/20 mb-8 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-emerald-400">Same-day appointments available</span>
            </div>

            {/* Headline with gradient animation */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-slide-up">
              Mobile IV Therapy{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                Los Angeles
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
              Immune-boosting IV hydration delivered to your home, hotel, or office. 
              Licensed clinicians serving all of LA.
            </p>

            {/* CTA Buttons with hover effects */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                Book Appointment
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:949-704-3678"
                className="group inline-flex items-center justify-center rounded-full bg-slate-800 px-8 py-4 text-base font-semibold text-white ring-1 ring-slate-700 hover:bg-slate-700 hover:ring-slate-600 hover:scale-105 transition-all duration-300"
              >
                <svg className="mr-2 h-5 w-5 text-emerald-400 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (949) 704-3678
              </a>
            </div>

            {/* Trust indicators with stagger */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Licensed Clinicians
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Same-Day Service
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All of Los Angeles
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-lg text-slate-400">IV therapy delivered to you in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Book Online",
                description: "Fill out our quick form or text us. Tell us where you are in LA and what you need."
              },
              {
                step: "02",
                title: "We Come to You",
                description: "A licensed clinician arrives at your location with everything needed for your IV treatment."
              },
              {
                step: "03",
                title: "Feel Better",
                description: "Relax during your 30-60 minute session. Most clients feel results immediately."
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 group-hover:border-emerald-500/30 group-hover:-translate-y-2 transition-all duration-300">
                  <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400/50 to-cyan-400/50 bg-clip-text text-transparent">{item.step}</span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Services</h2>
            <p className="mt-4 text-lg text-slate-400">Choose the IV therapy that's right for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Immune Boost", desc: "Vitamin C, zinc & antioxidants for immune support" },
              { title: "Hydration", desc: "Electrolyte-rich fluids for rapid rehydration" },
              { title: "Recovery", desc: "B-vitamins & nutrients to bounce back fast" },
              { title: "Beauty Glow", desc: "Glutathione & biotin for skin health" },
              { title: "Performance", desc: "Amino acids for muscle recovery & energy" },
              { title: "Hangover Relief", desc: "Fast relief from dehydration & toxins" }
            ].map((service, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 h-full group-hover:border-emerald-500/30 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-emerald-500/10 transition-all duration-300">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">{service.title}</h3>
                  <p className="mt-2 text-slate-400">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-24 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Areas We Serve</h2>
            <p className="mt-4 text-lg text-slate-400">Mobile IV therapy throughout Los Angeles</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Beverly Hills", "Santa Monica", "West Hollywood", "Downtown LA", "Venice", "Marina del Rey", "Hollywood", "Silver Lake", "Echo Park", "Los Feliz", "Koreatown", "Mid-Wilshire", "Century City", "Brentwood", "Pacific Palisades", "Malibu"].map((area) => (
              <Link
                key={area}
                href={`/blog/${area.toLowerCase().replace(/\s+/g, "-")}-mobile-iv-therapy`}
                className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Feel Better?</h2>
          <p className="mt-4 text-lg text-slate-400">
            Book your mobile IV therapy session today. Same-day appointments available throughout Los Angeles.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
            >
              Book Now
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="tel:949-704-3678"
              className="inline-flex items-center justify-center rounded-full bg-slate-800 px-8 py-4 text-base font-semibold text-white ring-1 ring-slate-700 hover:bg-slate-700 hover:ring-slate-600 hover:scale-105 transition-all duration-300"
            >
              Call (949) 704-3678
            </a>
          </div>
        </div>
      </section>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.6s ease forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </SiteShell>
  );
}
