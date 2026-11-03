import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface Reason {
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

const REASONS: Reason[] = [
  {
    id: 1,
    emoji: '🍜',
    badge: 'Pure Joy',
    title: 'The Food Happy Dance',
    description: 'The little wiggle dance you do whenever your food is brought to the table. It is scientifically proven to be the cutest phenomenon on Earth.',
    colorClass: 'bg-pink-200/95',
    shadowClass: 'shadow-clay-rose',
    tagClass: 'bg-pink-100 text-pink-900',
    colSpan: 'sm:col-span-2 lg:col-span-2',
  },
  {
    id: 2,
    emoji: '✨',
    badge: 'Radiance',
    title: 'Your Gorgeous Smile',
    description: 'The way your eyes crinkle when you laugh so hard your stomach hurts. You light up every room you walk into.',
    colorClass: 'bg-violet-200/95',
    shadowClass: 'shadow-clay-lavender',
    tagClass: 'bg-violet-100 text-violet-900',
    colSpan: 'sm:col-span-1 lg:col-span-1',
  },
  {
    id: 3,
    emoji: '🏡',
    badge: 'Sanctuary',
    title: 'My Safest Place',
    description: 'Whenever life gets noisy or chaotic, being beside you is where everything falls back into place. You are home.',
    colorClass: 'bg-emerald-200/95',
    shadowClass: 'shadow-clay-mint',
    tagClass: 'bg-emerald-100 text-emerald-950',
    colSpan: 'sm:col-span-1 lg:col-span-1',
  },
  {
    id: 4,
    emoji: '🛒',
    badge: 'Everyday Magic',
    title: 'Grocery Store Adventures',
    description: 'You make the most ordinary errands hilarious and memorable. Pushing carts, finding sweet snacks, laughing in the aisles.',
    colorClass: 'bg-amber-200/95',
    shadowClass: 'shadow-clay-peach',
    tagClass: 'bg-amber-100 text-amber-950',
    colSpan: 'sm:col-span-2 lg:col-span-2',
  },
  {
    id: 5,
    emoji: '🤍',
    badge: 'Big Heart',
    title: 'The Sweetest Heart',
    description: 'How deeply thoughtful and empathetic you are with the people you love. You care so genuinely, and it inspires me constantly.',
    colorClass: 'bg-sky-200/95',
    shadowClass: 'shadow-clay-sky',
    tagClass: 'bg-sky-100 text-sky-950',
    colSpan: 'sm:col-span-2 lg:col-span-2',
  },
  {
    id: 6,
    emoji: '🎧',
    badge: 'Soundtrack',
    title: 'Our Silly Inside Jokes',
    description: 'References and nicknames that make zero sense to anyone else, but reduce us to wheezing laughter at 2 AM.',
    colorClass: 'bg-pink-300/90',
    shadowClass: 'shadow-clay-rose',
    tagClass: 'bg-pink-100 text-pink-900',
    colSpan: 'sm:col-span-1 lg:col-span-1',
  },
];

export const ReasonsBento: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: number]: number }>({
    1: 14,
    2: 29,
    3: 31,
    4: 18,
    5: 24,
    6: 22,
  });

  const handleLike = (id: number, e: React.MouseEvent) => {
    sound.playPop(600 + id * 40);
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    // Cute mini burst
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      particleCount: 15,
      spread: 45,
      scalar: 0.9,
      colors: ['#F9A8D4', '#DDD6FE', '#6EE7B7'],
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16">
      {/* Title */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-pink-900 shadow-clay-pill">
          <Star className="w-3.5 h-3.5 text-pink-600 fill-pink-500" />
          The Bento of Affection
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-clay-indigo-dark tracking-tight">
          Reasons You Are My Favorite Human 🌸
        </h2>
        <p className="text-xs sm:text-sm font-bold text-violet-700/80 max-w-md mx-auto">
          Just a few of the million reasons why I fell so completely in love with you.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {REASONS.map((item) => (
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
                Official Evidence #00{item.id}
              </span>

              {/* Heart Tap Button */}
              <button
                onClick={(e) => handleLike(item.id, e)}
                className="clay-btn bg-white/80 hover:bg-white text-pink-700 px-3 py-1.5 text-xs shadow-clay-pill flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                <span className="text-xs font-black">{likes[item.id] || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
