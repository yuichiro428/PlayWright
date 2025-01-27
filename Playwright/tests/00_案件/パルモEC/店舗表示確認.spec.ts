import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../../dataUtils';
import { count } from 'console';

// 新店舗表示確認
test('新店舗表示確認', async ({ page }) => {
  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/');

  // 対象店舗情報
  const shopName = 'パルモ葬祭 かぞくホール矢作南';
  const shopAddress = '愛知県岡崎市上佐々木町鹿乗8-3';
  const shopTel = '0120-508-575';
  const shopFax = '0564-53-0215';
  //const shopArea: string = '静岡県';
  const shopArea: string = '愛知県';
  const shopID  = '60';

  // 葬儀場を探す
  

  // トップ
  await expect(page.locator('#hallSelectList')).toContainText(shopName);
  await takeScreenshot(page, '01トップ', count);

  // オンラインカタログ
  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/freefunerals/foinput');
  await expect(page.getByRole('combobox')).toContainText(shopName);
  await page.getByRole('combobox').selectOption(shopID);
  await takeScreenshot(page, '02オンラインカタログ', count);

  // スマホ訃報
  await page.goto('https://palmoec:sosai@dev-palmoec.iarchitect.jp/obituary/posts/input/j2zk5jwnseq3v25hevjssjz_st2di2ek');
  await page.getByText(shopArea).click();
  if (shopArea === '愛知県') {
    await expect(page.locator('select[name="aichi-east-list"]')).toContainText(shopName);
    await page.locator('select[name="aichi-east-list"]').selectOption(shopName);
  }else if (shopArea === '静岡県') {
    await expect(page.locator('select[name="shizuoka-west-list"]')).toContainText(shopName);
    await page.locator('select[name="shizuoka-west-list"]').selectOption(shopName);
  }
  await takeScreenshot(page, '03スマホ訃報', count);

  // 詳細ページ表示確認
  await page.goto('https://palmo:sosai@palmo-sosai.iarchitect.jp');
  await page.goto(`https://palmoec:sosai@dev-palmoec.iarchitect.jp/halls/${shopID}`);
  await expect(page.locator('#selectHall')).toContainText(shopAddress);
  await expect(page.locator('#selectHall')).toContainText(shopTel);
  await expect(page.locator('#selectHall')).toContainText(shopFax);
  await takeScreenshot(page, '04店舗詳細表示', count);

});