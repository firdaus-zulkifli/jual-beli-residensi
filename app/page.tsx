'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('Neighbour');
  const router = useRouter();

  const handleEnter = () => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('medium');
    }
    router.push('/shops');
  };

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const name = tg.initDataUnsafe?.user?.first_name;
      if (name) setUsername(name);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      {/* Dynamic Greeting */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        Hello <span className="text-yellow-400">{username}</span>!
      </h1>
      <p className="text-slate-400 text-center mb-10 text-lg">
        Welcome to <br />
        <span className="font-semibold text-white">Residensi Pauh Permai Marketplace</span>
      </p>

      {/* Animated Button */}
      <button
        className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-slate-900 transition-all duration-200 bg-yellow-400 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
        animate-pulse hover:animate-none hover:scale-105 active:scale-95"
       oonClick={handleEnter}>
        <span className="relative">View Shops 🔥</span>
        {/* Simple "Light" animation glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      </button>
    </div>
  );
}