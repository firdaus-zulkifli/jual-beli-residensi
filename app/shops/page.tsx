'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/UserContext';

type Shop = {
  id: string;
  shop_name: string;
  description: string;
  icon: string;
  is_open: boolean;
};

export default function ShopList() {
  const router = useRouter();
  const { access } = useUser();
  const [neighborShops, setNeighborShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (access !== 'granted') return;

    const fetchShops = async () => {
      try {
        const response = await fetch('/api/shops');
        if (!response.ok) {
          throw new Error(`Failed to fetch shops: ${response.status}`);
        }
        const data = await response.json();
        setNeighborShops(data);
      } catch (err) {
        console.error("Shop Fetch Error:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [access]);

  const goBack = () => {
    const tg = (window as any).Telegram?.WebApp;
    tg?.HapticFeedback?.impactOccurred('light');
    router.back();
  };

  const handleShopClick = (shopId: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light');
    }
    router.push(`/shop/${shopId}`);
  };

  if (access === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <header className="mb-8">
          <button onClick={goBack} className="text-yellow-400 mb-4">&larr; Back</button>
          <h1 className="text-2xl font-bold">Open Shops Today 🏪</h1>
          <p className="text-slate-400">Support your neighbors, buy local!</p>
        </header>
        <div className="flex justify-center items-center h-64">
          <p className="animate-pulse">Loading shops...</p>
        </div>
      </div>
    );
  }

  if (access === 'denied') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-slate-400">Please open this app inside Telegram.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <header className="mb-8">
          <button onClick={goBack} className="text-yellow-400 mb-4">&larr; Back</button>
          <h1 className="text-2xl font-bold">Oops! 🚧</h1>
        </header>
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <p className="text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
            Error: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-slate-400 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="mb-8">
        <button onClick={goBack} className="text-yellow-400 mb-4">&larr; Back</button>
        <h1 className="text-2xl font-bold">Open Shops Today 🏪</h1>
        <p className="text-slate-400">Support your neighbors, buy local!</p>
      </header>

      <div className="grid gap-4">
        {neighborShops.length === 0 ? (
           <p className="text-slate-500 italic">No shops are open right now.</p>
        ) : (
          neighborShops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => handleShopClick(shop.id)}
              className="bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-yellow-400/50 transition-all active:scale-95 cursor-pointer flex items-center gap-4"
            >
              <div className="text-4xl">{shop.icon}</div>
              <div className="flex-1">
                <h2 className="font-bold text-lg">{shop.shop_name}</h2>
                <p className="text-sm text-slate-400">{shop.description}</p>
              </div>
              <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}