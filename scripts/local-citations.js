#!/usr/bin/env node
/**
 * Local Citations SEO Script
 * 
 * Manages local business listings for Immunity IV LA
 * Citations = mentions of business (Name, Address, Phone, Website) on other sites
 * Critical for local SEO and Google Maps ranking
 */

const fs = require('fs');
const path = require('path');

// NAP = Name, Address, Phone - CRITICAL to keep consistent everywhere
const BUSINESS_INFO = {
  name: "Immunity IV LA",
  // Add when available:
  // address: "123 Example St",
  // city: "Los Angeles",
  // state: "CA",
  // zip: "90210",
  phone: process.env.BUSINESS_PHONE || "",
  website: "https://immunityivla.com",
  email: "hello@immunityivla.com",
  description: "Mobile Immune Boost IV therapy delivered to your home or hotel in Los Angeles. Licensed clinicians, same-day appointments available.",
  categories: ["IV Therapy", "Mobile Medical Services", "Wellness", "Hydration Services"],
  hours: "Mon-Sun: 8:00 AM - 8:00 PM",
  services: ["Immune Boost IV", "Hydration IV", "Mobile IV Therapy", "Vitamin IV"]
};

// TIER 1: Essential Citation Sites (Must-have)
const TIER1_CITATIONS = [
  {
    name: "Google Business Profile",
    url: "https://business.google.com/create",
    importance: "CRITICAL - #1 ranking factor for local SEO",
    status: "priority",
    requires: ["business_name", "address_or_service_area", "phone", "category"]
  },
  {
    name: "Yelp for Business",
    url: "https://biz.yelp.com",
    importance: "High - major review platform, strong ranking signal",
    status: "priority",
    requires: ["business_name", "phone"]
  },
  {
    name: "Bing Places",
    url: "https://www.bingplaces.com",
    importance: "High - Bing maps, Microsoft ecosystem",
    status: "priority",
    requires: ["business_name", "address", "phone"]
  },
  {
    name: "Apple Business Connect",
    url: "https://businessconnect.apple.com",
    importance: "High - Apple Maps (1B+ iPhone users)",
    status: "priority",
    requires: ["business_name", "phone"]
  },
  {
    name: "Facebook Business",
    url: "https://business.facebook.com",
    importance: "High - social signals + local search",
    status: "priority",
    requires: ["business_name", "phone"]
  }
];

// TIER 2: General Directories (High Value)
const TIER2_CITATIONS = [
  { name: "Yellow Pages", url: "https://www.yellowpages.com", status: "pending" },
  { name: "BBB (Better Business Bureau)", url: "https://www.bbb.org", status: "pending" },
  { name: "Chamber of Commerce", url: "https://www.chamberofcommerce.com", status: "pending" },
  { name: "Merchant Circle", url: "https://www.merchantcircle.com", status: "pending" },
  { name: "Superpages", url: "https://www.superpages.com", status: "pending" },
  { name: "Citysearch", url: "https://www.citysearch.com", status: "pending" },
  { name: "Hotfrog", url: "https://www.hotfrog.com", status: "pending" },
  { name: "Foursquare", url: "https://foursquare.com", status: "pending" },
  { name: "MapQuest", url: "https://www.mapquest.com", status: "pending" },
  { name: "Here Maps", url: "https://www.here.com", status: "pending" },
  { name: "Yahoo Small Business", url: "https://smallbusiness.yahoo.com", status: "pending" },
  { name: "Manta", url: "https://www.manta.com", status: "pending" },
  { name: "BizJournals", url: "https://www.bizjournals.com", status: "pending" }
];

// TIER 3: Healthcare/Wellness Specific
const TIER3_HEALTHCARE = [
  { name: "Healthgrades", url: "https://www.healthgrades.com", status: "pending", note: "Healthcare provider directory" },
  { name: "WebMD Physician Directory", url: "https://doctor.webmd.com", status: "pending", note: "Medical professionals" },
  { name: "Wellness.com", url: "https://www.wellness.com", status: "pending", note: "Wellness practitioner directory" },
  { name: "Zocdoc", url: "https://www.zocdoc.com", status: "pending", note: "Healthcare bookings" },
  { name: "Vitals", url: "https://www.vitals.com", status: "pending", note: "Doctor reviews" },
  { name: "RateMDs", url: "https://www.ratemds.com", status: "pending", note: "Medical reviews" },
  { name: "RealSelf", url: "https://www.realself.com", status: "pending", note: "Aesthetic/wellness treatments" }
];

// TIER 4: Los Angeles Local Directories
const TIER4_LOCAL_LA = [
  { name: "LA Business Journal", url: "https://labusinessjournal.com", status: "pending", note: "Local business authority" },
  { name: "LA Weekly", url: "https://laweekly.com", status: "pending", note: "Local events/business" },
  { name: "Thrillist LA", url: "https://www.thrillist.com/los-angeles", status: "pending", note: "Local lifestyle" },
  { name: "Time Out LA", url: "https://www.timeout.com/los-angeles", status: "pending", note: "Events & services" },
  { name: "CBS Los Angeles", url: "https://losangeles.cbslocal.com", status: "pending", note: "Local media" },
  { name: "LA Curbed", url: "https://la.curbed.com", status: "pending", note: "LA lifestyle/business" },
  { name: "West Hollywood Chamber", url: "https://www.wehochamber.com", status: "pending", note: "Local chamber" },
  { name: "Beverly Hills Chamber", url: "https://bhchamber.org", status: "pending", note: "Local chamber" },
  { name: "Santa Monica Chamber", url: "https://smchamber.com", status: "pending", note: "Local chamber" },
  { name: "Downtown LA Chamber", url: "https://dlachamber.org", status: "pending", note: "DTLA business" }
];

// TIER 5: Industry-Specific (IV Therapy/Wellness)
const TIER5_INDUSTRY = [
  { name: "Spafinder", url: "https://www.spafinder.com", status: "pending", note: "Wellness services booking" },
  { name: "Groupon", url: "https://www.groupon.com", status: "pending", note: "Local deals" },
  { name: "ClassPass", url: "https://classpass.com", status: "pending", note: "Wellness services" },
  { name: "StyleSeat", url: "https://www.styleseat.com", status: "pending", note: "Beauty/wellness booking" },
  { name: "Booksy", url: "https://booksy.com", status: "pending", note: "Appointment booking" },
  { name: "Vagaro", url: "https://www.vagaro.com", status: "pending", note: "Salon/spa software" }
];

// TIER 6: Data Aggregators (Feeds to many sites)
const TIER6_AGGREGATORS = [
  { name: "Data Axle (Infogroup)", url: "https://www.data-axle.com", status: "pending", note: "Feeds to 100+ directories" },
  { name: "Localeze", url: "https://www.neustarlocaleze.biz", status: "pending", note: "Feeds to major platforms" },
  { name: "Factual", url: "https://www.factual.com", status: "pending", note: "Location data aggregator" },
  { name: "Acxiom", url: "https://www.acxiom.com", status: "pending", note: "Business data provider" }
];

function logCitation(site, tier, status = "pending", notes = "") {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const logFile = path.join(dataDir, 'local-citations.json');
  
  let log = [];
  if (fs.existsSync(logFile)) {
    log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
  }

  const existing = log.find(l => l.site === site);
  if (existing) {
    existing.status = status;
    existing.updatedAt = new Date().toISOString();
    existing.notes = notes || existing.notes;
  } else {
    log.push({
      date: new Date().toISOString(),
      site,
      tier,
      status,
      notes,
      url: null,
      listingUrl: null
    });
  }

  fs.writeFileSync(logFile, JSON.stringify(log, null, 2));
  console.log(`✓ Logged citation: ${site} (${status})`);
}

function getCitationLog() {
  const logFile = path.join(__dirname, '..', 'data', 'local-citations.json');
  if (fs.existsSync(logFile)) {
    return JSON.parse(fs.readFileSync(logFile, 'utf8'));
  }
  return [];
}

function generateBusinessDescription(variation = 1) {
  const descriptions = [
    `Immunity IV LA delivers mobile Immune Boost IV therapy to homes and hotels across Los Angeles. Our licensed clinicians provide same-day appointments for immune support, hydration, and wellness. Serving West Hollywood, Santa Monica, Beverly Hills, Downtown LA, and all surrounding areas.`,
    
    `Looking for mobile IV therapy in Los Angeles? Immunity IV LA brings immune-boosting IV treatments directly to you. Licensed medical professionals, same-day service available. Serving LA, WeHo, Beverly Hills, Santa Monica, DTLA.`,
    
    `Immunity IV LA specializes in mobile Immune Boost IV therapy throughout Los Angeles. We deliver hydration and immune support IVs to your home, hotel, or office. Book same-day appointments with our licensed clinicians.`,
    
    `Mobile IV therapy Los Angeles - Immunity IV LA provides at-home immune support IV treatments. Serving West Hollywood, Beverly Hills, Santa Monica, and all LA neighborhoods. Licensed clinicians, same-day appointments.`
  ];
  return descriptions[(variation - 1) % descriptions.length];
}

function generateChecklist() {
  const log = getCitationLog();
  const completed = log.filter(l => l.status === 'completed').length;
  const inProgress = log.filter(l => l.status === 'in-progress').length;
  
  const totalSites = TIER1_CITATIONS.length + TIER2_CITATIONS.length + 
                     TIER3_HEALTHCARE.length + TIER4_LOCAL_LA.length + 
                     TIER5_INDUSTRY.length + TIER6_AGGREGATORS.length;
  
  console.log("\n=== LOCAL CITATIONS CHECKLIST ===");
  console.log(`Total Sites: ${totalSites}`);
  console.log(`Completed: ${completed}`);
  console.log(`In Progress: ${inProgress}`);
  console.log(`Remaining: ${totalSites - completed}`);
  console.log("===================================\n");
  
  console.log("TIER 1: ESSENTIAL (Complete These First)");
  TIER1_CITATIONS.forEach(site => {
    const logged = log.find(l => l.site === site.name);
    const status = logged ? logged.status : "❌ NOT STARTED";
    console.log(`  ${status === 'completed' ? '✅' : status === 'in-progress' ? '🔄' : '❌'} ${site.name} - ${site.importance}`);
  });
  
  console.log("\nTIER 2: General Directories");
  TIER2_CITATIONS.forEach(site => {
    const logged = log.find(l => l.site === site.name);
    const status = logged ? logged.status : "❌";
    console.log(`  ${status === 'completed' ? '✅' : '❌'} ${site.name}`);
  });
  
  console.log("\nTIER 3: Healthcare Specific");
  TIER3_HEALTHCARE.forEach(site => {
    const logged = log.find(l => l.site === site.name);
    const status = logged ? logged.status : "❌";
    console.log(`  ${status === 'completed' ? '✅' : '❌'} ${site.name}`);
  });
  
  console.log("\nTIER 4: LA Local Directories");
  TIER4_LOCAL_LA.forEach(site => {
    const logged = log.find(l => l.site === site.name);
    const status = logged ? logged.status : "❌";
    console.log(`  ${status === 'completed' ? '✅' : '❌'} ${site.name}`);
  });
}

function getNextPriority() {
  const log = getCitationLog();
  
  // Find first incomplete priority
  for (const site of TIER1_CITATIONS) {
    const logged = log.find(l => l.site === site.name);
    if (!logged || logged.status !== 'completed') {
      return { ...site, tier: "TIER 1 - ESSENTIAL" };
    }
  }
  
  // Then tier 2
  for (const site of TIER2_CITATIONS) {
    const logged = log.find(l => l.site === site.name);
    if (!logged || logged.status !== 'completed') {
      return { ...site, tier: "TIER 2 - High Value" };
    }
  }
  
  return null;
}

// CLI
const command = process.argv[2];

if (command === 'checklist') {
  generateChecklist();
} else if (command === 'business') {
  console.log("\n=== BUSINESS INFO FOR CITATIONS ===\n");
  console.log("Name:", BUSINESS_INFO.name);
  console.log("Phone:", BUSINESS_INFO.phone || "[SET BUSINESS_PHONE ENV VAR]");
  console.log("Website:", BUSINESS_INFO.website);
  console.log("Email:", BUSINESS_INFO.email);
  console.log("\nDescription Variations:");
  for (let i = 1; i <= 4; i++) {
    console.log(`\nVariation ${i}:`);
    console.log(generateBusinessDescription(i));
  }
} else if (command === 'log') {
  const site = process.argv[3];
  const tier = process.argv[4];
  const status = process.argv[5] || "pending";
  const notes = process.argv[6] || "";
  
  if (!site || !tier) {
    console.log("Usage: node local-citations.js log [site-name] [tier] [status] [notes]");
    process.exit(1);
  }
  
  logCitation(site, tier, status, notes);
} else if (command === 'next') {
  const next = getNextPriority();
  if (next) {
    console.log(`\n🎯 NEXT PRIORITY: ${next.name}`);
    console.log(`Tier: ${next.tier}`);
    console.log(`URL: ${next.url}`);
    if (next.importance) console.log(`Why: ${next.importance}`);
    console.log(`\nAction: Create/update listing with consistent NAP info.`);
  } else {
    console.log("\n✅ All Tier 1 and 2 citations complete! Move to Tier 3+");
  }
} else if (command === 'stats') {
  const log = getCitationLog();
  const byStatus = {
    completed: log.filter(l => l.status === 'completed').length,
    inProgress: log.filter(l => l.status === 'in-progress').length,
    pending: log.filter(l => l.status === 'pending').length
  };
  
  console.log("\n=== CITATION STATS ===");
  console.log(`Total Tracked: ${log.length}`);
  console.log(`Completed: ${byStatus.completed}`);
  console.log(`In Progress: ${byStatus.inProgress}`);
  console.log(`Pending: ${byStatus.pending}`);
} else {
  console.log(`
Local Citations Manager for Immunity IV LA

Citations = mentions of your business on other websites
Critical for local SEO and Google Maps ranking

Usage:
  node local-citations.js checklist     - Show full checklist with completion status
  node local-citations.js business      - Show NAP info and description variations
  node local-citations.js log [site] [tier] [status] [notes]  - Log progress
  node local-citations.js next          - Show next priority citation to complete
  node local-citations.js stats         - Show completion statistics

TIER 1 (Critical ~5 sites):
  • Google Business Profile
  • Yelp
  • Bing Places
  • Apple Business Connect
  • Facebook Business

TIER 2 (High Value ~50 sites):
  • Yellow Pages, BBB, Chamber of Commerce, etc.

TIER 3 (Healthcare ~20 sites):
  • Healthgrades, Wellness.com, Zocdoc, etc.

TIER 4 (LA Local ~20 sites):
  • LA area chambers, local media, etc.

CONSISTENCY IS KEY:
  - Use EXACT same business name everywhere
  - Use EXACT same phone number
  - Use EXACT same address (when you add one)
`);
}

module.exports = {
  BUSINESS_INFO,
  TIER1_CITATIONS,
  TIER2_CITATIONS,
  TIER3_HEALTHCARE,
  TIER4_LOCAL_LA,
  logCitation,
  getCitationLog,
  generateBusinessDescription,
  getNextPriority
};
