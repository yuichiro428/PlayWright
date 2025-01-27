import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

// ログイン処理
const BASE_URL = '';
const LOGIN_ID = '';
const LOGIN_PW = '';

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByLabel('メールアドレス').fill(LOGIN_ID);
  await page.getByLabel('パスワード').fill(LOGIN_PW);
  await page.getByRole('button', { name: 'ログイン' }).click();
}
// ************************************************************************************************************
// 資料請求・お問い合わせ 1

test('お問い合わせ送信1', async ({ page }) => {
  let text = "KSZテスト1入力なし";
  // フォームへ遷移
  await page.goto(`https://alia:xyW3nAjMd+<xw@alia.iarchitect.jp/inquiry/index/1`);

  // 名前
  await page.locator('input').nth(1).fill(text);
  // メールアドレス
  await page.locator('input').nth(2).fill('yuichiro.yamazaki@kufu.co.jp');
  // 記入欄
  await page.locator('textarea').nth(0).fill(text);
  // 選択ボタン
  await page.getByText('資料請求', { exact: true }).click();
  //await page.getByText('お問い合わせ', { exact: true }).click();
  
  // 確認ボタン
  await page.getByRole('button', { name: '入力内容を確認する' }).click();

  // スクリーンショット
  await page.getByText('お名前 必須').click();
  for (let i = 0; i < 5; i++) {
    await page.locator('#form1').press('ArrowDown');
  }
  await page.waitForTimeout(1000);
  await takeScreenshot(page, '資料請求', 1);
  
  // 送信
  //await page.getByRole('button', { name: 'この内容で送信する' }).click();

});

// ************************************************************************************************************
// 来場予約 2

test('お問い合わせ送信2', async ({ page }) => {
  let text = "KSZテスト4入力あり";

  // フォームへ遷移
  await page.goto(`https://alia:xyW3nAjMd+<xw@alia.iarchitect.jp/inquiry/index/2`);

  // 名前
  await page.locator('input').nth(1).fill(text);
  // メールアドレス
  await page.locator('input').nth(2).fill('yuichiro.yamazaki@kufu.co.jp');
  // 来場日
  // 1
  await page.locator('input').nth(4).click();
  await page.getByText('31').nth(1).click();
  await page.locator('select').nth(0).selectOption('9:00〜');
  // 2
  await page.locator('input').nth(5).click();
  await page.getByText('31').nth(3).click();
  await page.locator('select').nth(1).selectOption('13:00〜');

  // 記入欄
  await page.locator('textarea').fill(text);
  
  // 確認ボタン
  await page.getByRole('button', { name: '入力内容を確認する' }).click();

  // スクリーンショット
  await page.getByText('お名前 必須').click();
  for (let i = 0; i < 5; i++) {
    await page.locator('#form2').press('ArrowDown');
  }
  await page.waitForTimeout(1000);
  await takeScreenshot(page, '来場予約', 1);
  for (let i = 0; i < 5; i++) {
    await page.locator('#form2').press('ArrowDown');
  }
  await page.waitForTimeout(1000);
  await takeScreenshot(page, '来場予約', 2);
  
  // 送信
  //await page.getByRole('button', { name: 'この内容で送信する' }).click();

});

// ************************************************************************************************************
// ハワイ不動産セミナー 5

test('お問い合わせ送信3', async ({ page }) => {
  let text = "KSZテスト6入力あり";

  // フォームへ遷移
  await page.goto(`https://alia:xyW3nAjMd+<xw@alia.iarchitect.jp/inquiry/index/5`);

  // 名前
  await page.locator('input').nth(1).fill(text);
  // かな
  await page.locator('input').nth(2).fill('てすと');
  // メールアドレス
  await page.locator('input').nth(3).fill('yuichiro.yamazaki@kufu.co.jp');
  // 興味ある内容
  await page.getByText('居住用セカンドハウス').click();
  // 予算
  await page.getByText('〜5000万円').click();
  // 記入欄
  await page.locator('textarea').fill(text);

  
  // 確認ボタン
  await page.getByRole('button', { name: '入力内容を確認する' }).click();

  // スクリーンショット
  await page.getByText('お名前 必須').click();
  for (let i = 0; i < 5; i++) {
    await page.locator('#form5').press('ArrowDown');
  }
  await page.waitForTimeout(1000);
  await takeScreenshot(page, 'ハワイ不動産セミナー', 1);
  for (let i = 0; i < 5; i++) {
    await page.locator('#form5').press('ArrowDown');
  }
  await page.waitForTimeout(1000);
  await takeScreenshot(page, 'ハワイ不動産セミナー', 2);
  for (let i = 0; i < 5; i++) {
    await page.locator('#form5').press('ArrowDown');
  }
  await page.waitForTimeout(1000);
  await takeScreenshot(page, 'ハワイ不動産セミナー', 3);
  
  // 送信
  //await page.getByRole('button', { name: 'この内容で送信する' }).click();

});

// ************************************************************************************************************
// 新規作成 10

test('お問い合わせ送信4', async ({ page }) => {
  let text = "KSZテスト8入力あり";

  // フォームへ遷移
  await page.goto(`https://alia:xyW3nAjMd+<xw@alia.iarchitect.jp/inquiry/index/10`);

  // 名前
  await page.locator('input').nth(1).fill(text);
  // メールアドレス
  await page.locator('input').nth(2).fill('yuichiro.yamazaki@kufu.co.jp');
  // 入力欄
  await page.getByPlaceholder('こちらにお問い合わせ内容をご記入ください').fill(text);

  
  // 確認ボタン
  await page.getByRole('button', { name: '入力内容を確認する' }).click();

  // スクリーンショット
  await page.getByText('名前 必須').click();
  for (let i = 0; i < 5; i++) {
    await page.locator('#form10').press('ArrowDown');
  }
  await page.waitForTimeout(1000);
  await takeScreenshot(page, 'テスト4', 1);
  
  // 送信
  //await page.getByRole('button', { name: 'この内容で送信する' }).click();

});

// ************************************************************************************************************