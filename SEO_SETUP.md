# SEO Setup Instructions

## ✅ What's Been Added

### 1. Sitemap.xml (Auto-generated)
- URL: https://immunityivla.com/sitemap.xml
- Updates automatically with new blog posts
- Includes all pages with priorities

### 2. Robots.txt
- URL: https://immunityivla.com/robots.txt
- Allows all search engines
- Points to sitemap

### 3. Enhanced Structured Data
- Organization schema (MedicalBusiness)
- FAQ schema for rich snippets
- BlogPosting schema on articles
- Local business markup

### 4. Google Analytics 4
- Placeholder added in layout.tsx
- Need to replace `G-XXXXXXXXXX` with your actual GA4 ID

### 5. Google Search Console
- Verification meta tag added
- Need to replace `YOUR_VERIFICATION_CODE_HERE` with actual code

---

## 🔧 Steps to Complete Setup

### Step 1: Google Analytics 4

1. Go to https://analytics.google.com
2. Create a new property for "Immunity IV LA"
3. Get your GA4 Measurement ID (looks like `G-ABC123DEF`)
4. Replace `G-XXXXXXXXXX` in `/src/app/layout.tsx` with your actual ID

### Step 2: Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://immunityivla.com`
3. Choose "HTML tag" verification method
4. Copy the content value (looks like `abc123def456`)
5. Replace `YOUR_VERIFICATION_CODE_HERE` in layout.tsx
6. Deploy and click "Verify" in Search Console

### Step 3: Submit Sitemap

1. In Search Console, go to "Sitemaps" 
2. Add sitemap URL: `https://immunityivla.com/sitemap.xml`
3. Click Submit

### Step 4: Request Indexing

1. In Search Console, go to "URL Inspection"
2. Test your homepage: `https://immunityivla.com`
3. Click "Request Indexing"
4. Repeat for key pages

---

## 📊 What You'll Track

### Google Analytics
- Page views
- User sessions
- Traffic sources
- Bounce rate
- Conversions (contact form submissions)

### Search Console
- Search queries you're ranking for
- Click-through rates
- Average position
- Indexing status
- Mobile usability

---

## ⏱️ Timeline Expectations

| Timeframe | What to Expect |
|-----------|---------------|
| **Week 1** | Site indexed by Google |
| **Week 2-4** | Start appearing for branded searches ("Immunity IV LA") |
| **Month 2-3** | Rank for long-tail keywords ("mobile IV therapy [city]") |
| **Month 3-6** | Rank for competitive keywords ("IV therapy Los Angeles") |

---

## 🚀 Next SEO Priorities

After setup:

1. **Get backlinks** - Guest posts, local directories, citations
2. **Add reviews** - Google Business, Yelp
3. **Speed optimization** - Core Web Vitals
4. **Content expansion** - More cities, more topics
5. **Social signals** - Instagram, Facebook presence

---

## 📝 Files Modified

- `/src/app/layout.tsx` - GA4 + Search Console + SEO meta
- `/src/app/sitemap.ts` - Dynamic sitemap generator
- `/src/app/robots.ts` - Robots.txt
- `/src/app/page.tsx` - Structured data (Organization + FAQ)

---

**Need help?** The setup requires Google accounts and manual verification steps that only you can complete.
