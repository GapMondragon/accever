import React from 'react';
import { Activity, Heart, Wind } from 'lucide-react';
import { PostureVisualizer } from './PostureVisualizer';
import { VagalBreathingCoach } from './VagalBreathingCoach';
import { MicroHydrationAndMobilization } from './MicroHydrationAndMobilization';
import { VisualRecoveryWorkflow } from './VisualRecoveryWorkflow';

export const RecoveryProtocol: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-2.5 sm:px-4 space-y-6 sm:space-y-8 mb-16 animate-fade-in">
      {/* 1. Header & Clinical Scenario Overview Banner */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-violet-200/90 via-sky-100/90 to-emerald-100/90 p-4 sm:p-8 shadow-clay-card border-none relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-rose-200 px-3 sm:px-4 py-1 sm:py-1.5 shadow-clay-pill text-[10px] sm:text-xs font-black uppercase tracking-wider text-rose-950">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-600 animate-ping shrink-0" />
            <span className="truncate">Anti-Reflux Protocol Active</span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-violet-950/70 bg-white/60 px-2.5 sm:px-3 py-1 rounded-full shadow-clay-pill">
            Clinical Recovery Guide
          </span>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <h1 className="text-xl sm:text-4xl font-black text-clay-indigo-dark tracking-tight">
            Accever's Recovery Protocol 🩺
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-violet-950/85 leading-relaxed max-w-3xl">
            <strong>Subject:</strong> Adult female recreational tennis player recovering from post-match hypovolemia, dehydration, and splanchnic blood pooling (presyncope/dizziness following heavy meal of sinigang, rice, chicken liver).
          </p>

          <div className="pt-1 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-violet-900">
            <span className="rounded-xl bg-white/70 px-2.5 sm:px-3 py-1 shadow-clay-pill flex items-center gap-1">
              🎾 Post-Tennis Fluid Loss
            </span>
            <span className="rounded-xl bg-white/70 px-2.5 sm:px-3 py-1 shadow-clay-pill flex items-center gap-1">
              🍲 Splanchnic Siphon (Sinigang)
            </span>
            <span className="rounded-xl bg-rose-100 text-rose-900 px-2.5 sm:px-3 py-1 shadow-clay-pill flex items-center gap-1 font-extrabold">
              ⚠️ Strict Anti-Reflux: Never Flat
            </span>
          </div>
        </div>
      </div>

      {/* 2. Real-Time Vitals & Baseline Alert Bar (Clinical Metrics Display) */}
      <div className="rounded-[28px] sm:rounded-[32px] bg-white/90 p-4 sm:p-7 shadow-clay-card space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-violet-700 shrink-0" />
            <h3 className="text-sm sm:text-lg font-black text-clay-indigo-dark">
              Vitals Baseline vs Targets
            </h3>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-violet-700 bg-violet-100 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
            Clinical Metrics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Heart Rate Metric */}
          <div className="rounded-2xl bg-rose-50/90 p-4 clay-debossed space-y-3 border border-rose-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-rose-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-500 animate-pulse" />
                Resting Heart Rate
              </span>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                Tachycardia
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-rose-950">95–98</span>
                <span className="text-xs font-bold text-rose-800 ml-1">bpm</span>
                <span className="text-[10px] block font-bold text-rose-700">Initial Baseline</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg block">
                  Target: &lt; 80 bpm
                </span>
                <span className="text-[10px] font-bold text-emerald-700 mt-0.5 block">Stabilization</span>
              </div>
            </div>

            <p className="text-[11px] font-semibold text-rose-950/80 pt-1 border-t border-rose-200/60 leading-tight">
              Elevated heart rate compensating for post-match hypovolemia and meal blood pooling.
            </p>
          </div>

          {/* HRV Metric */}
          <div className="rounded-2xl bg-amber-50/90 p-4 clay-debossed space-y-3 border border-amber-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-amber-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-600" />
                Heart Rate Variability (HRV)
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                Suppressed
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-950">13</span>
                <span className="text-xs font-bold text-amber-800 ml-1">ms</span>
                <span className="text-[10px] block font-bold text-amber-700">Initial Baseline</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg block">
                  Target: Upward trend
                </span>
                <span className="text-[10px] font-bold text-emerald-700 mt-0.5 block">&gt; 30 ms</span>
              </div>
            </div>

            <p className="text-[11px] font-semibold text-amber-950/80 pt-1 border-t border-amber-200/60 leading-tight">
              Reflects sympathetic overdrive. Will rise as 4/6 breathing engages the vagus nerve.
            </p>
          </div>

          {/* Respiration Rate Metric */}
          <div className="rounded-2xl bg-sky-50/90 p-4 clay-debossed space-y-3 border border-sky-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-sky-900 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-sky-600" />
                Respiration Rate
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                Mild Tachypnea
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-sky-950">21–23</span>
                <span className="text-xs font-bold text-sky-800 ml-1">brpm</span>
                <span className="text-[10px] block font-bold text-sky-700">Initial Baseline</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg block">
                  Target: 12–16 brpm
                </span>
                <span className="text-[10px] font-bold text-emerald-700 mt-0.5 block">Eupnea</span>
              </div>
            </div>

            <p className="text-[11px] font-semibold text-sky-950/80 pt-1 border-t border-sky-200/60 leading-tight">
              Rapid breathing pattern will normalize during the 4/6 second vagal breathing session.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Anti-Reflux Posture Visualizer & Anatomical Guide */}
      <PostureVisualizer />

      {/* 4. Enhanced Visual Recovery Workflow Diagram (Tactile Clinical Blueprint + Raw Mermaid toggle) */}
      <VisualRecoveryWorkflow />

      {/* 5. Vagal Down-Regulation Breathing App (4s In / 6s Out) */}
      <VagalBreathingCoach />

      {/* 6. Phase 2 (Pocari Sweat Micro-Hydration) & Phase 3 (Orthostatic Mobilization) */}
      <MicroHydrationAndMobilization />
    </div>
  );
};
