import { Page } from "@playwright/test";

export function SelectorCreate(page: Page, tagName: string, name: string): string {
    // セレクタを生成 
    //locator('input[name="email_confirm"]')
    let selector = "";
    selector = `${tagName}[name="${name}"]`;
    return selector;
}