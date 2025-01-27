import { test, expect } from '@playwright/test';
import { getPageElements } from './02_要素取得';
import { appendToSheet, getURL, getValuesFromSheet, selectorToSheet } from './03_スプレッドシート';
import { SelectorCreate } from './04_セレクタ生成';

// スプレッドシートの出力先シート
const sheetName = '入力テスト';

// 入力要素を取得して、スプレッドシートに出力
test('main1', async ({ page }) => {
  // URLを取得
  const url = await getURL(sheetName);
  if (!url) {
    throw new Error('URLが取得できませんでした。');
  }

  // ページを遷移
  await page.goto(url);

  // 要素情報を取得
  const elementInfo = await getPageElements(page);

  // セレクターを格納する配列
  const Selectors: string[] = [];

  // 取得した情報を出力
  elementInfo.forEach(({ tagName, labelText, type, name, options }) => {
    console.log(`タグ名: ${tagName}`);
    console.log(`タイプ: ${type || 'なし'}`);
    console.log(`名前: ${name || 'なし'}`);
    console.log(`ラベル: ${labelText || 'なし'}`);
    console.log(`選択肢: ${options || 'なし'}`);
    console.log('---------------------');

    const seleTag = tagName || '';
    const seleName = name || '';
    let selector = SelectorCreate(page, seleTag, seleName);
    Selectors.push(selector);
  });

  console.log(Selectors);

  // タグ情報に出力
  await appendToSheet(elementInfo, sheetName);
  // セレクターを出力
  await selectorToSheet(Selectors, sheetName);

});

// スプレッドシートから値を取得して、要素に値を入力する
test('main2', async ({ page }) => {
  // URLを取得
  const url = await getURL(sheetName);
  if (!url) {
    throw new Error('URLが取得できませんでした。');
  }

  // ページを遷移
  await page.goto(url);

  // スプレッドシートから値を取得
  const rows = await getValuesFromSheet(sheetName);

  // 取得した値をフォームに入力
  //await SelectorCreate(page, rows);
  console.log("入力完了");
});