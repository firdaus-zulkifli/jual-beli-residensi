'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; //

// Mock data for your Alpha Testers
const neighborShops = [
  { id: 1, name: "Wife's Dadih A-10", description: "Fresh chilled dadih. Multiple flavors!", icon: "🍮" },
  { id: 2, name: "Ice Cream Corner B-05", description: "Homemade vanilla and chocolate scoops.", icon: "🍦" },
];

export default function ShopList() {
  const router = useRouter();
  const [goMessage, setGoMessage] = useState<string>("Loading from Go...");

  useEffect(() => {
    // Vercel routes /api/hello.go to /api/hello automatically
    fetch('/api/hello')
      .then((res) => res.text())
      .then((data) => setGoMessage(data))
      .catch((err) => setGoMessage("Go API Error ❌"));
  }, []);

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
