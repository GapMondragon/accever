import React, { useState, useEffect } from 'react';
import { Droplet, Activity, CheckCircle, Clock, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const MicroHydrationAndMobilization: React.FC = () => {
  // Phase 2: Micro Hydration Timer
  const [sipTimer, setSipTimer] = useState(180); // 3 minutes
  const [timerRunning, setTimerRunning] = useState(true);
  const [sipsTaken, setSipsTaken] = useState(3);

  // Phase 3: Mobilization checklist
  const [anklePumps, setAnklePumps] = useState(0);
  const [edgeOfBedSeconds, setEdgeOfBedSeconds] = useState(60);
  const [pauseRunning, setPauseRunning] = useState(false);
  const [mobilized, setMobilized] = useState(false);

  // Sip Countdown
  useEffect(() => {
    let interval: number | null = null;
    if (timerRunning) {
      interval = window.setInterval(() => {
        setSipTimer((prev) => {
          if (prev <= 1) {
            sound.playChime();
            return 180; // reset to 3 mins
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

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

  const handleLogSip = () => {
    sound.playPop(750);
    setSipsTaken((s) => s + 1);
    setSipTimer(180); // reset countdown
  };

  const incrementAnklePump = () => {
    sound.playPop(600 + Math.min(anklePumps * 20, 300));
    setAnklePumps((p) => Math.min(p + 1, 15));
  };

  const handleFinishMobilization = () => {
    sound.playChime();
    setMobilized(true);
    confetti({
      particleCount: 30,
      spread: 60,
      colors: ['#6EE7B7', '#BAE6FD', '#DDD6FE'],
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Phase 2: Micro-Hydration Card */}
      <div className="rounded-[32px] bg-sky-50/90 p-6 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-sky-950 shadow-clay-sky">
              <Droplet className="w-3.5 h-3.5 text-sky-700" />
              Phase 2: Micro-Hydration (45–60 Mins)
            </span>
            <span className="text-xs font-black text-sky-900 bg-sky-200/80 px-2.5 py-0.5 rounded-full">
              Pocari Sweat
            </span>
          </div>

          <h3 className="text-lg font-black text-violet-950 mb-1">
            Osmotic Absorption Protocol 💧
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-violet-900/80 leading-relaxed mb-4">
            <strong>Rule:</strong> Do NOT chug. With a stomach full of sinigang and liver, large volumes will trigger gastric distension and acid reflux. Take <strong>one small micro-sip every 3–5 minutes</strong> so fluid moves continuously into blood plasma.
          </p>

          {/* Sip Countdown Well */}
          <div className="rounded-2xl bg-white/80 p-4 clay-debossed flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">
                Next Micro-Sip Window
              </span>
              <span className="text-2xl font-black text-violet-950">
                {formatTime(sipTimer)}
              </span>
            </div>

            <button
              onClick={handleLogSip}
              className="clay-btn bg-sky-300 text-sky-950 px-4 py-2.5 text-xs shadow-clay-sky flex items-center gap-2"
            >
              <Droplet className="w-4 h-4 text-sky-800" />
              <span>Log 1 Sip ({sipsTaken} logged)</span>
            </button>
          </div>
        </div>

        <div className="text-[11px] font-bold text-sky-900/80 bg-sky-100/70 p-3 rounded-xl border border-sky-200/60">
          💡 <em>Pocari Sweat matches physiological body fluid osmolarity (288 mOsm), allowing rapid jejunal fluid absorption without straining your digestive tract.</em>
        </div>
      </div>

      {/* Phase 3: Staged Orthostatic Mobilization */}
      <div className="rounded-[32px] bg-emerald-50/90 p-6 sm:p-7 shadow-clay-card flex flex-col justify-between space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-950 shadow-clay-pill-mint">
              <Activity className="w-3.5 h-3.5 text-emerald-700" />
              Phase 3: Staged Mobilization (60+ Mins)
            </span>
            <span className="text-xs font-black text-emerald-900 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Anti-Syncope Check
            </span>
          </div>

          <h3 className="text-lg font-black text-violet-950 mb-1">
            Safe Orthostatic Transition 🚶‍♀️
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-violet-900/80 leading-relaxed mb-4">
            Do not jump straight out of bed. Splanchnic blood pooling from your meal plus post-tennis dehydration means standing up too fast can cause immediate lightheadedness or presyncope.
          </p>

          <div className="space-y-3">
            {/* Step 1: Ankle pumps */}
            <div className="rounded-2xl bg-white/80 p-3.5 clay-debossed flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-violet-950 block">
                  1. Ankle Pumps (Calf Muscle Pump)
                </span>
                <span className="text-[11px] font-bold text-violet-700">
                  {anklePumps}/15 pumps completed
                </span>
              </div>
              <button
                onClick={incrementAnklePump}
                className={`clay-btn px-3 py-1.5 text-xs shadow-clay-pill ${
                  anklePumps >= 15 ? 'bg-emerald-200 text-emerald-950' : 'bg-emerald-300 text-emerald-950'
                }`}
              >
                {anklePumps >= 15 ? '✓ 15 Done' : '+1 Pump'}
              </button>
            </div>

            {/* Step 2: 60s Edge of Bed Pause */}
            <div className="rounded-2xl bg-white/80 p-3.5 clay-debossed flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-violet-950 block">
                  2. Edge-of-Bed Seated Pause (60s)
                </span>
                <span className="text-[11px] font-bold text-violet-700">
                  {edgeOfBedSeconds === 0 ? '✓ Ready to rise' : `${edgeOfBedSeconds}s remaining`}
                </span>
              </div>
              <button
                onClick={() => setPauseRunning(!pauseRunning)}
                className="clay-btn bg-emerald-200 text-emerald-950 px-3 py-1.5 text-xs shadow-clay-pill"
              >
                {edgeOfBedSeconds === 0 ? '✓ Finished' : pauseRunning ? 'Pause' : 'Start 60s'}
              </button>
            </div>
          </div>
        </div>

        {/* Clear to stand confirmation */}
        <button
          onClick={handleFinishMobilization}
          disabled={anklePumps < 15 || edgeOfBedSeconds > 0 || mobilized}
          className={`w-full clay-btn py-3 text-xs sm:text-sm shadow-clay-mint flex items-center justify-center gap-2 ${
            mobilized
              ? 'bg-emerald-400 text-emerald-950'
              : anklePumps >= 15 && edgeOfBedSeconds === 0
              ? 'bg-emerald-300 text-emerald-950 hover:bg-emerald-200'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
          }`}
        >
          {mobilized ? (
            <>
              <Check className="w-4 h-4 text-emerald-950" />
              <span>Safe Mobilization Completed Successfully! 🌟</span>
            </>
          ) : (
            <>
              <span>Confirm Zero Dizziness & Stand Up Slowly</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
