import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const artifactDir = 'C:\\Users\\ajayk\\.gemini\\antigravity\\brain\\86f40baf-d122-46dc-baef-077b65981a07';

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1950, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  // Wait 1 second for animations and fonts to settle
  await new Promise(r => setTimeout(r, 1000));

  // Capture Dark Mode
  const darkPath = path.join(artifactDir, 'screenshot-dark.png');
  await page.screenshot({ path: darkPath, fullPage: true });
  console.log('Saved Dark Mode screenshot to', darkPath);

  // Click Light Mode button
  const toggleBtn = await page.$('button[title*="Light Mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 800));
    const lightPath = path.join(artifactDir, 'screenshot-light.png');
    await page.screenshot({ path: lightPath, fullPage: true });
    console.log('Saved Light Mode screenshot to', lightPath);
  }

  await browser.close();
}

capture().catch(err => {
  console.error('Error capturing screenshot:', err);
  process.exit(1);
});
