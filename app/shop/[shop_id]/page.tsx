'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/lib/UserContext';

export default function ShopDetails() {
  const { shop_id } = useParams<{ shop_id: string }>();
  const { access } = useUser();
  const router = useRouter();

  const goBack = () => {
    const tg = (window as any).Telegram?.WebApp;
    tg?.HapticFeedback?.impactOccurred('light');
    router.back();
  };

  if (access === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-yellow-400 font-mono">
        Loading...
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

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="mb-8">
        <button onClick={goBack} className="text-yellow-400 mb-4">&larr; Back</button>
        <h1 className="text-2xl font-bold">Shop Details</h1>
        <p className="text-slate-500 text-sm mt-1">ID: {shop_id}</p>
      </header>

      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <p className="text-5xl mb-4">🚧</p>
        <p className="text-lg font-semibold">Coming Soon</p>
        <p className="text-sm mt-1">Shop listings will appear here in the next update.</p>
      </div>
    </div>
  );
}
