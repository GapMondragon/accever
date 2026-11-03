import React, { useState } from 'react';
import { Activity, Heart, Wind, ShieldAlert, CheckCircle2, ChevronRight, Droplets, Info } from 'lucide-react';
import { PostureVisualizer } from './PostureVisualizer';
import { VagalBreathingCoach } from './VagalBreathingCoach';
import { MicroHydrationAndMobilization } from './MicroHydrationAndMobilization';
import { MermaidDiagram } from './MermaidDiagram';

const RECOVERY_MERMAID = `graph TD
    A[Phase 1: Safe Position & Down-Regulation<br>0–45 Mins] --> B[Phase 2: Osmotic Absorption<br>45–60 Mins]
    B --> C[Phase 3: Staged Mobilization<br>60+ Mins]

    subgraph Phase 1: Anti-Reflux Elevation
        A1[Torso Propped 30°–45°<br>Head & upper back elevated]
        A2[Pillows Under Calves/Knees<br>Legs elevated for venous return]
        A3[Alternative: Left-Side Recline<br>If fullness or nausea occurs]
        A4[Vagal Breathing: 4s In / 6s Out]
    end

    subgraph Phase 2: Micro-Hydration
        B1[Micro-sip Pocari Sweat<br>Small sips every 3–5 min]
        B2[Gut transfers fluid to plasma]
        B3[Log 2nd Garmin snapshot]
    end

    subgraph Phase 3: Orthostatic Mobilization
        C1[15x Ankle pumps while seated]
        C2[60-second edge-of-bed pause]
        C3[Slow rise to stand]
    end`;

export const RecoveryProtocol: React.FC = () => {
  // Current interactive vitals tracker state
  const [currentHR, setCurrentHR] = useState(96);
  const [currentHRV, setCurrentHRV] = useState(13);
  const [currentRR, setCurrentRR] = useState(22);

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8 mb-16 animate-fade-in">
      {/* 1. Header & Clinical Scenario Overview Banner */}
      <div className="rounded-[36px] bg-gradient-to-br from-violet-200/90 via-sky-100/90 to-emerald-100/90 p-6 sm:p-8 shadow-clay-card border-none relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-200 px-4 py-1.5 shadow-clay-pill text-xs font-black uppercase tracking-wider text-rose-950">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            Postprandial Blood Pooling & Hypovolemia (Anti-Reflux Protocol Active)
          </div>
          <span className="text-xs font-bold text-violet-950/70 bg-white/60 px-3 py-1 rounded-full shadow-clay-pill">
            Clinical Recovery Mode
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-clay-indigo-dark tracking-tight">
            Accever's Acute Recovery Protocol 🩺
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-violet-950/85 leading-relaxed max-w-3xl">
            <strong>Subject:</strong> Adult female recreational tennis player recovering from post-match hypovolemia, dehydration, and splanchnic blood pooling (presyncope/dizziness following heavy meal of sinigang, rice, chicken liver).
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-violet-900">
            <span className="rounded-xl bg-white/70 px-3 py-1 shadow-clay-pill flex items-center gap-1.5">
              🎾 Post-Tennis Fluid Loss
            </span>
            <span className="rounded-xl bg-white/70 px-3 py-1 shadow-clay-pill flex items-center gap-1.5">
              🍲 Splanchnic Siphon (Sinigang/Liver)
            </span>
            <span className="rounded-xl bg-rose-100 text-rose-900 px-3 py-1 shadow-clay-pill flex items-center gap-1.5 font-extrabold">
              ⚠️ Strict Anti-Reflux: Never Flat
            </span>
          </div>
        </div>
      </div>

      {/* 2. Real-Time Vitals & Baseline Alert Bar */}
      <div className="rounded-[32px] bg-white/90 p-6 sm:p-7 shadow-clay-card space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-700" />
            <h3 className="text-base sm:text-lg font-black text-clay-indigo-dark">
              Garmin Snapshot Vitals vs Stabilization Targets
            </h3>
          </div>
          <span className="text-xs font-bold text-violet-700 bg-violet-100 px-3 py-1 rounded-full">
            Live Metric Tracking
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Heart Rate Metric */}
          <div className="rounded-2xl bg-rose-50/90 p-4 clay-debossed space-y-2 border border-rose-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-rose-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-500 animate-pulse" />
                Resting Heart Rate
              </span>
              <span className="text-xs font-bold text-rose-700">Initial: 95–98 bpm</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-3xl font-black text-rose-950">{currentHR}</span>
                <span className="text-xs font-bold text-rose-800 ml-1">bpm</span>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Target: &lt; 80 bpm
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="range"
                min="70"
                max="110"
                value={currentHR}
                onChange={(e) => setCurrentHR(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
            </div>
          </div>

          {/* HRV Metric */}
          <div className="rounded-2xl bg-amber-50/90 p-4 clay-debossed space-y-2 border border-amber-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-amber-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-600" />
                HRV (Autonomic Tone)
              </span>
              <span className="text-xs font-bold text-amber-700">Initial: 13 ms</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-3xl font-black text-amber-950">{currentHRV}</span>
                <span className="text-xs font-bold text-amber-800 ml-1">ms</span>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Target: Upward trend
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="range"
                min="10"
                max="60"
                value={currentHRV}
                onChange={(e) => setCurrentHRV(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          {/* Respiration Rate Metric */}
          <div className="rounded-2xl bg-sky-50/90 p-4 clay-debossed space-y-2 border border-sky-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-sky-900 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-sky-600" />
                Respiration Rate
              </span>
              <span className="text-xs font-bold text-sky-700">Initial: 21–23 brpm</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-3xl font-black text-sky-950">{currentRR}</span>
                <span className="text-xs font-bold text-sky-800 ml-1">brpm</span>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Target: 12–16 brpm
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="range"
                min="10"
                max="26"
                value={currentRR}
                onChange={(e) => setCurrentRR(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Anti-Reflux Posture Visualizer & Anatomical Guide */}
      <PostureVisualizer />

      {/* 4. Visual Recovery Workflow Diagram (Mermaid.js) */}
      <div className="rounded-[32px] bg-white/90 p-6 sm:p-8 shadow-clay-card space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-violet-100 pb-3">
          <div>
            <h3 className="text-lg font-black text-clay-indigo-dark">
              Visual Recovery Workflow Diagram
            </h3>
            <p className="text-xs font-bold text-violet-700/80">
              3-Phase clinical recovery path from down-regulation to safe mobilization
            </p>
          </div>
          <span className="text-xs font-black text-violet-800 bg-violet-100 px-3 py-1 rounded-full shadow-clay-pill-lavender">
            Clinical Flowchart
          </span>
        </div>

        <MermaidDiagram chart={RECOVERY_MERMAID} />
      </div>

      {/* 5. Vagal Down-Regulation Breathing Coach (4s In / 6s Out) */}
      <VagalBreathingCoach />

      {/* 6. Phase 2 (Pocari Sweat Micro-Hydration) & Phase 3 (Orthostatic Mobilization) */}
      <MicroHydrationAndMobilization />
    </div>
  );
};
