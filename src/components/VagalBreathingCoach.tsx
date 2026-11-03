import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RefreshCw,
  Wind,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Heart,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

const DURATION_PRESETS = [
  { label: '2 Mins', seconds: 120, cycles: 12, purpose: 'Quick Reset' },
  { label: '5 Mins', seconds: 300, cycles: 30, purpose: 'Clinical Stabilization' },
  { label: '10 Mins', seconds: 600, cycles: 60, purpose: 'Deep Sleep / Recovery' },
];

export const VagalBreathingCoach: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [phaseSeconds, setPhaseSeconds] = useState(4); // 4s inhale, 6s exhale
  const [sessionDuration, setSessionDuration] = useState(300); // 5 mins default
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(300);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  // High precision sub-second timer for super smooth circular progress animation
  const [phaseProgress, setPhaseProgress] = useState(0); // 0 to 1

  const phaseRef = useRef<'inhale' | 'exhale'>('inhale');
  const phaseSecondsRef = useRef(4);
  const phaseTotalRef = useRef(4);
  const phaseStartTimeRef = useRef<number>(0);

  // Sync ref
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Handle Breaths
  useEffect(() => {
    let animId: number;
    let tickInterval: number;

    if (isActive) {
      phaseStartTimeRef.current = performance.now();

      // Sound on start
      if (chimeEnabled) {
        if (phaseRef.current === 'inhale') {
          sound.playInhaleSound();
        } else {
          sound.playExhaleSound();
        }
      }

      // Smooth progress animation loop
      const updateProgress = () => {
        const elapsed = (performance.now() - phaseStartTimeRef.current) / 1000;
        const total = phaseTotalRef.current;
        const progress = Math.min(elapsed / total, 1);
        setPhaseProgress(progress);

        if (isActive) {
          animId = requestAnimationFrame(updateProgress);
        }
      };
      animId = requestAnimationFrame(updateProgress);

      // 1-second countdown clock
      tickInterval = window.setInterval(() => {
        setPhaseSeconds((prev) => {
          if (prev <= 1) {
            // Flip Phase
            if (phaseRef.current === 'inhale') {
              phaseRef.current = 'exhale';
              phaseTotalRef.current = 6;
              setPhase('exhale');
              phaseStartTimeRef.current = performance.now();
              if (chimeEnabled) sound.playExhaleSound();
              return 6;
            } else {
              phaseRef.current = 'inhale';
              phaseTotalRef.current = 4;
              setPhase('inhale');
              phaseStartTimeRef.current = performance.now();
              setCyclesCompleted((c) => c + 1);
              if (chimeEnabled) sound.playInhaleSound();
              return 4;
            }
          }
          return prev - 1;
        });

        // Overall session timer
        setSessionSecondsLeft((prev) => {
          if (prev <= 1) {
            // Finish session!
            setIsActive(false);
            setSessionFinished(true);
            sound.playSessionComplete();
            confetti({
              particleCount: 40,
              spread: 70,
              colors: ['#6EE7B7', '#BAE6FD', '#DDD6FE'],
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(tickInterval);
    };
  }, [isActive, chimeEnabled]);

  const toggleBreathing = () => {
    sound.playPop(650);
    if (!isActive) {
      if (sessionFinished || sessionSecondsLeft <= 0) {
        setSessionSecondsLeft(sessionDuration);
        setSessionFinished(false);
        setCyclesCompleted(0);
      }
      setPhase('inhale');
      phaseRef.current = 'inhale';
      phaseTotalRef.current = 4;
      setPhaseSeconds(4);
    }
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    sound.playSquish();
    setIsActive(false);
    setPhase('inhale');
    phaseRef.current = 'inhale';
    phaseTotalRef.current = 4;
    setPhaseSeconds(4);
    setPhaseProgress(0);
    setSessionSecondsLeft(sessionDuration);
    setCyclesCompleted(0);
    setSessionFinished(false);
  };

  const handleSelectPreset = (seconds: number) => {
    sound.playPop(700);
    setSessionDuration(seconds);
    setSessionSecondsLeft(seconds);
    setIsActive(false);
    setPhase('inhale');
    setPhaseProgress(0);
    setCyclesCompleted(0);
    setSessionFinished(false);
  };

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // SVG Circular Ring calculation
  const circleRadius = 90;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - phaseProgress * circumference;

  const content = (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-sky-200 shadow-clay-sky flex items-center justify-center text-sky-900">
            <Wind className="w-5 h-5 text-sky-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-clay-indigo-dark">
                Vagal Down-Regulation Breathing App
              </h3>
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-black uppercase shadow-clay-pill-mint">
                4s Inhale • 6s Exhale
              </span>
            </div>
            <p className="text-xs font-bold text-violet-700/80">
              Synchronize your breath with the visual orb to down-regulate sympathetic overdrive
            </p>
          </div>
        </div>

        {/* Top Control Pills */}
        <div className="flex items-center gap-2">
          {/* Audio Chime Toggle */}
          <button
            onClick={() => {
              const next = !chimeEnabled;
              setChimeEnabled(next);
              sound.playPop(next ? 800 : 500);
            }}
            title={chimeEnabled ? "Chime enabled (432Hz/396Hz tones)" : "Chimes muted"}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              chimeEnabled
                ? 'bg-sky-200 text-sky-950 shadow-clay-pill'
                : 'bg-violet-100 text-violet-600'
            }`}
          >
            {chimeEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Guide ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Muted</span>
              </>
            )}
          </button>

          {/* Zen Fullscreen Modal Toggle */}
          <button
            onClick={() => {
              sound.playPop(750);
              setIsZenMode(!isZenMode);
            }}
            title="Toggle Immersive Zen Mode"
            className="w-9 h-9 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-900 shadow-clay-pill flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            {isZenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preset Duration Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-violet-100">
        <span className="text-xs font-black uppercase tracking-wider text-violet-800">
          Target Session Duration:
        </span>
        <div className="flex items-center gap-2">
          {DURATION_PRESETS.map((preset) => (
            <button
              key={preset.seconds}
              onClick={() => handleSelectPreset(preset.seconds)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                sessionDuration === preset.seconds
                  ? 'bg-violet-300 text-violet-950 shadow-clay-lavender scale-105'
                  : 'bg-white/80 text-violet-800 hover:bg-white shadow-clay-pill'
              }`}
            >
              <span>{preset.label}</span>
              <span className="text-[10px] block opacity-75 font-normal">
                {preset.cycles} cycles
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Breathing Stage */}
      <div className="rounded-3xl bg-gradient-to-b from-sky-50/80 via-emerald-50/50 to-violet-50/80 p-6 sm:p-10 clay-debossed flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle Ambient Aura */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isActive
              ? phase === 'inhale'
                ? 'bg-sky-200/30'
                : 'bg-emerald-200/30'
              : 'opacity-0'
          }`}
        />

        {/* Big Animated Breathing Orb with SVG Circular Timer Ring */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 200 200">
            {/* Background track */}
            <circle
              cx="100"
              cy="100"
              r={circleRadius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="6"
              className="opacity-50"
            />
            {/* Active animated stroke */}
            <circle
              cx="100"
              cy="100"
              r={circleRadius}
              fill="none"
              stroke={phase === 'inhale' ? '#0284C7' : '#059669'}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
          </svg>

          {/* Central Inflated Clay Breathing Dough Ball */}
          <div
            className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ease-in-out select-none cursor-pointer ${
              isActive
                ? phase === 'inhale'
                  ? 'scale-115 bg-gradient-to-tr from-sky-200 via-sky-100 to-emerald-200 shadow-clay-card'
                  : 'scale-85 bg-gradient-to-tr from-violet-200 via-emerald-100 to-sky-100 shadow-clay-debossed'
                : 'scale-100 bg-white shadow-clay-card'
            }`}
            onClick={toggleBreathing}
          >
            {/* Phase Icon & Label */}
            <span className="text-2xl sm:text-3xl mb-1">
              {isActive ? (phase === 'inhale' ? '🌬️' : '💨') : '🧘‍♀️'}
            </span>

            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-clay-indigo-dark block">
              {isActive ? (phase === 'inhale' ? 'Inhale Slowly' : 'Exhale Smoothly') : 'Tap to Start'}
            </span>

            {/* Countdown Seconds */}
            <span className="text-4xl sm:text-5xl font-black text-violet-950 block my-0.5">
              {isActive ? `${phaseSeconds}s` : '4 / 6'}
            </span>

            {/* Instruction Cue */}
            <span className="text-[10px] sm:text-[11px] font-bold text-violet-700 max-w-[140px] leading-tight block">
              {isActive
                ? phase === 'inhale'
                  ? 'Nose • Expand belly'
                  : 'Lips • Drop shoulders'
                : '4s In • 6s Out'}
            </span>
          </div>
        </div>

        {/* Live Status Readout */}
        <div className="w-full max-w-md grid grid-cols-3 gap-3 text-center mt-2">
          <div className="rounded-2xl bg-white/80 p-2.5 shadow-clay-pill">
            <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 block">
              Session Left
            </span>
            <span className="text-base sm:text-lg font-black text-violet-950">
              {formatMinSec(sessionSecondsLeft)}
            </span>
          </div>

          <div className="rounded-2xl bg-white/80 p-2.5 shadow-clay-pill">
            <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 block">
              Completed
            </span>
            <span className="text-base sm:text-lg font-black text-violet-950">
              {cyclesCompleted} breaths
            </span>
          </div>

          <div className="rounded-2xl bg-white/80 p-2.5 shadow-clay-pill">
            <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 block">
              HR Target
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-700">
              &lt; 80 bpm
            </span>
          </div>
        </div>

        {/* Session Finished Notification */}
        {sessionFinished && (
          <div className="mt-5 rounded-2xl bg-emerald-100 border border-emerald-300 p-4 text-center space-y-1.5 animate-bounce-short">
            <div className="flex items-center justify-center gap-2 text-emerald-950 font-black text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Breathing Session Completed! Excellent Job Accever! 🌟</span>
            </div>
            <p className="text-xs font-semibold text-emerald-900">
              Vagus nerve stimulated. Check your Garmin watch snapshot to see your heart rate decreasing toward target.
            </p>
          </div>
        )}

        {/* Bottom Play/Pause & Reset Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={toggleBreathing}
            className="clay-btn bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-8 py-3.5 text-sm sm:text-base shadow-clay-mint flex items-center gap-2"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 fill-emerald-950" />
                <span>Pause Breathing</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-emerald-950" />
                <span>{sessionSecondsLeft < sessionDuration ? 'Resume Breathing' : 'Start 4/6 Breathing'}</span>
              </>
            )}
          </button>

          <button
            onClick={resetBreathing}
            title="Reset Breathing Session"
            className="clay-btn bg-white text-violet-950 px-4 py-3.5 text-sm shadow-clay-pill flex items-center gap-2 hover:bg-violet-50"
          >
            <RefreshCw className="w-4 h-4 text-violet-700" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Clinical Rationale Box */}
      <div className="rounded-2xl bg-violet-50/90 p-4 border border-violet-200/80 space-y-2 text-xs font-semibold text-violet-950">
        <div className="flex items-center gap-2 font-black text-violet-900">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span>How this relieves post-tennis dizziness & blood pooling:</span>
        </div>
        <p className="leading-relaxed">
          Prolonged exhalation (6 seconds) activates the pulmonary stretch receptors and cardiac vagal afferents. This triggers the parasympathetic response, reducing cardiac sympathetic nerve activity to drop your elevated heart rate from 98 bpm down toward baseline while stabilizing systemic vascular resistance.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Standard In-Dashboard Card */}
      <div className="rounded-[32px] bg-white/90 p-6 sm:p-8 shadow-clay-card border-none">
        {content}
      </div>

      {/* Fullscreen Zen Mode Overlay */}
      {isZenMode && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-violet-100 via-sky-100 to-emerald-100 flex items-center justify-center p-4 sm:p-8 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white/95 rounded-[40px] p-6 sm:p-10 shadow-2xl border-none">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
