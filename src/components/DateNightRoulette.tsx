import React, { useState } from 'react';
import { Compass, Check, RefreshCw, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface DateIdea {
  id: number;
  category: string;
  title: string;
  emoji: string;
  description: string;
  colorClass: string;
  shadowClass: string;
}

const DATE_IDEAS: DateIdea[] = [
  {
    id: 1,
    category: 'The Inevitable',
    title: 'The Usual Ramen Spot',
    emoji: '🍜',
    description: 'Let us stop pretending we are going to try a new place. We both know we want rich piping hot tonkotsu broth and extra chashu.',
    colorClass: 'bg-amber-200',
    shadowClass: 'shadow-clay-peach',
  },
  {
    id: 2,
    category: 'Couch Potato Special',
    title: 'Pizza & Binge-Watching Re-runs',
    emoji: '🍕',
    description: 'Ordering pizza, sweatpants on, re-watching a comedy series we have both seen 3 times already.',
    colorClass: 'bg-pink-200',
    shadowClass: 'shadow-clay-rose',
  },
  {
    id: 3,
    category: 'Aimless Wanderers',
    title: 'Coffee & Window Shopping',
    emoji: '☕',
    description: 'Grabbing iced lattes and strolling around looking at clothes, books, and home goods we have zero intention of purchasing.',
    colorClass: 'bg-violet-200',
    shadowClass: 'shadow-clay-lavender',
  },
  {
    id: 4,
    category: 'Financial Mistake',
    title: 'Claw Machine & Arcade Challenge',
    emoji: '🕹️',
    description: 'Spending $25 on tokens to win a poorly stuffed $2 Pikachu plushie from a rigged claw machine. Worth it every time.',
    colorClass: 'bg-emerald-200',
    shadowClass: 'shadow-clay-mint',
  },
  {
    id: 5,
    category: 'Late Night Run',
    title: '11 PM Convenience Store Feast',
    emoji: '🏪',
    description: 'Walking in pajamas to 7-Eleven or the supermarket at 11 PM to debate which sour candy and chip flavor reigns supreme.',
    colorClass: 'bg-sky-200',
    shadowClass: 'shadow-clay-sky',
  },
  {
    id: 6,
    category: 'Scenic & Chill',
    title: 'Drive with the Aux & No Destination',
    emoji: '🚗',
    description: 'Windows cracked, empty road, taking turns picking songs and judging each other’s musical nostalgia.',
    colorClass: 'bg-violet-300',
    shadowClass: 'shadow-clay-lavender',
  },
];

export const DateNightRoulette: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<DateIdea>(DATE_IDEAS[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lockedIn, setLockedIn] = useState(false);

  const spinRoulette = () => {
    if (isSpinning) return;
    setLockedIn(false);
    setIsSpinning(true);

    let counter = 0;
    const interval = setInterval(() => {
      sound.playPop(500 + (counter % 5) * 80);
      const randomIdx = Math.floor(Math.random() * DATE_IDEAS.length);
      setSelectedIdea(DATE_IDEAS[randomIdx]);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        setIsSpinning(false);
        sound.playChime();
      }
    }, 90);
  };

  const handleLockIn = (e: React.MouseEvent) => {
    sound.playChime();
    setLockedIn(true);
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      particleCount: 25,
      spread: 60,
      colors: ['#6EE7B7', '#DDD6FE', '#FED7AA', '#BAE6FD'],
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16">
      <div className="rounded-[36px] bg-emerald-100/90 shadow-clay-card p-6 sm:p-10 border-none relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-950 shadow-clay-pill-mint">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            Decision Fatigue Eliminator
          </div>
          <span className="text-xs font-bold text-emerald-900/70">
            Terminating the 40-minute "I don't know, what do you want?" cycle 🎯
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Description & Controls */}
          <div className="md:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-clay-indigo-dark tracking-tight leading-tight">
              What Are We Doing? (The Stand-off) 🎲
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-emerald-950/80 leading-relaxed">
              Whenever neither of us wants to make an executive decision, spin the wheel and let mathematical probability decide our fate.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={spinRoulette}
                disabled={isSpinning}
                className="clay-btn bg-emerald-400 text-emerald-950 px-5 py-3 text-xs sm:text-sm shadow-clay-mint flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 text-emerald-800 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'Spinning Randomizer...' : 'Spin the Decider! 🎲'}</span>
              </button>

              <button
                onClick={handleLockIn}
                className={`clay-btn px-4 py-3 text-xs sm:text-sm flex items-center gap-2 ${
                  lockedIn
                    ? 'bg-emerald-300 text-emerald-950 shadow-clay-mint'
                    : 'bg-white/80 text-violet-950 shadow-clay-pill hover:bg-white'
                }`}
              >
                {lockedIn ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>Plan Locked! No Takesies-Backsies 🤝</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-emerald-700" />
                    <span>Lock In This Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Selected Result Card */}
          <div className="md:col-span-6">
            <div
              className={`clay-surface ${selectedIdea.colorClass} ${selectedIdea.shadowClass} p-6 sm:p-8 transition-all duration-300 ${
                isSpinning ? 'scale-95 blur-[1px]' : 'scale-100'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl p-2 rounded-2xl bg-white/70 shadow-clay-pill">
                  {selectedIdea.emoji}
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-violet-950 shadow-clay-pill">
                  {selectedIdea.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-violet-950 mb-2">
                {selectedIdea.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-violet-900/80 leading-relaxed">
                {selectedIdea.description}
              </p>

              <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-violet-800">
                  Certified mutually agreeable outing ✨
                </span>
                <span className="text-xs">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
