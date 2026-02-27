import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IV Therapy Blog | Los Angeles Wellness & Immune Tips",
  description: "Expert tips on immune support, IV therapy, and wellness in Los Angeles. Learn about mobile IV services in every LA neighborhood.",
  openGraph: {
    title: "IV Therapy Blog | Los Angeles Wellness",
    description: "Expert tips on immune support and mobile IV therapy in Los Angeles.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-cyan-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IV Therapy{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Expert insights on immune health, mobile IV therapy, and wellness tips for Los Angeles residents and visitors.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className="group relative"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                <div className="relative h-full rounded-2xl bg-slate-900/50 border border-slate-800/50 overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300">
                  {/* Card Header */}
                  <div className="p-6 pb-0">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full ring-1 ring-emerald-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    {/* Description */}
                    <p className="text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 flex items-center justify-between">
                    <time dateTime={post.publishDate} className="text-sm text-slate-500">
                      {new Date(post.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                    >
                      Read
                      <svg className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 relative">
            <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-sm" />
            <div className="relative rounded-3xl bg-slate-900/50 border border-slate-800/50 p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready for Your IV Session?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Book a mobile IV therapy session in Los Angeles. Same-day appointments available throughout the city.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:949-704-3678"
                  className="inline-flex items-center justify-center rounded-full bg-slate-800 px-8 py-4 text-base font-semibold text-white ring-1 ring-slate-700 hover:bg-slate-700 transition-all duration-300"
                >
                  Call (949) 704-3678
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
