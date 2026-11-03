import React, { useState } from 'react';
import { Mail, X, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface Letter {
  id: string;
  tag: string;
  title: string;
  colorClass: string;
  shadowClass: string;
  icon: string;
  greeting: string;
  body: string[];
  psNote: string;
  actionTip: string;
}

const LETTERS: Letter[] = [
  {
    id: 'miss-me',
    tag: 'When Apart',
    title: 'Open when you miss me',
    colorClass: 'bg-pink-200',
    shadowClass: 'shadow-clay-rose',
    icon: '💌',
    greeting: 'My sweet girl,',
    body: [
      "I know distance or busy days can feel tough, but please remember that no matter where I am, my heart is always sitting right next to you.",
      "Close your eyes for three seconds, take a deep breath, and imagine me wrapping both arms around you and resting my chin on your head.",
      "You are the best part of my day, every single day without exception. Text me 'pineapple' right now and I'll drop whatever I'm doing to call or reply."
    ],
    psNote: "P.S. Look at the photo album on your phone. Yes, especially the goofy ones where we're laughing.",
    actionTip: "Instant Remedy: Give your pillow a big squeeze and know that Gabe is thinking of you right now."
  },
  {
    id: 'stressed',
    tag: 'Tough Days',
    title: "Open when you're stressed",
    colorClass: 'bg-violet-200',
    shadowClass: 'shadow-clay-lavender',
    icon: '🧸',
    greeting: 'Take a deep breath with me,',
    body: [
      "Unclench your jaw. Drop your shoulders down from your ears. Take a slow, deep breath in... and let it out.",
      "You are doing so amazingly well, even when it feels like everything is piling up at once. You don't have to solve every single problem today.",
      "You are capable, resilient, and brilliant. The world can wait for a few moments while you take care of yourself."
    ],
    psNote: "P.S. Grab a glass of cool water and put on your comfiest slippers. You deserve a pause.",
    actionTip: "Prescription: 10 minutes of complete rest. No work, no chores, just cozy blankets."
  },
  {
    id: 'food',
    tag: 'The Daily Dilemma',
    title: "Open when you can't decide what to eat",
    colorClass: 'bg-amber-200',
    shadowClass: 'shadow-clay-peach',
    icon: '🍜',
    greeting: 'Hey hungry cutie,',
    body: [
      "I already know this scenario: you're hungry, nothing sounds quite right, and the food delivery apps have 1,000 choices that all feel overwhelming.",
      "Here is my executive decision matrix: 1) Warm savory soup/noodles, 2) Crispy fried chicken / burgers, 3) Cozy pasta, or 4) Tacos/burritos.",
      "Or even better: just text me 'Feed me' and I'll order your favorite comfort meal or cook for you!"
    ],
    psNote: "P.S. Don't forget dessert! Always leave room for boba, matcha, or ice cream.",
    actionTip: "Shortcut Rule: If you crave sweet, eat savory first, then sweet treat guaranteed!"
  },
  {
    id: 'insecure',
    tag: 'Confidence Boost',
    title: "Open when you feel self-conscious",
    colorClass: 'bg-emerald-200',
    shadowClass: 'shadow-clay-mint',
    icon: '✨',
    greeting: 'To my gorgeous girl,',
    body: [
      "If you could see yourself through my eyes for just 10 seconds, you would never doubt yourself again.",
      "You are stunning, both on the outside with your beautiful smile, and on the inside with your sweet and radiant heart.",
      "Never let a bad day or temporary doubt trick you into thinking you are anything less than extraordinary."
    ],
    psNote: "P.S. I fell in love with every detail of you, and I fall in love all over again every day.",
    actionTip: "Mirror task: Look in the mirror, smile once, and say 'I am that girl' because you genuinely are."
  },
  {
    id: 'cant-sleep',
    tag: 'Midnight Thoughts',
    title: "Open when you can't fall asleep",
    colorClass: 'bg-sky-200',
    shadowClass: 'shadow-clay-sky',
    icon: '🌙',
    greeting: 'Late night wanderer,',
    body: [
      "Turn your screen brightness all the way down. The day is officially done, and there is nothing you need to accomplish tonight.",
      "Think about our favorite quiet moments: lying down, listening to the rain, talking about funny things until our voices get quiet.",
      "Rest your mind. Tomorrow is a brand new page, and I will be right here cheering for you."
    ],
    psNote: "P.S. Count all the good memories we've made so far. If you run out, dream up new ones with me.",
    actionTip: "Bedtime ritual: Put your phone on 'Do Not Disturb' and imagine a big warm hug."
  },
  {
    id: 'celebrate',
    tag: 'Victory Lap',
    title: "Open when you have good news!",
    colorClass: 'bg-pink-300',
    shadowClass: 'shadow-clay-rose',
    icon: '🎉',
    greeting: 'YAAAY CHAMPION!!',
    body: [
      "I AM SO INCREDIBLY PROUD OF YOU!! I knew you could do it!",
      "Whatever you just accomplished—big or small—you worked hard for it and you deserve every ounce of celebration.",
      "Get ready, because next time we see each other we are getting high fives, your favorite feast, and celebrating properly!"
    ],
    psNote: "P.S. Take a moment to pat yourself on the back. You are a superstar!",
    actionTip: "Mandatory: Text Gabe the good news immediately so he can brag about his awesome girlfriend!"
  }
];

export const OpenWhenLetters: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);

  const handleOpenLetter = (letter: Letter) => {
    sound.playPop(700);
    setActiveLetter(letter);
  };

  const handleClose = () => {
    sound.playPop(500);
    setActiveLetter(null);
  };

  const handleSendLoveFromLetter = () => {
    sound.playChime();
    confetti({
      particleCount: 40,
      spread: 60,
      colors: ['#F9A8D4', '#DDD6FE', '#6EE7B7'],
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16">
      {/* Section Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-violet-900 shadow-clay-pill-lavender">
          <Mail className="w-3.5 h-3.5 text-violet-700" />
          The Digital Letter Box
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-clay-indigo-dark tracking-tight">
          "Open When..." Love Vault 💌
        </h2>
        <p className="text-xs sm:text-sm font-bold text-violet-700/80 max-w-md mx-auto">
          Tactile clay letters written specially for you. Click any envelope whenever you need it most.
        </p>
      </div>

      {/* Grid of Clay Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LETTERS.map((letter) => (
          <div
            key={letter.id}
            onClick={() => handleOpenLetter(letter)}
            className={`clay-surface clay-surface-hover ${letter.colorClass} ${letter.shadowClass} p-6 cursor-pointer select-none flex flex-col justify-between h-48`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{letter.icon}</span>
                <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-violet-950 shadow-clay-pill">
                  {letter.tag}
                </span>
              </div>
              <h3 className="text-lg font-black text-violet-950 leading-snug">
                {letter.title}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-black/5">
              <span className="text-[11px] font-bold text-violet-800/80">
                Click to break seal ✦
              </span>
              <span className="w-7 h-7 rounded-xl bg-white/60 shadow-clay-pill flex items-center justify-center text-xs">
                💌
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Letter Modal */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-violet-950/30 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-[36px] bg-white p-6 sm:p-8 shadow-clay-card border-none space-y-5 animate-scale-up max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${activeLetter.colorClass} ${activeLetter.shadowClass} flex items-center justify-center text-2xl`}>
                  {activeLetter.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-violet-500">
                    {activeLetter.tag}
                  </span>
                  <h3 className="text-lg font-black text-clay-indigo-dark">
                    {activeLetter.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-800 flex items-center justify-center shadow-clay-pill transition-all active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Letter Paper Body */}
            <div className="rounded-2xl bg-violet-50/80 p-5 clay-debossed space-y-3 text-xs sm:text-sm text-violet-950 leading-relaxed font-semibold">
              <p className="font-extrabold text-pink-700 text-base">
                {activeLetter.greeting}
              </p>
              {activeLetter.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p className="italic text-violet-800/90 pt-1 border-t border-violet-200">
                {activeLetter.psNote}
              </p>
            </div>

            {/* Action Tip Box */}
            <div className="rounded-2xl bg-amber-100/90 p-3.5 shadow-clay-peach flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <p className="text-xs font-extrabold text-amber-950">
                {activeLetter.actionTip}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleSendLoveFromLetter}
                className="clay-btn bg-pink-300 text-pink-950 px-4 py-2.5 text-xs shadow-clay-rose-btn flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-pink-700 fill-pink-600 animate-pulse-subtle" />
                <span>Receive Warm Hug 🫂</span>
              </button>

              <button
                onClick={handleClose}
                className="clay-btn bg-violet-200 text-violet-900 px-4 py-2.5 text-xs shadow-clay-lavender"
              >
                Seal Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
