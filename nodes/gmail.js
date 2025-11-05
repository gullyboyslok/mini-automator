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

export async function sendEmail(from, to, subject, text) {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const email = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    text
  ].join("\n");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: Buffer.from(email)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
    }
  });

  console.log(`Email sent to ${to}`);
}


