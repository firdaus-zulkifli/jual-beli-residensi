import { createHmac } from 'crypto';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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

    if (hmac !== hash) {
      return NextResponse.json({ success: false }, { status: 403 });
    }

    // --- Telegram verification passed, now upsert the user profile ---
    const userRaw = urlParams.get('user');
    if (!userRaw) {
      return NextResponse.json({ success: false, error: 'No user data' }, { status: 400 });
    }

    const tgUser = JSON.parse(decodeURIComponent(userRaw));
    const telegramId = tgUser.id;
    const username = tgUser.username || tgUser.first_name || 'anonymous';

    // Upsert: insert if new, update username if existing
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .upsert(
        { telegram_id: telegramId, username, role: 'resident' },
        { onConflict: 'telegram_id', ignoreDuplicates: false }
      )
      .select('id, telegram_id, username, role')
      .single();

    if (error) {
      console.error('Supabase upsert error:', error);
      return NextResponse.json({ success: false, error: 'DB error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile });
  } catch (e) {
    console.error('Auth verify error:', e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}