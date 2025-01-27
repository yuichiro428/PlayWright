import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';
import { count } from 'console';

test('カード会員(葬祭)', async ({ page }) => {
  // 入力ページ遷移
  await page.goto('https://palmo:sosai@palmo-sosai.iarchitect.jp/izumo_card/entry');

  // 名前
  await page.getByPlaceholder('例）静岡　太郎').fill('KSZ山﨑　テスト1');
  await page.getByPlaceholder('例）シズオカ　タロウ').fill('ヤマザキ　テスト');

  // 性別
  await page.getByRole('radio', { name: '男性' }).check();

  // 生年月日
  await page.locator('select[name="birthday_year"]').selectOption('1990');
  await page.locator('select[name="birthday_month"]').selectOption('1');
  await page.locator('select[name="birthday_day"]').selectOption('1');
  
  // 電話番号
  await page.getByPlaceholder('0534829177').fill('1234567899');
  await page.getByPlaceholder('09012345678').fill('1234567899');

  // メールアドレス
  await page.locator('input[name="email"]').fill('yuichiro.yamazaki@kufu.co.jp');
  await page.locator('input[name="email_confirm"]').fill('yuichiro.yamazaki@kufu.co.jp');

  // 住所
  await page.getByPlaceholder('例）0001234').fill('4200065');
  await page.getByPlaceholder('例）浜松市中央区三組町185-').fill('静岡市葵区新通1-1');

  // キャンペーン
  await page.getByPlaceholder('123456789').fill('izumo_test002');
  await page.getByRole('button', { name: 'キャンペーンコードを適用する' }).click();

  // イベント案内・会報誌・個人情報同意
  await page.locator('input[name="is_want_event_info"]').check();
  await page.locator('input[name="is_want_to_send_newsletter"]').check();
  await page.getByLabel('会員規約・個人情報の取扱いに同意').check();

  // 家族情報追加　 n回分
  const n = 8; // MAX 8
  for (let i = 0; i < n; i++) {
    await page.getByText('家族情報を追加する').click();
    await page.locator(`input[name="families\\[${i}\\]\\[name\\]"]`).fill(`家族テスト${i+1}`);
    await page.locator(`input[name="families\\[${i}\\]\\[name_kana\\]"]`).fill(`カゾクテスト`);
    await page.getByLabel('男性').nth(i+1).check();
    await page.locator(`select[name="families\\[${i}\\]\\[birthday_month\\]"]`).selectOption(`${i+1}`);
    await page.locator(`select[name="families\\[${i}\\]\\[birthday_day\\]"]`).selectOption(`${i+1}`);
    await page.locator(`select[name="families\\[${i}\\]\\[relationship\\]"]`).selectOption('夫');
  }

  // 支払い情報入力画面に遷移
  await page.locator('p').filter({ hasText: 'お支払い情報の入力' }).click();

  // クレジット情報
  await page.getByPlaceholder('0000000000000000').fill('4111111111111111');
  await page.getByPlaceholder('123').fill('123');
  await page.locator('#card_month').selectOption('01');
  await page.locator('#card_year').selectOption('25');
  await page.getByPlaceholder('TAROU SHIZUOKA').fill('TEST');

  // 確認画面へ遷移
  await page.getByRole('button', { name: '確認画面へ' }).click();
  
  // スクリーンショット
  const filename = 'カード会員（葬祭）_確認';
  await takeScreenshot(page, filename, count);

  // 送信
  //await page.getByRole('button', { name: 'お支払い・お申し込み' }).click();

});

test('カード会員(冠婚)', async ({ page }) => {
  // 入力ページ遷移
  await page.goto('https://palmo:sosai@palmo-sosai.iarchitect.jp//izumo_card_bridal/entry');

  // 名前
  await page.getByPlaceholder('例）静岡　太郎').fill('KSZ山﨑　テスト2');
  await page.getByPlaceholder('例）シズオカ　タロウ').fill('ヤマザキ　テスト');

  // 性別
  await page.getByRole('radio', { name: '男性' }).check();

  // 生年月日
  await page.locator('select[name="birthday_year"]').selectOption('1990');
  await page.locator('select[name="birthday_month"]').selectOption('1');
  await page.locator('select[name="birthday_day"]').selectOption('1');
  
  // 電話番号
  await page.getByPlaceholder('0534829177').fill('1234567899');
  await page.getByPlaceholder('09012345678').fill('1234567899');

  // メールアドレス
  await page.locator('input[name="email"]').fill('yuichiro.yamazaki@kufu.co.jp');
  await page.locator('input[name="email_confirm"]').fill('yuichiro.yamazaki@kufu.co.jp');

  // 住所
  await page.getByPlaceholder('例）0001234').fill('4200065');
  await page.getByPlaceholder('例）浜松市中央区三組町185-').fill('静岡市葵区新通1-1');

  // キャンペーン
  await page.getByPlaceholder('123456789').fill('izumo_test002');
  await page.getByRole('button', { name: 'キャンペーンコードを適用する' }).click();

  // イベント案内・会報誌・個人情報同意
  await page.locator('input[name="is_want_event_info"]').check();
  await page.locator('input[name="is_want_to_send_newsletter"]').check();
  await page.getByLabel('会員規約・個人情報の取扱いに同意').check();

  // 家族情報追加　 n回分
  const n = 8; // MAX 8
  for (let i = 0; i < n; i++) {
    await page.getByText('家族情報を追加する').click();
    await page.locator(`input[name="families\\[${i}\\]\\[name\\]"]`).fill(`家族テスト${i+1}`);
    await page.locator(`input[name="families\\[${i}\\]\\[name_kana\\]"]`).fill(`カゾクテスト`);
    await page.getByLabel('男性').nth(i+1).check();
    await page.locator(`select[name="families\\[${i}\\]\\[birthday_month\\]"]`).selectOption(`${i+1}`);
    await page.locator(`select[name="families\\[${i}\\]\\[birthday_day\\]"]`).selectOption(`${i+1}`);
    await page.locator(`select[name="families\\[${i}\\]\\[relationship\\]"]`).selectOption('夫');
  }

  // 支払い情報入力画面に遷移
  await page.locator('p').filter({ hasText: 'お支払い情報の入力' }).click();

  // クレジット情報
  await page.getByPlaceholder('0000000000000000').fill('4111111111111111');
  await page.getByPlaceholder('123').fill('123');
  await page.locator('#card_month').selectOption('01');
  await page.locator('#card_year').selectOption('25');
  await page.getByPlaceholder('TAROU SHIZUOKA').fill('TEST');

  // 確認画面へ遷移
  await page.getByRole('button', { name: '確認画面へ' }).click();
  
  // スクリーンショット
  const filename = 'カード会員（冠婚）_確認';
  await takeScreenshot(page, filename);

  // 送信
  //await page.getByRole('button', { name: 'お支払い・お申し込み' }).click();

});

test('カード会員(店舗)', async ({ page }) => {
  // 入力ページ遷移
  await page.goto('https://palmo:sosai@palmo-sosai.iarchitect.jp/izumo_card_shop/entry');

  // 名前
  await page.getByPlaceholder('例）静岡　太郎').fill('KSZ山﨑　テスト3');
  await page.getByPlaceholder('例）シズオカ　タロウ').fill('ヤマザキ　テスト');

  // 性別
  await page.getByRole('radio', { name: '男性' }).check();

  // 生年月日
  await page.locator('select[name="birthday_year"]').selectOption('1990');
  await page.locator('select[name="birthday_month"]').selectOption('1');
  await page.locator('select[name="birthday_day"]').selectOption('1');
  
  // 電話番号
  await page.getByPlaceholder('0534829177').fill('1234567899');
  await page.getByPlaceholder('09012345678').fill('1234567899');

  // メールアドレス
  await page.locator('input[name="email"]').fill('yuichiro.yamazaki@kufu.co.jp');
  await page.locator('input[name="email_confirm"]').fill('yuichiro.yamazaki@kufu.co.jp');

  // 住所
  await page.getByPlaceholder('例）0001234').fill('4200065');
  await page.getByPlaceholder('例）浜松市中央区三組町185-').fill('静岡市葵区新通1-1');

  // 店舗選択
  await page.locator('select[name="card_hall"]').selectOption('8');   // エストリアル
  //await page.locator('select[name="card_hall"]').selectOption('9');   // ラトリエ
  //await page.locator('select[name="card_hall"]').selectOption('11');  // サンフィレール岡崎
  //await page.locator('select[name="card_hall"]').selectOption('10');  // サントフェリーチェ
  //await page.locator('select[name="card_hall"]').selectOption('19');  // スタジオaxe
  //await page.locator('select[name="card_hall"]').selectOption('26');  // Kスタジオ本店
  //await page.locator('select[name="card_hall"]').selectOption('27');  // Kスタジオ静岡南
  //await page.locator('select[name="card_hall"]').selectOption('28');  // Kスタジオ草薙

  // キャンペーン
  await page.getByPlaceholder('123456789').fill('izumo_test002');
  await page.getByRole('button', { name: 'キャンペーンコードを適用する' }).click();

  // イベント案内・会報誌・個人情報同意
  await page.locator('input[name="is_want_event_info"]').check();
  await page.locator('input[name="is_want_to_send_newsletter"]').check();
  await page.getByLabel('会員規約・個人情報の取扱いに同意').check();

  // 家族情報追加　 n回分
  const n = 8; // MAX 8
  for (let i = 0; i < n; i++) {
    await page.getByText('家族情報を追加する').click();
    await page.locator(`input[name="families\\[${i}\\]\\[name\\]"]`).fill(`家族テスト${i+1}`);
    await page.locator(`input[name="families\\[${i}\\]\\[name_kana\\]"]`).fill(`カゾクテスト`);
    await page.getByLabel('男性').nth(i+1).check();
    await page.locator(`select[name="families\\[${i}\\]\\[birthday_month\\]"]`).selectOption(`${i+1}`);
    await page.locator(`select[name="families\\[${i}\\]\\[birthday_day\\]"]`).selectOption(`${i+1}`);
    await page.locator(`select[name="families\\[${i}\\]\\[relationship\\]"]`).selectOption('夫');
  }

  // 確認画面へ遷移
  await page.getByRole('button', { name: '申し込み内容の確認' }).click();
  
  // スクリーンショット
  const filename = 'カード会員(店舗)_確認';
  await takeScreenshot(page, filename);

  // 送信
  //await page.getByRole('button', { name: 'お申し込み' }).click();

});