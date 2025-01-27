import { Page } from '@playwright/test'

type ElementData = {
    tagName: string;
    text: string;
    nth: number;
};

export async function getPageTexts(page: Page) {
    // 全ての要素を取得
    const elements = await page.locator('*'); 
  
    // 各要素を処理
    const elementData: ElementData[] = [];
    const allTags: { [key: string]: number } = {}; // 全要素のnthを管理

    for (let i = 0; i < await elements.count(); i++) {
      const element = elements.nth(i);
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      const text = await element.innerText().catch(() => ''); // innerText を取得（例外処理付き）
      const visible = await element.isVisible(); // 表示状態を確認

      // nthを計算 
      if (!(tagName in allTags)) {
        allTags[tagName] = 0; // 初期登録
      }
      const nth = allTags[tagName]++; 
  
      // フィルタリング条件
      if (
        text.trim() && // 空でない
        !['html', 'body', 'div', 'form', 'nav', 'script', 'noscript'].includes(tagName) && // 除外リスト
        visible // 表示されている
      ) {
        elementData.push({
          tagName,
          text: text.trim(),
          nth,
        });
      }
    }
  
    return elementData;
}