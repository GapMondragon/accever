import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ShieldAlert,
  Code2,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';
import { MermaidDiagram } from './MermaidDiagram';

const RAW_MERMAID_CHART = `graph TD
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

interface StepItem {
  code: string;
  title: string;
  detail: string;
  icon: string;
  safetyNote?: string;
}

interface WorkflowPhase {
  id: number;
  timeWindow: string;
  name: string;
  tagline: string;
  colorClass: string;
  shadowClass: string;
  badgeClass: string;
  borderAccent: string;
  steps: StepItem[];
  objective: string;
}

const PHASES: WorkflowPhase[] = [
  {
    id: 1,
    timeWindow: '0 – 45 Mins',
    name: 'Phase 1: Safe Position & Down-Regulation',
    tagline: 'Anti-Reflux Elevation & Autonomic Calming',
    colorClass: 'bg-violet-100/90',
    shadowClass: 'shadow-clay-lavender',
    badgeClass: 'bg-violet-200 text-violet-950',
    borderAccent: 'border-violet-300',
    objective: 'Prevent acid reflux from the heavy sinigang meal while restoring venous blood return to relieve dizziness.',
    steps: [
      {
        code: 'A1',
        title: 'Torso Propped 30°–45°',
        detail: 'Stack 2–3 pillows behind thoracic spine and head to keep acid below esophageal sphincter.',
        icon: '🛏️',
        safetyNote: 'Critical: Never lie flat (0° horizontal)',
      },
      {
        code: 'A2',
        title: 'Pillows Under Calves/Knees',
        detail: 'Elevate lower legs on folded cushion to push pooled venous blood back to central circulation.',
        icon: '🦵',
      },
      {
        code: 'A3',
        title: 'Alternative: Left-Side Recline',
        detail: 'If fullness or nausea occurs, recline on left side to trap gastric contents in anatomical stomach basin.',
        icon: '🔄',
      },
      {
        code: 'A4',
        title: 'Vagal Breathing (4s In / 6s Out)',
        detail: 'Slow prolonged exhalations stimulate the vagus nerve to reduce heart rate from 98 bpm toward target.',
        icon: '🌬️',
      },
    ],
  },
  {
    id: 2,
    timeWindow: '45 – 60 Mins',
    name: 'Phase 2: Osmotic Absorption',
    tagline: 'Micro-Hydration Without Gastric Distension',
    colorClass: 'bg-sky-100/90',
    shadowClass: 'shadow-clay-sky',
    badgeClass: 'bg-sky-200 text-sky-950',
    borderAccent: 'border-sky-300',
    objective: 'Rehydrate depleted blood volume using iso-osmolar Pocari Sweat without triggering stomach stretching or acid reflux.',
    steps: [
      {
        code: 'B1',
        title: 'Micro-Sip Pocari Sweat',
        detail: 'Take small 20–30 mL sips every 3–5 minutes. Avoid drinking full glasses at once.',
        icon: '💧',
        safetyNote: 'Do not chug — protects against reflux',
      },
      {
        code: 'B2',
        title: 'Jejunal Osmotic Transfer',
        detail: 'Gut safely absorbs fluid and electrolytes into blood plasma at 288 mOsm without digestive strain.',
        icon: '⚡',
      },
      {
        code: 'B3',
        title: 'Garmin Vitals Check',
        detail: 'Check watch for heart rate settling toward < 80 bpm and HRV upward trend before attempting to sit.',
        icon: '⌚',
      },
    ],
  },
  {
    id: 3,
    timeWindow: '60+ Mins',
    name: 'Phase 3: Staged Mobilization',
    tagline: 'Orthostatic Blood Redistribution',
    colorClass: 'bg-emerald-100/90',
    shadowClass: 'shadow-clay-mint',
    badgeClass: 'bg-emerald-200 text-emerald-950',
    borderAccent: 'border-emerald-300',
    objective: 'Safely transition from reclining to standing without orthostatic hypotension or recurrence of presyncope.',
    steps: [
      {
        code: 'C1',
        title: '15x Seated Ankle Pumps',
        detail: 'Contract calf muscles vigorously 15 times to manually pump pooled blood upward into the IVC.',
        icon: '🦶',
      },
      {
        code: 'C2',
        title: '60s Edge-of-Bed Pause',
        detail: 'Sit with feet dangling for a full 60 seconds. Let the autonomic baroreceptors adjust vascular tone.',
        icon: '⏳',
      },
      {
        code: 'C3',
        title: 'Gradual Rise to Stand',
        detail: 'Rise slowly with hand support on bedframe. If any lightheadedness occurs, immediately re-seat.',
        icon: '🧍',
      },
    ],
  },
];

export const VisualRecoveryWorkflow: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'visual' | 'mermaid'>('visual');

  return (
    <div className="rounded-[28px] sm:rounded-[32px] bg-white/90 p-4 sm:p-8 shadow-clay-card border-none space-y-5 sm:space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-violet-200 text-violet-900 flex items-center justify-center text-sm shadow-clay-pill shrink-0">
              🧭
            </span>
            <h3 className="text-base sm:text-xl font-black text-clay-indigo-dark">
              Visual Clinical Recovery Roadmap
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-violet-700/80">
            Chronological 3-phase clinical protocol with animated progress conduit and sub-step inspection
          </p>
        </div>

        {/* View Mode Toggle: Interactive Visual Stepper vs Technical Mermaid Code */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1 rounded-2xl bg-violet-100/80 clay-debossed w-full sm:w-auto shrink-0">
          <button
            onClick={() => {
              sound.playPop(700);
              setViewMode('visual');
            }}
            className={`py-2 px-3 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer clay-btn text-center ${
              viewMode === 'visual'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            Tactile Flowchart
          </button>
          <button
            onClick={() => {
              sound.playPop(750);
              setViewMode('mermaid');
            }}
            className={`flex items-center justify-center gap-1 py-2 px-3 sm:px-3 sm:py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer clay-btn text-center ${
              viewMode === 'mermaid'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Mermaid Raw</span>
          </button>
        </div>
      </div>

      {viewMode === 'mermaid' ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-violet-50/90 p-4 border border-violet-200 text-xs font-semibold text-violet-900">
            Raw Mermaid.js diagram source as specified in clinical protocol:
          </div>
          <MermaidDiagram chart={RAW_MERMAID_CHART} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Timeline Connector SVG (Animated Conduit from inspo.gapmondragon.dev) */}
          <div className="hidden md:block px-6">
            <svg viewBox="0 0 800 24" className="w-full h-6 select-none overflow-visible">
              <defs>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              {/* Background Conduit Track */}
              <line x1="80" y1="12" x2="720" y2="12" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
              {/* Active Animated Conduit Beam */}
              <line
                x1="80"
                y1="12"
                x2={activePhaseId === 1 ? '380' : activePhaseId === 2 ? '680' : '720'}
                stroke="url(#beamGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className="animate-flow-dash transition-all duration-500"
              />
              {/* Node Indicators */}
              <circle cx="120" cy="12" r="7" fill={activePhaseId >= 1 ? '#8B5CF6' : '#CBD5E1'} stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="400" cy="12" r="7" fill={activePhaseId >= 2 ? '#0EA5E9' : '#CBD5E1'} stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="680" cy="12" r="7" fill={activePhaseId >= 3 ? '#10B981' : '#CBD5E1'} stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>

          {/* Phase Sequence Bar (Overview Stepper) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PHASES.map((phase) => (
              <button
                key={phase.id}
                onClick={() => {
                  sound.playPop(650 + phase.id * 60);
                  setActivePhaseId(phase.id);
                }}
                className={`text-left p-4 rounded-2xl transition-all cursor-pointer select-none flex flex-col justify-between clay-btn ${
                  activePhaseId === phase.id
                    ? `${phase.colorClass} ${phase.shadowClass} scale-102 ring-2 ring-violet-400`
                    : 'bg-white/70 hover:bg-white text-violet-900 shadow-clay-pill opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-violet-950">
                      Phase {phase.id}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-clay-pill ${phase.badgeClass}`}
                    >
                      {phase.timeWindow}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-violet-950 leading-snug">
                    {phase.tagline}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-black/5 text-[11px] font-bold">
                  <span className="text-violet-700">
                    {activePhaseId === phase.id ? '● Active View' : 'Inspect Steps'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-violet-500" />
                </div>
              </button>
            ))}
          </div>

          {/* Active Phase Deep Dive Blueprint */}
          {(() => {
            const current = PHASES.find((p) => p.id === activePhaseId) || PHASES[0];
            return (
              <div
                className={`rounded-3xl ${current.colorClass} ${current.shadowClass} p-6 sm:p-8 space-y-6 animate-scale-up border-none`}
              >
                {/* Active Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase shadow-clay-pill ${current.badgeClass}`}
                      >
                        {current.timeWindow}
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-violet-950">{current.name}</h4>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-violet-900/80 max-w-xl">
                      {current.objective}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-xs font-black text-violet-950 bg-white/70 px-3 py-1 rounded-xl shadow-clay-pill">
                      {current.steps.length} Key Sub-Protocols
                    </span>
                  </div>
                </div>

                {/* Flow Sequence Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {current.steps.map((step) => (
                    <div
                      key={step.code}
                      className="rounded-2xl bg-white/95 p-5 shadow-clay-card hover:shadow-clay-card-hover flex flex-col justify-between space-y-3 relative group transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-lg shadow-clay-pill">
                            {step.icon}
                          </span>
                          <span className="text-[10px] font-black uppercase text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                            Step {step.code}
                          </span>
                        </div>

                        <h5 className="text-xs sm:text-sm font-black text-violet-950 mb-1 leading-snug">
                          {step.title}
                        </h5>
                        <p className="text-xs font-semibold text-violet-900/80 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>

                      {step.safetyNote && (
                        <div className="pt-2 border-t border-rose-100">
                          <span className="text-[10px] font-black text-rose-900 bg-rose-100 px-2 py-1 rounded-md block leading-tight">
                            ⚠️ {step.safetyNote}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Phase Transition Indicator */}
                <div className="flex items-center justify-between pt-2 text-xs font-bold text-violet-900/70">
                  <span>
                    {current.id === 1 &&
                      'Next: Proceed to Phase 2 (Pocari Sweat Micro-Hydration) after 45 mins.'}
                    {current.id === 2 &&
                      'Next: Proceed to Phase 3 (Orthostatic Mobilization) once gut absorption stabilizes.'}
                    {current.id === 3 && 'Final: Mobilization complete. Continue resting in cool environment.'}
                  </span>
                  <div className="flex items-center gap-2">
                    {current.id < 3 && (
                      <button
                        onClick={() => {
                          sound.playPop(750);
                          setActivePhaseId(current.id + 1);
                        }}
                        className="clay-btn bg-white/90 text-violet-950 px-3.5 py-2 text-xs shadow-clay-pill flex items-center gap-1.5 hover:bg-white"
                      >
                        <span>Phase {current.id + 1}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
