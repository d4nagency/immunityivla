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
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <SiteShell>
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-3 text-zinc-700">
          Request an appointment and we&apos;ll email you back within 24 hours.
        </p>

        {status === "sent" ? (
          <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-green-900">Message sent!</h3>
                <p className="mt-1 text-green-800">
                  We&apos;ve received your appointment request and sent a confirmation to your email. 
                  Our team will review your request and respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-medium text-green-700 hover:text-green-900 underline"
                >
                  Send another message
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 grid gap-5">
            {/* Honeypot field - invisible to humans, catches bots */}
            <div className="hidden" aria-hidden="true">
              <input name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium text-zinc-900">
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
                className="mt-1.5 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-zinc-900">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="location" className="text-sm font-medium text-zinc-900">
                Where are you in LA?
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Neighborhood, hotel, or address"
                maxLength={200}
                className="mt-1.5 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              <p className="mt-1 text-xs text-zinc-500">
                We serve West Hollywood, Santa Monica, Beverly Hills, Downtown LA, and surrounding areas.
              </p>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-zinc-900">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                placeholder="Tell us what you're looking for - immune boost, hydration, general wellness? Any specific concerns or questions?"
                onChange={(e) => setMessageLength(e.target.value.length)}
                className="mt-1.5 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-y"
              />
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-zinc-500">Min 10 characters</span>
                <span className={`${messageLength > 4500 ? 'text-orange-600' : 'text-zinc-400'}`}>
                  {messageLength}/5000
                </span>
              </div>
            </div>

            {status === "error" ? (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-800">
                  <span className="font-medium">Error:</span> {error}
                </p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Request Appointment"
              )}
            </button>

            <div className="space-y-2">
              <p className="text-xs text-zinc-500">
                By submitting, you agree to be contacted by email. We respect your privacy and will never share your information.
              </p>
              <p className="text-xs text-zinc-400">
                This site is for general wellness information and does not provide medical advice.
              </p>
            </div>
          </form>
        )}

        {/* Quick contact info */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <h3 className="text-sm font-semibold text-zinc-900">Other ways to reach us</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-600">
            <p>
              <span className="font-medium text-zinc-900">Response time:</span> Within 24 hours
            </p>
            <p>
              <span className="font-medium text-zinc-900">Service hours:</span> Mon–Sun, 8:00 AM – 8:00 PM
            </p>
            <p>
              <span className="font-medium text-zinc-900">Service area:</span> All of Los Angeles including West Hollywood, Santa Monica, Beverly Hills, Downtown LA
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
