import { Page } from "@playwright/test";
import { resultToSheet } from "./02_シート";
import { takeScreenshot } from "../../dataUtils";

export async function actionMain(page, action, value, cnt, selector) {
    try {

        if (action == '遷移') {
            await page.goto(value);
        } else {
            // 要素が無効か判定、　無効の場合はスルー
            const isDisabled = await page.$eval(selector, (element) => element.hasAttribute('disabled'));
            if (isDisabled) {
                console.log(`${selector} は無効のためスルーしました`);

                // 結果をスプレッドシートに出力(NG)
                await resultToSheet(cnt, [['NG(無効)']]);
                console.log(`テスト${cnt-8} **NG**`);
                return;
            }

            if (action == '入力') {
                // text , textarea
                await page.waitForTimeout(500);
                await page.locator(selector).fill(value);
            }
            if (action == '選択') {
                // select
                await page.waitForTimeout(500);
                await page.locator(selector).selectOption(value);
            }
            
        }

        // 結果出力
        await resultToSheet(cnt,[['OK']]);
        // スクリーンショットを保存
        let No = cnt - 8;
        let filename = `_Case${No}`;
        await takeScreenshot(page, filename);

    } catch (error) {
        console.error(`ケース${cnt-8} でエラーが発生:`, error);
        await resultToSheet(cnt, [['NG(エラー)']]);

    }

}

