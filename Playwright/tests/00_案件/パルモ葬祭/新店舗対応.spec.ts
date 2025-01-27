import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';
import { count } from 'console';

// 対象店舗情報
const shopName = 'パルモ葬祭 かぞくホール矢作南';
const shopAddress = '愛知県岡崎市上佐々木町鹿乗8-3';
const shopTel = '0120-508-575';
const shopFax = '0564-53-0215';
//const shopArea: string = '静岡県';
const shopArea: string = '愛知県';
const shopID  = '60';

// 表示確認
test('表示確認', async ({ page }) => {
  await page.goto('https://palmo:sosai@palmo-sosai.iarchitect.jp/');

  let count = 1;

  // 葬儀場を探す
  await page.goto('https://palmo-sosai.iarchitect.jp/ceremonyhall.html?area=岡崎市');
  await takeScreenshot(page, '葬儀場表示', count);
  count++;

  // ブログ一覧
  await page.goto(`https://palmo-sosai.iarchitect.jp/about/blog.html?c_hall_category=${shopID}`);
  await page.getByText('愛知県 岡崎市').click();
  await takeScreenshot(page, 'ブログ表示', count);
  count++;

  // お知らせ一覧
  await page.goto(`https://palmo-sosai.iarchitect.jp/news.html?c_hall_category=${shopID}`);
  await page.getByText('愛知県 岡崎市').click();
  await takeScreenshot(page, 'お知らせ表示', count);
  count++;

  // シミュレーション
  await page.goto('https://palmo-sosai.iarchitect.jp/simulator/start.html');
  await page.getByRole('link', { name: 'かんたんお見積スタート 下記注意文を確認の上はじめる' }).click();
  await page.getByLabel(shopArea).check();
  await takeScreenshot(page, 'シミュレーション表示', count);
  count++;

  // かぞくホール
  await page.goto('https://palmo-sosai.iarchitect.jp/kazokuhall.html');
  await takeScreenshot(page, 'かぞくホール表示', count);
  count++;

  // サイトマップ
  await page.goto('https://palmo-sosai.iarchitect.jp/sitemap.html');
  await takeScreenshot(page, 'サイトマップ表示', count);
  count++;

});

/************************************************************************************************* */
// ログイン処理
const BASE_URL = 'https://palmo:sosai@palmo-sosai.iarchitect.jp/sol_admin/login/';
const LOGIN_ID = 'ksz_yamazaki';
const LOGIN_PW = 'asdf1234';

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Username').fill(LOGIN_ID);
  await page.getByPlaceholder('Password').fill(LOGIN_PW);
  await page.getByRole('button', { name: 'ログイン' }).click();
}

// ページ作成
test('ページ作成', async ({ page }) => {
  await login(page);
  let count = 1;
  
  // ブログ
  count++;
  // お知らせ
  count++;
  // イベント
  count++;
  // お客様の声
  count++;
  // 葬儀事例
  count++;

});