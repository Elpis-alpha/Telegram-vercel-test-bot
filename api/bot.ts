import dotenv from "dotenv";
import { Telegraf } from "telegraf";
// import { VercelRequest, VercelResponse } from "@vercel/node";

dotenv.config();

// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token
const bot = new Telegraf(process.env.BOT_TOKEN as string);

// Handle the /start command
bot.start((ctx) => {
  ctx.reply("Hello!");
});

bot.command("process", async (ctx) => {
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    ctx.reply(`Processing... ${i + 1}/10`);
  }

  await ctx.reply("Processing complete!");
});

// // Webhook handler function for Vercel
// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   try {
//     await bot.handleUpdate(req.body, res);
//   } catch (error) {
//     console.error("Error handling update:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }

bot.launch(
  {
    webhook: {
      domain: "https://bot.dedash.fun", // Replace with your Vercel app URL
      port: 5000,
    },
  },
  () => {
    console.log("Bot is running and listening for updates...");
  }
);
