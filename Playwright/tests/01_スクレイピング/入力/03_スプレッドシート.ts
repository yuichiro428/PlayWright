import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const spreadsheetId = "1zOWRtxb7QqMC3ePKfRKhLL4YpecAI7teZl1L90yCeZM";

// Google Sheets 認証設定
async function authorize(): Promise<OAuth2Client> {
  const auth = new google.auth.GoogleAuth({
    keyFile: '/Users/yamazaki/Documents/作業関係/Playwright/Google_Project_Key.json', // 認証情報JSON
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // OAuth2Client クライアントを取得
  const authClient = await auth.getClient();
  return authClient as OAuth2Client;
}

// URL取得
export async function getURL(sheetName: string): Promise<string> {
  const authClient = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!B1`, 
  });

  const rows = response.data.values;
  if (rows && rows.length > 0 && rows[0].length > 0) {
    console.log(`スプレッドシートからURLを取得しました: ${rows[0][0]}`);
    return rows[0][0];
  } else {
    console.log('スプレッドシートにURLがありません。');
    return '';
  }
}

// Google Sheets にデータを追加
export async function appendToSheet(
  elementInfo: { 
    tagName: string; 
    labelText: string; 
    type?: string | null; 
    name?: string | null;
    options?: string[];
  }[],
  sheetName: string
) {
  const authClient = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  // データをスプレッドシートの形式に変換
  const rows: string[][] = elementInfo.map(({ tagName, labelText, name, type, options }) => {
    return [
      tagName,
      labelText || '',
      type || '',
      name || '',
      ...(options || []),
    ];
  });

  // スプレッドシートの値を削除
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${sheetName}!A3:P1000`,
  });

  // データをスプレッドシートに出力
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!C3`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: rows,
    },
  });

  console.log('データをスプレッドシートに書き込みました。');
}

// セレクターを出力
export async function selectorToSheet(values: string[], sheetName: string) {
  const authClient = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  // スプレッドシートの形式へ変換
  const formatValues = values.map(value => [value]);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!B3:B`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
        values: formatValues,
    },
  });
}

// Google Sheets からデータを取得
export async function getValuesFromSheet(sheetName: string): Promise<string[][]> {
  const authClient = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  // スプレッドシートからデータを取得
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!B3:F1000`,
  });

  const rows = response.data.values;
  if (rows && rows.length) {
    console.log('スプレッドシートからデータを取得しました:');
    return rows;
  } else {
    console.log('スプレッドシートにデータがありません。');
    return [];
  }
}

// テスト結果を出力
export async function resultToSheet(row: number, values: string[][], sheetName: string) {
  const authClient = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A${row}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
        values: values,
    },
  });
}