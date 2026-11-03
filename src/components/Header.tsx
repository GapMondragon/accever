import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface HeaderProps {
  onPoke: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onPoke, soundEnabled, setSoundEnabled }) => {
  const [pokeCount, setPokeCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('accever_pokes') || '14', 10);
  });

  const handlePokeClick = (e: React.MouseEvent) => {
    sound.playPop(750);
    const newCount = pokeCount + 1;
    setPokeCount(newCount);
    localStorage.setItem('accever_pokes', newCount.toString());

    // Fun confetti burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 22,
      spread: 50,
      startVelocity: 22,
      colors: ['#DDD6FE', '#6EE7B7', '#FED7AA', '#BAE6FD', '#F9A8D4'],
      shapes: ['circle'],
      scalar: 1.1,
    });

    onPoke();
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playPop(800);
  };

  return (
    <header className="sticky top-4 z-40 px-4 mb-8">
      <div className="max-w-5xl mx-auto rounded-[28px] bg-white/85 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-clay-card flex items-center justify-between gap-3">
        {/* Brand / Title Pill */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-200 shadow-clay-lavender flex items-center justify-center text-xl select-none transition-transform hover:scale-110 active:scale-95 cursor-pointer">
            👾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-clay-indigo-dark">
                Accever & Gabe
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 text-violet-800 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-clay-pill-lavender">
                <Sparkles className="w-2.5 h-2.5 text-violet-600 animate-wiggle" />
                Partner in Crime HQ
              </span>
            </div>
            <p className="text-[11px] font-semibold text-violet-700/80 hidden sm:block">
              Tactile lounge & emergency decision center
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute cute pop sounds" : "Enable cute pop sounds"}
            className="w-10 h-10 rounded-2xl bg-violet-100/90 text-violet-800 shadow-clay-lavender flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-violet-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-violet-400" />
            )}
          </button>

          {/* Poke Gabe Button */}
          <button
            onClick={handlePokeClick}
            className="clay-btn bg-emerald-300 text-emerald-950 px-3.5 sm:px-4 py-2 text-xs shadow-clay-mint hover:bg-emerald-200 flex items-center gap-2"
          >
            <span>Poke Gabe 👉</span>
            <span className="rounded-full bg-emerald-400/40 text-emerald-950 px-2 py-0.5 text-[10px] font-black">
              {pokeCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
