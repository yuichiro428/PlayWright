import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

// テストケース1
const testCases1 = [
  ['承認済', '', '送信する'],
  ['承認済', '', '送信する'],
  ['承認済', '', '送信しない'],
  ['未承認', '', ''],
  ['キャンセル', '', ''],
];

// 新規登録
test('test1', async ({ page }) => {
  await page.goto('https://reserve:9Pfhg7cBBj@reserve-tea.iarchitect.jp/manager/login');
  //画面のサイズを設定
  /* await page.setViewportSize({
    width: 1920,
    height: 1080,
  }); */

  // 管理画面ログイン
  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'ログイン' }).click();

  let count = 1; // テストNo
  for (const [status, email, send] of testCases1) {
    console.log(status, email, send);

    // 一般団体新規作成
    await page.getByRole('button', { name: '博物館予約' }).click();
    await page.getByRole('link', { name: '予約一覧' }).click();
    await page.getByRole('link', { name: '一般団体新規' }).click();

    // 団体情報
    await page.locator('input[name="group_name"]').fill(`KSZテスト団体0${count}`); // 団体名
    await page.getByPlaceholder('市区町村または、国名').fill('静岡市葵区'); // 市区町村

    // 日時
    await page.locator('input[name="reservation_date"]').fill('2024/12/31'); // 来館日
    await page.locator('select[name="start_time_hour"]').selectOption('09'); // 来館時間 開始(hour)
    await page.locator('select[name="end_time_hour"]').selectOption('15'); // 来館時間 終了(hour)

    // 人数・金額
    await page.locator('input[name="general_adult"]').fill('1'); // 大人
    await page.locator('input[name="general_adult_fee"]').fill('400'); // 金額

    //await page.locator('input[name="general_child"]').fill(`${count}`); // 中学生以下
    //await page.locator('input[name="general_student"]').fill(`${count}`); // 学生
    //await page.locator('input[name="general_old"]').fill(`${count}`); // 70歳以上
    //await page.locator('input[name="general_other_number"]').fill(`${count}`); // その他
    //await page.locator('input[name="general_disabled"]').fill(`${count}`); // 障がい者
    //await page.locator('input[name="tea"]').fill(`${count}`); // 茶道体験

    // 申込者情報
    await page.locator('input[name="applicant_charge"]').fill(`KSZテスト担当者0${count}`); // 担当者名
    await page.locator('input[name="applicant_tel"]').fill('1234567899'); // 電話番号
    await page.locator('input[name="applicant_mail"]').fill(email); // メールアドレス

    // 交通手段
    //await page.locator('input[name="bus_num"]').fill(`${count}`); // 大型バス
    //await page.locator('input[name="micro_bus_num"]').fill('1');  // マイクロバス
    await page.locator('input[name="car_num"]').fill('1');        // 乗用車s

    // その他
    // 領収書
    await page.getByRole('cell', { name: 'なし 団体名 会社名 その他' }).getByRole('insertion').first().click(); // なし
    //await page.locator('label').filter({ hasText: '団体名' }).getByRole('insertion').click(); // 団体名
    //await page.locator('label').filter({ hasText: '会社名' }).getByRole('insertion').click(); // 会社名
    
    // 募集状況
    await page.locator('label').filter({ hasText: '募集中' }).getByRole('insertion').click();  // 募集中
    //await page.locator('label').filter({ hasText: '催行決定' }).getByRole('insertion').click(); // 催行決定

    // 承認状況 クリック
    await page.getByRole('button', { name: `${status}` }).click();

    let css = await page.getByRole('button', { name: '承認済' }).getAttribute('class');
    console.log(css);

    // スクリーンショット
    let filename = `新規`;
    await takeScreenshot(page, filename, count);

    // 保存
    await page.getByRole('button', { name: '保存する' }).click();

    // 送信モーダル
    if (css == 'btn btn-outline btn-primary dim permission active') {
      if (send == '送信する') {
        // 送信
        await page.getByRole('link', { name: '送信する' }).click();
      }else {
        // 送信しない
        await page.getByRole('button', { name: '送信しない' }).click();
      }
    }

    // テストNoカウント
    count++;

  }

});

// テストケース2
const testCases2 = [
  ['承認済', '', '送信する', '324'],
  ['承認済', '', '送信する', '322'],
  ['承認済', '', '送信しない', '323'],
  ['未承認', '', '', '321'],
  ['キャンセル', '', '', '319'],
];

// 編集
test('test2', async ({ page }) => {
  await page.goto('https://reserve:9Pfhg7cBBj@reserve-tea.iarchitect.jp/manager/login');
  //画面のサイズを設定
  /* await page.setViewportSize({
    width: 1920,
    height: 1080,
  }); */

  // 管理画面ログイン
  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'ログイン' }).click();

  let count = 1; // テストNo
  for(const [status, email, send, id] of testCases2) {
    // 編集画面遷移
    await page.goto(`https://reserve-tea.iarchitect.jp/manager/museum/general/edit/${id}`);
    // スクリーンショット
    //let filename = `編集前${String(count).padStart(2, '0')}`;
    let filename = `編集後保存`;
    await takeScreenshot(page, filename, count);

    // 団体情報
    await page.locator('input[name="group_name"]').fill(`KSZテスト団体0${count}編集`); // 団体名
    await page.getByPlaceholder('市区町村または、国名').fill('静岡市葵区編集'); // 市区町村

    // 日時
    await page.locator('input[name="reservation_date"]').fill('2025/01/31'); // 来館日
    await page.locator('select[name="start_time_hour"]').selectOption('10'); // 来館時間 開始(hour)
    await page.locator('select[name="end_time_hour"]').selectOption('12'); // 来館時間 終了(hour)

    // 人数・金額
    await page.locator('input[name="general_adult"]').fill('2'); // 大人
    await page.locator('input[name="general_adult_fee"]').fill('800'); // 金額

    //await page.locator('input[name="general_child"]').fill(`${count}`); // 中学生以下
    //await page.locator('input[name="general_student"]').fill(`${count}`); // 学生
    //await page.locator('input[name="general_old"]').fill(`${count}`); // 70歳以上
    //await page.locator('input[name="general_other_number"]').fill(`${count}`); // その他
    //await page.locator('input[name="general_disabled"]').fill(`${count}`); // 障がい者
    //await page.locator('input[name="tea"]').fill(`${count}`); // 茶道体験

    // 申込者情報
    await page.locator('input[name="applicant_charge"]').fill(`KSZテスト担当者0${count}編集`); // 担当者名
    await page.locator('input[name="applicant_tel"]').fill('1234123412'); // 電話番号
    await page.locator('input[name="applicant_mail"]').fill(email); // メールアドレス

    // 交通手段
    //await page.locator('input[name="bus_num"]').fill(`${count}`); // 大型バス
    //await page.locator('input[name="micro_bus_num"]').fill('1');  // マイクロバス
    await page.locator('input[name="car_num"]').fill('2');        // 乗用車

    // その他
    // 領収書
    //await page.getByRole('cell', { name: 'なし 団体名 会社名 その他' }).getByRole('insertion').first().click(); // なし
    await page.locator('label').filter({ hasText: '団体名' }).getByRole('insertion').click(); // 団体名
    //await page.locator('label').filter({ hasText: '会社名' }).getByRole('insertion').click(); // 会社名
    
    // 募集状況
    //await page.locator('label').filter({ hasText: '募集中' }).getByRole('insertion').click();  // 募集中
    await page.locator('label').filter({ hasText: '催行決定' }).getByRole('insertion').click(); // 催行決定

    // 承認状況 クリック
    await page.getByRole('button', { name: `${status}` }).click();

    let css = await page.getByRole('button', { name: '承認済' }).getAttribute('class');
    console.log(css);

    // スクリーンショット
    filename = `編集後`;
    await takeScreenshot(page, filename, count);

    // 保存
    await page.getByRole('button', { name: '保存' }).click();

    // 送信モーダル
    if (css == 'btn btn-outline btn-primary dim permission active') {
      if (send == '送信する') {
        // 送信
        await page.getByRole('link', { name: '送信する' }).click();
      }else {
        // 送信しない
        await page.getByRole('button', { name: '送信しない' }).click();
      }
    }

    // テストNoカウント
    count++;

  }

});
