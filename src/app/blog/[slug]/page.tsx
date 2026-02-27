import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://immunityivla.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Convert content to paragraphs
  const contentParagraphs = post.content.split("\n\n");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            image: post.image ? `https://immunityivla.com${post.image}` : undefined,
            datePublished: post.publishDate,
            dateModified: post.modifiedDate || post.publishDate,
            author: {
              "@type": "Organization",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Immunity IV LA",
              logo: {
                "@type": "ImageObject",
                url: "https://immunityivla.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://immunityivla.com/blog/${post.slug}`,
            },
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-600">/</li>
            <li>
              <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-600">/</li>
            <li className="text-slate-400 truncate max-w-xs" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full ring-1 ring-emerald-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center text-slate-400 text-sm">
            <time dateTime={post.publishDate} className="font-medium">
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="mx-3 text-slate-600">•</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-invert prose-emerald max-w-none">
          {contentParagraphs.map((paragraph, index) => {
            // Handle headings
            if (paragraph.startsWith("## ")) {
              const text = paragraph.replace("## ", "");
              return (
                <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-4">
                  {text}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              const text = paragraph.replace("### ", "");
              return (
                <h3 key={index} className="text-xl font-semibold text-emerald-400 mt-8 mb-3">
                  {text}
                </h3>
              );
            }
            // Handle lists
            if (paragraph.startsWith("- ") || paragraph.startsWith("**")) {
              const lines = paragraph.split("\n");
              if (lines.every((line) => line.startsWith("- ") || line.startsWith("**"))) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4 text-slate-300">
                    {lines.map((line, lineIndex) => {
                      const text = line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1");
                      const parts = line.replace("- ", "").split(/(\*\*.*?\*\*)/);
                      return (
                        <li key={lineIndex} className="text-slate-300">
                          {parts.map((part, partIndex) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return <strong key={partIndex} className="text-white">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
            }
            // Handle blockquotes
            if (paragraph.startsWith("> ")) {
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-emerald-500 pl-4 italic text-slate-400 my-6"
                >
                  {paragraph.replace("> ", "")}
                </blockquote>
              );
            }
            // Handle links in content
            if (paragraph.includes("[") && paragraph.includes("](/")) {
              const parts = paragraph.split(/(\[.*?\]\(\/.*?:?\))/);
              return (
                <p key={index} className="text-slate-300 leading-relaxed my-4">
                  {parts.map((part, partIndex) => {
                    const match = part.match(/\[(.*?)\]\(\/(.*?)\)/);
                    if (match) {
                      const text = match[1];
                      const href = "/" + match[2];
                      return (
                        <Link
                          key={partIndex}
                          href={href}
                          className="text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                          {text}
                        </Link>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            }
            // Regular paragraph
            if (paragraph.trim()) {
              // Handle bold text
              const parts = paragraph.split(/(\*\*.*?\*\*)/);
              return (
                <p key={index} className="text-slate-300 leading-relaxed my-4">
                  {parts.map((part, partIndex) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={partIndex} className="text-white">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* CTA Box */}
        <div className="mt-16 relative">
          <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl" />
          <div className="relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-3">
              Ready to Try IV Therapy?
            </h3>
            <p className="text-slate-400 mb-6">
              Book a mobile Immune Boost IV session in Los Angeles. We come to your home, hotel, or office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
              >
                Book Appointment
              </Link>
              <a
                href="tel:949-704-3678"
                className="inline-flex items-center justify-center rounded-full bg-slate-800 px-6 py-3 text-base font-semibold text-white ring-1 ring-slate-700 hover:bg-slate-700 transition-all duration-300"
              >
                Call (949) 704-3678
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-slate-800/50">
          <Link
            href="/blog"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all articles
          </Link>
        </nav>
      </article>
    </div>
  );
}
