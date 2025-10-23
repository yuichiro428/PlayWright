import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

//test.setTimeout(100000); // タイムアウトを100秒に延長
//test.setTimeout(200000); // タイムアウトを200秒に延長
//test.setTimeout(300000); // タイムアウトを300秒に延長

// await page.waitForTimeout(3000); // 画面反映のため待機（3秒）

// ログイン処理
const BASE_URL = 'https://prunus.iarchitect.jp/login';
const LOGIN_ID = '';
const LOGIN_PW = '';

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByLabel('メールアドレス').fill(LOGIN_ID);
  await page.getByLabel('パスワード').fill(LOGIN_PW);
  await page.getByRole('button', { name: 'ログイン' }).click();
}
// ************************************************************************************************************

// ケース1
const Case1 = [
  [1, 1], 
];

test('test1', async ({ page }) => {
  // ログイン
  //await login(page);

  let count = 1; // テスト用カウンタ
  for (const [id, category] of Case1) {
    // 入力値設定
    let text = `KSZ山﨑テスト${count}`;

    // ページ遷移
    await page.goto(`https://prunus.iarchitect.jp/member/create`);

    count++;
  }

});

// ************************************************************************************************************
