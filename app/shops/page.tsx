'use client';

import { useRouter } from 'next/navigation';

// Mock data for your Alpha Testers
const neighborShops = [
  { id: 1, name: "Wife's Dadih A-10", description: "Fresh chilled dadih. Multiple flavors!", icon: "🍮" },
  { id: 2, name: "Ice Cream Corner B-05", description: "Homemade vanilla and chocolate scoops.", icon: "🍦" },
];

export default function ShopList() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="mb-8">
        <button onClick={() => router.back()} className="text-yellow-400 mb-4">← Back</button>
        <h1 className="text-2xl font-bold">Open Shops Today 🏪</h1>
        <p className="text-slate-400">Support your neighbors, buy local!</p>
      </header>

      <div className="grid gap-4">
        {neighborShops.map((shop) => (
          <div 
            key={shop.id}
            onClick={() => alert(`Opening ${shop.name}...`)} // We will link this to the Go API soon
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