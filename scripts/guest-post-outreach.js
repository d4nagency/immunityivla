#!/usr/bin/env node
/**
 * Guest Post Outreach Script
 * 
 * Finds guest posting opportunities for Immunity IV LA
 * Generates personalized outreach emails for health/wellness/lifestyle blogs
 */

const fs = require('fs');
const path = require('path');

// Target niches for guest posting
const TARGET_NICHES = [
  { niche: "Los Angeles Lifestyle", keywords: ["LA lifestyle blog", "Los Angeles lifestyle", "LA wellness blog"] },
  { niche: "Health & Wellness", keywords: ["health blog guest post", "wellness blog submissions", "integrative health blog"] },
  { niche: "IV Therapy/Hydration", keywords: ["IV therapy blog", "hydration wellness blog", "functional medicine blog"] },
  { niche: "Travel (LA focus)", keywords: ["Los Angeles travel blog", "LA visitor guide", "California travel blog"] },
  { niche: "Fitness", keywords: ["fitness blog LA", "workout recovery blog", "athlete wellness blog"] },
  { niche: "Local Business LA", keywords: ["local business blog LA", "Los Angeles entrepreneur", "LA business spotlight"] }
];

// Guest post topics we can offer
const GUEST_TOPICS = [
  {
    title: "5 Signs Your Body Needs an Immune Boost (And How IV Therapy Can Help)",
    angle: "Educational, health-focused, non-promotional",
    idealFor: ["Health blogs", "Wellness publications"]
  },
  {
    title: "The Science Behind Mobile IV Therapy: What LA Residents Should Know",
    angle: "Location-based authority piece",
    idealFor: ["LA lifestyle blogs", "Local business blogs"]
  },
  {
    title: "Hydration Hacks for Busy Professionals in Los Angeles",
    angle: "Practical tips with IV as one option",
    idealFor: ["Business blogs", "Productivity blogs", "LA lifestyle"]
  },
  {
    title: "Recovery Tips for LA Marathon Runners and Athletes",
    angle: "Sports performance/recovery focus",
    idealFor: ["Fitness blogs", "Running blogs", "Sports publications"]
  },
  {
    title: "Wellness Trends in Los Angeles: What's Actually Worth Trying",
    angle: "Trend analysis, IV therapy included as legitimate option",
    idealFor: ["LA lifestyle", "Wellness trends blogs"]
  },
  {
    title: "How to Stay Healthy During LA's Busy Event Season",
    angle: "Event wellness (Coachella, award season, etc.)",
    idealFor: ["Entertainment blogs", "LA event blogs", "Lifestyle"]
  }
];

// Outreach email templates
const OUTREACH_TEMPLATES = {
  cold: `Subject: Guest post idea for [Blog Name]

Hi [Editor Name],

I came across [Blog Name] while researching [relevant topic] and really enjoyed your recent article on [specific article]. Great insights on [specific detail].

I'm [Name], a licensed clinician and wellness writer based in Los Angeles. I noticed you publish content on [relevant topic] and thought your readers might be interested in a fresh perspective.

I'd love to contribute a guest post:

**"[Proposed Title]"**

This article would cover:
- [Bullet point 1]
- [Bullet point 2]  
- [Bullet point 3]

I can provide original, well-researched content (1000-1500 words) with actionable takeaways for your audience. No promotional language—just genuine value.

I've previously written for [credibility mention if any].

Would this be a fit for your editorial calendar? Happy to adjust the angle or suggest alternatives.

Best regards,
[Name]
[Title/Website]
[Email]`,

  followup: `Subject: Following up - Guest post for [Blog Name]

Hi [Editor Name],

I wanted to follow up on my guest post pitch from [days ago].

Quick reminder: I'd love to contribute "[Proposed Title]" to [Blog Name]. The piece would [brief value proposition].

I know you receive a lot of pitches—totally understand if this isn't the right fit right now.

Either way, keep up the great work with the blog.

Best,
[Name]`
};

// Functions

function logOpportunity(site, niche, contactInfo, status = "not-contacted") {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outreachLog = path.join(dataDir, 'guest-post-outreach.json');
  
  let log = [];
  if (fs.existsSync(outreachLog)) {
    log = JSON.parse(fs.readFileSync(outreachLog, 'utf8'));
  }

  log.push({
    date: new Date().toISOString(),
    site,
    niche,
    contact: contactInfo,
    status,
    topicProposed: null,
    followUpDate: null
  });

  fs.writeFileSync(outreachLog, JSON.stringify(log, null, 2));
  console.log(`✓ Logged opportunity: ${site}`);
}

function getOutreachLog() {
  const outreachLog = path.join(__dirname, '..', 'data', 'guest-post-outreach.json');
  if (fs.existsSync(outreachLog)) {
    return JSON.parse(fs.readFileSync(outreachLog, 'utf8'));
  }
  return [];
}

function generateTopicForNiche(niche) {
  const topics = GUEST_TOPICS.filter(t => 
    t.idealFor.some(ideal => ideal.toLowerCase().includes(niche.toLowerCase()))
  );
  return topics.length > 0 ? topics[0] : GUEST_TOPICS[Math.floor(Math.random() * GUEST_TOPICS.length)];
}

function generateEmail(blogName, editorName, niche, personalization = "") {
  const topic = generateTopicForNiche(niche);
  let email = OUTREACH_TEMPLATES.cold;
  
  email = email
    .replace(/\[Blog Name\]/g, blogName)
    .replace(/\[Editor Name\]/g, editorName || "Editor")
    .replace(/\[Proposed Title\]/g, topic.title)
    .replace(/\[relevant topic\]/g, niche)
    .replace(/\[Name\]/g, process.env.OUTREACH_NAME || "Immunity IV LA Team")
    .replace(/\[Title\/Website\]/g, "Immunity IV LA (immunityivla.com)")
    .replace(/\[Email\]/g, process.env.OUTREACH_EMAIL || "hello@immunityivla.com")
    .replace(/\[Bullet point 1\]/g, "Evidence-based insights backed by clinical research")
    .replace(/\[Bullet point 2\]/g, "Practical tips readers can implement immediately")
    .replace(/\[Bullet point 3\]/g, "LA-specific context and local expertise");

  if (personalization) {
    email = email.replace("Hi [Editor Name],", `Hi ${editorName || "Editor"},\n\n${personalization}`);
  }

  return { email, topic, niche };
}

function printReport() {
  const log = getOutreachLog();
  const stats = {
    total: log.length,
    contacted: log.filter(l => l.status === 'contacted').length,
    responded: log.filter(l => l.status === 'responded').length,
    published: log.filter(l => l.status === 'published').length,
    rejected: log.filter(l => l.status === 'rejected').length,
    pending: log.filter(l => l.status === 'not-contacted').length
  };

  console.log("\n=== GUEST POST OUTREACH REPORT ===");
  console.log(`Total Opportunities: ${stats.total}`);
  console.log(`Contacted: ${stats.contacted}`);
  console.log(`Responded: ${stats.responded}`);
  console.log(`Published: ${stats.published}`);
  console.log(`Rejected: ${stats.rejected}`);
  console.log(`Pending Research: ${stats.pending}`);
  console.log("===================================\n");

  return stats;
}

// CLI
const command = process.argv[2];

if (command === 'topics') {
  console.log("\n=== Available Guest Post Topics ===\n");
  GUEST_TOPICS.forEach((t, i) => {
    console.log(`${i+1}. ${t.title}`);
    console.log(`   Angle: ${t.angle}`);
    console.log(`   Best for: ${t.idealFor.join(", ")}\n`);
  });
} else if (command === 'log') {
  const site = process.argv[3];
  const niche = process.argv[4];
  const contact = process.argv[5];
  
  if (!site || !niche) {
    console.log("Usage: node guest-post-outreach.js log [site] [niche] [contact]");
    process.exit(1);
  }
  
  logOpportunity(site, niche, contact);
} else if (command === 'generate') {
  const blogName = process.argv[3] || "Target Blog";
  const editorName = process.argv[4] || "";
  const niche = process.argv[5] || "Health & Wellness";
  
  const { email, topic } = generateEmail(blogName, editorName, niche);
  
  console.log("\n=== OUTREACH EMAIL ===\n");
  console.log(email);
  console.log("\n======================\n");
  console.log(`Proposed Topic: ${topic.title}`);
  console.log(`Niche: ${niche}`);
} else if (command === 'report') {
  printReport();
} else {
  console.log(`
Guest Post Outreach Script for Immunity IV LA

Usage:
  node guest-post-outreach.js topics        - List available guest post topics
  node guest-post-outreach.js generate [blog] [editor] [niche]  - Generate outreach email
  node guest-post-outreach.js log [site] [niche] [contact]      - Log new opportunity
  node guest-post-outreach.js report        - Show outreach statistics

Environment Variables:
  OUTREACH_NAME    - Name to use in emails
  OUTREACH_EMAIL   - Contact email for responses

Target Niches:`);
  TARGET_NICHES.forEach(n => console.log(`  • ${n.niche}`));
}

module.exports = {
  TARGET_NICHES,
  GUEST_TOPICS,
  logOpportunity,
  getOutreachLog,
  generateEmail,
  printReport
};
