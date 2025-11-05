import dotenv from "dotenv";
import cron from "node-cron";
import { runEmail } from "./workflows/email.js";
import { stock_email } from "./workflows/stock_email.js";

dotenv.config();

// Run once at startup
stock_email();

// Schedule: run every day at 10 AM
cron.schedule("0 10 * * *", async () => {
  await stock_email();
});
