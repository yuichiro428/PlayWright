import { test, expect } from '@playwright/test';
import { readURLs } from './sheets';
import { checkRedirects } from './test';

test.setTimeout(180000); // タイムアウトを180秒に延長
//test.setTimeout(420000); // タイムアウトを420秒に延長

test('main', async ({ page }) => {
    // スプレッドシートからURLを取得する
    const urls = await readURLs();
    console.log(urls);

    // リダイレクトテスト実施
    await checkRedirects(page, urls);

    // ブラウザを閉じる
    //await page.close();
});