import { test, expect } from '@playwright/test';
import { getValuesFromSheet } from './02_シート';
import { actionMain } from './03_実行';

test('test1', async ({ page }) => {
  const rows = await getValuesFromSheet();
  console.log(rows);

  let cnt = 9; // 仕様書の最初のケースNo

  for(const row of rows){
    const [action, value, selector] = row;
    console.log('Case:', cnt - 8);
    console.log('Action:', action);
    console.log('Value:', value);
    console.log('Selector:', selector);

    await actionMain(page, action, value, cnt, selector);

    // ケースカウント
    cnt++;
  }
});