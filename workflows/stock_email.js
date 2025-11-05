// nodes
import { sendEmail } from "../nodes/gmail.js";
import { readSheet } from "../nodes/sheets.js";
import {chatgpt} from "../nodes/openai.js";

//workflow

export async function stock_email() {
  const portfolio = await readSheet("Sheet1!A1:J19", "1Ngto4gfs2E-ziIaNaEQcQ8vYtvTb1RFUkMqsfzVj1yk");
  const comments = await readSheet("Sheet3!A1:A2", "1Ngto4gfs2E-ziIaNaEQcQ8vYtvTb1RFUkMqsfzVj1yk");
  //console.log(portfolio);
  //console.log(comments);

  const search_prompts = await chatgpt(
    `You are a bot tasked with analyzing a stock portfolio. 
    There are 2 bots: bot 1 (you) and bot 2 (which will be later on in the process). 
    Essentially, bot 1 will output a JSON file with search prompts for a google search after taking in:
    a. Data on the stocks a user named "Shlok Jaiswal" is holding 
    (he just put the tickers and their info here, not his actual holdings values)
    b. Shlok's suggestions, comments, etc 
    The structure will be {\"prompt1\": \"search prompt 1\", \"prompt2\": \"search prompt 2\", ...}. Make 4 prompts.
    Prompts 1-3 are related to his current portfolio, and prompt 4 should be related to his comments.
    The prompts will be sent to a google search programmable engine which will run the searches and aggregate the outputs.
    Bot 2 will take those search outputs and the stock data and the comments and create an HTML email and send it to the user.
    Now, take a deep breath, and generate prompts, outputting them in the json format.

    EXTREMELY IMPORTANT NOTE: THESE ARE NOT PROMPTS TO AN AI. THESE ARE SEARCHES THAT ARE GOING DIRECTLY INTO A SEARCH BAR.
    THE SEARCH BAR IS LIMITED TO SEARCHES IN YAHOO FINANCE. KEEP THAT IN MIND SO THAT YOU DON'T WRITE PROMPTS FOR AN AI.
    SHORT SEARCHES, DONT DO STUFF LIKE THIS: "Yahoo Finance stock quotes and sector exposure for the following holdings: MSTR, CSCO, XOM, BRKB, MSFT, SPY, AMD, GE, C, QQQ, AVGO, ORCL, NVDA, BLK, GEV, PLTR, UNH, RCL"
    THAT IS BAAAAAD AND WONT WORK IN THE SEARCH BAR.
    AND ALSO DONT PUT THE WORDS "YAHOO FINANCE" IN THE PROMPT. EVERRRRRR.

    STOCK_DATA: ${JSON.stringify(portfolio)}

    COMMENTS: ${JSON.stringify(comments)}

    `,
    "user",
    "gpt-5-nano"
  );

  const output = search_prompts.output_text; 
  const prompts = JSON.parse(output);  

  console.log(prompts.prompt1);
  console.log(prompts.prompt2);
  console.log(prompts.prompt3);
  console.log(prompts.prompt4);

}