import { test, expect } from '@playwright/test';
import { getPageTexts } from './02_要素取得';
import { getURL, appendToSheet, getValuesFromSheet} from './03_スプレッドシート';
import { checkText } from './04_判定実行';

// スプレッドシートの出力先シート
const sheetName = '表示テスト';
test.setTimeout(90000); // タイムアウトを90秒に延長

// 表示要素を取得して、スプレッドシートに出力
test('main1', async ({ page }) => {
  // URLを取得
  const url = await getURL(sheetName);
  if (!url) {
    throw new Error('URLが取得できませんでした。');
  }

  // ページを遷移
  await page.goto(url);

  // 要素を取得し、スプレッドシートに出力
  await HTML_GET_Values(page);

});

// *************************************************************************
// スプレッドシートから期待値を取得して、要素に値を検証する
test('main2', async ({ page }) => {
  // URLを取得
  const url = await getURL(sheetName);
  if (!url) {
    throw new Error('URLが取得できませんでした。');
  }

  // ページを遷移
  await page.goto(url);
  
  // ページ全体の読み込み待機
  await page.waitForLoadState('domcontentloaded');
  
  // シートから期待値を取得
  const expectedValues = await getValuesFromSheet(sheetName);
  console.log(expectedValues);

  // 表示テキストを判定
  await checkText(page, expectedValues);

});

// *************************************************************************
// 表示要素を取得して、スプレッドシートに出力
export async function HTML_GET_Values(page) {

  // ページ全体の読み込み待機
  await page.waitForLoadState('domcontentloaded');

  // すべての要素のタグ情報とinnerTextを取得
  const elements = await getPageTexts(page);
  console.log(elements);
  
  // スプレッドシートに要素情報を出力
  await appendToSheet(elements, sheetName);

}
// *************************************************************************