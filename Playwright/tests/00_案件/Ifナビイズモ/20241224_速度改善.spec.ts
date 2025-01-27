import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

//test.setTimeout(800000); // タイムアウトを800秒に延長
test.setTimeout(30000); // 検証用

test('カルテ詳細比較テスト', async ({ page }) => {
  await page.goto('https://ifnavi.iarchitect.jp/sol_admin/login/');
  //画面のサイズを設定
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });

  // ログイン
  await page.getByPlaceholder('Username').fill('ksz_yamazaki');
  await page.getByPlaceholder('Password').fill('asdf1234');
  await page.getByRole('button', { name: ' ログイン' }).click();


  // 葬儀ID
  const ids = [
    // 浜松
    'H-1-92-1981', 'H-1-24-2', 'H-1-23-2856', 'H-1-23-2849', 'H-1-23-2848', 'H-1-23-2844', 'H-1-23-2841', 'H-1-23-2840', 'H-1-23-2838', 'H-1-23-2837',
    /* // 浜北
    'M-1-23-1119', 'M-1-23-1118', 'M-1-23-1117', 'M-1-23-1114', 'M-1-23-1112', 'M-1-23-1111', 'M-1-23-1110', 'M-1-23-1109', 'M-1-23-1108', 'M-1-23-1107',
    // 湖西 掛川
    'D-1-23-1356', 'D-1-23-1353', 'D-1-23-1349', 'D-1-23-1312', 'D-1-23-1304', 'K-1-24-2', 'K-1-24-1', 'K-1-23-1094', 'K-1-23-1092', 'K-1-23-1088',
    // 掛川
    'K-1-23-1085', 'K-1-23-1082', 'K-1-23-1081', 'K-1-23-1080', 'K-1-23-1078', 'K-1-23-1077', 'K-1-23-1075', 'K-1-23-1072', 'K-1-23-1071', 'K-1-23-1070',
    // 磐田
    'I-1-24-3', 'I-1-24-2', 'I-1-24-1', 'I-1-23-933', 'I-1-23-929', 'I-1-23-927', 'I-1-23-925', 'I-1-23-924', 'I-1-23-923', 'I-1-23-919',
    // 富士 豊橋
    'C-1-23-1356', 'C-1-23-1353', 'C-1-23-1349', 'C-1-23-1312', 'C-1-23-1304', 'T-1-23-1125', 'T-1-23-1122', 'T-1-23-1119', 'T-1-23-1115', 'T-1-23-1114',
    // 豊橋
    'T-1-23-1113', 'T-1-23-1112', 'T-1-23-1111', 'T-1-23-1110', 'T-1-23-1109', 'T-1-23-1108', 'T-1-23-1107', 'T-1-23-1105', 'T-1-23-1104', 'T-1-23-1103',
    // 豊川
    'W-1-23-542', 'W-1-23-541', 'W-1-23-539', 'W-1-23-538', 'W-1-23-537', 'W-1-23-536', 'W-1-23-534', 'W-1-23-533', 'W-1-23-532', 'W-1-23-531',
    // 岡崎
    'Y-1-24-1', 'Y-1-23-1470', 'Y-1-23-1461', 'Y-1-23-1456', 'Y-1-23-1455', 'Y-1-23-1454', 'Y-1-23-1452', 'Y-1-23-1442', 'Y-1-23-1441', 'Y-1-23-1440',
    // 三河
    'B-1-23-175', 'B-1-23-174', 'B-1-23-172', 'B-1-23-171', 'B-1-23-170', 'B-1-23-169', 'B-1-23-168', 'B-1-23-167', 'B-1-23-165', 'B-1-23-161',
    */
  ];

  let count = 1;
  for (const id of ids) {
    // カルテ1
    await page.goto(`https://ifnavi.iarchitect.jp/sol_member/karte/${id}`);
    //await takeScreenshot(page, `_カルテA_${String(count).padStart(2, '0')}`); // スクショ1

    // カードNo
    const Card1_A = await page.locator("#container > div > div.right_col > div:nth-child(2) > div > div:nth-child(2) > div.col-md-7.col-sm-7.col-xs-12 > div:nth-child(10) > div > a").innerText();
    let Card2_A = '';
    if (await page.locator("#container > div > div.right_col > div:nth-child(2) > div > div:nth-child(2) > div.col-md-7.col-sm-7.col-xs-12 > div:nth-child(11) > div > a").count() > 0) {
      Card2_A = await page.locator("#container > div > div.right_col > div:nth-child(2) > div > div:nth-child(2) > div.col-md-7.col-sm-7.col-xs-12 > div:nth-child(11) > div > a").innerText();
    }

    console.log(`カルテA ${Card1_A}, ${Card2_A}`);

    // カルテ2
    await page.goto(`https://ifnavi.iarchitect.jp/sol_member/karte2/${id}`);
    //await takeScreenshot(page, `_カルテB_${String(count).padStart(2, '0')}`); // スクショ2

    // カードNo
    let Card1_B = '';
    if (await page.locator("#container > div > div.right_col > div:nth-child(2) > div > div:nth-child(2) > div.col-md-7.col-sm-7.col-xs-12 > div:nth-child(10) > div > a").count() > 0) {
      Card1_B = await page.locator("#container > div > div.right_col > div:nth-child(2) > div > div:nth-child(2) > div.col-md-7.col-sm-7.col-xs-12 > div:nth-child(10) > div > a").innerText();
    }
    let Card2_B = '';
    if (await page.locator("#container > div > div.right_col > div:nth-child(2) > div > div:nth-child(2) > div.col-md-7.col-sm-7.col-xs-12 > div:nth-child(11) > div > a").count() > 0) {
      Card2_B = await page.locator("#container > div > div.right_col > div:nth-child(2) > div > div:nth-child(2) > div.col-md-7.col-sm-7.col-xs-12 > div:nth-child(11) > div > a").innerText();
    }

    console.log(`カルテB ${Card1_B}, ${Card2_B}`);

    // 比較判定
    // カード1
    if (Card1_A === Card1_B) {
      console.log(`ID: ${id} OK`);
    } else {
      console.error(`ID: ${id} NG`);
    }

    // カード2
    if (Card2_A) {
      if (Card2_A === Card2_B) {
        console.log(`ID: ${id} OK`);
      } else {
        console.error(`ID: ${id} NG`);
      }
    }

    count++;
  }
});