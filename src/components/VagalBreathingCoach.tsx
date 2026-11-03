import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Wind } from 'lucide-react';
import { sound } from '../utils/audio';

export const VagalBreathingCoach: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let timer: number | null = null;
    if (isActive) {
      timer = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (phase === 'inhale') {
              setPhase('exhale');
              sound.playPop(500);
              return 6;
            } else {
              setPhase('inhale');
              sound.playPop(750);
              setCyclesCompleted((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, phase]);

  const toggleBreathing = () => {
    sound.playPop(650);
    if (!isActive) {
      setPhase('inhale');
      setSecondsLeft(4);
    }
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    sound.playSquish();
    setIsActive(false);
    setPhase('inhale');
    setSecondsLeft(4);
    setCyclesCompleted(0);
  };

  return (
    <div className="rounded-[32px] bg-white/90 p-6 sm:p-8 shadow-clay-card border-none space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-200 shadow-clay-sky flex items-center justify-center text-sky-900">
            <Wind className="w-5 h-5 text-sky-800" />
          </div>
          <div>
            <h3 className="text-lg font-black text-clay-indigo-dark">
              Vagal Down-Regulation Breathing
            </h3>
            <p className="text-xs font-bold text-violet-700/80">
              4s Inhale ➔ 6s Exhale (Activates parasympathetic brake to drop heart rate)
            </p>
          </div>
        </div>

        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-900 shadow-clay-pill-lavender">
          Completed: {cyclesCompleted} cycles
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
        {/* Animated Breathing Circle */}
        <div className="relative flex items-center justify-center">
          <div
            className={`w-44 h-44 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out ${
              isActive
                ? phase === 'inhale'
                  ? 'scale-125 bg-gradient-to-tr from-sky-200 via-emerald-200 to-violet-200 shadow-clay-card'
                  : 'scale-90 bg-gradient-to-tr from-violet-200 to-sky-100 shadow-clay-debossed'
                : 'scale-100 bg-violet-100 clay-debossed'
            }`}
          >
            <div className="text-center space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-violet-800 block">
                {isActive ? (phase === 'inhale' ? 'Breathe In Slowly' : 'Breathe Out Gently') : 'Ready'}
              </span>
              <span className="text-4xl font-black text-violet-950 block">
                {isActive ? `${secondsLeft}s` : '4 / 6'}
              </span>
              <span className="text-[10px] font-bold text-violet-700">
                {isActive ? (phase === 'inhale' ? 'Fill belly (4s)' : 'Long release (6s)') : 'Press Start'}
              </span>
            </div>
          </div>
        </div>

        {/* Breathing Instructions & Controls */}
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2 text-xs font-semibold text-violet-950/85">
            <p>
              <strong>Why 4s In / 6s Out works:</strong> The extended exhalation stimulates the vagus nerve, immediately sending acetylcholine to the sinoatrial node to drop your tachycardia from 98 bpm down toward baseline.
            </p>
            <p className="text-violet-700">
              Keep tongue resting on the roof of your mouth. Inhale quietly through the nose, exhale softly through relaxed lips.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={toggleBreathing}
              className="clay-btn bg-emerald-300 hover:bg-emerald-200 text-emerald-950 px-6 py-3 text-xs sm:text-sm shadow-clay-mint flex items-center gap-2"
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 fill-emerald-950" />
                  <span>Pause Coach</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-emerald-950" />
                  <span>Start 4/6 Breathing</span>
                </>
              )}
            </button>

            <button
              onClick={resetBreathing}
              className="clay-btn bg-white/80 hover:bg-white text-violet-950 px-4 py-3 text-xs shadow-clay-pill flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-violet-700" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
