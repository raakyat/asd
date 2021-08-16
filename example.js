const puppeteer = require('puppeteer');

(async function main() {
  const browser = await puppeteer.launch({
    args:['--enable-resource-load-scheduler=false'],
    headless: true,
  });

  const start = Date.now();
  const promises = Array(100).fill(null).map(async () => {
    const url = 'https://developers.google.com/speed/pagespeed/insights/?hl=id&url=https%3A%2F%2Findonesia.garuda.workers.dev%2F'+(Date.now() - start)+'ms';  
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url,{timeout:9999999});
    console.log(url);
    console.log(`Page took ${Date.now() - start}ms to load.`);
  });
  await Promise.all(promises);
  console.log(`Opening of 10 pages took ${Date.now() - start}ms.`);
  await browser.close();
})();
