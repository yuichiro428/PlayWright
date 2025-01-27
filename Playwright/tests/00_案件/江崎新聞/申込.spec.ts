import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';

test('test', async ({ page }) => {
    // ページ遷移
    await page.goto('https://ezaki:n6Zj+m2a%3CaU@member-ezakinet.iarchitect.jp/');

    // 希望新聞選択
    await page.getByLabel('毎日新聞').selectOption('朝刊夕刊セット');
    await page.locator('select[name="news1"]').selectOption('(1部)');

    // 氏名
    await page.getByPlaceholder('江﨑', { exact: true }).fill('KSZ山崎');
    await page.getByPlaceholder('太郎').fill('テスト');
    // カナ
    await page.getByPlaceholder('エザキ').fill('テスト');
    await page.getByPlaceholder('タロウ').fill('テスト');

    // メールアドレス
    await page.getByPlaceholder('例：ezaki.taro@yahoo.xx.jp').fill('test01@iarchitect.co.jp');

    // 電話番号　
    await page.locator('input[name="tel1"]').fill('123');
    await page.locator('input[name="tel2"]').fill('456');
    await page.locator('input[name="tel3"]').fill('7899');

    // 郵便番号
    await page.getByPlaceholder('例: 420-').fill('4200065');
    
    // 購読開始日
    await page.locator('select[name="startMonth"]').selectOption('1');
    await page.locator('select[name="startDays"]').selectOption('1');

    // 支払い方法
    //await page.getByLabel('口座振替').check();
    await page.getByLabel('クレジットカード').check();
    //await page.getByLabel('コンビニ払い').check();
    
    // クレジットカード
    await page.getByPlaceholder('例: 0123456789012345').fill('4100000000000100');
    await page.getByLabel('有効期限【半角】※').fill('12');
    await page.locator('#expiration_y').fill('25');
    await page.getByPlaceholder('TARO', { exact: true }).fill('TEST');
    await page.getByPlaceholder('EZAKI', { exact: true }).fill('TEST');

    // Web明細希望
    await page.getByLabel('希望する').check();

    // 個人情報取扱
    await page.getByLabel('同意する').check();

    // 備考
    await page.getByLabel('備考').fill('VISA');

    // 確認ボタン　
    await page.getByRole('button', { name: '入力内容を確認する' }).click();

    // スクショ
    await takeScreenshot(page, "_江崎新聞テスト01");

});