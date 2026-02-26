const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const config = require('./config');

async function runTarget(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); // Increased timeout

    const title = await page.title();
    const metaDesc = await page.locator('meta[name="description"]').textContent().catch(()=>null); // Safe locator
    const h1 = await page.locator('h1').textContent().catch(()=>null); // Safe locator
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(()=>null); // Safe locator

    // Basic performance hint via page.evaluate
    const pageLoadTiming = await page.evaluate(() => {
      if (window.performance && window.performance.timing) {
        const t = window.performance.timing;
        const loadMs = t.loadEventEnd - t.navigationStart;
        return { loadMs };
      }
      return null;
    });

    // Accessibility-ish check: count images with alt or aria-label
    const imgCount = await page.$$eval('img', imgs => imgs.length);
    const imgsWithAlt = await page.$$eval('img[alt], img[title], img[aria-label]', imgs => imgs.length);

    const screenshot = config.metrics.captureScreenshots ? await page.screenshot({ fullPage: true }).then(b => b.toString('base64')) : null;

    return {
      url,
      title,
      metaDesc,
      h1,
      canonical,
      timing: pageLoadTiming,
      imgCount,
      imgsWithAlt,
      screenshot
    };
  } catch (err) {
    console.error(`Error processing ${url}: ${err.message}`);
    return { url, error: err.message };
  } finally {
    await browser.close();
  }
}

(async () => {
  const results = [];
  const dataDir = path.join(__dirname, '../data'); // Save in 'data' directory relative to scripts/playwright
  const reportFilePath = path.join(dataDir, 'playwright-results.json');

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir, { recursive: true });
  }

  console.log('Starting Playwright competitor scan...');
  console.log(`Targets: ${config.targets.join(', ')}`);

  for (const url of config.targets) {
    console.log(`Processing: ${url}`);
    const data = await runTarget(url);
    results.push(data);
  }

  const reportData = {
    runTimestamp: new Date().toISOString(),
    targetsScanned: config.targets.length,
    results: results
  };

  // Write results to JSON file
  fs.writeFileSync(reportFilePath, JSON.stringify(reportData, null, 2));
  console.log(`Report saved to: ${reportFilePath}`);
})();
