import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import iconv from 'iconv-lite';

// ログイン処理
const LOGIN_ID = 'yuichiro.yamazaki@kufu.co.jp';
const LOGIN_PW = 'Asdf1234';

async function login(page) {
    await page.goto('https://riviera:reborn@rivirope-reborn.iarchitect.jp/');
    await page.locator('#email').fill(LOGIN_ID);
    await page.getByLabel('パスワード').fill(LOGIN_PW);
    await page.getByRole('button', { name: 'ログイン' }).click();

    // バーを閉じる
    await page.locator('.phpdebugbar-close-btn').click();
}
// ***********************************************************************************************
// 案件ID、見積ID
const Case1 = [
    [298, 240002981], 
];

// CSVダウンロード
test('CSVダウンロードと値判定', async ({ page }) => {
    /*
    await page.setViewportSize({
        width: 1920,
        height: 900,
    });
    */

    // ログイン
    await login(page);

    // ダウンロード先ディレクトリ
    const savePath = "/Users/yamazaki/Documents/作業関係/Playwright/downloads";
    
    try {
        fs.statSync(savePath);
    } catch {
        fs.mkdirSync(savePath);
    }

    let count = 1; // テスト用カウント
    for (const [project_id, estimate_id] of Case1) {

        // 見積詳細ページ遷移
        await page.goto(`https://rivirope-reborn.iarchitect.jp/project/detail/${project_id}/${estimate_id}`);

        // ダウンロード
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('button', { name: 'SKIT連携用出力' }).click();
        const download = await downloadPromise;

        // ファイル移動と保存
        const filePath = path.join(savePath, download.suggestedFilename());
        await download.saveAs(filePath);
        console.log(`CSVを保存しました。 ${filePath}`);

        // CSV出力と判定
        await csvValueCheck(filePath);

    }

});

// ***********************************************************************************************
// 判定したいカラム名と値
const Case2 = [
    { column: '受注単価コード', value: '001' },
    { column: '受注単価', value: '0' },
];

// CSV出力と判定
export async function csvValueCheck(filePath) {
    console.log(`判定ファイル ${filePath}`);
    // UTF8 から Shift-JIS に変換
    const csvContent = fs.readFileSync(filePath);
    const sjisContent = iconv.decode(csvContent, 'Shift_JIS');

    // CSVファイルを読み取る
    const records = parse(sjisContent, {
        columns: true, // ヘッダーをキーにする
        skip_empty_lines: true, // 空行をスキップする
        relax_column_count: true, // カラム数の不一致を許容
    });

    // 読み取った内容をすべて出力する
    //console.log(records);

    // 行ごとに処理
    records.forEach(record => {
        // 判定対象のみ抽出
        const testRecords = Case2.reduce((acc, condition) => {
            acc[condition.column] = record[condition.column];
            return acc;
        }, {});

        // 条件判定
        const matches = Case2.every(condition => record[condition.column] === condition.value);
        if (matches) {
            console.log(`***OK***: ${JSON.stringify(testRecords, null, 2)}`);
        } else {
            console.log(`NG: ${JSON.stringify(testRecords, null, 2)}`);
        }

    });
}

test('CSV判定のみ実行', async () => {
    let filePaths = [
        '/Users/yamazaki/Documents/作業関係/Playwright/downloads/240002981_202501161042.csv',
    ];

    for (const filePath of filePaths) {
        await csvValueCheck(filePath);
    }
});
