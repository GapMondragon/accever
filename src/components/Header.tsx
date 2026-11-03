import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Activity, LayoutDashboard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface HeaderProps {
  activeTab: 'lounge' | 'recovery';
  setActiveTab: (tab: 'lounge' | 'recovery') => void;
  onPoke: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onPoke,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [pokeCount, setPokeCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('accever_pokes') || '14', 10);
  });

  const handlePokeClick = (e: React.MouseEvent) => {
    sound.playPop(750);
    const newCount = pokeCount + 1;
    setPokeCount(newCount);
    localStorage.setItem('accever_pokes', newCount.toString());

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

  const handleTabChange = (tab: 'lounge' | 'recovery') => {
    sound.playPop(tab === 'recovery' ? 700 : 800);
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-4 z-40 px-4 mb-8">
      <div className="max-w-5xl mx-auto rounded-[28px] bg-white/85 backdrop-blur-md px-4 sm:px-6 py-3 shadow-clay-card flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand Pill */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-200 shadow-clay-lavender flex items-center justify-center text-lg select-none">
              {activeTab === 'recovery' ? '🩺' : '👾'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-clay-indigo-dark">
                  Accever & Gabe
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 text-violet-800 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-clay-pill-lavender">
                  {activeTab === 'recovery' ? 'Care Protocol' : 'Duo HQ'}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Sound + Poke row */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="w-8 h-8 rounded-xl bg-violet-100 text-violet-800 shadow-clay-lavender flex items-center justify-center"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handlePokeClick}
              className="clay-btn bg-emerald-300 text-emerald-950 px-2.5 py-1 text-[11px] shadow-clay-mint"
            >
              👉 {pokeCount}
            </button>
          </div>
        </div>

        {/* Center Tabs: Lounge vs Recovery Protocol */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-violet-100/80 clay-debossed w-full sm:w-auto justify-center">
          <button
            onClick={() => handleTabChange('lounge')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'lounge'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Duo Lounge</span>
          </button>

          <button
            onClick={() => handleTabChange('recovery')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer relative ${
              activeTab === 'recovery'
                ? 'bg-rose-200 text-rose-950 shadow-clay-rose'
                : 'text-rose-700 hover:text-rose-950'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Recovery Protocol</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
          </button>
        </div>

        {/* Desktop Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute cute pop sounds" : "Enable cute pop sounds"}
            className="w-9 h-9 rounded-xl bg-violet-100/90 text-violet-800 shadow-clay-lavender flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-violet-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-violet-400" />
            )}
          </button>

          <button
            onClick={handlePokeClick}
            className="clay-btn bg-emerald-300 text-emerald-950 px-3 py-1.5 text-xs shadow-clay-mint hover:bg-emerald-200 flex items-center gap-1.5"
          >
            <span>Poke Gabe 👉</span>
            <span className="rounded-full bg-emerald-400/40 text-emerald-950 px-1.5 py-0.5 text-[10px] font-black">
              {pokeCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
