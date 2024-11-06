import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { VercelRequest, VercelResponse } from "@vercel/node";

dotenv.config();

// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token
const bot = new Telegraf(process.env.BOT_TOKEN as string);

// Handle the /start command
bot.start((ctx) => {
  ctx.reply("Hello!");
});

// Webhook handler function for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await bot.handleUpdate(req.body, res);
  } catch (error) {
    console.error("Error handling update:", error);
    res.status(500).send("Internal Server Error");
  }
}
