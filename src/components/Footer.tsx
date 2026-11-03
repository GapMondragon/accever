import React from 'react';
import { ArrowUp, Sparkles, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playPop(700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="max-w-5xl mx-auto px-4 pb-12">
      <div className="rounded-[32px] bg-white/75 backdrop-blur-md p-6 sm:p-8 shadow-clay-card flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-black text-base text-clay-indigo-dark">
              Accever & Gabe
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 text-violet-800 px-2 py-0.5 text-[10px] font-black uppercase shadow-clay-pill-lavender">
              Co-Op Team Since Day One
            </span>
          </div>
          <p className="text-xs font-bold text-violet-800/80">
            Engineered with inflated 3D claymorphism aesthetics from{' '}
            <a
              href="https://inspo.gapmondragon.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-900 underline hover:text-violet-950 font-extrabold"
            >
              inspo.gapmondragon.dev
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-100 px-3.5 py-2 text-xs font-bold text-emerald-950 shadow-clay-pill-mint flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mutual respect & shared snacks</span>
          </div>

          <button
            onClick={scrollToTop}
            title="Back to top"
            className="w-10 h-10 rounded-2xl bg-violet-200 text-violet-900 shadow-clay-lavender flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
