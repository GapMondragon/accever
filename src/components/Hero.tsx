import React, { useState } from 'react';
import { Sparkles, Utensils, RefreshCw, Zap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

const TRUTHS = [
  "92% of your bad moods can be scientifically resolved with a warm meal and a 20-minute lie-down. 🍜😴",
  "I will always pretend to believe you when you say 'I'm not hungry, I'll just have one of your fries'. 🍟",
  "You are undeniably the funnier one in this duo (I just let you believe you came up with the jokes first). 🤭",
  "My favorite hobby is watching you get intensely passionate explaining random celebrity or friend drama. 🎬",
  "You can fall asleep in a moving car within 45 seconds of hitting the road. A remarkable superpower. 🚗💤",
  "We make an undefeated co-op duo—except when following Google Maps instructions under pressure. 🗺️",
  "You're only slightly chaotic about 5% of the time, which is well within acceptable safety tolerances. ⚡",
  "You have impeccable music taste (partially because we share the same Spotify algorithm). 🎧",
  "The little victory face you make when finding a good thrift or clearance item is unbeatable. 🛍️",
  "I am always down to go on a spontaneous 10 PM convenience store run with you. 🏪",
];

const FUEL_LEVELS = [
  { threshold: 25, text: "⚠️ Low Fuel: Approaching mild irritability. Requires iced matcha or fries." },
  { threshold: 50, text: "🟡 Neutral: Calm. Will agree to leave the house if food is guaranteed." },
  { threshold: 75, text: "🟢 Optimal: Great mood. Currently sending 14 memes per hour." },
  { threshold: 100, text: "🔥 Peak Vibe: Singing at the top of your lungs with the car windows down." },
  { threshold: 150, text: "⚡ Overclocked: Dangerously energetic. Threatening to reorganize the whole room." },
];

export const Hero: React.FC = () => {
  const [fuelPower, setFuelPower] = useState(65);
  const [truthIndex, setTruthIndex] = useState(0);
  const [isDispensing, setIsDispensing] = useState(false);

  const handleFeedSnack = (e: React.MouseEvent) => {
    sound.playPop(550 + Math.min(fuelPower * 2, 400));
    const nextPower = fuelPower + 15;
    setFuelPower(nextPower);

    if (nextPower >= 100 && nextPower % 30 === 0) {
      sound.playChime();
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
    }
  };

  const handleNextTruth = () => {
    sound.playChime();
    setIsDispensing(true);
    setTimeout(() => {
      setTruthIndex((prev) => (prev + 1) % TRUTHS.length);
      setIsDispensing(false);
    }, 180);
  };

  const currentStatus = FUEL_LEVELS.slice().reverse().find(lvl => fuelPower >= lvl.threshold) || FUEL_LEVELS[0];
  const progressPercent = Math.min((fuelPower / 150) * 100, 100);

  return (
    <section className="relative px-4 mb-14">
      {/* Background Floating Clay Accents */}
      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-violet-200/50 shadow-clay-lavender blur-[1px] -z-10 animate-float-slow pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 -right-8 w-28 h-28 rounded-full bg-emerald-200/50 shadow-clay-mint blur-[1px] -z-10 animate-float-reverse pointer-events-none hidden md:block" />

      {/* Main Clay Container Chassis */}
      <div className="max-w-5xl mx-auto rounded-[36px] bg-violet-200/90 shadow-clay-card p-6 sm:p-10 border-none relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 shadow-clay-pill-lavender text-xs font-black uppercase tracking-wider text-violet-900">
            <Sparkles className="w-3.5 h-3.5 text-violet-600 animate-wiggle" />
            Accever's Personal Lounge
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3.5 py-1 shadow-clay-pill-mint text-[11px] font-bold text-emerald-950">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Zero Sappy Hallmark Poetry Guaranteed
          </div>
        </div>

        {/* Hero Headline & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-clay-indigo-dark tracking-tight leading-[1.15]">
              Welcome to your personal dashboard,{' '}
              <span className="text-violet-800 underline decoration-violet-400 decoration-wavy decoration-2">
                Accever
              </span>{' '}
              👾
            </h1>
            <p className="text-sm sm:text-base font-semibold text-violet-900/80 leading-relaxed max-w-xl">
              A tactile 3D control center to settle our daily "what are we eating" debate, track snack demands, listen to chill lo-fi, and remind you you're my favorite person to hang out with.
            </p>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-100 text-amber-950 px-3 py-1.5 text-xs font-extrabold shadow-clay-peach">
                <Utensils className="w-3.5 h-3.5 text-amber-700" /> Fry Tax Collector (Lv. 99)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-2xl bg-sky-100 text-sky-950 px-3 py-1.5 text-xs font-extrabold shadow-clay-sky">
                🚗 Aux Cord Dictator
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-100 text-emerald-950 px-3 py-1.5 text-xs font-extrabold shadow-clay-mint">
                😴 45-Sec Car Sleeper
              </span>
            </div>
          </div>

          {/* Interactive Hero Widget: Snack Fuel & Vibe Gauge */}
          <div className="lg:col-span-5">
            <div className="rounded-[28px] bg-white/75 backdrop-blur-sm p-5 sm:p-6 shadow-clay-card space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-200 shadow-clay-peach flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-800" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-violet-950">
                    Snack Fuel Gauge
                  </span>
                </div>
                <span className="text-xs font-black text-violet-950 bg-violet-100 px-2.5 py-0.5 rounded-full shadow-clay-pill-lavender">
                  {fuelPower}%
                </span>
              </div>

              {/* Clay Debossed Progress Well */}
              <div className="w-full h-5 rounded-full bg-violet-100/90 clay-debossed p-0.5 relative overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.7)] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Status Readout */}
              <div className="rounded-2xl bg-violet-100/70 p-3 clay-debossed">
                <p className="text-xs font-bold text-violet-950">
                  {currentStatus.text}
                </p>
              </div>

              {/* Feed Snack Button */}
              <button
                onClick={handleFeedSnack}
                className="w-full clay-btn bg-amber-300 hover:bg-amber-200 text-amber-950 py-3 text-xs sm:text-sm shadow-clay-peach flex items-center justify-center gap-2"
              >
                <span>Feed Snack (+15% Fuel) 🥐</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daily Truths Capsule Dispenser */}
        <div className="mt-8 pt-6 border-t border-violet-300/60">
          <div className="rounded-[28px] bg-gradient-to-r from-violet-100/90 via-emerald-100/90 to-sky-100/90 p-5 shadow-clay-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-violet-200 shadow-clay-lavender flex items-center justify-center text-2xl shrink-0">
                💡
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-700 block">
                  Daily Vibe Check & Unfiltered Truth
                </span>
                <p className={`text-sm sm:text-base font-extrabold text-violet-950 transition-opacity duration-200 ${isDispensing ? 'opacity-20 scale-95' : 'opacity-100 scale-100'}`}>
                  "{TRUTHS[truthIndex]}"
                </p>
              </div>
            </div>

            <button
              onClick={handleNextTruth}
              className="clay-btn bg-violet-300 text-violet-950 px-4 py-2.5 text-xs shadow-clay-lavender shrink-0 flex items-center gap-2 self-end sm:self-center"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-violet-800 ${isDispensing ? 'animate-spin' : ''}`} />
              <span>Next Truth</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
