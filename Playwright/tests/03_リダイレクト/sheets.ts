import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const spreadsheetId = "16uhoQZHoPVhFWHb6UgC_LmiuJVqZTBOCLf5XIXrNHkI";
const sheetName = "リダイレクト";

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

export async function readURLs() {
    const authClient = await authorize();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // 判定の値を削除
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${sheetName}!A2:A`,
    });

    // 出力結果の値を削除
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${sheetName}!D2:D`,
    });

    // リダイレクト元のURLを取得
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!C2:C`,
    });

    const rows = response.data.values || [];
    return rows.map(row => row[0]);
}

export async function writeRedirectResults(data) {
    const authClient = await authorize();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    for(const [status, URL, count] of data) {
        // 判定1の出力
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A${count+1}`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[ status ]],
            },
        });

        // リダイレクト先の出力
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!D${count+1}`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[ URL ]],
            },
        });

        console.log("結果出力完了！");
    }

}