'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('Neighbour');
  const [access, setAccess] = useState<'loading' | 'granted' | 'denied'>('loading');
  const router = useRouter();

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg?.initData) {
      tg.ready();
      tg.expand();

      const name = tg.initDataUnsafe?.user?.first_name;
      if (name) setUsername(name);

      fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: tg.initData })
      })
      .then(res => res.ok ? setAccess('granted') : setAccess('denied'))
      .catch(() => setAccess('denied'));
    } else {
      setAccess('denied');
    }
  }, []);

  const handleEnter = () => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('medium');
    }
    router.push('/shops');
  };

  if (access === 'loading') {
    return <div className="flex items-center justify-center min-h-screen bg-slate-900 text-yellow-400 font-mono">Verifying Residency...</div>;
  }

  if (access === 'denied') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-slate-400">This app is exclusive to the Residensi Pauh Permai Telegram Community.</p>
        <p className="mt-4 text-xs text-slate-600 italic">Please open this link inside Telegram.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Hello <span className="text-yellow-400">{username}</span>!
      </h1>
      <p className="text-slate-400 text-center mb-10 text-lg">
        Welcome to <br />
        <span className="font-semibold text-white">Residensi Pauh Permai Marketplace</span>
      </p>

      <button
        className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-slate-900 transition-all duration-200 bg-yellow-400 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        animate-pulse hover:animate-none hover:scale-105 active:scale-95"
        onClick={handleEnter}>
        <span className="relative z-10">View Shops 🔥</span>
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-xl blur opacity-25"></div>
      </button>
    </div>
  );
}