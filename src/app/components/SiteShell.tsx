"use client";

import Link from "next/link";
import { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1a3a5c] to-[#0d9488] flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#1a3a5c]">
                Immunity IV LA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-[#1a3a5c] transition-colors">
                Blog
              </Link>
              <Link href="/immune-boost-iv-los-angeles" className="text-sm font-medium text-slate-600 hover:text-[#1a3a5c] transition-colors">
                Services
              </Link>
              <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-[#1a3a5c] transition-colors">
                Contact
              </Link>
              <a 
                href="tel:949-704-3678" 
                className="flex items-center gap-2 rounded-full bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f766e] transition-all shadow-md hover:shadow-lg"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (949) 704-3678
              </a>
            </div>

            {/* Mobile Menu Button */}
            <Link 
              href="tel:949-704-3678"
              className="md:hidden flex items-center gap-2 rounded-full bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Professional Footer */}
      <footer className="bg-[#1a3a5c] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-[#0d9488] flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Immunity IV LA</span>
              </div>
              <p className="text-sm text-slate-300 max-w-xs">
                Mobile IV therapy delivered to your home or hotel across Los Angeles. Licensed clinicians, same-day appointments.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#0d9488]">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/immune-boost-iv-los-angeles" className="text-sm text-slate-300 hover:text-white transition-colors">Immune Boost IV</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">Hydration Therapy</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">Recovery IV</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">Beauty Glow</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#0d9488]">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/blog" className="text-sm text-slate-300 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">Book Appointment</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#0d9488]">Contact</h4>
              <div className="space-y-3">
                <a href="tel:949-704-3678" className="flex items-center gap-2 text-white hover:text-[#0d9488] transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg font-semibold">(949) 704-3678</span>
                </a>
                <p className="text-sm text-slate-300">
                  Mon–Sun, 8:00 AM – 8:00 PM
                </p>
                <p className="text-sm text-slate-300">
                  Serving all of Los Angeles
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Immunity IV LA. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 text-center sm:text-right max-w-md">
              Services provided by licensed clinicians. This site is for general wellness information and does not provide medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
