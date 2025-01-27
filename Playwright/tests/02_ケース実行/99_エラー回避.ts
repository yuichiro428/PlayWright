import { Page } from "@playwright/test";

// ターゲット要素が他の要素と重なっているかどうかの判定
export async function InterCepte_Check(page: Page, selector: string) {
    const isInterCepted = await page.evaluate((selector) => {
        const target = document.querySelector(selector);
        if (!target) return false; // targetがnullの場合は、falseを返す
    
        const rect = target.getBoundingClientRect();
        const elementAtPoint = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    
        if (elementAtPoint && elementAtPoint !== target) {
          // インターセプトしている要素の セレクタ を返す
          return elementAtPoint.tagName.toLowerCase() + (elementAtPoint.className ? '.' + elementAtPoint.className.split(' ').join('.') : '');
        }
        return null;
    }, selector);
    
    if (isInterCepted) {
        console.log('ターゲットは他の要素によってインターセプトされています。');
        console.log('インターセプトしている要素:', isInterCepted);

        // インターセプトしている要素を閉じる処理
        await page.evaluate((selector) => {
            const elementToClose = document.querySelector(selector);
            if (elementToClose && elementToClose instanceof HTMLElement) {
                elementToClose.style.display = 'none'; // 要素を非表示にする
            }
        }, isInterCepted);
        console.log('インターセプトしていた要素を閉じました。');
    }
}