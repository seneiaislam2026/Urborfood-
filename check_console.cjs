const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  page.on('response', resp => {
    if (resp.status() >= 400) console.log('404 URL:', resp.url());
  });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  await browser.close();
})();
