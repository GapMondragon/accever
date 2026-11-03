import React, { useState } from 'react';
import { ThumbsUp, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface StatItem {
  id: number;
  emoji: string;
  badge: string;
  title: string;
  description: string;
  colorClass: string;
  shadowClass: string;
  tagClass: string;
  colSpan?: string;
}

const STATS: StatItem[] = [
  {
    id: 1,
    emoji: '🍟',
    badge: 'Master Tier',
    title: 'The French Fry Tax',
    description: 'Always insists she is "not really hungry, just want a drink," then proceeds to confiscate 40% of my fries with complete tactical precision.',
    colorClass: 'bg-amber-200/95',
    shadowClass: 'shadow-clay-peach',
    tagClass: 'bg-amber-100 text-amber-950',
    colSpan: 'sm:col-span-2 lg:col-span-2',
  },
  {
    id: 2,
    emoji: '🚗',
    badge: 'DJ Monopoly',
    title: 'Aux Cord Autocracy',
    description: 'The skip button has never witnessed more rapid usage. Switches seamlessly between 2000s R&B, indie pop, and anime openings in 3 minutes.',
    colorClass: 'bg-violet-200/95',
    shadowClass: 'shadow-clay-lavender',
    tagClass: 'bg-violet-100 text-violet-900',
    colSpan: 'sm:col-span-1 lg:col-span-1',
  },
  {
    id: 3,
    emoji: '😴',
    badge: 'Superpower',
    title: 'Vehicle Sleep Speedrun',
    description: 'Can fall completely unconscious in the passenger seat within 45 seconds of getting on the highway. Truly admirable physiological efficiency.',
    colorClass: 'bg-sky-200/95',
    shadowClass: 'shadow-clay-sky',
    tagClass: 'bg-sky-100 text-sky-950',
    colSpan: 'sm:col-span-1 lg:col-span-1',
  },
  {
    id: 4,
    emoji: '🛍️',
    badge: 'Retail Hazard',
    title: 'The "Quick" Convenience Run',
    description: 'Went inside for exactly one bottle of iced green tea; emerged 25 minutes later with three varieties of chips, bakery treats, and gum.',
    colorClass: 'bg-pink-200/95',
    shadowClass: 'shadow-clay-rose',
    tagClass: 'bg-pink-100 text-pink-900',
    colSpan: 'sm:col-span-2 lg:col-span-2',
  },
  {
    id: 5,
    emoji: '🤝',
    badge: 'Elite Duo',
    title: 'Undefeated Co-Op Partner',
    description: 'The only person on Earth I can spend 72 hours straight in a single room with without either of us getting sick of each other.',
    colorClass: 'bg-emerald-200/95',
    shadowClass: 'shadow-clay-mint',
    tagClass: 'bg-emerald-100 text-emerald-950',
    colSpan: 'sm:col-span-2 lg:col-span-2',
  },
  {
    id: 6,
    emoji: '🤭',
    badge: 'Certified',
    title: 'The Silent Wheeze Laugh',
    description: 'When something is so unexpectedly funny that you start clapping and laughing without any sound coming out. 10/10 comedic timing.',
    colorClass: 'bg-violet-300/90',
    shadowClass: 'shadow-clay-lavender',
    tagClass: 'bg-violet-100 text-violet-900',
    colSpan: 'sm:col-span-1 lg:col-span-1',
  },
];

export const ReasonsBento: React.FC = () => {
  const [agrees, setAgrees] = useState<{ [key: number]: number }>({
    1: 42,
    2: 38,
    3: 27,
    4: 31,
    5: 55,
    6: 34,
  });

  const handleAgree = (id: number, e: React.MouseEvent) => {
    sound.playPop(600 + id * 40);
    setAgrees((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      particleCount: 16,
      spread: 45,
      scalar: 0.9,
      colors: ['#6EE7B7', '#DDD6FE', '#FED7AA', '#BAE6FD'],
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16">
      {/* Title */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-950 shadow-clay-pill-mint">
          <Star className="w-3.5 h-3.5 text-emerald-700" />
          Player Stats & Verified Lore
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-clay-indigo-dark tracking-tight">
          Accever's Official Character Attributes 🎮
        </h2>
        <p className="text-xs sm:text-sm font-bold text-violet-700/80 max-w-md mx-auto">
          Documented evidence of our dynamic, certified by independent observers.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STATS.map((item) => (
          <div
            key={item.id}
            className={`clay-surface clay-surface-hover ${item.colorClass} ${item.shadowClass} p-6 sm:p-7 flex flex-col justify-between ${item.colSpan || ''}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-2 rounded-2xl bg-white/60 shadow-clay-pill">
                  {item.emoji}
                </span>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-clay-pill ${item.tagClass}`}>
                  {item.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-violet-950 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-violet-900/80 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 mt-4 border-t border-black/5">
              <span className="text-[11px] font-bold text-violet-900/60">
                Trait #{item.id}
              </span>

              {/* Confirm / Relatable Button */}
              <button
                onClick={(e) => handleAgree(item.id, e)}
                className="clay-btn bg-white/80 hover:bg-white text-violet-950 px-3 py-1.5 text-xs shadow-clay-pill flex items-center gap-1.5"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-xs font-black">{agrees[item.id] || 0} Accurate</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
