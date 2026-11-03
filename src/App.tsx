import { useState } from 'react';
import { Header } from './components/Header';
import { RecoveryProtocol } from './components/RecoveryProtocol';
import { Footer } from './components/Footer';

// Note: Duo Lounge components (Hero, OpenWhenLetters, ReasonsBento, DateNightRoulette, ClayRadio)
// are kept in src/components/ ready to be unhidden tomorrow.

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  emoji: string;
}

export function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);

  const handlePoke = () => {
    const emojis = ['👉', '🍵', '🥐', '🧋', '👾', '✨', '⚡', '💊', '🎾'];
    const newItems: FloatingItem[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 70, // %
      size: 22 + Math.random() * 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setFloatingItems((prev) => [...prev, ...newItems]);

    setTimeout(() => {
      setFloatingItems((prev) => prev.filter((item) => !newItems.some((ni) => ni.id === item.id)));
    }, 2400);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-rose-200 selection:text-rose-950 font-bubble">
      {/* Soft Ambient Clay Light Orbs */}
      <div className="fixed top-12 left-10 w-96 h-96 rounded-full bg-violet-200/40 blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-96 h-96 rounded-full bg-emerald-200/35 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/4 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none -z-10" />

      {/* Floating Emojis Layer */}
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className="fixed pointer-events-none z-50 select-none"
          style={{
            left: `${item.x}%`,
            bottom: '25px',
            fontSize: `${item.size}px`,
            animation: 'flyUp 2.4s ease-out forwards',
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Inline styles for custom fly-up animation */}
      <style>{`
        @keyframes flyUp {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 1;
          }
          100% {
            transform: translateY(-80vh) scale(1.2) rotate(${Math.random() > 0.5 ? 25 : -25}deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Header */}
      <Header
        onPoke={handlePoke}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Healing View */}
      <main className="space-y-4">
        <RecoveryProtocol />
      </main>

      <Footer />
    </div>
  );
}

export default App;
