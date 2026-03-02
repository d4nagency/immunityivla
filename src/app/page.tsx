"use client";

import Link from "next/link";
import { SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Immunity IV LA",
            description: "Mobile IV therapy and immune boost treatments delivered to your home or hotel in Los Angeles.",
            url: "https://immunityivla.com",
            telephone: "+1-949-704-3678",
            email: "hello@immunityivla.com",
            areaServed: {
              "@type": "City",
              name: "Los Angeles",
              containedInPlace: {
                "@type": "State",
                name: "California",
              },
            },
            serviceType: ["IV Therapy", "Mobile Medical Services", "Immune Support", "Hydration Therapy"],
            medicalSpecialty: "Integrative Medicine",
            availableChannel: {
              "@type": "ServiceChannel",
              serviceType: "Mobile IV Therapy",
              serviceUrl: "https://immunityivla.com/contact",
            },
            priceRange: "$$",
            paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
            currenciesAccepted: "USD",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "08:00",
                closes: "20:00",
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you come to hotels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes—many clients book mobile IV to their hotel in Los Angeles. We serve all major hotels throughout the LA area.",
                },
              },
              {
                "@type": "Question",
                name: "How do I book an appointment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Use our contact form or call/text (949) 704-3678. We'll confirm availability and next steps within 30 minutes during business hours.",
                },
              },
              {
                "@type": "Question",
                name: "What areas do you serve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We serve all of Los Angeles including West Hollywood, Santa Monica, Beverly Hills, Downtown LA, Venice, Marina del Rey, and surrounding areas.",
                },
              },
              {
                "@type": "Question",
                name: "Are your clinicians licensed?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, all our IV therapy clinicians are licensed medical professionals with extensive experience in IV administration.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section - iRely Style */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(26, 58, 92, 0.95) 0%, rgba(26, 58, 92, 0.85) 50%, rgba(13, 148, 136, 0.75) 100%), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')`
            }}
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 ring-1 ring-white/20 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#0d9488] animate-pulse" />
              <span className="text-sm font-medium text-white">Same-Day Appointments Available</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Mobile IV Therapy{" "}
              <span className="text-[#0d9488]">Delivered to You</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-xl text-slate-200 max-w-2xl">
              Immune-boosting IV hydration delivered to your home, hotel, or office in Los Angeles. 
              Licensed clinicians, professional care, immediate results.
            </p>

            {/* Two-Button CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[#0d9488] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0f766e] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Appointment
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:949-704-3678"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#1a3a5c] shadow-lg hover:bg-slate-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="mr-2 h-5 w-5 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (949) 704-3678
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <svg className="h-5 w-5 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-white">Licensed Clinicians</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <svg className="h-5 w-5 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white">Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <svg className="h-5 w-5 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium text-white">All of Los Angeles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Light Blue Background */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c]">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600">IV therapy delivered to you in 3 simple steps</p>
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
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="text-5xl font-bold text-[#0d9488]/20">{item.step}</span>
                <h3 className="mt-4 text-xl font-semibold text-[#1a3a5c]">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - White Background */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c]">Our IV Therapy Services</h2>
            <p className="mt-4 text-lg text-slate-600">Choose the IV therapy that's right for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Immune Boost", 
                desc: "High-dose Vitamin C, zinc & antioxidants for immune support",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              },
              { 
                title: "Hydration", 
                desc: "Electrolyte-rich fluids for rapid rehydration",
                icon: "M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2.34M20 14.66a3 3 0 01-3 3H6.66a3 3 0 01-3-3V6.66a3 3 0 013-3h10.68a3 3 0 013 3v7.68zM12 2v6"
              },
              { 
                title: "Recovery", 
                desc: "B-vitamins & nutrients to bounce back fast",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              { 
                title: "Beauty Glow", 
                desc: "Glutathione & biotin for skin health",
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              { 
                title: "Performance", 
                desc: "Amino acids for muscle recovery & energy",
                icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              },
              { 
                title: "Hangover Relief", 
                desc: "Fast relief from dehydration & toxins",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              }
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#0d9488]/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-[#0d9488]/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1a3a5c]">{service.title}</h3>
                <p className="mt-2 text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve - Light Blue Background */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a5c]">Areas We Serve</h2>
            <p className="mt-4 text-lg text-slate-600">Mobile IV therapy throughout Los Angeles</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Beverly Hills", "Santa Monica", "West Hollywood", "Downtown LA", "Venice", "Marina del Rey", "Hollywood", "Silver Lake", "Echo Park", "Los Feliz", "Koreatown", "Mid-Wilshire", "Century City", "Brentwood", "Pacific Palisades", "Malibu"].map((area) => (
              <Link
                key={area}
                href={`/blog/${area.toLowerCase().replace(/\s+/g, "-")}-mobile-iv-therapy`}
                className="p-4 rounded-xl bg-white border border-slate-200 text-center text-slate-700 font-medium hover:text-[#0d9488] hover:border-[#0d9488] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Navy Background */}
      <section className="py-24 bg-[#1a3a5c]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Feel Better?</h2>
          <p className="mt-4 text-lg text-slate-300">
            Book your mobile IV therapy session today. Same-day appointments available throughout Los Angeles.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#0d9488] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0f766e] hover:shadow-xl transition-all duration-300"
            >
              Book Now
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="tel:949-704-3678"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#1a3a5c] shadow-lg hover:bg-slate-50 transition-all duration-300"
            >
              Call (949) 704-3678
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
