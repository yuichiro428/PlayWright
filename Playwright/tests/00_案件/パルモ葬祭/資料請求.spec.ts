import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';


let count = 4;

// 資料請求
test('資料請求', async ({ page }) => {
  // 式場エリア
  //const holeArea = '浜松市・湖西市';
  const holeArea = '岡崎市';

  // 式場名
  const holeName = 'パルモ葬祭 かぞくホール矢作南';

  // ページ遷移
  await page.goto(('https://palmo:sosai@palmo-sosai.iarchitect.jp/inquiry/index/1'));
  // お名前
  await page.getByPlaceholder('例）静岡　太郎').fill(`KSZ山﨑テスト${count}`);
  // メールアドレス
  await page.getByPlaceholder('sample@sample.jp').fill('');
  // 電話番号
  await page.getByPlaceholder('0534829177').fill('1234567899');
  // ご住所
  await page.getByPlaceholder('例）0001234').fill('4200065');
  await page.getByPlaceholder('例）浜松市中央区三組町185-').fill('静岡市葵区新通1-1');
  // 資料送付希望の式場
  await page.locator('summary').filter({ hasText: holeArea }).click();
  await page.getByLabel(holeName).check();
  // ご質問
  await page.locator('textarea').fill(`KSZ山﨑テスト${count}`);
  // 封筒選択
  await page.getByLabel('はい').check();
  // 確認画面へ遷移
  await page.getByRole('button', { name: '「個人情報保護方針」に同意の下 確認画面に進む' }).click();

  // スクリーンショット
  const filename = '資料請求_確認';
  await takeScreenshot(page, filename, count);

  // 送信
  //await page.getByRole('button', { name: '送信する' }).click();

});

/*********************************************************************************************************/

// お問い合わせ
test('お問い合わせ', async ({ page }) => {
  // ページ遷移
  await page.goto(('https://palmo:sosai@palmo-sosai.iarchitect.jp/inquiry/index/2'));
  // 式場
  await page.getByRole('combobox').selectOption('35'); // 矢作南
  // お名前
  await page.getByPlaceholder('例）静岡　太郎').fill(`KSZ山﨑テスト${count}`);
  // メールアドレス
  await page.getByPlaceholder('sample@sample.jp').fill('');
  // 電話番号
  await page.getByPlaceholder('0534829177').fill('1234567899');
  // 内容
  await page.locator('textarea').fill(`KSZ山﨑テスト${count}`);
  // 確認画面へ遷移
  await page.getByRole('button', { name: '「個人情報保護方針」に同意の下 確認画面に進む' }).click();

  // スクリーンショット
  const filename = 'お問い合わせ_確認';
  await takeScreenshot(page, filename, count);

  // 送信
  //await page.getByRole('button', { name: '送信する' }).click();

});

/*********************************************************************************************************/

// 家族ホール 資料請求
test('かぞくホール 資料請求', async ({ page }) => {
  // 式場エリア
  //const holeArea = '浜松市・湖西市';
  const holeArea = '岡崎市';

  // 式場名
  const holeName = 'パルモ葬祭 かぞくホール矢作南';

  // ページ遷移
  await page.goto(('https://palmo:sosai@palmo-sosai.iarchitect.jp/inquiry/index/6'));
  // お名前
  await page.getByPlaceholder('例）静岡　太郎').fill(`KSZ山﨑テスト${count}`);
  // メールアドレス
  await page.getByPlaceholder('sample@sample.jp').fill('');
  // 電話番号
  await page.getByPlaceholder('09012345678').fill('1234567899');
  // ご住所
  await page.getByPlaceholder('例）0001234').fill('4200065');
  await page.getByPlaceholder('例）浜松市中央区三組町185-').fill('静岡市葵区新通1-1');
  // 資料送付希望の式場
  await page.getByLabel(holeName).check();
  // ご質問
  await page.locator('textarea').fill(`KSZ山﨑テスト${count}`);
  // 確認画面へ遷移
  await page.getByRole('button', { name: '「個人情報保護方針」に同意の下 確認画面に進む' }).click();

  // スクリーンショット
  const filename = 'かぞくホール資料請求_確認';
  await takeScreenshot(page, filename, count);

  // 送信
  //await page.getByRole('button', { name: '送信する' }).click();

});

/*********************************************************************************************************/

// かぞくホール お問い合わせ
test('かぞくホール お問い合わせ', async ({ page }) => {
  // ページ遷移
  await page.goto(('https://palmo:sosai@palmo-sosai.iarchitect.jp/inquiry/index/7'));
  // 式場
  await page.getByRole('combobox').selectOption('8'); // 矢作南
  // お名前
  await page.getByPlaceholder('例）静岡　太郎').fill(`KSZ山﨑テスト${count}`);
  // メールアドレス
  await page.getByPlaceholder('sample@sample.jp').fill('');
  // 電話番号
  await page.getByPlaceholder('0901234').fill('1234567899');
  // 内容
  await page.locator('textarea').fill(`KSZ山﨑テスト${count}`);
  // 確認画面へ遷移
  await page.getByRole('button', { name: '「個人情報保護方針」に同意の下 確認画面に進む' }).click();

  // スクリーンショット
  const filename = 'かぞくホールお問い合わせ_確認';
  await takeScreenshot(page, filename, count);

  // 送信
  //await page.getByRole('button', { name: '送信する' }).click();

});

/*********************************************************************************************************/
