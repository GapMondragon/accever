import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { ReasonsBento } from './components/ReasonsBento';
import { DateNightRoulette } from './components/DateNightRoulette';
import { ClayRadio } from './components/ClayRadio';
import { SecretWishJar } from './components/SecretWishJar';
import { Footer } from './components/Footer';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  color: string;
}

export function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleSendKiss = () => {
    const colors = ['#F9A8D4', '#DDD6FE', '#6EE7B7', '#FED7AA', '#F472B6'];
    const newHearts: FloatingHeart[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80, // %
      size: 20 + Math.random() * 24,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 2500);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-pink-300 selection:text-pink-950 font-bubble">
      {/* Soft Ambient Clay Light Orbs */}
      <div className="fixed top-12 left-10 w-96 h-96 rounded-full bg-violet-200/40 blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/4 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none -z-10" />

      {/* Floating Kisses & Hearts Layer */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 animate-float-slow transition-opacity duration-1000"
          style={{
            left: `${heart.x}%`,
            bottom: '20px',
            fontSize: `${heart.size}px`,
            animation: 'flyUp 2.4s ease-out forwards',
          }}
        >
          💖
        </div>
      ))}

      {/* Inline styles for custom fly-up animation */}
      <style>{`
        @keyframes flyUp {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translateY(-80vh) scale(1.3) rotate(${Math.random() > 0.5 ? 20 : -20}deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Main Content Sections */}
      <Header
        onSendKiss={handleSendKiss}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <main className="space-y-4">
        <Hero />
        <OpenWhenLetters />
        <ReasonsBento />
        <DateNightRoulette />
        <ClayRadio />
        <SecretWishJar />
      </main>

      <Footer />
    </div>
  );
}

export default App;
