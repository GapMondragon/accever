import React, { useState } from 'react';
import { Heart, Sparkles, Smile, Flame, Award, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

const COMPLIMENTS = [
  "Your smile is literally my favorite notification in the entire world ☀️",
  "You make the most ordinary days feel like a cute studio ghibli movie 🎬🌸",
  "Even when you're sleepy and grumpy, you are impossibly adorable 🥺",
  "I love the way your eyes sparkle whenever you get excited about food 🍜",
  "You're not just my girlfriend, you are my safest place and home 🏡💕",
  "Thank you for being the sweetest, funniest, most loving person ever ✨",
  "Every song about love suddenly makes 100% sense because of you 🎵",
  "Your laugh is my absolute favorite sound in the universe 🪐",
  "You're insanely pretty, smart, hardworking, and I'm the luckiest guy alive 🍀",
  "One hug from you fixes literally any bad day instantly 🫂",
  "You look cute in literally anything, even oversized hoodies with messy buns 🧸",
  "I love our silly inside jokes that make zero sense to anyone else 🤭",
];

const LOVE_LEVELS = [
  { threshold: 100, text: "Normal Girlfriend Love: 100% (Head over heels)" },
  { threshold: 250, text: "Elevated: 250% (Constant butterflies & smiles)" },
  { threshold: 500, text: "Excessive: 500% (More than matcha, boba & iced lattes)" },
  { threshold: 1000, text: "Cosmic: 1000% (To the moon, stars and galaxies)" },
  { threshold: 2500, text: "Extreme Obsession: 2500% (Can't stop staring at your photos)" },
  { threshold: 9999, text: "CRITICAL OVERLOAD: 9999%+ (Heart exploded from cuteness! 💖)" },
];

export const Hero: React.FC = () => {
  const [lovePower, setLovePower] = useState(100);
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [isDispensing, setIsDispensing] = useState(false);

  const handlePumpLove = (e: React.MouseEvent) => {
    sound.playPop(550 + Math.min(lovePower / 10, 400));
    const nextPower = lovePower + 50;
    setLovePower(nextPower);

    // Burst confetti when hitting big milestones
    if (nextPower % 200 === 0) {
      sound.playChime();
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        particleCount: 35,
        spread: 70,
        colors: ['#F9A8D4', '#DDD6FE', '#6EE7B7', '#FEF08A'],
      });
    }
  };

  const handleNextCompliment = () => {
    sound.playChime();
    setIsDispensing(true);
    setTimeout(() => {
      setComplimentIndex((prev) => (prev + 1) % COMPLIMENTS.length);
      setIsDispensing(false);
    }, 200);
  };

  const currentMilestone = LOVE_LEVELS.slice().reverse().find(lvl => lovePower >= lvl.threshold) || LOVE_LEVELS[0];
  const progressPercent = Math.min((lovePower / 1000) * 100, 100);

  return (
    <section className="relative px-4 mb-14">
      {/* Background Floating Clay Cloud & Star Accents */}
      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-violet-200/60 shadow-clay-lavender blur-[1px] -z-10 animate-float-slow pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 -right-8 w-28 h-28 rounded-full bg-pink-200/60 shadow-clay-rose blur-[1px] -z-10 animate-float-reverse pointer-events-none hidden md:block" />

      {/* Main Clay Container Chassis */}
      <div className="max-w-5xl mx-auto rounded-[36px] bg-violet-200/90 shadow-clay-card p-6 sm:p-10 border-none relative overflow-hidden">
        {/* Decorative Top Pill Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-200 px-4 py-1.5 shadow-clay-pill text-xs font-black uppercase tracking-wider text-pink-900">
            <Sparkles className="w-3.5 h-3.5 text-pink-600 fill-pink-500 animate-wiggle" />
            Official Girlfriend Appreciation Space
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3.5 py-1 shadow-clay-pill-mint text-[11px] font-bold text-emerald-950">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            100% Organic Love
          </div>
        </div>

        {/* Hero Headline & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-clay-indigo-dark tracking-tight leading-[1.15]">
              Hello my favorite person in the world,{' '}
              <span className="text-pink-600 underline decoration-pink-300 decoration-wavy decoration-2">
                Accever!
              </span>{' '}
              💕
            </h1>
            <p className="text-sm sm:text-base font-semibold text-violet-900/80 leading-relaxed max-w-xl">
              I built you this little 3D squishy corner of the internet so you’d always have a place to visit whenever you need a smile, a warm hug, or a reminder of how deeply you are loved.
            </p>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-100 text-amber-900 px-3 py-1.5 text-xs font-extrabold shadow-clay-peach">
                <Award className="w-3.5 h-3.5 text-amber-600" /> Cutest Girlfriend Award
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-2xl bg-sky-100 text-sky-950 px-3 py-1.5 text-xs font-extrabold shadow-clay-sky">
                🧸 Always Loved
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-100 text-emerald-950 px-3 py-1.5 text-xs font-extrabold shadow-clay-mint">
                ✨ Infinite Hugs
              </span>
            </div>
          </div>

          {/* Interactive Hero Widget: The Tactile Clay Love-O-Meter */}
          <div className="lg:col-span-5">
            <div className="rounded-[28px] bg-white/70 backdrop-blur-sm p-5 sm:p-6 shadow-clay-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-300 shadow-clay-rose flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-700 fill-pink-600 animate-pulse-subtle" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-violet-950">
                    Tactile Love-O-Meter
                  </span>
                </div>
                <span className="text-xs font-black text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full shadow-clay-pill">
                  {lovePower}%
                </span>
              </div>

              {/* Clay Debossed Progress Well */}
              <div className="w-full h-5 rounded-full bg-violet-100/90 clay-debossed p-0.5 relative overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-emerald-400 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.7)] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Milestone status readout */}
              <div className="rounded-2xl bg-violet-100/70 p-3 clay-debossed">
                <div className="flex items-start gap-2">
                  <Smile className="w-4 h-4 text-violet-700 mt-0.5 shrink-0" />
                  <p className="text-xs font-bold text-violet-950">
                    {currentMilestone.text}
                  </p>
                </div>
              </div>

              {/* Interactive Squishy Pump Button */}
              <button
                onClick={handlePumpLove}
                className="w-full clay-btn bg-pink-400 hover:bg-pink-300 text-pink-950 py-3 text-xs sm:text-sm shadow-clay-rose-btn flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-pink-700 fill-pink-600 animate-bounce" />
                <span>Pump Love Meter (+50%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Compliment Capsule Dispenser */}
        <div className="mt-8 pt-6 border-t border-violet-300/60">
          <div className="rounded-[28px] bg-gradient-to-r from-violet-100/90 via-pink-100/90 to-sky-100/90 p-5 shadow-clay-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-pink-200 shadow-clay-rose flex items-center justify-center text-2xl shrink-0">
                💌
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-700 block">
                  Today's Sweet Thought
                </span>
                <p className={`text-sm sm:text-base font-extrabold text-violet-950 transition-opacity duration-200 ${isDispensing ? 'opacity-20 scale-95' : 'opacity-100 scale-100'}`}>
                  "{COMPLIMENTS[complimentIndex]}"
                </p>
              </div>
            </div>

            <button
              onClick={handleNextCompliment}
              className="clay-btn bg-violet-300 text-violet-950 px-4 py-2.5 text-xs shadow-clay-lavender shrink-0 flex items-center gap-2 self-end sm:self-center"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-violet-800 ${isDispensing ? 'animate-spin' : ''}`} />
              <span>Another Sweet Note</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
