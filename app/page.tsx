export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Hello World! 🚀</h1>
      <p className="text-xl text-gray-400">
        This is my first Telegram Mini App.
      </p>
      <button className="mt-8 px-6 py-3 bg-blue-500 rounded-full font-bold">
        Click Me (MVP)
      </button>
    </div>
  );
}