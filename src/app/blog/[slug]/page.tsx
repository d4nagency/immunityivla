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
    <div className="min-h-screen bg-white">
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
        <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-gray-700">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 truncate max-w-xs" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm font-medium px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center text-gray-500 text-sm">
            <time dateTime={post.publishDate} className="font-medium">
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-emerald max-w-none">
          {contentParagraphs.map((paragraph, index) => {
            // Handle headings
            if (paragraph.startsWith("## ")) {
              const text = paragraph.replace("## ", "");
              return (
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                  {text}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              const text = paragraph.replace("### ", "");
              return (
                <h3 key={index} className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  {text}
                </h3>
              );
            }
            // Handle lists
            if (paragraph.startsWith("- ") || paragraph.startsWith("**")) {
              const lines = paragraph.split("\n");
              if (lines.every((line) => line.startsWith("- ") || line.startsWith("**"))) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4">
                    {lines.map((line, lineIndex) => {
                      const text = line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1");
                      const parts = line.replace("- ", "").split(/(\*\*.*?\*\*)/);
                      return (
                        <li key={lineIndex} className="text-gray-700">
                          {parts.map((part, partIndex) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
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
                  className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 my-6"
                >
                  {paragraph.replace("> ", "")}
                </blockquote>
              );
            }
            // Handle links in content
            if (paragraph.includes("[") && paragraph.includes("](/")) {
              const parts = paragraph.split(/(\[.*?\]\(\/.*?:?\))/);
              return (
                <p key={index} className="text-gray-700 leading-relaxed my-4">
                  {parts.map((part, partIndex) => {
                    const match = part.match(/\[(.*?)\]\(\/(.*?)\)/);
                    if (match) {
                      const text = match[1];
                      const href = "/" + match[2];
                      return (
                        <Link
                          key={partIndex}
                          href={href}
                          className="text-emerald-600 hover:text-emerald-700 font-medium"
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
                <p key={index} className="text-gray-700 leading-relaxed my-4">
                  {parts.map((part, partIndex) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
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
        <div className="mt-12 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Ready to Try IV Therapy?
          </h3>
          <p className="text-gray-600 mb-6">
            Book a mobile Immune Boost IV session in Los Angeles. We come to your home, hotel, or office.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            Book an Appointment
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2"
          >
            ← Back to all articles
          </Link>
        </nav>
      </article>
    </div>
  );
}
