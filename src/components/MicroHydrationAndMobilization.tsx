import React, { useState, useEffect } from 'react';
import { Droplet, Activity, CheckCircle, Clock } from 'lucide-react';
import { sound } from '../utils/audio';

export const MicroHydrationAndMobilization: React.FC = () => {
  // Phase 2: Micro Hydration Pacer Timer (purely visual guidance countdown)
  const [sipTimer, setSipTimer] = useState(180); // 3 minutes
  const [edgeOfBedSeconds, setEdgeOfBedSeconds] = useState(60);
  const [pauseRunning, setPauseRunning] = useState(false);

  // Sip Countdown interval
  useEffect(() => {
    const interval = window.setInterval(() => {
      setSipTimer((prev) => {
        if (prev <= 1) {
          sound.playChime();
          return 180; // reset to 3 mins
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 60-second edge-of-bed pause timer
  useEffect(() => {
    let interval: number | null = null;
    if (pauseRunning && edgeOfBedSeconds > 0) {
      interval = window.setInterval(() => {
        setEdgeOfBedSeconds((prev) => {
          if (prev <= 1) {
            sound.playChime();
            setPauseRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pauseRunning, edgeOfBedSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      {/* Phase 2: Micro-Hydration Card */}
      <div className="rounded-[28px] sm:rounded-[32px] bg-sky-50/90 p-4 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-4 sm:space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-sky-950 shadow-clay-sky">
              <Droplet className="w-3.5 h-3.5 text-sky-700" />
              Phase 2: Micro-Hydration
            </span>
            <span className="text-xs font-black text-sky-900 bg-sky-200/80 px-2.5 py-0.5 rounded-full">
              Pocari Sweat
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-violet-950 mb-1">
            Osmotic Absorption Protocol 💧
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-violet-900/80 leading-relaxed mb-4">
            <strong>Rule:</strong> Do NOT chug. With a stomach full of sinigang and liver, large volumes will trigger gastric distension and acid reflux. Take <strong>one small micro-sip every 3–5 minutes</strong> so fluid moves continuously into blood plasma.
          </p>

          {/* Sip Countdown Display */}
          <div className="rounded-2xl bg-white/80 p-3.5 sm:p-4 clay-debossed flex flex-col xs:flex-row xs:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">
                Next Micro-Sip Window
              </span>
              <span className="text-2xl font-black text-violet-950">
                {formatTime(sipTimer)}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-sky-100 text-sky-950 px-3 py-2 text-xs font-bold shadow-clay-pill self-start xs:self-auto">
              <Droplet className="w-4 h-4 text-sky-700 shrink-0" />
              <span>1 Micro-Sip (20–30 mL)</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] font-bold text-sky-900/80 bg-sky-100/70 p-3 rounded-xl border border-sky-200/60">
          💡 <em>Pocari Sweat matches physiological body fluid osmolarity (288 mOsm), allowing rapid jejunal fluid absorption without straining your digestive tract.</em>
        </div>
      </div>

      {/* Phase 3: Staged Orthostatic Mobilization */}
      <div className="rounded-[28px] sm:rounded-[32px] bg-emerald-50/90 p-4 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-4 sm:space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-950 shadow-clay-pill-mint">
              <Activity className="w-3.5 h-3.5 text-emerald-700" />
              Phase 3: Staged Mobilization
            </span>
            <span className="text-xs font-black text-emerald-900 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Anti-Syncope Check
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-violet-950 mb-1">
            Safe Orthostatic Transition 🚶‍♀️
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-violet-900/80 leading-relaxed mb-4">
            Do not jump straight out of bed. Splanchnic blood pooling from your meal plus post-tennis dehydration means standing up too fast can cause immediate lightheadedness or presyncope.
          </p>

          <div className="space-y-3">
            {/* Step 1: Ankle pumps - Clear Static Guideline */}
            <div className="rounded-2xl bg-white/80 p-3.5 clay-debossed flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-violet-950 block">
                  1. Ankle Pumps (Calf Muscle Pump)
                </span>
                <span className="text-[11px] font-bold text-violet-700">
                  Perform 15 full flexions to push pooled venous blood upward
                </span>
              </div>
              <span className="rounded-full bg-emerald-100 text-emerald-950 px-3 py-1 text-xs font-black shadow-clay-pill">
                15x Pumps
              </span>
            </div>

            {/* Step 2: 60s Edge of Bed Pause Timer */}
            <div className="rounded-2xl bg-white/80 p-3.5 clay-debossed flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-violet-950 block">
                  2. Edge-of-Bed Seated Pause
                </span>
                <span className="text-[11px] font-bold text-violet-700">
                  {edgeOfBedSeconds === 0 ? '✓ 60s completed — check dizziness' : 'Sit on edge of bed for 60s'}
                </span>
              </div>
              <button
                onClick={() => setPauseRunning(!pauseRunning)}
                className="clay-btn bg-emerald-200 text-emerald-950 px-3 py-1.5 text-xs shadow-clay-pill"
              >
                {edgeOfBedSeconds === 0 ? '✓ Ready' : pauseRunning ? `${edgeOfBedSeconds}s remaining` : 'Start 60s Pause'}
              </button>
            </div>
          </div>
        </div>

        {/* Clear to stand confirmation guideline */}
        <div className="rounded-2xl bg-emerald-100/90 border border-emerald-300 p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="text-xs font-bold text-emerald-950 leading-relaxed">
            <strong>Slow Rise Protocol:</strong> Stand up slowly while holding onto bed or wall. If lightheadedness, tunnel vision, or nausea occurs, sit back down immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
