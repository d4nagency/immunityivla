"use client";

import { useState } from "react";
import { SiteShell } from "../components/SiteShell";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

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

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send");
      }

      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <SiteShell>
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-3 text-zinc-700">
          Request an appointment and we’ll email you back.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Where are you in LA?</label>
            <input
              name="location"
              placeholder="Neighborhood / hotel"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <button
            disabled={status === "sending"}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>

          {status === "sent" ? (
            <p className="text-sm text-green-700">
              Sent. We’ll reply to your email.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-700">{error}</p>
          ) : null}

          <p className="text-xs text-zinc-500">
            By submitting, you agree to be contacted by email. No medical advice
            is provided through this form.
          </p>
        </form>
      </div>
    </SiteShell>
  );
}
