// 現在日付を取得して「20YYMMDD」にフォーマット
export function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// スクリーンショット
export async function takeScreenshot(page, filename, count) {
    const formattedDate = getFormattedDate();
    const SSNo = String(count).padStart(2, '0');
    const filePath = `./screenshot/${formattedDate}_${SSNo}_${filename}.png`;

    await page.waitForTimeout(1000); // 画面反映のため待機

    await page.screenshot({
      path: filePath,
      fullPage: true,
    });
    console.log(`スクリーンショットを保存しました: ${filePath}`);
}

// 録画