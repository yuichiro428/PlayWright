import { test, expect } from '@playwright/test';

test.setTimeout(100000); // タイムアウトを100秒に延長
//test.setTimeout(200000); // タイムアウトを200秒に延長
//test.setTimeout(300000); // タイムアウトを300秒に延長

// await page.waitForTimeout(3000); // 画面反映のため待機（3秒）

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
// ************************************************************************************************************

// ケース1
const Case1 = [
  // カテゴリ、ページID、公開ステータス(公開中1,公開前2,公開後3)
  [13, 2263, 1],
];

test('メイン', async ({ page }) => {
  // ログイン
  await login(page);

  let count = 1; // テスト用カウンタ
  for (const [category, id, status] of Case1) {
    // 入力値設定
    let text = `KSZ山﨑テスト${count}`;

    // ページ作成
    //await knowledge_New(page, count, category, status);

    // ページ編集
    await knowledge_Edit(page, count, id, status);

    // ページ遷移
    //await page.goto(``);

    count++;
  }

});

// ************************************************************************************************************
// 葬儀知識
async function knowledge_New(page, count, category, status) {
  // 入力値設定
  let text = `KSZ山﨑テスト編集${count}`;

  await page.goto(`https://palmo-sosai.iarchitect.jp/sol_page/edit?category_id=${category}`);

  // タイトル
  await page.locator('#title').fill(text);

  // 公開日
  if(status == 1){
    // 公開中
    // 開始
    await page.locator('#released-at').click();
    await page.getByRole('cell', { name: '1', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();
    // 終了
    await page.locator('#released-end').click();
    await page.getByRole('cell', { name: 'Clear' }).click();

  } else if(status == 2){
    // 公開前
    // 開始
    await page.locator('#released-at').click();
    await page.getByRole('cell', { name: '1', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();
    // 終了 今日以前
    await page.locator('#released-end').click();
    await page.getByRole('cell', { name: '2', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();

  } else {
    // 公開後
    // 開始
    await page.locator('#released-at').click();
    await page.getByRole('cell', { name: '29', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();
    // 終了
    await page.locator('#released-end').click();
    await page.getByRole('cell', { name: '30', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();

  }

  // 説明文
  await page.locator('textarea[name="c_description"]').fill(text);

  // あわせて読みたい記事 ID
  await page.locator('#c_read_with_id').fill('1234');

  // 保存
  //await page.getByRole('link', { name: '保存' }).click();
}

async function knowledge_Edit(page, count, id, status) {
  // 入力値設定
  let text = `KSZ山﨑テスト編集${count}`;

  await page.goto(`https://palmo-sosai.iarchitect.jp/sol_page/edit?id=${id}`);

  // タイトル
  await page.locator('#title').fill(text);

  // 公開日
  if(status == 1){
    // 公開中
    // 開始
    await page.locator('#released-at').click();
    await page.getByRole('cell', { name: '1', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();
    // 終了
    await page.locator('#released-end').click();
    await page.getByRole('cell', { name: 'Clear' }).click();

  } else if(status == 2){
    // 公開前
    // 開始
    await page.locator('#released-at').click();
    await page.getByRole('cell', { name: '1', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();
    // 終了 今日以前
    await page.locator('#released-end').click();
    await page.getByRole('cell', { name: '2', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();

  } else {
    // 公開後
    // 開始
    await page.locator('#released-at').click();
    await page.getByRole('cell', { name: '29', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();
    // 終了
    await page.locator('#released-end').click();
    await page.getByRole('cell', { name: '30', exact: true }).first().click();
    await page.getByRole('table').getByText('0:00', { exact: true }).click();

  }

  // 説明文
  await page.locator('textarea[name="c_description"]').fill(text);

  // あわせて読みたい記事 ID
  await page.locator('#c_read_with_id').fill('1234');

  // 保存
  //await page.getByRole('link', { name: '保存' }).click();
}
// ************************************************************************************************************