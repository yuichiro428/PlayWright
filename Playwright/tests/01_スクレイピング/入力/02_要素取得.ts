import { Page } from '@playwright/test'

// 要素情報を取得する関数
export async function getPageElements(page: Page): Promise<{
  tagName: string;
  labelText: string;
  type?: string | null;
  name?: string | null;
  options?: string[];
}[]> {
  // 型定義
  type ElementData = {
    tagName: string;
    labelText: string;
    type?: string | null;
    name?: string | null;
    options?: string[];
  };

  const elements = await page.$$('input, select, textarea');
  const elementInfo: ElementData[] = [];

  for (const element of elements) {
    const tagName = await element.evaluate((el) => el.tagName.toLowerCase());

    // 関連する label を取得
    const id = await element.getAttribute('id');
    let labelText = '';
    if (id) {
      const label = await page.$(`label[for="${id}"]`);
      if (label) {
        labelText = (await label.textContent())?.trim() ?? '';
      }
    }

    // Optionの value を取得
    let options: string[] = [];
    if (tagName === 'select') {
      // select タグ内の option　をすべて取得する
      const optionElements = await element.$$('option');
      options = await Promise.all(
        optionElements.map(async (option) => await option.getAttribute('value') || '')
      );
    }

    // 各要素の情報を格納
    const elementData: ElementData = {
      tagName,
      labelText,
      type: tagName === 'input' ? await element.getAttribute('type') : null,
      name: await element.getAttribute('name'),
      options: options.length > 0 ? options : undefined,
    };

    elementInfo.push(elementData);
  }

  return elementInfo;
}
