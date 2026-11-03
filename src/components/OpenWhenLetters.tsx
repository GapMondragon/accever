import React, { useState } from 'react';
import { FileText, X, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface Guide {
  id: string;
  tag: string;
  title: string;
  colorClass: string;
  shadowClass: string;
  icon: string;
  headline: string;
  body: string[];
  protocol: string;
  actionButton: string;
}

const GUIDES: Guide[] = [
  {
    id: 'hangry',
    tag: 'Red Alert',
    title: "Open when you're hangry (and denying it)",
    colorClass: 'bg-amber-200',
    shadowClass: 'shadow-clay-peach',
    icon: '🍜',
    headline: 'Diagnosis: Low Blood Sugar Rage',
    body: [
      "You claim you're 'totally fine' and 'just tired', but your eyes are burning with the fury of a thousand storms because it's been 4 hours since your last meal.",
      "Step 1: Do not make any major life decisions right now.",
      "Step 2: Tell Gabe what food category you want (or let him surprise you with noodles/burgers). Food is priority zero."
    ],
    protocol: 'Mandatory Action: Consume 300+ calories within 15 minutes to restore peace to the realm.',
    actionButton: 'Order Food Stat 🍕'
  },
  {
    id: 'stressed',
    tag: 'Decompress',
    title: "Open when life is overwhelming you",
    colorClass: 'bg-violet-200',
    shadowClass: 'shadow-clay-lavender',
    icon: '🧘',
    headline: 'Drop your shoulders down from your ears.',
    body: [
      "Unclench your jaw. Take a slow breath. You don't have to carry the entire universe on your shoulders today.",
      "Whatever deadline, chore, or annoying person is stressing you out: pause for 10 minutes. The world can keep spinning without your constant supervision.",
      "You've handled tough weeks before, and you'll clear this one too. I've got your back."
    ],
    protocol: 'Prescription: 10 minutes of quiet, zero screen work, and a hot cup of tea or water.',
    actionButton: 'Take a Breath ☕'
  },
  {
    id: 'bicker',
    tag: 'Truce Protocol',
    title: "Open after a silly petty argument",
    colorClass: 'bg-emerald-200',
    shadowClass: 'shadow-clay-mint',
    icon: '🏳️',
    headline: 'Truce Flag Deployed',
    body: [
      "Whatever dumb thing we just bickered about—navigational directions, who forgot the grocery item, or differing movie opinions—it's not worth being grumpy over.",
      "I value you way more than winning some silly debate. We are on the same co-op team.",
      "Text me a peace sign emoji ✌️ right now and let's go get ice cream or watch something funny."
    ],
    protocol: 'Team Rule: No holding petty grudges. Truces are accompanied by high-fives and snacks.',
    actionButton: 'Declare Truce 🤝'
  },
  {
    id: 'indecisive',
    tag: 'Analysis Paralysis',
    title: "Open when you can't decide what to wear or watch",
    colorClass: 'bg-sky-200',
    shadowClass: 'shadow-clay-sky',
    icon: '🎬',
    headline: 'Executive Decision Protocol',
    body: [
      "You've been staring at Netflix thumbnails or your closet for 25 minutes. It's time to break the loop.",
      "If it's clothes: the first outfit you touched was actually the best one. Wear that one.",
      "If it's a show: pick the 20-minute comedy, not the 3-hour Scandinavian crime thriller."
    ],
    protocol: '60-Second Rule: Pick the first option that didn’t make you frown.',
    actionButton: 'Decision Locked 🎯'
  },
  {
    id: 'embarrassing',
    tag: 'Facepalm',
    title: "Open when you did something embarrassing",
    colorClass: 'bg-pink-200',
    shadowClass: 'shadow-clay-rose',
    icon: '🙈',
    headline: 'Nobody is thinking about it except you.',
    body: [
      "Did you trip in public? Mispronounce a word in a meeting? Send an awkward text?",
      "Here is a statistical fact: everyone else is far too obsessed with their own awkward moments to remember yours.",
      "In 48 hours, this becomes a hilarious story we laugh about over dinner. Shake it off."
    ],
    protocol: 'Fact Check: Everyone does clumsy things daily. You are 100% fine.',
    actionButton: 'Laugh it Off 😂'
  },
  {
    id: 'insomnia',
    tag: 'Late Night',
    title: "Open when you can't sleep at 1 AM",
    colorClass: 'bg-violet-300',
    shadowClass: 'shadow-clay-lavender',
    icon: '🌙',
    headline: 'Shutdown Sequence Initiated',
    body: [
      "Turn your screen brightness all the way down. Stop doomscrolling architectural renovations or TikTok recipes.",
      "The day is officially clocked out. You have zero obligations right now.",
      "Close your eyes, find the cool side of the pillow, and let tomorrow handle tomorrow."
    ],
    protocol: 'Bedtime Directive: Put phone on Do Not Disturb and close eyes.',
    actionButton: 'Power Down 💤'
  }
];

export const OpenWhenLetters: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  const handleOpen = (guide: Guide) => {
    sound.playPop(700);
    setActiveGuide(guide);
  };

  const handleClose = () => {
    sound.playPop(500);
    setActiveGuide(null);
  };

  const handleAction = () => {
    sound.playChime();
    confetti({
      particleCount: 25,
      spread: 50,
      colors: ['#6EE7B7', '#DDD6FE', '#FED7AA'],
    });
    handleClose();
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16">
      {/* Section Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-violet-900 shadow-clay-pill-lavender">
          <FileText className="w-3.5 h-3.5 text-violet-700" />
          Field Notes & Survival Guides
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-clay-indigo-dark tracking-tight">
          Emergency Manual for Common Situations 📋
        </h2>
        <p className="text-xs sm:text-sm font-bold text-violet-700/80 max-w-md mx-auto">
          Tactile guides to consult whenever hunger strikes, debates arise, or decisions feel impossible.
        </p>
      </div>

      {/* Grid of Clay Guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GUIDES.map((guide) => (
          <div
            key={guide.id}
            onClick={() => handleOpen(guide)}
            className={`clay-surface clay-surface-hover ${guide.colorClass} ${guide.shadowClass} p-6 cursor-pointer select-none flex flex-col justify-between h-48`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{guide.icon}</span>
                <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-violet-950 shadow-clay-pill">
                  {guide.tag}
                </span>
              </div>
              <h3 className="text-lg font-black text-violet-950 leading-snug">
                {guide.title}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-black/5">
              <span className="text-[11px] font-bold text-violet-800/80">
                Click to open guide ✦
              </span>
              <span className="w-7 h-7 rounded-xl bg-white/60 shadow-clay-pill flex items-center justify-center text-xs">
                📖
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-violet-950/30 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-[36px] bg-white p-6 sm:p-8 shadow-clay-card border-none space-y-5 animate-scale-up max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${activeGuide.colorClass} ${activeGuide.shadowClass} flex items-center justify-center text-2xl`}>
                  {activeGuide.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-violet-500">
                    {activeGuide.tag}
                  </span>
                  <h3 className="text-lg font-black text-clay-indigo-dark">
                    {activeGuide.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-800 flex items-center justify-center shadow-clay-pill transition-all active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Guide Paper Body */}
            <div className="rounded-2xl bg-violet-50/80 p-5 clay-debossed space-y-3 text-xs sm:text-sm text-violet-950 leading-relaxed font-semibold">
              <p className="font-extrabold text-violet-900 text-base">
                {activeGuide.headline}
              </p>
              {activeGuide.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Protocol Tip Box */}
            <div className="rounded-2xl bg-amber-100/90 p-3.5 shadow-clay-peach flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <p className="text-xs font-extrabold text-amber-950">
                {activeGuide.protocol}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleAction}
                className="clay-btn bg-emerald-300 text-emerald-950 px-4 py-2.5 text-xs shadow-clay-mint flex items-center gap-2"
              >
                <span>{activeGuide.actionButton}</span>
              </button>

              <button
                onClick={handleClose}
                className="clay-btn bg-violet-200 text-violet-900 px-4 py-2.5 text-xs shadow-clay-lavender"
              >
                Close Manual
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
