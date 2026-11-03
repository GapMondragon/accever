import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playPop(700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="max-w-5xl mx-auto px-4 pb-12">
      <div className="rounded-[32px] bg-white/70 backdrop-blur-md p-6 sm:p-8 shadow-clay-card flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-black text-base text-clay-indigo-dark">
              Accever & Gabe
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 text-pink-700 px-2 py-0.5 text-[10px] font-black uppercase shadow-clay-pill">
              Forever & Always
            </span>
          </div>
          <p className="text-xs font-bold text-violet-800/80">
            Crafted with soft inflated 3D claymorphism aesthetics from{' '}
            <a
              href="https://inspo.gapmondragon.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 underline hover:text-pink-700"
            >
              inspo.gapmondragon.dev
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 px-3.5 py-2 text-xs font-bold text-violet-900 shadow-clay-pill-lavender flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Loved beyond measure</span>
          </div>

          <button
            onClick={scrollToTop}
            title="Back to top"
            className="w-10 h-10 rounded-2xl bg-pink-200 text-pink-900 shadow-clay-rose flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
