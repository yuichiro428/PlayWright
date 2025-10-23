import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

test('お盆供物注文', async ({ page }) => {
  let count = 1;
  // テストNo
  let testNo = "09";

  // 特約店ログイン
  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/member/login/');
  await page.locator('input[name="login_id"]').fill('');
  await page.locator('input[name="password"]').fill('');
  await page.getByRole('button', { name: 'ログイン' }).click();

  // ログイン　スクショ
  await takeScreenshot(page, `ログイン`, count);

  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/obon/area');
  //画面のサイズを設定
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });

  // 市町選択
  await page.getByRole('link', { name: '浜松市' }).click();
  //await page.getByRole('link', { name: '磐田市' }).click();
  //await page.getByRole('link', { name: '袋井市' }).click();
  //await page.getByRole('link', { name: '森町' }).click();
  //await page.getByRole('link', { name: '掛川市' }).click();
  //await page.getByRole('link', { name: '菊川市' }).click();
  //await page.getByRole('link', { name: '御前崎市' }).click();
  //await page.getByRole('link', { name: '牧之原市' }).click();

  // 選択確認スクショ
  await takeScreenshot(page, `確認`, count);
  
  // 供物選択
  await page.locator('li').filter({ hasText: 'スタンド生花#30No.110033 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: 'スタンド生花#25No.110032 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: 'スタンド生花#20No.110031 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: 'スタンド生花#15No.110030 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '盆アレンジ枕花#40No.111315 一対' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '盆アレンジ枕花#30No.111017 一対' }).getByRole('link').click();

  await page.locator('li').filter({ hasText: '籠盛#20ビールおつまみNo.111397 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '籠盛#20 詰め合わせNo.111026 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '籠盛#20 フルーツ缶No.111028 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '籠盛#15ビールおつまみNo.111396 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '籠盛#15 詰め合わせNo.111025 一基' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '籠盛#15 フルーツ缶No.111027 一基' }).getByRole('link').click();

  await page.locator('li').filter({ hasText: '絹芙蓉（きぬふよう）No.111020 説明を読む 高さ' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '花あかりNo.111236 説明を読む 高さ52cm×幅' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '楽（らく）No.110553 説明を読む 高さ69cm×幅' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '桜No.111237 説明を読む 高さ70cm×幅27cm' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '花梨No.111238 説明を読む 高さ41cm×幅' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: 'つむぎNo.111019 説明を読む 高さ38cm×幅' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: 'せせらぎNo.110547 説明を読む 高さ84cm×幅' }).getByRole('link').click();

  await page.locator('li').filter({ hasText: 'やませNo.110564 説明を読む 高さ44cm×幅' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '絹清花No.111240 説明を読む 高さ43cm×幅' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '小菊（こぎく）No.110560 説明を読む 高さ37cm' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '香水（こうすい）No.110561 説明を読む 高さ' }).getByRole('link').click();
  await page.locator('li').filter({ hasText: '華水（かすい）No.110559 説明を読む 高さ43cm' }).getByRole('link').click();

  await page.getByRole('link', { name: '注文の確認へ進む' }).click();

  // 氏名
  await page.getByPlaceholder('静岡').fill('KSZ山崎');
  await page.getByPlaceholder('太郎', { exact: true }).fill(`テスト${testNo}`);

  // 郵便番号
  await page.getByPlaceholder('0000000', { exact: true }).fill('4200065');
  
  // 住所
  await page.locator('#destination_address').fill(`テスト${testNo}`);

  // 電話番号
  await page.getByPlaceholder('0000000000').fill('1234567899');

  // お届け月
  //await page.getByRole('radio').first().check(); // 7月
  await page.getByRole('radio').nth(1).check(); // 8月

  // 宗派
  //await page.getByRole('radio').nth(2).check(); // 不明
  //await page.getByRole('radio').nth(3).check(); // 仏式
  await page.getByRole('radio').nth(4).check(); // 神式

  // 名札
  await page.locator('#messages_1_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_2_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_3_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_4_0').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: '盆アレンジ枕花#40' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: '盆アレンジ枕花#30' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_7_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_8_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_9_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_10_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_11_0').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_12_0').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: '絹芙蓉（きぬふよう）' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: '花あかり' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: '楽（らく）' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: '桜' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: '花梨' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: 'つむぎ' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.getByRole('cell', { name: 'せせらぎ' }).getByPlaceholder('例：名札の表記を左右で別けたい場合\n(1)東海太郎　(2)東海花子').fill(`KSZ山崎テスト${testNo}`);
  await page.locator('#messages_21_0').fill(`KSZ山崎テスト${testNo}`);

  await page.getByRole('button', { name: '内容を確認する' }).click();

  // 注文者入力
  // 氏名
  await page.locator('input[name="last_name"]').fill('KSZ山崎');
  await page.locator('input[name="first_name"]').fill(`テスト${testNo}`);

  // 住所
  await page.getByPlaceholder('0000000', { exact: true }).fill('4200065');
  await page.locator('#address').fill('静岡県静岡市葵区新通');

  // 電話番号
  await page.getByPlaceholder('0000000000').fill('1234567899');

  // メールアドレス
  await page.locator('#email').fill('');
  await page.locator('#email_confirm').fill('');

  // クレジットカード
  await page.locator('#card1').fill('4111');
  await page.locator('#card2').fill('1111');
  await page.locator('#card3').fill('1111');
  await page.locator('#card4').fill('1111');
  await page.locator('#security_code').fill('123');
  await page.locator('#card_year').selectOption('25');

  // 注文画面　スクショ
  await takeScreenshot(page, `注文画面`, count);

  // 注文確定
  //await page.getByRole('button', { name: '注文確定' }).click();

});
