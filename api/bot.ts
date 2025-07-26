import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);

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

bot.launch(
  {
    webhook: {
      domain: "https://bot.dedash.fun",
      port: 5000,
    },
  },
  () => {
    console.log("Bot is running and listening for updates...");
  }
);

// import { VercelRequest, VercelResponse } from "@vercel/node";
// // Webhook handler function for Vercel
// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   try {
//     await bot.handleUpdate(req.body, res);
//   } catch (error) {
//     console.error("Error handling update:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }
