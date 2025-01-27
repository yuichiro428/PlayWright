import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const spreadsheetId = "1zOWRtxb7QqMC3ePKfRKhLL4YpecAI7teZl1L90yCeZM";
const sheetName = 'ケーステスト';

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

// Google Sheets からデータを取得
export async function getValuesFromSheet(): Promise<string[][]> {
    const authClient = await authorize();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // スプレッドシートからデータを取得
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!B9:D100`,
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
export async function resultToSheet(row: number, values: string[][]) {
  const authClient = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!F${row}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
        values: values,
    },
  });
}