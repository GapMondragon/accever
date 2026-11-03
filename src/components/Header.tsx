import React, { useState } from 'react';
import { Volume2, VolumeX, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface HeaderProps {
  onPoke: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onPoke,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [pokeCount, setPokeCount] = useState<number>(14);

  const handlePokeClick = (e: React.MouseEvent) => {
    sound.playPop(750);
    const newCount = pokeCount + 1;
    setPokeCount(newCount);

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
    <header className="sticky top-2 sm:top-4 z-40 px-2 sm:px-4 mb-6 sm:mb-8">
      <div className="max-w-5xl mx-auto rounded-[24px] sm:rounded-[28px] bg-white/90 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 shadow-clay-card flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand Pill */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-rose-200 shadow-clay-rose flex items-center justify-center text-base sm:text-lg select-none shrink-0">
            🩺
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-extrabold text-xs sm:text-base tracking-tight text-clay-indigo-dark truncate">
                Accever & Gabe
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 text-rose-800 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-clay-pill shrink-0">
                <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-600 animate-pulse" />
                <span className="hidden xs:inline">Active Healing Protocol</span>
                <span className="xs:hidden">Healing</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-violet-700/80 hidden sm:block truncate">
              Get well soon Accever • Clinical recovery protocol
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute soothing pop sounds" : "Enable soothing pop sounds"}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-violet-100/90 text-violet-800 shadow-clay-lavender flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer clay-btn"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-700" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
            )}
          </button>

          <button
            onClick={handlePokeClick}
            className="clay-btn bg-emerald-300 text-emerald-950 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs shadow-clay-mint hover:bg-emerald-200 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
          >
            <span className="hidden xs:inline">Poke Gabe 👉</span>
            <span className="xs:hidden">👉</span>
            <span className="rounded-full bg-emerald-400/50 text-emerald-950 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-black">
              {pokeCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
