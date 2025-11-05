import axios from "axios";

export async function runExample() {
  console.log("Running workflow...");

  // Example: Fetch a random joke
  const { data } = await axios.get("https://api.elections.kalshi.com/trade-api/v2/markets?limit=5");

  // Format it
  const message = `${data.setup}\n${data.punchline}`;
  console.log(message);

  return message;
}
