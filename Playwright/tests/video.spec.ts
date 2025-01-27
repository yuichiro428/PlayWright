import { test, chromium } from '@playwright/test';

test('テスト', async ({ browser }) => {
  // ビデオ録画オプション付きでブラウザコンテキストを作成
  // const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: '/Users/yamazaki/Documents/作業関係/Playwright/videos', // 保存先ディレクトリ
      size: { width: 1280, height: 720 }, // ビデオサイズ（オプション）
    },
  });

  // 新しいページを作成
  const page = await context.newPage();
  await page.goto('https://riviera:reborn@rivirope-reborn.iarchitect.jp/');

  // テスト終了後のビデオ保存
  const videoPath = await page.video()?.path();
  console.log(`ビデオのパス: ${videoPath}`);

  await page.close();
  await context.close(); // コンテキストを閉じるとビデオが保存される
  await browser.close();

});

