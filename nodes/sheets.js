import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();


const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET
);

const token = JSON.parse(fs.readFileSync("token.json", "utf-8"));
oAuth2Client.setCredentials(token);

















// ALL THE FUNCTIONS
export async function readSheet(range, spreadsheetId) {
  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });
  spreadsheetId = spreadsheetId || process.env.SPREADSHEET_ID;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error("Error reading sheet:", error);
    throw error;
  }
}