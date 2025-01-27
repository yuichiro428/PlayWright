import { Page } from '@playwright/test';
import { takeScreenshot } from '../../dataUtils';
import { writeRedirectResults } from './sheets';

export async function checkRedirects(page, urls) {
    let results: [string, string, number][] = [];

    let count = 1;
    for (const url of urls) {
        // URLがなければスキップ
        if(!url) continue;

        let redirectURL = '';
        let status = 'NG';

        try {
            const response = await page.goto(url);
            await page.waitForTimeout(5000);
            await takeScreenshot(page, 'テスト', count);

            const redirectFrom = response.request().redirectedFrom();
            if (redirectFrom) {
                // 成功
                redirectURL = response.url();
                status = 'OK';
            } else {
                // 失敗
                redirectURL = 'リダイレクトが実行されませんでした。';
            }
        } catch (error) {
            // 実行エラー
            console.error(`エラー: ${url} -> ${error.message}`);
            redirectURL = 'エラー';
        }

        results = [
            [status, redirectURL, count],
        ];
        await writeRedirectResults(results);
        count++;
    }

}