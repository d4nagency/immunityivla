import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  tags: string[];
  image?: string;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export const posts: Partial<BlogPost>[] = [
  {
    slug: 'hydration-iv-santa-monica',
    title: 'Hydration IV Santa Monica — Mobile Therapy',
    description: 'Stay hydrated and revitalized with our mobile Hydration IV therapy in Santa Monica, Los Angeles. Perfect for beach days, active lifestyles, and wellness enthusiasts.',
    publishDate: '2026-05-02',
    author: 'Immunity IV',
    tags: ['Hydration', 'Santa Monica', 'Los Angeles', 'Mobile IV', 'Wellness'],
  },
  {
    slug: 'hydration-iv-marina-del-rey',
    title: 'Hydration IV Marina del Rey — Mobile Therapy',
    description: 'Stay revitalized and refreshed with our mobile Hydration IV therapy in Marina del Rey, Los Angeles. The perfect wellness solution for active waterfront lifestyles and boaters.',
    publishDate: '2026-05-03',
    author: 'Immunity IV',
    tags: ['Hydration', 'Marina del Rey', 'Los Angeles', 'Mobile IV', 'Wellness', 'Waterfront'],
  },
  {
    slug: 'beauty-iv-drip-beverly-hills',
    title: 'Beauty IV Drip Beverly Hills — Glow & Hydration',
    description: 'Enhance your natural radiance with our premium Beauty IV Drip in Beverly Hills, Los Angeles. Mobile wellness services designed for skin, hair, and nail rejuvenation.',
    publishDate: '2026-05-03',
    author: 'Immunity IV',
    tags: ['Beauty', 'Beverly Hills', 'Los Angeles', 'Mobile IV', 'Wellness', 'Skin Care'],
  },
  {
    slug: 'beauty-iv-drip-beverly-hills',
    title: 'Beauty IV Drip Beverly Hills — Glow & Hydration',
    description: 'Enhance your natural radiance with our premium Beauty IV Drip in Beverly Hills, Los Angeles. Mobile wellness services designed for skin, hair, and nail rejuvenation.',
    publishDate: '2026-05-03',
    author: 'Immunity IV',
    tags: ['Beauty', 'Beverly Hills', 'Los Angeles', 'Mobile IV', 'Wellness', 'Skin Care'],
  },
  {
    slug: 'nad-iv-therapy-marina-del-rey',
    title: 'NAD+ IV Therapy Marina del Rey — Energy & Cellular Health',
    description: 'Experience rejuvenation and enhanced energy with NAD+ IV therapy in Marina del Rey, Los Angeles. Our mobile service brings cellular health and anti-aging benefits directly to your doorstep.',
    publishDate: '2026-05-03',
    author: 'Immunity IV',
    tags: ['NAD+', 'Marina del Rey', 'Los Angeles', 'Mobile IV', 'Wellness', 'Anti-Aging'],
  },
];

export function getAllPosts(): BlogPost[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        title: data.title,
        description: data.description,
        content: content,
        publishDate: data.publishDate || data.date,
        author: data.author,
        tags: data.tags || [],
        image: data.image || undefined,
      };
    });
  
  // Sort by date descending
  return allPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}
