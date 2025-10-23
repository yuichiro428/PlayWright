import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

test.setTimeout(180000); // タイムアウトを180秒に延長
//test.setTimeout(10000); // 検証用 10秒

// 案件作成
test('test1', async ({ page }) => {
    await page.goto('https://riviera:reborn@rivirope-reborn.iarchitect.jp/');
    // 画面のサイズを設定
    await page.setViewportSize({
        width: 1920,
        height: 900,
    });
    // バーを閉じる
    await page.locator('.phpdebugbar-close-btn').click();

    // ログイン
    await page.locator('#email').fill('');
    await page.getByLabel('パスワード').fill('');
    await page.getByRole('button', { name: 'ログイン' }).click();

    let count = 1;
    for (let i = 0; i < count; count++) {
        // 入力値
        let text = `テスト${String(i+1).padStart(2, '0')}`;

        // ページ遷移
        await page.goto('https://rivirope-reborn.iarchitect.jp/project/create');

        // 必須入力
        await page.getByLabel('見積受付日').fill('2024-12-13'); // 必須
        await page.getByLabel('得意先コード', { exact: true }).fill('200270'); // 必須

        // 項目入力
        await page.getByLabel('邸名', { exact: true }).fill(text);
        await page.getByLabel('邸名カナ').fill(text);
        await page.getByLabel('コメント').fill(text);
        await page.getByLabel('得意先1').fill(text);
        await page.getByLabel('得意先2').fill(text);
        await page.getByLabel('得意先名カナ').fill(text);
        await page.getByLabel('得意先担当').fill(text);

        // 入力画面　スクショ
        let screenshotName = `_入力画面_${String(i).padStart(2, '0')}`;
        await takeScreenshot(page, screenshotName, count);

        // 追加ボタン
        //await page.getByRole('button', { name: '追加する' }).click();

        // 見積作成　閉じる
        //await page.getByRole('link', { name: '閉じる' }).click();

        // 案件詳細　スクショ
        //screenshotName = `_案件詳細_${String(i).padStart(2, '0')}`;
        //await takeScreenshot(page, screenshotName);
    }

});

// 案件編集
test('test2', async ({ page }) => {
    await page.goto('https://riviera:reborn@rivirope-reborn.iarchitect.jp/');

    // 画面のサイズを設定
    await page.setViewportSize({
        width: 1920,
        height: 900,
    });

    // バーを閉じる
    await page.locator('.phpdebugbar-close-btn').click();

    // ログイン
    await page.locator('#email').fill('');
    await page.getByLabel('パスワード').fill('');
    await page.getByRole('button', { name: 'ログイン' }).click();

    let count = 1;
    for (let i = 0; i < count; i++) {
        // 入力値
        let text = `テスト${String(i+1).padStart(2,'0')}`;

        // 案件編集
        let project_id = 0; // 案件ID
        await page.goto(`https://rivirope-reborn.iarchitect.jp/project/edit/${project_id}`);
        await page.getByLabel('見積受付日').fill('2024-12-13'); // 必須
        await page.getByLabel('得意先コード', { exact: true }).fill('31854001'); // 必須

        // 機種依存文字 入力
        await page.getByLabel('邸名', { exact: true }).fill(text);
        await page.getByLabel('邸名カナ').fill(text);
        await page.getByLabel('コメント').fill(text);
        await page.getByLabel('得意先1').fill(text);
        await page.getByLabel('得意先2').fill(text);
        await page.getByLabel('得意先名カナ').fill(text);
        await page.getByLabel('得意先担当').fill(text);

        // 入力画面　スクショ
        let screenshotName = `_入力画面_${String(i+1).padStart(2, '0')}`;
        await takeScreenshot(page, screenshotName, count);

        // 変更ボタン
        await page.getByRole('button', { name: '変更する' }).click();

        // 案件詳細　スクショ
        //screenshotName = `_案件詳細_${String(i+1).padStart(2, '0')}`;
        //await takeScreenshot(page, screenshotName);
    }
    
});

// 見積作成
test('test3', async ({ page }) => {
    await page.goto('https://riviera:reborn@rivirope-reborn.iarchitect.jp/');
    // 画面のサイズを設定
    await page.setViewportSize({
        width: 1920,
        height: 900,
    });
    // バーを閉じる
    await page.locator('.phpdebugbar-close-btn').click();

    // ログイン
    await page.locator('#email').fill('');
    await page.getByLabel('パスワード').fill('');
    await page.getByRole('button', { name: 'ログイン' }).click();

    let count = 1;
    for (let i = 0; i < count; i++) {
        let text = `テスト${String(i+1).padStart(2,'0')}`;
        let project_id = 0; // 案件ID

        // 見積作成
        await page.goto(`https://rivirope-reborn.iarchitect.jp/project/estimate/create/${project_id}`);
        // 見積名
        await page.locator('input[name="name"]').fill(text);

        // 区分選択(倉出)
        await page.locator('select[name="estimate_details\\[0\\]\\[type\\]"]').selectOption('1');
        // 品番
        await page.locator('#product_number-0').fill('T3401');
        // 品名
        await page.locator('#product_name-0').fill(text);
        // 数量
        await page.locator('#quantity-0').fill('1');
        // 単位
        await page.locator('#unit-0').fill('枚');
        // 単価
        await page.locator('#unit_price-0').fill('1');
        // 備考
        await page.locator('#note-0').fill(text);

        // 区分選択(直送)
        await page.getByRole('button').nth(3).click();
        await page.locator('select[name="estimate_details\\[1\\]\\[type\\]"]').selectOption('2');
        // 品番
        await page.locator('#product_number-1').fill('G1007');
        // 品名
        await page.locator('#product_name-1').fill(text);
        // 数量
        await page.locator('#quantity-1').fill('1');
        // 単位
        await page.locator('#unit-1').fill('枚');
        // 単価
        await page.locator('#unit_price-1').fill('1');
        // 備考
        await page.locator('#note-1').fill(text);
        // 仕入先コード
        await page.locator('#shiiresakikoudo-1').fill('959');
        // 仕入先名
        await page.locator('#shiiresakimei-1').fill(text);

        // コメント
        await page.getByRole('button').nth(6).click();
        await page.locator('select[name="estimate_details\\[2\\]\\[type\\]"]').selectOption('3');
        await page.locator('#comment-2').fill(text);

        // 下スクロール
        await page.keyboard.press('End');

        // 入力画面　スクショ
        let screenshotName = `_入力画面_${String(i+1).padStart(2, '0')}`;
        await takeScreenshot(page, screenshotName, count);

        // 保存ボタン
        //await page.getByRole('button', { name: '保存する' }).click();

        // 下スクロール
        //await page.keyboard.press('End');

        // 案件詳細　スクショ
        //screenshotName = `_案件詳細_${String(i+1).padStart(2, '0')}`;
        //await takeScreenshot(page, screenshotName);
    }
});

// 見積編集
test('test4', async ({ page }) => {
    await page.goto('https://riviera:reborn@rivirope-reborn.iarchitect.jp/');
    // 画面のサイズを設定
    await page.setViewportSize({
        width: 1920,
        height: 900,
    });
    // バーを閉じる
    await page.locator('.phpdebugbar-close-btn').click();

    // ログイン
    await page.locator('#email').fill('');
    await page.getByLabel('パスワード').fill('');
    await page.getByRole('button', { name: 'ログイン' }).click();

    let count = 1;
    for (let i = 0; i < count; i++) {
        let text = `テスト${String(i+1).padStart(2,'0')}`;
        let project_id = 0; // 案件ID

        // 案件詳細
        await page.goto(`https://rivirope-reborn.iarchitect.jp/project/detail/${project_id}`);
        // 見積変更ボタン
        await page.getByRole('link', { name: '変更する', exact: true }).click();

        // 見積名
        await page.locator('input[name="name"]').fill(text);

        // 区分選択(倉出)
        await page.locator('select[name="estimate_details\\[0\\]\\[type\\]"]').selectOption('1');
        // 品番
        await page.locator('#product_number-0').fill('G1007');
        // 品名
        await page.locator('#product_name-0').fill(text);
        // 数量
        await page.locator('#quantity-0').fill('2');
        // 単位
        await page.locator('#unit-0').fill('箱');
        // 単価
        await page.locator('#unit_price-0').fill('100');
        // 備考
        await page.locator('#note-0').fill(text);

        // 区分選択(直送)
        await page.locator('select[name="estimate_details\\[1\\]\\[type\\]"]').selectOption('2');
        // 品番
        await page.locator('#product_number-1').fill('T3401');
        // 品名
        await page.locator('#product_name-1').fill(text);
        // 数量
        await page.locator('#quantity-1').fill('2');
        // 単位
        await page.locator('#unit-1').fill('箱');
        // 単価
        await page.locator('#unit_price-1').fill('100');
        // 備考
        await page.locator('#note-1').fill(text);
        // 仕入先コード
        await page.locator('#shiiresakikoudo-1').fill('959');
        // 仕入先名
        await page.locator('#shiiresakimei-1').fill(text);

        // コメント
        await page.locator('select[name="estimate_details\\[2\\]\\[type\\]"]').selectOption('3');
        await page.locator('#comment-2').fill(text);

        // 下スクロール
        await page.keyboard.press('End');

        // 入力画面　スクショ
        let screenshotName = `_入力画面_${String(i+1).padStart(2, '0')}`;
        await takeScreenshot(page, screenshotName, count);

        // 保存ボタン
        //await page.getByRole('button', { name: '保存する' }).click();

        // 下スクロール
        //await page.keyboard.press('End');

        // 案件詳細　スクショ
        //screenshotName = `_案件詳細_${String(i+1).padStart(2, '0')}`;
        //await takeScreenshot(page, screenshotName);
    }
});
