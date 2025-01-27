import { Page } from "@playwright/test";
import { InterCepte_Check } from "./99_エラー回避";
import { resultToSheet } from "./03_スプレッドシート";

const sheetName1 = '入力テスト';

let testCount = 2; // 初期値 -1

export async function FormInputHandler(page: Page, selector: string, tagName: string, type: string, value: string) {
    // カウント
    testCount++;

    try {
        // 要素が無効か判定、　無効の場合はスルー
        const isDisabled = await page.$eval(selector, (element) => element.hasAttribute('disabled'));
        if (isDisabled) {
            console.log(`${selector} は無効のためスルーしました`);

            // 結果をスプレッドシートに出力(NG)
            await resultToSheet(testCount, [['NG(無効)']], sheetName1);
            console.log(`テスト${testCount} **NG**`);
            return;
        }

        // 各種入力動作
        if(value){
            if (tagName === 'input' || tagName === 'textarea') {
                if (type === 'checkbox') {
                    // checkbox
                    await InterCepte_Check(page, selector);
                    await page.waitForTimeout(500);
                    await page.locator(selector).check();
                } else {
                    // text , textarea
                    await page.waitForTimeout(500);
                    await page.locator(selector).fill(value);
                }
            }

            if (tagName === 'select') {
                // select
                await page.waitForTimeout(500);
                await page.locator(selector).selectOption(value);
            }

            // 結果をスプレッドシートに出力(OK)
            await resultToSheet(testCount, [['OK']], sheetName1);
            console.log(`テスト${testCount} **OK**`);
        
            
        }else {
            // 入力値がない場合
            // 結果をスプレッドシートに出力(NG)
            await resultToSheet(testCount, [['NG(未入力)']], sheetName1);
            console.log(`テスト${testCount} **NG**`);
        }

    } catch (error) {
        console.error(`テスト${testCount} でエラーが発生:`, error);
        await resultToSheet(testCount, [['NG(エラー)']], sheetName1);
    }
}