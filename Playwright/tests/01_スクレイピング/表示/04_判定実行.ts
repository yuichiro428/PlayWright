import { Page, test, expect } from "@playwright/test";
import { resultToSheet } from "./03_スプレッドシート";

const sheetName = '表示テスト';
let count = 2; // 初期値 -1

// 表示項目を期待値と一致するか判定
export async function checkText(page, Values) {
    for (const [expectedText, tagName, actualText, nth] of Values) {
        // Locatorを取得
        const Locator = page.locator(tagName).nth(Number(nth));
        count++;

        try {
            // 判定(完全一致)
            await expect(Locator).toHaveText(expectedText);

            // 結果出力
            console.log(`テスト${count} **OK**`);
            await resultToSheet(count, [["OK"]], [[]]);
        } catch (error) {
            // 期待値と実値を出力
            const receivedText = await Locator.textContent();
            console.log(`実　値: ${receivedText}`);
            console.log(`期待値: ${expectedText}`);
            
            // 結果出力
            console.log(`テスト${count} **NG**`);
            await resultToSheet(count, [["NG"]], [[`実　値: ${receivedText}\n期待値: ${expectedText}`]]);
            //console.log(error);
        }
    }
}