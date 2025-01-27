import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

test.setTimeout(100000); // タイムアウトを100秒に延長

// ログイン処理
const BASE_URL = 'https://grace:4K<3c9Nf+s@grace.iarchitect.jp/login';
//const LOGIN_ID = 'yuichiro.yamazaki@kufu.co.jp'; // 営業
const LOGIN_ID = 'test01@iarchitect.co.jp'; // マネージャー
const LOGIN_PW = 'Asdf1234';

async function login(page) {
  await page.goto(BASE_URL);
  await page.getByLabel('メールアドレス').fill(LOGIN_ID);
  await page.getByLabel('パスワード').fill(LOGIN_PW);
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.locator('.phpdebugbar-close-btn').click(); // デバッグバーを閉じる
}
// ************************************************************************************************************

// 案件新規作成
const Case1 = [
  // 案件ID, カテゴリ(1=手続き代行, ... 16=その他)
  [248, 1],
];

test('test1', async ({ page }) => {
  // ログイン
  await login(page);

  for (let count = 1; count <= 5; count++) {
    for (const [project_id, category] of Case1) {
      // ページ遷移
      await page.goto(`https://grace.iarchitect.jp/project/edit/${project_id}?project_category=${category}`);

      // #項目入力#
      // **案件情報**
      // 進行状況
      //await page.locator('#status').selectOption('1'); // 接触なし
      //await page.locator('#status').selectOption('2'); // 対応開始
      //await page.locator('#status').selectOption('3'); // 依頼不要
      //await page.locator('#status').selctOption('4'); // 手配済
      await page.locator('#status').selectOption('6'); // 成約済
      //await page.locator('#status').selectOption('5'); // 失注

      // 入手経路
      await page.getByLabel('入手経路').selectOption('1'); // コールセンター
      //await page.getByLabel('入手経路').selectOption('2'); // アンケート
      //await page.getByLabel('入手経路').selectOption('3'); // 営業
      //await page.getByLabel('入手経路').selectOption('4'); // フリーダイヤル
      //await page.getByLabel('入手経路').selectOption('5'); // 仏壇墓石担当者
      //await page.getByLabel('入手経路').selectOption('6'); // イベント・セミナー
      //await page.getByLabel('入手経路').selectOption('7'); // 業者紹介
      //await page.getByLabel('入手経路').selectOption('8'); // 業務より

      // 初回面談日
      await page.getByLabel('初回面談日').fill('2024-01-01');
      await page.locator('#first_interview_hour').selectOption('9');
      await page.locator('#first_interview_minute').selectOption('0');
      
      // 案件担当者
      await page.getByLabel('案件担当者').fill(`KSZ案件担当${String(count).padStart(2, '0')}`);

      // **相談者情報**
      await page.getByLabel('相談者氏名').fill(`KSZ相談者${String(count).padStart(2, '0')}`); // 相談者氏名
      await page.getByLabel('相談者カナ').fill(`KSZソウダンシャ${String(count).padStart(2, '0')}`); // 相談者カナ
      await page.getByLabel('相談者連絡先1').fill('090-1234-5678'); // 相談者連絡先1
      await page.getByLabel('相談者連絡先2').fill('080-1234-5678'); // 相談者連絡先2
      await page.getByLabel('相談者住所（郵便番号）').fill('123-4567'); // 相談者住所（郵便番号）
      await page.getByLabel('相談者住所', { exact: true }).fill('東京都千代田区神田神保町1-1-1'); // 相談者住所

      // **依頼情報**
      // 業者 
      //await page.getByLabel('業者').selectOption('18'); // 石野事務所
      await page.getByLabel('業者').selectOption('8'); // なんでも屋さん
      
      await page.locator('#work_place_zip_01').fill('433'); // 郵便番号1
      await page.locator('#work_place_zip_02').fill('8123'); // 郵便番号2
      await page.getByLabel('作業場所（市区町村）').fill('浜松市中央区幸'); // 作業場所（市区町村）
      await page.getByLabel('作業場所（建物名）').fill(`KSZ作業場所${String(count).padStart(2, '0')}`); // 作業場所（建物名）
      await page.getByLabel('依頼年月').fill('2024-01'); // 依頼年月
      await page.getByLabel('相談内容').fill(`KSZ相談内容${String(count).padStart(2, '0')}`); // 相談内容
      await page.getByLabel('備考').fill(`KSZ備考${String(count).padStart(2, '0')}`); // 備考

      // **成約情報**
      await page.getByLabel('成約年月').fill('2023-12'); // 成約年月
      await page.getByLabel('売上日').fill('2024-01-15'); // 売上日
      await page.locator('#sales_amount_alt').fill('100000'); // 売上金額 (10万円)

      // スクリーンショット
      await takeScreenshot(page, '案件作成', count);

      // 保存
      await page.getByRole('button', { name: '案件を作成する' }).click();
    }
  }

});

// ************************************************************************************************************
// 案件編集
const Case2 = [
  // 案件ID, 詳細ID
  [248, 356],
  [248, 357],
  [248, 358],
];

test('test2', async ({ page }) => {
  // ログイン
  await login(page);

  let count = 1; // テスト用カウンタ
  for(const [project_id, detail_id] of Case2) {
    // ページ遷移
    await page.goto(`https://grace.iarchitect.jp/project/edit/${project_id}/${detail_id}`);

    // #項目入力#
    // **案件情報**
    // 進行状況
    //await page.locator('#status').selectOption('1'); // 接触なし
    //await page.locator('#status').selectOption('2'); // 対応開始
    //await page.locator('#status').selectOption('3'); // 依頼不要
    //await page.locator('#status').selectOption('4'); // 手配済
    //await page.locator('#status').selectOption('6'); // 成約済
    await page.locator('#status').selectOption('5'); // 失注

    // 入手経路
    //await page.getByLabel('入手経路').selectOption('1'); // コールセンター
    await page.getByLabel('入手経路').selectOption('2'); // アンケート
    //await page.getByLabel('入手経路').selectOption('3'); // 営業
    //await page.getByLabel('入手経路').selectOption('4'); // フリーダイヤル
    //await page.getByLabel('入手経路').selectOption('5'); // 仏壇墓石担当者
    //await page.getByLabel('入手経路').selectOption('6'); // イベント・セミナー
    //await page.getByLabel('入手経路').selectOption('7'); // 業者紹介
    //await page.getByLabel('入手経路').selectOption('8'); // 業務より

    // 初回面談日
    await page.getByLabel('初回面談日').fill('2024-12-30');
    await page.locator('#first_interview_hour').selectOption('10');
    await page.locator('#first_interview_minute').selectOption('0');
    
    // 案件担当者
    await page.getByLabel('案件担当者').fill(`KSZ案件担当編集${String(count).padStart(2, '0')}`);

    // **相談者情報**
    await page.getByLabel('相談者氏名').fill(`KSZ相談者編集${String(count).padStart(2, '0')}`); // 相談者氏名
    await page.getByLabel('相談者カナ').fill(`KSZソウダンシャヘンシュウ${String(count).padStart(2, '0')}`); // 相談者カナ
    await page.getByLabel('相談者連絡先1').fill('123-1234-5678'); // 相談者連絡先1
    await page.getByLabel('相談者連絡先2').fill('111-2222-3333'); // 相談者連絡先2
    await page.getByLabel('相談者住所（郵便番号）').fill('111-1234'); // 相談者住所（郵便番号）
    await page.getByLabel('相談者住所', { exact: true }).fill('東京都テスト編集1-1'); // 相談者住所

    // **依頼情報**
    // 業者 
    //await page.getByLabel('業者').selectOption('18'); // 石野事務所
    await page.getByLabel('業者').selectOption('8'); // なんでも屋さん

    await page.locator('#work_place_zip_01').fill('420'); // 郵便番号1
    await page.locator('#work_place_zip_02').fill('0065'); // 郵便番号2
    await page.getByLabel('作業場所（市区町村）').fill('静岡市葵区新通'); // 作業場所（市区町村）
    await page.getByLabel('作業場所（建物名）').fill(`KSZ作業場所編集${String(count).padStart(2, '0')}`); // 作業場所（建物名）
    await page.getByLabel('依頼年月').fill('2024-01'); // 依頼年月
    await page.getByLabel('相談内容').fill(`KSZ相談内容変更${String(count).padStart(2, '0')}`); // 相談内容
    await page.getByLabel('備考').fill(`KSZ備考変更${String(count).padStart(2, '0')}`); // 備考

    // **成約情報**
    await page.getByLabel('成約年月').fill('2024-01'); // 成約年月
    //await page.getByLabel('売上日').fill('2024-01-20'); // 売上日
    //await page.locator('#sales_amount_alt').fill('200000'); // 売上金額 (20万円)

    // スクリーンショット
    await takeScreenshot(page, '案件編集', count);

    // 保存
    //await page.getByRole('button', { name: '案件を更新する' }).click();

    count++;
  }

});