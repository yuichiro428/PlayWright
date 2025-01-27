import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

// 供物一覧
const Case1 = [
  // 弔電
  /* 'i-message 追懐（ついかい） No.981087',
  'i-message 郷想（きょうそう） No.981086',

  // 生花
  'スタンド生花＃30',
  'No.110033',
  'No.110071',

  'スタンド生花＃25',
  'No.110032',
  'No.110070',

  'スタンド生花＃20',
  'No.110031',
  'No.110069',

  //'しきみ生花＃',
  //'No.993102',
  //'No.993104',

  'スタンド生花＃15',
  'No.110030',
  'No.110068',

  // 枕花
  '洋風 枕花＃30No.110035',
  '和風 枕花＃25No.110034',
  '胡蝶蘭WHNo.993031',

  // 籠盛
  '籠盛＃20 ビールおつまみ',
  'No.111397',
  'No.110066',

  '籠盛＃15 詰め合わせ',
  'No.111025',
  'No.111048',

  '籠盛＃15 フルーツ缶',
  'No.111027',
  'No.111051',

  '籠盛＃12 詰め合わせ',
  'No.110346',
  'No.110365',

  // 回転灯
  '法明No.480031',
  '花背二段No.480030',
  '鳳No.480032',
  */

  // アレンジ生花
  

];
// ************************************************************************************************************
// 葬儀ID
const Case2 = [
  5931,
];

test('test1', async ({ page }) => {
  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/');
  //画面のサイズを設定
  /*
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });
  */

  let count = 1; // テスト用カウンタ
  for (const funeral_id of Case2) {
    await page.goto(`https://palmoec:sosai@dev-palmoec.iarchitect.jp/funerals/detail/${funeral_id}`); // ページ遷移
    
    // テキストチェック
    for (const Text of Case1) {
      await expect(page.getByText(Text)).toBeVisible();
    }
    
    // スクリーンショット
    let filename = '供物表示';
    await takeScreenshot(page, filename, count);

    count++;
  }
});
// ************************************************************************************************************
// 店舗ID
const Case3 = [
  1,     // パルモ葬祭 浜松貴賓館
  //49, // パルモ葬祭 浜松三番館
  //2,  // パルモ葬祭 丸塚
  //4,  // パルモ葬祭 篠原
  //5,  // パルモ葬祭 雄踏
  //6,  // パルモ葬祭 都盛
  //7,  // パルモ葬祭 東三方
  //53, // パルモ葬祭 かぞくホール浜松
  //45, // パルモ葬祭 かぞくホール東伊場
  //42, // パルモ葬祭 かぞくホール上島
  //54, // パルモ葬祭 かぞくホール佐鳴台
  //55, // パルモ葬祭 かぞくホール富塚
  //43, // パルモ葬祭 かぞくホール篠ケ瀬
  //3,  // パルモ葬祭 笠井
  //36, // パルモ葬祭 有玉
  //10, // パルモ葬祭 引佐
  //8,  // パルモ葬祭 貴布祢
  //39, // パルモ葬祭 美薗
  //9,  // パルモ葬祭 赤佐
  //11, // パルモ葬祭 平口
  //58, // パルモ葬祭 かぞくホール鷲津
  //12, // パルモ葬祭 磐田
  //13, // パルモ葬祭 中泉
  //14, // パルモ葬祭 福田
  //46, // パルモ葬祭 豊田
  //56, // パルモ葬祭 竜洋
  //19, // パルモ葬祭 新屋
  //20, // パルモ葬祭 浅羽
  //37, // パルモ葬祭 山梨
  //15, // パルモ葬祭 掛川
  //16, // パルモ葬祭 カデンツァ
  //17, // パルモ葬祭 大坂
  //18, // パルモ葬祭 菊川
  //61, // パルモ葬祭 富士中央
  //59, // パルモ葬祭 花田
  //60, // パルモ葬祭 かぞくホール前田
  //52, // パルモ葬祭 西尾
  //51  // パルモ葬祭 かぞくホール寺津
];

test('test2', async ({ page }) => {
  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/');
  //画面のサイズを設定
  /*
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });
  */

  let count = 1; // テスト用カウンタ
  for (const id of Case3) {
    // カタログ注文を選択
    await page.getByRole('link', { name: 'オンライン カタログから 供物・弔電を送る 宛先を自由に指定して供物・弔電が送れます' }).click();

    // 式場選択
    await page.getByRole('combobox').selectOption(`${id}`);
    await page.getByRole('button', { name: '弔電・生花・籠盛を選ぶ' }).click();
    
    // テキストチェック
    for (const Text of Case1) {
      await expect(page.getByText(Text)).toBeVisible();
    }
    
    // スクリーンショット
    let filename = '供物表示';
    await takeScreenshot(page, filename, count);

    count++;
  }
});