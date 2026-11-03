import React, { useState } from 'react';
import {
  ShieldAlert,
  Check,
  Ban,
  HelpCircle,
  HeartPulse,
  ChevronRight,
  Sliders,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';

type PostureKey = 'fowlers' | 'left-lateral' | 'contraindicated';
type PinKey = 'pillows' | 'les' | 'stomach' | 'calves' | null;

export const PostureVisualizer: React.FC = () => {
  const [selectedPosture, setSelectedPosture] = useState<PostureKey>('fowlers');
  const [showAnatomyExplainer, setShowAnatomyExplainer] = useState(false);
  const [activePin, setActivePin] = useState<PinKey>('les');
  const [simulatedAngle, setSimulatedAngle] = useState<number>(38); // 0 to 55 degrees
  const [leftLateralView, setLeftLateralView] = useState<'left' | 'right'>('left');

  // Angle evaluation helpers
  const isDangerAngle = simulatedAngle < 28;
  const isGoldenAngle = simulatedAngle >= 32 && simulatedAngle <= 48;

  return (
    <div
      id="platform-postures"
      data-buddy-platform="true"
      data-platform-name="Posture Visualizer"
      className="rounded-[28px] sm:rounded-[32px] bg-white/90 p-4 sm:p-8 shadow-clay-card border-none space-y-5 sm:space-y-6"
    >
      {/* Critical Anti-Reflux Safety Callout */}
      <div className="rounded-2xl bg-amber-50/90 border-2 border-amber-300/80 p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-200/90 shadow-clay-peach flex items-center justify-center text-amber-900 shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800" />
        </div>
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
              Non-Negotiable Safety Rule
            </span>
            <span className="text-[11px] sm:text-xs font-black text-rose-700">
              STRICTLY NO FLAT SUPINE (0°) ⛔
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
            With acute post-tennis dehydration plus a stomach full of acidic sinigang chyme and chicken liver, normal instinct is to lay flat or drop the head. <strong className="text-rose-800">This is dangerous.</strong> You must maintain either a <strong className="text-violet-950">Modified Fowler's (35°–45°)</strong> or a <strong className="text-violet-950">Left-Lateral Decubitus</strong> position to prevent regurgitation while restoring cerebral perfusion.
          </p>
        </div>
      </div>

      {/* Header and 3-Tab Selector */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h3 className="text-base sm:text-xl font-black text-clay-indigo-dark">
              Recommended Recovery Postures
            </h3>
            <p className="text-xs font-bold text-violet-700/80">
              Interactive anatomical simulations with live fluid dynamics and inspection pins.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playPop(650);
              setShowAnatomyExplainer(!showAnatomyExplainer);
            }}
            className="text-[11px] sm:text-xs font-bold text-violet-700 bg-violet-100 hover:bg-violet-200 px-2.5 py-1 rounded-full flex items-center gap-1 transition-all clay-btn shrink-0"
            title="Toggle Clinical Mechanics"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showAnatomyExplainer ? 'Hide Science' : 'Why This Works?'}</span>
          </button>
        </div>

        {/* Posture Navigation Pills - Fully Responsive & Finger-Friendly on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-violet-100/80 clay-debossed">
          <button
            onClick={() => {
              sound.playPop(700);
              setSelectedPosture('fowlers');
              setActivePin('les');
            }}
            className={`px-3 py-2.5 sm:py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 clay-btn ${
              selectedPosture === 'fowlers'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="truncate">1. Fowler's (35°–45°)</span>
          </button>
          <button
            onClick={() => {
              sound.playPop(750);
              setSelectedPosture('left-lateral');
              setActivePin(null);
            }}
            className={`px-3 py-2.5 sm:py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 clay-btn ${
              selectedPosture === 'left-lateral'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0"></span>
            <span className="truncate">2. Left-Lateral Decubitus</span>
          </button>
          <button
            onClick={() => {
              sound.playPop(600);
              setSelectedPosture('contraindicated');
              setActivePin(null);
            }}
            className={`px-3 py-2.5 sm:py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 clay-btn ${
              selectedPosture === 'contraindicated'
                ? 'bg-rose-50 text-rose-950 shadow-clay-pill border border-rose-200'
                : 'text-rose-700 hover:text-rose-950'
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="truncate">3. Forbidden Postures</span>
          </button>
        </div>
      </div>

      {/* Anatomy Mechanics Accordion */}
      {showAnatomyExplainer && (
        <div className="rounded-2xl bg-violet-50/80 p-3.5 sm:p-4.5 border border-violet-200/70 clay-debossed space-y-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-violet-700 shrink-0" />
            <h4 className="text-xs sm:text-sm font-black text-violet-950">
              The Two Opposing Forces We Are Balancing:
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-violet-900">
            <div className="bg-white/80 p-3 rounded-xl border border-violet-100">
              <span className="text-rose-800 font-black block mb-1">
                1. Postprandial Blood Pooling (Splanchnic Siphon)
              </span>
              Digesting sinigang broth and chicken liver causes massive mesenteric vasodilation. Combined with tennis dehydration, blood volume drops in the upper body, triggering presyncope/dizziness upon standing.
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-violet-100">
              <span className="text-amber-800 font-black block mb-1">
                2. Gastroesophageal Hydrostatic Barrier
              </span>
              Normally, faintness is relieved by lying flat. But lying flat makes stomach fluid level equal to or higher than the lower esophageal sphincter (LES). Sinigang acid will breach into the esophagus within seconds.
            </div>
          </div>
        </div>
      )}

      {/* POSTURE 1: MODIFIED FOWLER'S WITH DYNAMIC ANGLE SIMULATOR */}
      {selectedPosture === 'fowlers' && (
        <div className="rounded-2xl bg-gradient-to-br from-violet-50/80 to-emerald-50/80 p-3.5 sm:p-7 clay-debossed space-y-5 sm:space-y-6">
          {/* Angle Simulator Slider Bar - Mobile Optimized */}
          <div className="rounded-2xl bg-white/95 p-3.5 sm:p-4 shadow-sm border border-violet-100 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-800 flex items-center justify-center font-black shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-violet-900 block">
                    Interactive Incline Simulator
                  </span>
                  <span className="text-[11px] font-bold text-violet-700 hidden sm:block">
                    Drag slider to see real-time esophageal barrier vs reflux risk
                  </span>
                </div>
              </div>
              <span className="text-xs font-black text-violet-950 bg-violet-100 px-2.5 py-1 rounded-lg shrink-0">
                Angle: {simulatedAngle}°
              </span>
            </div>

            {/* Slider and Touch-Friendly Preset Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="range"
                min="0"
                max="55"
                step="1"
                value={simulatedAngle}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSimulatedAngle(val);
                  if (val === 0 || val === 38 || val === 45) sound.playPop(700);
                }}
                className="w-full accent-violet-600 cursor-pointer h-2 bg-violet-200 rounded-lg appearance-none"
              />
              <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => {
                    sound.playPop(550);
                    setSimulatedAngle(0);
                  }}
                  className={`min-h-[44px] py-2 px-2 rounded-xl text-[11px] font-black transition-all text-center clay-btn flex items-center justify-center ${
                    simulatedAngle === 0
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-rose-100 text-rose-900 hover:bg-rose-200'
                  }`}
                >
                  0° Flat
                </button>
                <button
                  onClick={() => {
                    sound.playPop(800);
                    setSimulatedAngle(38);
                  }}
                  className={`min-h-[44px] py-2 px-2 rounded-xl text-[11px] font-black transition-all text-center clay-btn flex items-center justify-center ${
                    simulatedAngle === 38
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  38° Golden
                </button>
                <button
                  onClick={() => {
                    sound.playPop(850);
                    setSimulatedAngle(48);
                  }}
                  className={`min-h-[44px] py-2 px-2 rounded-xl text-[11px] font-black transition-all text-center clay-btn flex items-center justify-center ${
                    simulatedAngle === 48
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  48° Max
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Medically Accurate Anatomical SVG with Dynamic Tilt & Flow */}
            <div className="w-full lg:w-7/12 flex flex-col items-center">
              <div className="w-full bg-white/95 rounded-2xl p-3 sm:p-4 shadow-sm border border-violet-100/90 relative overflow-hidden">
                {/* Dynamic Status Header */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-all ${
                      isDangerAngle
                        ? 'bg-rose-200 text-rose-950 animate-pulse'
                        : isGoldenAngle
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {isDangerAngle
                      ? '⛔ ACID REFLUX DANGER'
                      : isGoldenAngle
                      ? '✅ OPTIMAL ANTI-REFLUX'
                      : '⚠️ HIGH ORTHOSTATIC WORKLOAD'}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-violet-700">
                    {isDangerAngle ? 'LES Submerged' : 'LES Elevated'}
                  </span>
                </div>

                <svg viewBox="0 0 520 290" className="w-full h-auto drop-shadow-sm select-none">
                  <defs>
                    <marker
                      id="arrow-cyan-flow"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284C7" />
                    </marker>

                    <linearGradient id="acidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#B91C1C" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  {/* Bed Frame & Soft Mattress */}
                  <line x1="30" y1="245" x2="490" y2="245" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                  <rect x="40" y="233" width="440" height="12" rx="4" fill="#E2E8F0" />

                  {/* Dynamic Pillow Stack that adapts to angle */}
                  <polygon
                    points={`70,233 ${70 + simulatedAngle * 2.8},${233 - simulatedAngle * 2.2} ${
                      100 + simulatedAngle * 2.6
                    },${233 - simulatedAngle * 1.5} 120,233`}
                    fill="#DDD6FE"
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  <ellipse
                    cx="375"
                    cy="212"
                    rx="36"
                    ry="15"
                    fill="#A7F3D0"
                    stroke="#059669"
                    strokeWidth="2"
                    className="cursor-pointer"
                    onClick={() => {
                      sound.playPop(750);
                      setActivePin('calves');
                    }}
                  />

                  {/* Angle Protractor Visualizer Arc */}
                  <path
                    d={`M 150 233 A 60 60 0 0 1 ${
                      150 + 60 * Math.cos((simulatedAngle * Math.PI) / 180)
                    } ${233 - 60 * Math.sin((simulatedAngle * Math.PI) / 180)}`}
                    fill="none"
                    stroke={isDangerAngle ? '#EF4444' : isGoldenAngle ? '#10B981' : '#F59E0B'}
                    strokeWidth="3"
                    strokeDasharray="4 3"
                  />
                  <text
                    x="165"
                    y="225"
                    fontSize="13"
                    fontWeight="900"
                    fill={isDangerAngle ? '#DC2626' : isGoldenAngle ? '#047857' : '#D97706'}
                  >
                    {simulatedAngle}°
                  </text>

                  {/* Dynamic Torso Group Rotating around Hip (Center: 260, 205) */}
                  <g
                    transform={`rotate(${-(simulatedAngle - 38) * 0.8}, 260, 205)`}
                    className="transition-transform duration-300 ease-out"
                  >
                    {/* Head Resting on Upper Pillows */}
                    <ellipse cx="170" cy="100" rx="20" ry="22" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                    <circle cx="164" cy="98" r="2.5" fill="#78350F" />
                    <path d="M 160 108 Q 166 114 172 108" fill="none" stroke="#78350F" strokeWidth="1.5" />

                    {/* Torso Spine */}
                    <path d="M 185 130 L 260 205" stroke="#6D28D9" strokeWidth="20" strokeLinecap="round" />

                    {/* Esophagus Tube */}
                    <path
                      d="M 185 125 L 225 160"
                      stroke={isDangerAngle ? '#F87171' : '#FDA4AF'}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    {/* Lower Esophageal Sphincter (LES) Valve Marker */}
                    <circle
                      cx="225"
                      cy="160"
                      r="8"
                      fill={isDangerAngle ? '#EF4444' : '#10B981'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className={isDangerAngle ? 'animate-beacon-pulse' : ''}
                      onClick={() => {
                        sound.playPop(850);
                        setActivePin('les');
                      }}
                    />

                    {/* Stomach Pouch */}
                    <path
                      d="M 225 160 Q 252 175 245 198 Q 225 202 215 185 Z"
                      fill="#FCA5A5"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                    />

                    {/* Gastric Acid Fluid Pool */}
                    {isDangerAngle ? (
                      /* Danger: Acid overflowing upward into esophagus */
                      <g className="animate-pulse">
                        <path
                          d="M 195 135 L 225 160 Q 252 175 245 198 Q 225 202 215 185 Z"
                          fill="url(#acidGrad)"
                          opacity="0.95"
                        />
                        <text x="110" y="145" fontSize="12" fontWeight="900" fill="#DC2626">
                          ⚠️ Acid Spill into Throat!
                        </text>
                      </g>
                    ) : (
                      /* Safe: Acid pooled safely at bottom away from LES */
                      <path
                        d="M 218 185 Q 235 198 245 198 Q 228 202 218 185 Z"
                        fill="url(#acidGrad)"
                        opacity="0.95"
                        className="animate-wave-sway"
                      />
                    )}

                    {/* Arm */}
                    <path
                      d="M 195 140 L 230 178 L 275 195"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Lower Body: Hips & Calves */}
                  <circle cx="260" cy="205" r="12" fill="#5B21B6" />
                  <path d="M 260 205 L 355 190" stroke="#6D28D9" strokeWidth="18" strokeLinecap="round" />
                  <path d="M 355 190 L 440 215" stroke="#6D28D9" strokeWidth="15" strokeLinecap="round" />
                  <path d="M 440 215 L 455 202" stroke="#6D28D9" strokeWidth="10" strokeLinecap="round" />

                  {/* ANIMATED VENOUS RETURN STREAM */}
                  <path
                    d="M 430 185 Q 360 150 280 170"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3.5"
                    strokeDasharray="8 5"
                    markerEnd="url(#arrow-cyan-flow)"
                    className="animate-flow-dash"
                  />
                  <text x="310" y="150" fontSize="11" fontWeight="900" fill="#0369A1">
                    Venous Return to Heart
                  </text>

                  {/* INTERACTIVE INSPECTION PINS */}
                  {/* Pin 1: Pillow Ramp */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      sound.playPop(700);
                      setActivePin('pillows');
                    }}
                  >
                    <circle cx="95" cy="190" r="12" fill="#8B5CF6" opacity="0.25" className="animate-beacon-pulse" />
                    <circle cx="95" cy="190" r="8" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="91" y="194" fontSize="10" fontWeight="900" fill="#FFFFFF">
                      1
                    </text>
                  </g>

                  {/* Pin 2: LES Valve */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      sound.playPop(750);
                      setActivePin('les');
                    }}
                  >
                    <circle cx="230" cy="148" r="12" fill="#10B981" opacity="0.25" className="animate-beacon-pulse" />
                    <circle cx="230" cy="148" r="8" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="226" y="152" fontSize="10" fontWeight="900" fill="#FFFFFF">
                      2
                    </text>
                  </g>

                  {/* Pin 3: Stomach Fluid */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      sound.playPop(800);
                      setActivePin('stomach');
                    }}
                  >
                    <circle cx="255" cy="195" r="12" fill="#EF4444" opacity="0.25" className="animate-beacon-pulse" />
                    <circle cx="255" cy="195" r="8" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="251" y="199" fontSize="10" fontWeight="900" fill="#FFFFFF">
                      3
                    </text>
                  </g>

                  {/* Pin 4: Calf Pump */}
                  <g
                    className="cursor-pointer"
                    onClick={() => {
                      sound.playPop(850);
                      setActivePin('calves');
                    }}
                  >
                    <circle cx="395" cy="210" r="12" fill="#0284C7" opacity="0.25" className="animate-beacon-pulse" />
                    <circle cx="395" cy="210" r="8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="391" y="214" fontSize="10" fontWeight="900" fill="#FFFFFF">
                      4
                    </text>
                  </g>
                </svg>

                {/* Hotspot Inspection Detail Tray */}
                <div className="mt-3 p-3 rounded-xl bg-violet-50/90 border border-violet-200/80 text-xs font-bold text-violet-950 transition-all flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-violet-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {activePin === 'pillows'
                      ? '1'
                      : activePin === 'les'
                      ? '2'
                      : activePin === 'stomach'
                      ? '3'
                      : '4'}
                  </div>
                  <div>
                    {activePin === 'pillows' && (
                      <p>
                        <strong>Thoracic Ramp:</strong> 2 to 3 pillows stacked in a continuous stair-step wedge. Elevates the whole chest to maintain the 35°–45° gravity barrier.
                      </p>
                    )}
                    {activePin === 'les' && (
                      <p>
                        <strong>Lower Esophageal Sphincter (LES):</strong> Sits safely above the gastric fluid level at &ge;32° incline. Prevents acid reflux without constricting breathing.
                      </p>
                    )}
                    {activePin === 'stomach' && (
                      <p>
                        <strong>Gastric Acid Chyme:</strong> 700g of sinigang broth, tamarind acid (pH 2.0), rice, and chicken liver settles in the lower gastric antrum away from the throat.
                      </p>
                    )}
                    {activePin === 'calves' && (
                      <p>
                        <strong>Calf & Knee Elevation:</strong> Knees bent at 25° over a folded pillow shifts 300–500 mL of pooled venous blood back to central circulation, relieving presyncope.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pin Selection Grid - Touch-Friendly on Mobile (min 44px tap target) */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 w-full justify-center mt-2">
                <button
                  onClick={() => {
                    sound.playPop(700);
                    setActivePin('pillows');
                  }}
                  className={`min-h-[44px] py-2 px-2.5 rounded-xl text-xs font-black clay-btn text-center flex items-center justify-center ${
                    activePin === 'pillows' ? 'bg-violet-600 text-white shadow-sm' : 'bg-white text-violet-800'
                  }`}
                >
                  1. Pillows Ramp
                </button>
                <button
                  onClick={() => {
                    sound.playPop(750);
                    setActivePin('les');
                  }}
                  className={`min-h-[44px] py-2 px-2.5 rounded-xl text-xs font-black clay-btn text-center flex items-center justify-center ${
                    activePin === 'les' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-emerald-800'
                  }`}
                >
                  2. LES Valve
                </button>
                <button
                  onClick={() => {
                    sound.playPop(800);
                    setActivePin('stomach');
                  }}
                  className={`min-h-[44px] py-2 px-2.5 rounded-xl text-xs font-black clay-btn text-center flex items-center justify-center ${
                    activePin === 'stomach' ? 'bg-rose-600 text-white shadow-sm' : 'bg-white text-rose-800'
                  }`}
                >
                  3. Gastric Pool
                </button>
                <button
                  onClick={() => {
                    sound.playPop(850);
                    setActivePin('calves');
                  }}
                  className={`min-h-[44px] py-2 px-2.5 rounded-xl text-xs font-black clay-btn text-center flex items-center justify-center ${
                    activePin === 'calves' ? 'bg-sky-600 text-white shadow-sm' : 'bg-white text-sky-800'
                  }`}
                >
                  4. Calf Pump
                </button>
              </div>
            </div>

            {/* Checklist details & Clinical Rationale */}
            <div className="w-full lg:w-5/12 space-y-3.5">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Clinical Action Blueprint
                </span>
                <h4 className="text-base sm:text-lg font-black text-violet-950">
                  How to Build the Modified Fowler's Setup:
                </h4>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5 hover:scale-[1.02] transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-violet-100 text-violet-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-violet-950">The 35°–45° Thoracic Ramp</h5>
                    <p className="text-[11px] font-bold text-violet-800 leading-snug">
                      Stack 2 to 3 pillows in a stair-step incline under your head, neck, and upper back. Never just bend your neck forward—your entire torso must be on an incline.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5 hover:scale-[1.02] transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-violet-950">Calf & Knee Elevation (Autotransfusion)</h5>
                    <p className="text-[11px] font-bold text-violet-800 leading-snug">
                      Place 1 folded pillow directly under knees and calves. Knees should bend ~20°–30°. This relaxes the abdominal wall (reducing gastric pressure) and sends 300–500 mL of pooled leg blood back to the heart.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5 hover:scale-[1.02] transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-violet-950">Waistband Decompression</h5>
                    <p className="text-[11px] font-bold text-violet-800 leading-snug">
                      Unbutton tennis skirts/shorts or switch to loose sweatpants. External waistband constriction pushes acidic gastric juice right through the cardiac sphincter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-100/80 p-3 text-xs font-bold text-emerald-950 border border-emerald-200">
                ✅ <strong>Best used for:</strong> Active recovery during the first 0–45 minutes while doing the Vagal Breathing Coach and micro-sipping Pocari Sweat.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POSTURE 2: LEFT-LATERAL DECUBITUS WITH SIDE COMPARISON */}
      {selectedPosture === 'left-lateral' && (
        <div className="rounded-2xl bg-gradient-to-br from-violet-50/80 to-sky-50/80 p-3.5 sm:p-7 clay-debossed space-y-5 sm:space-y-6">
          {/* Side Comparison Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                Anatomical Orientation Toggle
              </span>
              <h4 className="text-sm sm:text-base font-black text-violet-950 mt-1">
                Compare Left Side vs Right Side Physics:
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-sky-100/80 clay-debossed w-full sm:w-auto">
              <button
                onClick={() => {
                  sound.playPop(750);
                  setLeftLateralView('left');
                }}
                className={`px-3 py-2 rounded-lg text-xs font-black transition-all text-center clay-btn ${
                  leftLateralView === 'left'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-sky-900 hover:text-sky-950'
                }`}
              >
                ✅ Left Side (Safe)
              </button>
              <button
                onClick={() => {
                  sound.playPop(600);
                  setLeftLateralView('right');
                }}
                className={`px-3 py-2 rounded-lg text-xs font-black transition-all text-center clay-btn ${
                  leftLateralView === 'right'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-rose-900 hover:text-rose-950'
                }`}
              >
                ❌ Right Side (Trap)
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* SVG Diagram: Left Lateral vs Right Lateral */}
            <div className="w-full lg:w-7/12 flex flex-col items-center">
              <div className="w-full bg-white/95 rounded-2xl p-3 sm:p-4 shadow-sm border border-violet-100/80">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      leftLateralView === 'left' ? 'bg-sky-100 text-sky-900' : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {leftLateralView === 'left' ? 'LEFT LATERAL DECUBITUS' : 'RIGHT LATERAL (UNSAFE)'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-black text-violet-900">
                    {leftLateralView === 'left' ? 'Curvature Down' : 'LES Submerged'}
                  </span>
                </div>

                <svg viewBox="0 0 520 280" className="w-full h-auto drop-shadow-sm select-none">
                  {/* Bed Surface */}
                  <line x1="30" y1="240" x2="490" y2="240" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                  <rect x="40" y="228" width="440" height="12" rx="4" fill="#E2E8F0" />

                  {/* 2 Head Pillows */}
                  <ellipse cx="110" cy="180" rx="35" ry="16" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1.5" />
                  <ellipse cx="115" cy="162" rx="30" ry="14" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="1.5" />
                  <text x="75" y="135" fontSize="11" fontWeight="bold" fill="#5B21B6">
                    2 Head Pillows (15°+)
                  </text>

                  {/* Pillow between knees */}
                  <ellipse cx="370" cy="205" rx="22" ry="13" fill="#A7F3D0" stroke="#059669" strokeWidth="2" />
                  <text x="320" y="245" fontSize="11" fontWeight="bold" fill="#047857">
                    Pillow Between Knees
                  </text>

                  {/* Patient Silhouette on side */}
                  <circle cx="120" cy="145" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                  <path d="M 135 155 L 290 195" stroke="#6D28D9" strokeWidth="20" strokeLinecap="round" />
                  <path d="M 145 165 L 180 185" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 290 195 L 360 185" stroke="#6D28D9" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 360 185 L 390 220" stroke="#6D28D9" strokeWidth="14" strokeLinecap="round" />

                  {leftLateralView === 'left' ? (
                    /* LEFT SIDE ANATOMY: Stomach bowl at bottom */
                    <g>
                      <path d="M 175 160 L 210 178" stroke="#FDA4AF" strokeWidth="5" strokeLinecap="round" />
                      <path
                        d="M 210 178 Q 220 215 255 210 Q 275 195 245 175 Z"
                        fill="#FCA5A5"
                        stroke="#EF4444"
                        strokeWidth="2"
                      />
                      <path
                        d="M 220 200 Q 240 218 255 210 Q 260 200 230 195 Z"
                        fill="#DC2626"
                        opacity="0.9"
                        className="animate-wave-sway"
                      />
                      <circle cx="210" cy="178" r="7" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="165" y="198" fontSize="11" fontWeight="900" fill="#047857">
                        LES Higher (Guarded)
                      </text>
                      <line
                        x1="240"
                        y1="165"
                        x2="240"
                        y2="190"
                        stroke="#EF4444"
                        strokeWidth="2"
                        className="animate-flow-dash"
                      />
                      <text x="248" y="178" fontSize="10" fontWeight="900" fill="#B91C1C">
                        Acid Trapped by Gravity
                      </text>
                    </g>
                  ) : (
                    /* RIGHT SIDE ANATOMY: Acid overflow */
                    <g className="animate-pulse">
                      <path d="M 175 185 L 210 170" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
                      <path
                        d="M 210 170 Q 245 155 270 175 Q 260 200 220 185 Z"
                        fill="#FCA5A5"
                        stroke="#EF4444"
                        strokeWidth="2"
                      />
                      <path
                        d="M 175 185 L 230 170 Q 260 170 245 195 Z"
                        fill="#DC2626"
                        opacity="0.95"
                      />
                      <circle cx="210" cy="170" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="110" y="180" fontSize="12" fontWeight="900" fill="#DC2626">
                        ⛔ Acid Flooding Esophagus!
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              <div className="flex items-center gap-3 mt-2 text-[10px] sm:text-[11px] font-bold text-violet-700 flex-wrap justify-center">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  Greater curvature acts as a gravitational trap
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
                  Pillow cushions hip & IVC venous flow
                </span>
              </div>
            </div>

            {/* Left Lateral Clinical Checklist */}
            <div className="w-full lg:w-5/12 space-y-3.5">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
                  Anatomical Science
                </span>
                <h4 className="text-base sm:text-lg font-black text-violet-950">
                  Why the Left Side Prevents Reflux & Nausea:
                </h4>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5 hover:scale-[1.02] transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-violet-950">The Natural Stomach Sump</h5>
                    <p className="text-[11px] font-bold text-violet-800 leading-snug">
                      Your stomach is shaped like an asymmetrical letter 'J'. The junction with the esophagus enters from the upper right. When lying on your left, the stomach pouch sits below the junction, so liquid cannot spill upward.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5 hover:scale-[1.02] transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-violet-950">Never 0° Flat — Keep Head Elevated</h5>
                    <p className="text-[11px] font-bold text-violet-800 leading-snug">
                      Use 2 pillows under your head and shoulders so your upper torso maintains a slight 15°–20° tilt. This provides secondary hydrostatic safety.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5 hover:scale-[1.02] transition-transform">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-violet-950">Pillow Between Bent Knees</h5>
                    <p className="text-[11px] font-bold text-violet-800 leading-snug">
                      Bend your knees up slightly and place a cushion between them. This prevents pelvic rotation and keeps the Inferior Vena Cava free from abdominal compression.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-sky-100/80 p-3 text-xs font-bold text-sky-950 border border-sky-200">
                😴 <strong>Best used for:</strong> If you feel heavy stomach fullness, nausea, or if you want to close your eyes and doze off safely.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POSTURE 3: CONTRAINDICATED / FORBIDDEN POSITIONS */}
      {selectedPosture === 'contraindicated' && (
        <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50/70 p-3.5 sm:p-7 clay-debossed space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-rose-800 bg-rose-200/90 px-3 py-1 rounded-full">
                Danger Zone & Clinical Hazards
              </span>
              <h4 className="text-base sm:text-lg font-black text-rose-950 mt-1">
                Postures That Are Strictly Prohibited Right Now
              </h4>
            </div>
            <span className="text-xs font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-xl">
              Do NOT attempt these while digesting sinigang
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Card 1: Flat Supine */}
            <div className="rounded-2xl bg-white/95 p-4 shadow-clay-card border-2 border-rose-200 space-y-3 hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-700 uppercase">Hazard 1</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black text-[10px]">
                  0° Incline
                </span>
              </div>
              <h5 className="text-sm font-black text-rose-950">Flat Supine (On Your Back)</h5>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-[11px] font-bold text-rose-900 leading-relaxed">
                <strong>Why it’s dangerous:</strong> When lying horizontal, the stomach and esophagus sit at identical hydrostatic height. Sinigang acid (pH 2.0) and tamarind broth immediately bathe the lower esophageal sphincter, causing instant heartburn, reflux, and spasm.
              </div>
            </div>

            {/* Card 2: Trendelenburg (Head Down / Legs High) */}
            <div className="rounded-2xl bg-white/95 p-4 shadow-clay-card border-2 border-rose-200 space-y-3 hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-700 uppercase">Hazard 2</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black text-[10px]">
                  Critical Risk
                </span>
              </div>
              <h5 className="text-sm font-black text-rose-950">Trendelenburg (Head Lower than Legs)</h5>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-[11px] font-bold text-rose-900 leading-relaxed">
                <strong>Why people do it:</strong> First-aiders often tell fainting people to put their head between knees or feet up.
                <br /><strong className="text-rose-950">Why it's fatal here:</strong> Inverting the torso dumps the entire 700g acidic meal against your throat. Severe aspiration risk.
              </div>
            </div>

            {/* Card 3: Right-Lateral Position */}
            <div className="rounded-2xl bg-white/95 p-4 shadow-clay-card border-2 border-rose-200 space-y-3 hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-700 uppercase">Hazard 3</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black text-[10px]">
                  Anatomical Trap
                </span>
              </div>
              <h5 className="text-sm font-black text-rose-950">Right-Lateral (Lying on Right Side)</h5>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-[11px] font-bold text-rose-900 leading-relaxed">
                <strong>Why it’s dangerous:</strong> Lying on your right side flips the stomach's anatomy upside down. The esophagus is now situated at the bottom of the acid fluid level, causing continuous nocturnal reflux and coughing.
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-100/90 text-xs font-bold text-rose-950 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              💡 <strong>Summary:</strong> Always choose <strong>Modified Fowler's (35°–45°)</strong> or <strong>Left-Side Recline</strong> until at least 90 minutes post-meal.
            </span>
            <button
              onClick={() => {
                sound.playPop(700);
                setSelectedPosture('fowlers');
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 shadow-sm flex items-center justify-center gap-1 transition-all clay-btn"
            >
              <span>Back to Fowler's</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
