import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    // 1. Log directly to Vercel Logs / Terminal
    console.log(`🚨 [LOGIN ALERT] User logged in: ${email} (ID: ${userId})`);

    // 2. (Optional) Send a instant alert to Discord if you have a webhook URL set
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl) {
      await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 **User Logged In!**\n**Email:** ${email}\n**ID:** \`${userId}\``,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}