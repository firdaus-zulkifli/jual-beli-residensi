'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('Neighbour');
  const [session, setSession] = useState<{
    type: 'unknown' | 'private' | 'group' | 'external';
    chatTitle?: string;
    startParam?: string;
    chatId?: number | string;
  }>({ type: 'unknown' });
  
  const router = useRouter();

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initData) {
      tg.ready();
      tg.expand();

      const user = tg.initDataUnsafe?.user;
      const chat = tg.initDataUnsafe?.chat;
      const chatType = tg.initDataUnsafe?.chat_type; // 'sender', 'private', 'group', 'supergroup'
      const startParam = tg.initDataUnsafe?.start_param;

      if (user?.first_name) setUsername(user.first_name);

      // Determine the session type accurately
      let sessionType: 'private' | 'group' | 'external' = 'external';
      
      if (chatType === 'sender' || chatType === 'private') {
        sessionType = 'private';
      } else if (chatType === 'group' || chatType === 'supergroup') {
        sessionType = 'group';
      }

      setSession({
        type: sessionType,
        chatTitle: chat?.title,
        startParam: startParam,
        chatId: chat?.id
      });
    } else {
      setSession({ type: 'external' });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      
      {/* HEADER SECTION */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        Hello <span className="text-yellow-400">{username}</span>!
      </h1>

      {/* GATE LOGIC UI */}
      <div className="w-full max-w-sm mt-4 mb-8">
        {session.type === 'external' && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-xl text-center">
            <p className="text-red-400 text-sm font-semibold">🛑 Access Denied</p>
            <p className="text-xs text-red-300/70">Please open this app via the official Telegram Bot.</p>
          </div>
        )}

        {session.type === 'private' && (
          <div className="bg-blue-500/20 border border-blue-500 p-4 rounded-xl text-center">
            <p className="text-blue-400 text-sm font-semibold">🏠 Private View</p>
            <p className="text-xs text-blue-300/70">You are browsing outside the community group.</p>
          </div>
        )}

        {session.type === 'group' && (
          <div className="bg-green-500/20 border border-green-500 p-4 rounded-xl text-center">
            <p className="text-green-400 text-sm font-semibold">✅ Group Verified</p>
            <p className="text-xs text-green-300/70">Logged in via: {session.chatTitle}</p>
          </div>
        )}
      </div>

      {/* ACTION BUTTON */}
      <button
        disabled={session.type === 'external'}
        className="px-10 py-4 font-bold text-slate-900 bg-yellow-400 rounded-xl transition-all active:scale-95 disabled:grayscale disabled:opacity-50"
        onClick={() => router.push('/shops')}
      >
        View Shops 🔥
      </button>

      {/* DEBUG CONSOLE (FOR YOUR TESTING) */}
      <div className="mt-12 w-full max-w-xs p-4 bg-black/50 rounded-lg font-mono text-[10px] text-slate-500">
        <p className="text-slate-300 border-b border-slate-800 mb-2 pb-1">INTERNAL DEBUG</p>
        <div className="space-y-1">
          <p>SESSION_TYPE: <span className="text-white">{session.type}</span></p>
          <p>START_PARAM: <span className="text-white">{session.startParam || 'none'}</span></p>
          <p>CHAT_TITLE: <span className="text-white">{session.chatTitle || 'N/A'}</span></p>
          <p>GROUP ID: <span className='text-white'>{session.chatId}</span> </p>
        </div>
      </div>
    </div>
  );
}