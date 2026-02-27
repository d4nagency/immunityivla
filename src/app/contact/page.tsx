"use client";

import { useState } from "react";
import { SiteShell } from "../components/SiteShell";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [messageLength, setMessageLength] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send. Please try again.");
      }

      setStatus("sent");
      (e.target as HTMLFormElement).reset();
      setMessageLength(0);
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us directly.");
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Book Your IV Session</h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Request an appointment and we&apos;ll get back to you within 30 minutes. 
            Or call/text us for immediate assistance.
          </p>
          <a 
            href="tel:949-704-3678" 
            className="mt-6 inline-flex items-center gap-2 text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (949) 704-3678
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl" />
            <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50">
              {status === "sent" ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
                    <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Message sent!</h3>
                  <p className="mt-2 text-slate-400">
                    We&apos;ve received your request and sent a confirmation email. 
                    Our team will respond within 30 minutes.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="Your full name"
                      className="w-full rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
                      Where are you in LA?
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Neighborhood, hotel, or address"
                      maxLength={200}
                      className="w-full rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      We serve all of Los Angeles including West Hollywood, Santa Monica, Beverly Hills, Downtown LA
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      What do you need? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={5}
                      placeholder="Tell us about what you're looking for - immune boost, hydration, recovery? Any specific concerns?"
                      onChange={(e) => setMessageLength(e.target.value.length)}
                      className="w-full rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-y"
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-500">
                      <span>Min 10 characters</span>
                      <span className={messageLength > 4500 ? "text-orange-400" : ""}>
                        {messageLength}/5000
                      </span>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-sm text-red-400">{error}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Having trouble? Call us directly at{" "}
                        <a href="tel:949-704-3678" className="text-emerald-400">(949) 704-3678</a>
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Request Appointment"
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting, you agree to be contacted. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a 
                  href="tel:949-704-3678" 
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Call or Text</p>
                    <p className="text-lg font-semibold text-white">(949) 704-3678</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Service Hours</p>
                    <p className="text-lg font-semibold text-white">Mon–Sun, 8am–8pm</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Service Area</p>
                    <p className="text-lg font-semibold text-white">All of Los Angeles</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30">
                  <span className="text-slate-400">Phone / Text</span>
                  <span className="text-emerald-400 font-medium">~30 minutes</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30">
                  <span className="text-slate-400">Email / Form</span>
                  <span className="text-cyan-400 font-medium">~2 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30">
                  <span className="text-slate-400">Same-day booking</span>
                  <span className="text-purple-400 font-medium">Subject to availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
