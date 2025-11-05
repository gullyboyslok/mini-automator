import { google } from "googleapis";
import dotenv from "dotenv";
import { sendEmail } from "../nodes/gmail.js";

dotenv.config();

export async function runEmail() {
  await sendEmail("gullyboyslok@gmail.com", "gullyboyslok@gmail.com", "yo", "i am sending this through javascript. magic!");
}
