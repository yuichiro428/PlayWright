import { test, expect } from '@playwright/test';
import { recordVideo, takeScreenshot } from '../../../dataUtils';

test.setTimeout(30000); // タイムアウトを300秒に延長
//test.setTimeout(300000); // タイムアウトを300秒に延長

// 特約店ログイン
async function store_login(page) {
  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/member/login/');
  await page.locator('input[name="login_id"]').fill('');
  await page.locator('input[name="password"]').fill('');
  await page.getByRole('button', { name: 'ログイン' }).click();
}

// ************************************************************************************************************
const Case1 = [
  // 葬儀ID
  //5996, // 鷲津
  //5997, // 寺津
  //5998, // 西尾
  //5931, // 浜松貴賓館
  5999, // 家族ホール浜松
];

// 葬儀注文
test('弔電_葬儀注文', async ({ page }) => {
  // 特約店ログイン
  //await store_login(page);

  let count = 1;
  for(const funeral_id of Case1) {
    let text = `KSZテスト 葬儀${count}`;

    // ページを遷移
    await page.goto(`https://palmoec:sosai@dev-palmoec.iarchitect.jp/funerals/detail/${funeral_id}`);

    //画面のサイズを設定
    /*
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
    */

    // 供物選択ページ　スクリーンショット
    await page.waitForTimeout(3000); // 画面反映のため待機
    await takeScreenshot(page, `葬儀_表示`, count);

    // 注文選択
    await page.locator('li').filter({ hasText: 'i-message 追懐（ついかい） No.981087' }).getByRole('link').click();
    if(funeral_id == 5999) { // 家族ホール浜松
      await page.locator('li').filter({ hasText: 'スタンド生花＃30' }).getByRole('link').first().click();
    } else { 
      await page.locator('li').filter({ hasText: '想い' }).getByRole('link').first().click();
    }

    // 注文情報　入力へ遷移
    await page.getByRole('link', { name: 'ご注文手続きへ' }).click();
    await page.waitForTimeout(1000); // 画面反映のため待機

    // 団体名
    await page.getByPlaceholder('例）イズモ株式会社', { exact: true }).fill(text);

    // お名前
    await page.getByPlaceholder('例）東海').fill('KSZ山﨑');
    await page.getByPlaceholder('例）太郎').fill(`葬儀${count}`);
    await page.getByPlaceholder('例）とうかい').fill('やまざき');
    await page.getByPlaceholder('例）たろう').fill('そうぎ');

    // 住所
    await page.getByPlaceholder('例）4300906').fill('4200065');
    await page.getByPlaceholder('例）浜松市中央区住吉1-11-').fill('静岡県静岡市葵区新通1-1');

    // 電話番号
    await page.getByPlaceholder('例）09012345678').fill('1234567899');

    // メールアドレス
    await page.locator('#email').fill('');
    await page.locator('#email_confirm').fill('');

    // 生花　名札
    if(funeral_id == 5999) { // 家族ホール浜松
      await page.locator('#messages_104_0').fill(`葬儀${count}`); // スタンド生花
    } else {
      await page.locator('#messages_161_0').fill(`葬儀${count}`);
    }

    //　弔電　宛先
    await page.getByPlaceholder('例）●●●様').fill(text);

    // メッセージ
    await page.getByRole('button', { name: '文例から選ぶ ' }).click();
    await page.locator('.js-Example_Choice').first().click();

    // 差出人
    await page.getByPlaceholder('例）イズモ株式会社　東海 太郎').fill(text);
    await page.getByPlaceholder('例）いずもかぶしきがいしゃ　とうかいたろう').fill('くふうしずおか　やまざき　てすと');

    // プレビュー
    await page.getByRole('button', { name: 'プレビューを確認する ' }).click();
    await page.getByText('閉じる').click();

    // 注文情報　確認へ遷移
    await page.getByRole('button', { name: '注文情報の確認へ進む ' }).click();

    // 支払い情報　入力へ遷移
    await page.getByRole('button', { name: 'お支払情報の入力へ進む ' }).click();

    // カード番号
    await page.locator('#card').fill('4111111111111111');
    // セキュリティコード
    await page.locator('#security_code').fill('123');
    // 有効期限
    await page.locator('#card_year').selectOption('2025');

    // 支払い情報　確認へ遷移
    await page.getByRole('button', { name: 'お支払情報の確認へ進む ' }).click();

    // スクリーンショット
    const filename = '葬儀_確認';
    await takeScreenshot(page, filename, count);

    // 注文確定ボタン
    //await page.getByRole('button', { name: '注文を確定する' }).click();

    count++;
  }
});

// ************************************************************************************************************
const Case2 = [
  1,  // パルモ葬祭 浜松貴賓館
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
  //51, // パルモ葬祭 かぞくホール寺津
  //52, // パルモ葬祭 西尾
];

// カタログ注文
test('弔電_カタログ注文', async ({ page }) => {
  // 特約店ログイン
  //await store_login(page);

  // テストNo
  let count = 1;
  for (const id of Case2) {
    let text = `KSZテスト カタログ${count}`;

    // ページ遷移
    await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/');

    // セキュリティエラー回避用
    //await page.getByRole('button', { name: '詳細設定' }).click();
    //await page.getByRole('link', { name: 'dev-palmoec.iarchitect.jp' }).click();
    //await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/');

    //画面のサイズを設定
    /* 
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    }); 
    */

    // カタログ注文を選択
    await page.getByRole('link', { name: 'オンライン カタログから 供物・弔電を送る 宛先を自由に指定して供物・弔電が送れます' }).click();

    // 式場選択
    await page.getByRole('combobox').selectOption(`${id}`);
    await page.getByRole('button', { name: '弔電・生花・籠盛を選ぶ' }).click();

    // 供物選択ページ　スクリーンショット
    await page.waitForTimeout(3000); // 画面反映のため待機
    await takeScreenshot(page, `カタログ_表示`, count);

    // 注文選択
    // 弔電
    await page.locator('li').filter({ hasText: 'i-message 追懐（ついかい） No.981087' }).getByRole('link').click();
    // 生花
    if(id == 51) {
      await page.locator('li').filter({ hasText: '想い No.110413 一基' }).getByRole('link').first().click();
    }else {
      await page.locator('li').filter({ hasText: 'スタンド生花＃30 No.110033 一基' }).getByRole('link').first().click();
    }

    // 注文情報　入力へ遷移
    await page.getByRole('link', { name: 'ご注文手続きへ' }).click();
    await page.waitForTimeout(1000); // 画面反映のため待機

    // 葬儀日時 XX月01日 10:00-
    await page.locator('#form_funeral_year').selectOption('2025');  // 年
    await page.locator('#form_funeral_month').selectOption('2');    // 月
    await page.locator('#form_funeral_day').selectOption('15');     // 日

    //　故人
    await page.locator('#deceased_last_name').fill('KSZ故人');
    await page.locator('#deceased_first_name').fill(`カタログ${count}`);
    await page.locator('#deceased_last_name_kana').fill('こじん');
    await page.locator('#deceased_first_name_kana').fill('てすと');

    // 喪主
    await page.locator('#chief_mourner_last_name').fill('KSZ喪主');
    await page.locator('#chief_mourner_first_name').fill(`カテゴリ${count}`);
    await page.locator('#chief_mourner_last_name_kana').fill('もしゅ');
    await page.locator('#chief_mourner_first_name_kana').fill('てすと');

    // 団体名
    await page.getByPlaceholder('例）イズモ株式会社', { exact: true }).fill(text);

    // お名前
    await page.locator('#last_name').fill('KSZ山﨑');
    await page.locator('#first_name').fill(`カタログ${count}`);
    await page.locator('#last_name_kana').fill('やまざき');
    await page.locator('#first_name_kana').fill('かたろぐ');

    // 住所
    await page.getByPlaceholder('例）4300906').fill('4200065');
    await page.getByPlaceholder('例）浜松市中央区住吉1-11-').fill('静岡県静岡市葵区新通1-1');

    // 電話番号
    await page.getByPlaceholder('例）09012345678').fill('1234567899');

    // メールアドレス
    await page.locator('#email').fill('yuichiro.yamazaki@kufu.co.jp');
    await page.locator('#email_confirm').fill('yuichiro.yamazaki@kufu.co.jp');

    // 生花　名札
    if(id == 51) {
      await page.locator('#messages_161_0').fill(`カタログ${count}`);
    }else {
      await page.locator('#messages_104_0').fill(`カタログ${count}`); // スタンド生花
    }

    //　弔電　宛先
    await page.getByPlaceholder('例）●●●様').fill(text);

    // メッセージ
    await page.getByRole('button', { name: '文例から選ぶ ' }).click();
    await page.locator('.js-Example_Choice').first().click();

    // 差出人
    await page.getByPlaceholder('例）イズモ株式会社　東海 太郎').fill(text);
    await page.getByPlaceholder('例）いずもかぶしきがいしゃ　とうかいたろう').fill('くふうしずおか　やまざき　てすと');

    // プレビュー
    await page.getByRole('button', { name: 'プレビューを確認する ' }).click();
    await page.getByText('閉じる').click();

    // 注文情報 確認へ遷移
    await page.getByRole('button', { name: '注文情報の確認へ進む ' }).click();

    // 支払い情報　　入力へ遷移
    await page.getByRole('button', { name: 'お支払情報の入力へ進む ' }).click();

    // カード番号
    await page.locator('#card').fill('4111111111111111');
    // セキュリティコード
    await page.locator('#security_code').fill('123');
    // 有効期限
    await page.locator('#card_year').selectOption('2025');

    // 支払い情報　確認へ遷移
    await page.getByRole('button', { name: 'お支払情報の確認へ進む ' }).click();

    // スクリーンショット
    const filename = `カタログ_確認`;
    await takeScreenshot(page, filename, count);

    // 注文確定ボタン
    //await page.getByRole('button', { name: '注文を確定する' }).click();

    count++;
  }
});

// ************************************************************************************************************
// スマホ訃報作成
const Case3: [number, string][] = [
  // 静岡県
  [1, "パルモ葬祭 浜松貴賓館"],
  // [1, "パルモ葬祭 浜松参番館"],
  // [1, "パルモ葬祭 丸塚"],
  // [1, "パルモ葬祭 篠原"],
  // [1, "パルモ葬祭 雄踏"],
  // [1, "パルモ葬祭 都盛"],
  // [1, "パルモ葬祭 東三方"],
  // [1, "パルモ葬祭 かぞくホール浜松"],
  // [1, "パルモ葬祭 かぞくホール東伊場"],
  // [1, "パルモ葬祭 かぞくホール上島"],
  // [1, "パルモ葬祭 かぞくホール佐鳴台"],
  // [1, "パルモ葬祭 かぞくホール富塚"],
  // [1, "パルモ葬祭 かぞくホール篠ケ瀬"],
  // [1, "パルモ葬祭 笠井"],
  // [1, "パルモ葬祭 有玉"],
  // [1, "パルモ葬祭 引佐"],
  // [1, "パルモ葬祭 貴布祢"],
  // [1, "パルモ葬祭 美薗"],
  // [1, "パルモ葬祭 赤佐"],
  // [1, "パルモ葬祭 平口"],
  // [1, "パルモ葬祭 かぞくホール鷲津"],
  // [1, "パルモ葬祭 磐田"],
  // [1, "パルモ葬祭 中泉"],
  // [1, "パルモ葬祭 福田"],
  // [1, "パルモ葬祭 豊田"],
  // [1, "パルモ葬祭 竜洋"],
  // [1, "パルモ葬祭 新屋"],
  // [1, "パルモ葬祭 浅羽"],
  // [1, "パルモ葬祭 山梨"],
  // [1, "パルモ葬祭 掛川"],
  // [1, "パルモ葬祭 カデンツァ"],
  // [1, "パルモ葬祭 大坂"],
  // [1, "パルモ葬祭 菊川"],
  // [1, "パルモ葬祭 富士中央"],
  // 愛知県
  //[2, "パルモ葬祭 花田"],
  //[2, "パルモ葬祭 かぞくホール前田"],
  //[2, "パルモ葬祭 西尾"],
  //[2, "パルモ葬祭 かぞくホール寺津"]
];

test('スマホ訃報作成', async ({ page }) => {
  let Url1 = "https://palmoec:sosai@dev-palmoec.iarchitect.jp/obituary/posts/input/j2zk5jwnseq3v25hevjssjz_st2di2ek";

  let count = 1; // テスト用カウンタ
  for (const [id, holeName] of Case3) {
    // ページ遷移
    await page.goto(Url1);

    let text = `KSZ山﨑テスト${count}`;

    // 団体名
    await page.getByPlaceholder('イズモ株式会社').fill(text);

    // 故人名
    await page.locator('input[name="deceased_last_name"]').fill('KSZ故人');
    await page.getByPlaceholder('太郎').fill(`テスト${count}`);

    // 故人年齢
    await page.getByRole('spinbutton').fill('999');

    // 喪主名
    await page.locator('input[name="chief_mourner_last_name"]').fill('KSZ喪主');
    await page.getByPlaceholder('花子').fill(`テスト${count}`);

    // 喪主の続柄
    await page.locator('input[name="chief_mourner_relationship"]').fill(text);

    // 通夜の有無
    await page.getByText('なし').click();

    // 葬儀日時 来月1日
    await page.getByPlaceholder('葬儀日').click();
    await page.getByTitle('次>').click();
    await page.getByRole('link', { name: '1', exact: true }).click();

    // 式場
    if (id === 1) {
      await page.getByText('静岡県').click();
      await page.locator('select').nth(4).selectOption(holeName);
    } else {
      await page.getByText('愛知県').click();
      await page.locator('select').nth(5).selectOption(holeName);
    }

    // 宗派
    await page.locator('select[name="denomination_type_text"]').selectOption('仏式');
    //await page.locator('select[name="denomination_type_text"]').selectOption('神式');
    //await page.locator('select[name="denomination_type_text"]').selectOption('キリスト教式');

    // メールアドレス
    await page.locator('#email').fill('yuichiro.yamazaki@kufu.co.jp');
    await page.locator('#email_confirm').fill('yuichiro.yamazaki@kufu.co.jp');

    // 特記事項
    await page.locator('textarea[name="remarks"]').fill(text);

    // 入力確認
    await page.getByRole('button', { name: 'ご入力確認画面へ' }).click();
    
    // 作成
    //await page.getByRole('button', { name: '訃報情報を作成する' }).click();

    // スクリーンショット
    await takeScreenshot(page, 'スマホ訃報作成', count);

    count++;
  }

});

// ************************************************************************************************************
// スマホ訃報注文
const Case4: string[][] = [
  // スマホ訃報 URL
  ["https://dev-palmoec.iarchitect.jp/obituary/show/index/lt93rWLvALdWDFr3uQdsS4HrNSKmiY7u", '1'], // 鷲津
  //["https://dev-palmoec.iarchitect.jp/obituary/show/index/SaOFAYFNNhERE384zVJRrp0R00NlzTrB",2], // 寺津
  ["https://dev-palmoec.iarchitect.jp/obituary/show/index/dZwwDXmNqkAv953qPh6uVkiclThOwxIA", '3'], // 西尾
  //["https://dev-palmoec.iarchitect.jp/obituary/show/index/JqBPOuN1BLQs0umcO8O1QKBuF9i6cI9H", 4], // 浜松貴賓館
  ["https://dev-palmoec.iarchitect.jp/obituary/show/index/oBy6WYoJcWQ9S077XdPOI7TvKZQyq1dw", '5'], // 家族ホール浜松
];

test('弔電_スマホ注文', async ({ page }) => {
  // 特約店ログイン
  //await store_login(page);

  // スマホ訃報ページ
  let count = 1;
  for(const [Url2, id] of Case4) {
    let text = `KSZテスト スマホ訃報${count}`;

    // 訃報ページから遷移
    await page.goto(Url2);
    //画面のサイズを設定
    /*
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
    */


    await page.getByRole('button', { name: '弔電 生花 籠盛のご注文 ▶' }).click();
    await page.waitForTimeout(1000); // 画面反映のため待機

    // 供物選択ページ　スクリーンショット
    await takeScreenshot(page, `スマホ訃報_表示`, count);

    // 注文選択
    await page.locator('li').filter({ hasText: 'i-message 追懐（ついかい） No.981087' }).getByRole('link').click();

    if(id == '5') {
      await page.locator('li').filter({ hasText: 'スタンド生花＃30 No.110033 一基' }).getByRole('link').first().click();
    }else {
      await page.locator('li').filter({ hasText: '想い No.110413 一基' }).getByRole('link').first().click();
    }
    await page.getByRole('link', { name: 'ご注文手続きへ' }).click();

    // 団体名
    await page.getByPlaceholder('例）イズモ株式会社', { exact: true }).fill(text);

    // お名前
    await page.getByPlaceholder('例）東海').fill('KSZ山﨑');
    await page.getByPlaceholder('例）太郎').fill(`スマホ訃報${count}`);
    await page.getByPlaceholder('例）とうかい').fill('やまざき');
    await page.getByPlaceholder('例）たろう').fill('すまほ');

    // 住所
    await page.getByPlaceholder('例）4300906').fill('4200065');
    await page.getByPlaceholder('例）浜松市中央区住吉1-11-').fill('静岡県静岡市葵区新通1-1');

    // 電話番号
    await page.getByPlaceholder('例）09012345678').fill('1234567899');

    // メールアドレス
    await page.locator('#email').fill('yuichiro.yamazaki@kufu.co.jp');
    await page.locator('#email_confirm').fill('yuichiro.yamazaki@kufu.co.jp');

    //　弔電　宛先
    if(id == '5') {
      await page.locator('#messages_104_0').fill(`スマホ訃報${count}`); // スタンド生花
    } else {
      await page.locator('#messages_161_0').fill(`スマホ訃報${count}`);
    }

    // メッセージ
    await page.getByRole('button', { name: '文例から選ぶ' }).click();
    await page.locator('.js-Example_Choice').first().click();

    // 差出人
    await page.getByPlaceholder('例）イズモ株式会社　東海 太郎').fill(text);
    await page.getByPlaceholder('例）いずもかぶしきがいしゃ　とうかいたろう').fill('くふうしずおか　やまざき　てすと');

    // プレビュー
    await page.getByRole('button', { name: 'プレビューを確認する ' }).click();
    await page.getByText('閉じる').click();

    // 注文情報　確認へ遷移
    await page.getByRole('button', { name: '注文情報の確認へ進む ' }).click();

    // 支払い情報　入力へ遷移
    await page.getByRole('button', { name: 'お支払情報の入力へ進む ' }).click();

    // カード番号
    await page.locator('#card').fill('');
    // セキュリティコード
    await page.locator('#security_code').fill('');
    // 有効期限
    await page.locator('#card_year').selectOption('');

    // 支払い情報　確認へ遷移
    await page.getByRole('button', { name: 'お支払情報の確認へ進む ' }).click();

    // スクリーンショット
    const filename = 'スマホ訃報_確認';
    await takeScreenshot(page, filename, count);

    // 注文確定ボタン
    await page.getByRole('button', { name: '注文を確定する' }).click();

    count++;
  }
});
