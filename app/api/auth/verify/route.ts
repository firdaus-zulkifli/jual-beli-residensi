import { createHmac } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { initData } = await req.json();
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!initData || !BOT_TOKEN) return NextResponse.json({ success: false }, { status: 400 });

    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    const dataCheckString = Array.from(urlParams.entries())
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData')
      .update(BOT_TOKEN)
      .digest();

    const hmac = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (hmac === hash) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 403 });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}