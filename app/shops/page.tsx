'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Shop = {
  id: number;
  name: string;
  description: string;
  icon: string;
  is_open: boolean;
};

export default function ShopList() {
  const router = useRouter();
  const [goMessage, setGoMessage] = useState<string>("Loading from Go...");
  const [neighborShops, setNeighborShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('/api/shops');
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        const data = await response.json();
        setNeighborShops(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    // Vercel routes /api/hello.go to /api/hello automatically
    fetch('/api/hello')
      .then((res) => res.text())
      .then((data) => setGoMessage(data))
      .catch((err) => setGoMessage("Go API Error ❌"));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <header className="mb-8">
          <button onClick={() => router.back()} className="text-yellow-400 mb-4"><E2><86><90> Back</button>
          <h1 className="text-2xl font-bold">Open Shops Today <F0><9F><8F><AA></h1>
          <p className="text-slate-400">Support your neighbors, buy local!</p>
        </header>
        <div className="flex justify-center items-center h-64">
          <p>Loading shops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <header className="mb-8">
          <button onClick={() => router.back()} className="text-yellow-400 mb-4"><E2><86><90> Back</button>
          <h1 className="text-2xl font-bold">Open Shops Today <F0><9F><8F><AA></h1>
          <p className="text-slate-400">Support your neighbors, buy local!</p>
        </header>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="mb-8">
        <button onClick={() => router.back()} className="text-yellow-400 mb-4">← Back</button>
        <h1 className="text-2xl font-bold">Open Shops Today 🏪</h1>
        <p className="text-slate-400">Support your neighbors, buy local!</p>
        {/* Display the Go API Message here */}
        <p className="mt-2 text-xs text-yellow-500 font-mono italic">Backend Status: {goMessage}</p>
      </header>

      <div className="grid gap-4">
        {neighborShops.map((shop) => (
          <div 
            key={shop.id}
            onClick={() => alert(`Message from Go: ${goMessage}`)}
            className="bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-yellow-400 transition-all active:scale-95 cursor-pointer flex items-center gap-4"
          >
            <div className="text-4xl">{shop.icon}</div>
            <div>
              <h2 className="font-bold text-lg">{shop.name}</h2>
              <p className="text-sm text-slate-400">{shop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
