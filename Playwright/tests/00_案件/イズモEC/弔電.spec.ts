import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

//test.setTimeout(300000); // タイムアウトを300秒に延長

// 特約店ログイン
async function store_login(page) {
  await page.goto('https://izumoec:sosai@dev-izumoec.iarchitect.jp/member/login/');
  await page.locator('input[name="login_id"]').fill('HSHWEC');
  await page.locator('input[name="password"]').fill('PKS1J4');
  await page.getByRole('button', { name: 'ログイン' }).click();
}

// ************************************************************************************************************
const Case1 = [
  // 葬儀ID
  //148, // 豊橋
  //158, // 東脇
  152, // 桜丘
  162, // 田原
  //153, // 西幸
  //161, // 高師
  154, // 豊川
  163, // 八幡
  //155, // 小坂井
  //159, // 豊川インター
  156, // 金屋
  164, // 幸田
  //157, // 山中
  //160, // 岡崎貴賓館
  165, // 岡崎北
  166, // かけまち
  //144, // 矢作
  //145, // 六ツ美
];

// 葬儀注文
test('弔電_葬儀注文', async ({ page }) => {
  // 特約店ログイン
  //await store_login(page);

  let count = 1;
  for(const funeral_id of Case1) {
    let text = `KSZテスト 葬儀${count}`;

    // ページを遷移
    await page.goto(`https://izumoec:sosai@dev-izumoec.iarchitect.jp/funerals/detail/${funeral_id}`);

    //画面のサイズを設定
    /*
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });
    */

    // 供物選択ページ スクリーンショット
    await page.waitForTimeout(3000); // 画面反映のため待機
    await takeScreenshot(page, `葬儀_表示`, count);

    // 注文選択
    await page.locator('li').filter({ hasText: 'i-message 追懐（ついかい） No.981087' }).getByRole('link').click();
    await page.locator('li').filter({ hasText: '想い' }).getByRole('link').first().click();

    // 注文情報　入力へ遷移
    await page.getByRole('link', { name: 'ご注文手続きへ' }).click();
    await page.waitForTimeout(1000); // 画面反映のため待機

    // 団体名
    await page.getByPlaceholder('例）株式会社出雲殿 岡崎法人', { exact: true }).fill(text);

    // お名前
    await page.locator('#last_name').fill('KSZ山﨑');
    await page.locator('#first_name').fill(`葬儀${count}`);
    await page.locator('#last_name_kana').fill('やまざき');
    await page.locator('#first_name_kana').fill('そうぎ');

    // 住所
    await page.getByPlaceholder('例）4300906').fill('4200065');
    await page.getByPlaceholder('例）浜松市中央区住吉1-11-').fill('静岡県静岡市葵区新通1-1');

    // 電話番号
    await page.getByPlaceholder('例）09012345678').fill('1234567899');

    // メールアドレス
    await page.locator('#email').fill('yuichiro.yamazaki@kufu.co.jp');
    await page.locator('#email_confirm').fill('yuichiro.yamazaki@kufu.co.jp');

    // 生花　名札
    if(funeral_id == 160 || funeral_id == 165 || funeral_id == 166 || funeral_id == 144 || funeral_id == 145) {
      await page.locator('#messages_5_0').fill(`葬儀${count}`);
    } else if(funeral_id == 162) {
      await page.locator('#messages_181_0').fill(`葬儀${count}`);
    } else {
      await page.locator('#messages_161_0').fill(`葬儀${count}`);
    }
    
    //　弔電　宛先
    await page.getByPlaceholder('例）●●●様').fill(text);

    // メッセージ
    await page.getByRole('button', { name: '文例から選ぶ ' }).click();
    await page.locator('.js-Example_Choice').first().click();

    // 差出人
    await page.getByPlaceholder('例）株式会社出雲殿 岡崎法人　出雲 太郎').fill(text);
    await page.getByPlaceholder('例）いずもでん　いずもたろう').fill('くふうしずおか　やまざき　てすと');

    // プレビュー
    await page.getByRole('button', { name: 'プレビューを確認する ' }).click();
    await page.locator('#pp_preview_close').click();

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
  //21, // 豊橋
  //22, // 東脇
  24, // 桜丘
  //26, // 田原
  //23, // 西幸
  //25, // 高師
  //27, // 豊川
  //28, // 八幡
  //30, // 小坂井
  //47, // 豊川インター
  //29, // 金屋
  //50, // 幸田
  //51, // 山中
  //31, // 岡崎
  32, // 岡崎北
  //38, // かけまち
  //34, // 矢作
  //35, // 六ツ美
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
    await page.goto('https://izumoec:sosai@dev-izumoec.iarchitect.jp/');

    // セキュリティエラー回避用
    //await page.getByRole('button', { name: '詳細設定' }).click();
    //await page.getByRole('link', { name: 'dev-palmoec.iarchitect.jp' }).click();
    //await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/');

    /*
    //画面のサイズを設定
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

    // 供物選択ページ スクリーンショット
    await page.waitForTimeout(3000); // 画面反映のため待機
    await takeScreenshot(page, `カタログ_表示`, count);

    // 注文選択
    await page.locator('li').filter({ hasText: 'i-message 追懐（ついかい） No.981087' }).getByRole('link').click();
    await page.locator('li').filter({ hasText: '想い' }).getByRole('link').first().click();

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
    await page.getByPlaceholder('例）株式会社出雲殿 岡崎法人', { exact: true }).fill(text);

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
    if(id == 31 || id == 32 || id == 38 || id == 34 || id == 35) {
      await page.locator('#messages_5_0').fill(`カタログ${count}`);
    } else if(id == 26){
      await page.locator('#messages_181_0').fill(`カタログ${count}`);
    } else {
      await page.locator('#messages_161_0').fill(`カタログ${count}`);
    }

    //　弔電　宛先
    await page.getByPlaceholder('例）●●●様').fill(text);

    // メッセージ
    await page.getByRole('button', { name: '文例から選ぶ ' }).click();
    await page.locator('.js-Example_Choice').first().click();

    // 差出人
    await page.getByPlaceholder('例）株式会社出雲殿 岡崎法人　出雲 太郎').fill(text);
    await page.getByPlaceholder('例）いずもでん　いずもたろう').fill('くふうしずおか　やまざき　てすと');

    // プレビュー
    await page.getByRole('button', { name: 'プレビューを確認する ' }).click();
    await page.locator('#pp_preview_close').click();

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
const Case3 = [
  'イズモホール豊橋',
  //'イズモホール桜丘',
  //'イズモホール東脇',
  //'イズモホール西幸',
  //'イズモホール高師',
  //'イズモホール田原',
  //'イズモホール豊川',
  //'イズモホール金屋',
  //'イズモホール八幡',
  //'イズモホール小坂井',
  //'イズモホール豊川インター',
  //'イズモホール岡崎',
  //'イズモホール岡崎北',
  //'イズモホールかけまち',
  //'イズモホール矢作',
  //'イズモホール六ツ美',
  //'イズモかぞくホール山中',
  //'イズモホール幸田',
];

test('スマホ訃報作成', async ({ page }) => {
  let Url1 = "https://izumoec:sosai@dev-izumoec.iarchitect.jp/obituary/posts/input/j2zk5jwnseq3v25hevjssjz_st2di2ek";

  let count = 2; // テスト用カウンタ
  for (const holeName of Case3) {
    // ページ遷移
    await page.goto(Url1);

    let text = `KSZ山﨑テスト${count}`;

    // 団体名
    await page.getByPlaceholder('株式会社出雲殿 岡崎法人').fill(text);

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
    await page.locator('select[name="aichi-east-list"]').selectOption(holeName);
    if (holeName == 'イズモホール豊橋') {
      await page.getByText('貴賓館').click();
      //await page.getByText('弐番館').click();
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
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/50hPtk8fSfZjMUzGIlnaYifKaDRXHdpU", '1'],  // 豊橋
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/muKDqG2aynpKQTmzJKr0NkHsjhnLukOj", '2'],  // 東脇
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/gU1UFf0cliMGmULixZbCWBmIuCrpet1Q", '3'],  // 桜丘
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/RN6wb0w4trJ9UAgdquGB1KdhXN45QmBr", '4'],  // 田原
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/cvjJS9DCyBZEvPxkgWBStuLhde7FUkf4", '5'],  // 西幸
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/lp8vlHjAJSNV0w5Kcz6KLOWnS2SLhfyF", '6'],  // 高師
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/3sD3rdqphB6gc2f3DFQm4QSLLwztovZS", '7'],  // 豊川
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/khSxPSw8tIVQua8rSBtXlb27NQvMobYG", '8'],  // 八幡
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/SoP0Lsva0nla6UNopd3CNyRnQCZ8bzb3", '9'],  // 小坂井
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/CsKzCROt73suWEz5QljSW4c727fFpCqq", '10'], // 豊川インター
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/REXjNsv8F0t7wmR0ULRBFtTmkziBvcm7", '11'], // 金屋
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/4TihJY8sZvdnC76YeKqsoZ1GUFgajcLk", '12'], // 幸田
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/Ox2AWf5APkPSmUkgLgNJ94eN2hWQemgp", '13'], // 山中
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/9QtKJOIE4IXM1J1OxnvPhgmS5QBdbZmc", '14'], // 岡崎
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/uCBeiMRjUE1Y6QDIpNrhZLAaLKChIpIf", '15'], // 岡崎北
  ["https://dev-izumoec.iarchitect.jp/obituary/show/index/ZpWRT7bUpuwGnqK0lr45flMokE5Y1PJh", '16'], // かけまち
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/UJ6kgKpG2Z9HHTll4rU6KO9lODnCYakz", '17'], // 矢作
  //["https://dev-izumoec.iarchitect.jp/obituary/show/index/1N3g6Rw3x5hRugb5MMaDORFcwAdYdSbZ", '18'], // 六ツ美
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
    await page.waitForTimeout(2000); // 画面反映のため待機

    // 供物選択ページ スクリーンショット
    await takeScreenshot(page, `スマホ訃報_表示`, count);

    // 注文選択
    await page.locator('li').filter({ hasText: 'i-message 追懐（ついかい） No.981087' }).getByRole('link').click();
    await page.locator('li').filter({ hasText: '想い' }).getByRole('link').first().click();

    // 注文情報　入力へ遷移
    await page.getByRole('link', { name: 'ご注文手続きへ' }).click();
    await page.waitForTimeout(1000); // 画面反映のため待機

    // 団体名
    await page.getByPlaceholder('例）株式会社出雲殿 岡崎法人', { exact: true }).fill(text);

    // お名前
    await page.locator('#last_name').fill('KSZ山﨑');
    await page.locator('#first_name').fill(`スマホ訃報${count}`);
    await page.locator('#last_name_kana').fill('やまざき');
    await page.locator('#first_name_kana').fill('すまほ');

    // 住所
    await page.getByPlaceholder('例）4300906').fill('4200065');
    await page.getByPlaceholder('例）浜松市中央区住吉1-11-').fill('静岡県静岡市葵区新通1-1');

    // 電話番号
    await page.getByPlaceholder('例）09012345678').fill('1234567899');

    // メールアドレス
    await page.locator('#email').fill('yuichiro.yamazaki@kufu.co.jp');
    await page.locator('#email_confirm').fill('yuichiro.yamazaki@kufu.co.jp');

    // 生花　名札
    if(id == '14' || id == '15' || id == '16' || id == '17' || id == '18') {
      await page.locator('#messages_5_0').fill(`スマホ訃報${count}`);
    } else if(id == '4'){
      await page.locator('#messages_181_0').fill(`スマホ訃報${count}`);
    } else {
      await page.locator('#messages_161_0').fill(`スマホ訃報${count}`);
    }

    //　弔電　宛先
    await page.getByPlaceholder('例）●●●様').fill(`KSZ山﨑　スマホ訃報${count}`);

    // メッセージ
    await page.getByRole('button', { name: '文例から選ぶ ' }).click();
    await page.locator('.js-Example_Choice').first().click();

    // 差出人
    await page.getByPlaceholder('例）株式会社出雲殿 岡崎法人　出雲 太郎').fill(text);
    await page.getByPlaceholder('例）いずもでん　いずもたろう').fill('くふうしずおか　やまざき　てすと');

    // プレビュー
    await page.getByRole('button', { name: 'プレビューを確認する ' }).click();
    await page.locator('#pp_preview_close').click();

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
    const filename = 'スマホ訃報_確認';
    await takeScreenshot(page, filename, count);

    // 注文確定ボタン
    await page.getByRole('button', { name: '注文を確定する' }).click();

    count++;
  }
});

// ************************************************************************************************************