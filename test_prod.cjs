const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  await page.goto('http://localhost:4001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const html = await page.content();
  console.log('HTML length:', html.length);
  if (html.length < 2000) console.log(html);
  await browser.close();
  process.exit(0);
})();
