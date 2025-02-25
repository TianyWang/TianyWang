const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // 设置视口大小
  await page.setViewport({ width: 800, height: 600 });
  
  // 访问 git-skyline 网站
  const username = process.env.GITHUB_USERNAME;
  await page.goto(`https://git-skyline.huakun.tech/?username=${username}&year=2024`, {
    waitUntil: 'networkidle2',
  });

  // 等待贡献图加载（假设有特定选择器，可能需调整）
  await page.waitForSelector('body'); // 若有具体元素，替换为实际选择器

  // 截图并保存
  await page.screenshot({
    path: 'assets/TianyWang-2024-git-skyline.png',
    fullPage: true,
  });

  await browser.close();
})();