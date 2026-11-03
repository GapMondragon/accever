import React, { useState } from 'react';
import { ShieldAlert, Check, Ban, HelpCircle, HeartPulse, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

type PostureKey = 'fowlers' | 'left-lateral' | 'contraindicated';

export const PostureVisualizer: React.FC = () => {
  const [selectedPosture, setSelectedPosture] = useState<PostureKey>('fowlers');
  const [showAnatomyExplainer, setShowAnatomyExplainer] = useState(false);

  return (
    <div className="rounded-[32px] bg-white/90 p-5 sm:p-8 shadow-clay-card border-none space-y-6">
      {/* Critical Anti-Reflux Safety Callout */}
      <div className="rounded-2xl bg-amber-50/90 border-2 border-amber-300/80 p-4 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-amber-200/90 shadow-clay-peach flex items-center justify-center text-amber-900 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 text-amber-800" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
              Non-Negotiable Safety Rule
            </span>
            <span className="text-xs font-black text-rose-700">
              STRICTLY NO FLAT SUPINE (0°) ⛔
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
            With acute post-tennis dehydration plus a stomach full of acidic sinigang chyme and chicken liver, normal instinct is to lay flat or drop the head. <strong className="text-rose-800">This is dangerous.</strong> You must maintain either a <strong className="text-violet-950">Modified Fowler's (35°–45°)</strong> or a <strong className="text-violet-950">Left-Lateral Decubitus</strong> position to prevent regurgitation while restoring cerebral perfusion.
          </p>
        </div>
      </div>

      {/* Header and 3-Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-black text-clay-indigo-dark">
              Recommended Recovery Postures
            </h3>
            <button
              onClick={() => {
                sound.playPop(650);
                setShowAnatomyExplainer(!showAnatomyExplainer);
              }}
              className="text-xs font-bold text-violet-700 bg-violet-100 hover:bg-violet-200 px-2.5 py-1 rounded-full flex items-center gap-1 transition-all"
              title="Toggle Clinical Mechanics"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showAnatomyExplainer ? 'Hide Science' : 'Why This Works?'}</span>
            </button>
          </div>
          <p className="text-xs font-bold text-violet-700/80">
            Select a posture below to inspect accurate body angles, pillow ramps, and gastric mechanics.
          </p>
        </div>

        {/* Posture Navigation Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-violet-100/80 clay-debossed overflow-x-auto">
          <button
            onClick={() => {
              sound.playPop(700);
              setSelectedPosture('fowlers');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedPosture === 'fowlers'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            1. Modified Fowler's (35°–45°)
          </button>
          <button
            onClick={() => {
              sound.playPop(750);
              setSelectedPosture('left-lateral');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedPosture === 'left-lateral'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            2. Left-Lateral Decubitus
          </button>
          <button
            onClick={() => {
              sound.playPop(600);
              setSelectedPosture('contraindicated');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedPosture === 'contraindicated'
                ? 'bg-rose-50 text-rose-950 shadow-clay-pill border border-rose-200'
                : 'text-rose-700 hover:text-rose-950'
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-rose-600" />
            <span>Forbidden Positions</span>
          </button>
        </div>
      </div>

      {/* Anatomy Mechanics Accordion */}
      {showAnatomyExplainer && (
        <div className="rounded-2xl bg-violet-50/80 p-4.5 border border-violet-200/70 clay-debossed space-y-3">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-violet-700" />
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

      {/* POSTURE 1: MODIFIED FOWLER'S */}
      {selectedPosture === 'fowlers' && (
        <div className="rounded-2xl bg-gradient-to-br from-violet-50/70 to-emerald-50/70 p-5 sm:p-7 clay-debossed space-y-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Medically Accurate Anatomical SVG */}
            <div className="w-full lg:w-7/12 flex flex-col items-center">
              <div className="w-full max-w-md bg-white/90 rounded-2xl p-4 shadow-sm border border-violet-100/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                    PRIMARY STABILIZATION POSTURE
                  </span>
                  <span className="text-[11px] font-black text-violet-900">
                    Trunk: 35°–45° | Knees: 20°–30°
                  </span>
                </div>

                <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm select-none">
                  {/* Bed Frame & Mattress */}
                  <line x1="30" y1="240" x2="470" y2="240" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                  <rect x="40" y="228" width="420" height="12" rx="4" fill="#E2E8F0" />

                  {/* Pillow Ramp 1 & 2: Wedge Stack under Back */}
                  {/* Base wedge pillow */}
                  <polygon points="70,228 190,140 210,175 100,228" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1.5" />
                  {/* Top cervical pillow */}
                  <polygon points="90,185 160,115 185,135 120,200" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="1.5" />
                  <text x="75" y="150" fontSize="11" fontWeight="bold" fill="#5B21B6">2–3 Back Pillows</text>
                  <text x="80" y="163" fontSize="9" fontWeight="bold" fill="#6D28D9">(Creates 35°–45° Ramp)</text>

                  {/* Sub-Popliteal / Calf Pillow under legs */}
                  <ellipse cx="365" cy="205" rx="38" ry="16" fill="#A7F3D0" stroke="#059669" strokeWidth="2" />
                  <text x="330" y="240" fontSize="11" fontWeight="bold" fill="#047857">Knee/Calf Pillow</text>
                  <text x="333" y="252" fontSize="9" fontWeight="bold" fill="#059669">(Elevates venous blood)</text>

                  {/* Angle Arc Indicator (35°–45°) */}
                  <path d="M 130 228 A 65 65 0 0 1 180 178" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 3" />
                  <text x="145" y="205" fontSize="13" fontWeight="900" fill="#DC2626">35°–45°</text>

                  {/* HUMAN SILHOUETTE */}
                  {/* Head (Neutral cervical alignment, resting on top pillow) */}
                  <ellipse cx="170" cy="95" rx="20" ry="22" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                  {/* Neck */}
                  <path d="M 175 115 L 185 128" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />

                  {/* Elevated Torso Spine (35-45 deg) */}
                  <path d="M 185 125 L 260 195" stroke="#6D28D9" strokeWidth="20" strokeLinecap="round" />

                  {/* Arms resting comfortably on lap/side */}
                  <path d="M 200 135 L 235 170 L 280 185" fill="none" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />

                  {/* Pelvis / Hip sitting flat */}
                  <circle cx="260" cy="195" r="12" fill="#5B21B6" />

                  {/* Thigh (femur) angled up onto knee pillow */}
                  <path d="M 260 195 L 350 180" stroke="#6D28D9" strokeWidth="18" strokeLinecap="round" />

                  {/* Lower leg (tibia/calves) resting on pillow & sloping down */}
                  <path d="M 350 180 L 435 205" stroke="#6D28D9" strokeWidth="15" strokeLinecap="round" />

                  {/* Feet relaxed */}
                  <path d="M 435 205 L 450 192" stroke="#6D28D9" strokeWidth="10" strokeLinecap="round" />

                  {/* ANATOMICAL OVERLAY: STOMACH & ESOPHAGUS */}
                  {/* Esophagus tube */}
                  <path d="M 185 120 L 225 155" stroke="#FDA4AF" strokeWidth="5" strokeLinecap="round" />
                  {/* Lower Esophageal Sphincter (LES) Valve Marker */}
                  <circle cx="225" cy="155" r="5" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
                  {/* Stomach reservoir pouch */}
                  <path d="M 225 155 Q 248 165 242 185 Q 225 190 215 175 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="1.5" />
                  {/* Acid pool at bottom of stomach */}
                  <path d="M 218 178 Q 235 188 240 185 Q 228 190 218 178 Z" fill="#DC2626" opacity="0.9" />

                  {/* Annotation: LES is well above acidic fluid pool */}
                  <line x1="225" y1="155" x2="205" y2="135" stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="140" y="132" fontSize="10" fontWeight="900" fill="#047857">LES Valve Closed (Safe Above Fluid)</text>

                  {/* Venous Return Blood Flow Arrow */}
                  <defs>
                    <marker id="arrow-cyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284C7" />
                    </marker>
                  </defs>
                  <path d="M 420 175 Q 360 145 285 160" fill="none" stroke="#0284C7" strokeWidth="3" markerEnd="url(#arrow-cyan)" strokeDasharray="5 3" />
                  <text x="295" y="145" fontSize="10" fontWeight="900" fill="#0369A1">
                    Venous Return to Heart ➔
                  </text>
                </svg>
              </div>

              <div className="flex items-center gap-4 mt-2 text-[11px] font-bold text-violet-700">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  Acid pool kept below esophagus
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
                  Legs elevated for blood return
                </span>
              </div>
            </div>

            {/* Step-by-Step Setup Checklist */}
            <div className="w-full lg:w-5/12 space-y-3.5">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Clinical Action Blueprint
                </span>
                <h4 className="text-base sm:text-lg font-black text-violet-950">
                  How to Build the Modified Fowler's Setup:
                </h4>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5">
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

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5">
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

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5">
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

      {/* POSTURE 2: LEFT-LATERAL DECUBITUS */}
      {selectedPosture === 'left-lateral' && (
        <div className="rounded-2xl bg-gradient-to-br from-violet-50/70 to-sky-50/70 p-5 sm:p-7 clay-debossed space-y-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* SVG Diagram: Left Lateral Recovery Anatomy */}
            <div className="w-full lg:w-7/12 flex flex-col items-center">
              <div className="w-full max-w-md bg-white/90 rounded-2xl p-4 shadow-sm border border-violet-100/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                    ANTI-NAUSEA / REST POSTURE
                  </span>
                  <span className="text-[11px] font-black text-violet-900">
                    Left Decubitus + Head Propped
                  </span>
                </div>

                <svg viewBox="0 0 500 280" className="w-full h-auto drop-shadow-sm select-none">
                  {/* Bed Surface */}
                  <line x1="30" y1="240" x2="470" y2="240" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                  <rect x="40" y="228" width="420" height="12" rx="4" fill="#E2E8F0" />

                  {/* 2 Head Pillows for Left Lateral (15° Incline) */}
                  <ellipse cx="110" cy="180" rx="35" ry="16" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1.5" />
                  <ellipse cx="115" cy="162" rx="30" ry="14" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="1.5" />
                  <text x="75" y="135" fontSize="10" fontWeight="bold" fill="#5B21B6">2 Head Pillows (15°+)</text>

                  {/* Pillow between knees */}
                  <ellipse cx="370" cy="205" rx="20" ry="12" fill="#A7F3D0" stroke="#059669" strokeWidth="2" />
                  <text x="325" y="245" fontSize="10" fontWeight="bold" fill="#047857">Pillow Between Knees</text>

                  {/* Patient on Left Side */}
                  {/* Head turned on side */}
                  <circle cx="120" cy="145" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />

                  {/* Torso lying on left side */}
                  <path d="M 135 155 L 290 195" stroke="#6D28D9" strokeWidth="20" strokeLinecap="round" />

                  {/* Left arm extended out/under pillow */}
                  <path d="M 145 165 L 180 185" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />

                  {/* Knees flexed forward (Sims recovery position) */}
                  {/* Thighs */}
                  <path d="M 290 195 L 360 185" stroke="#6D28D9" strokeWidth="16" strokeLinecap="round" />
                  {/* Lower legs bent forward */}
                  <path d="M 360 185 L 390 220" stroke="#6D28D9" strokeWidth="14" strokeLinecap="round" />

                  {/* ANATOMICAL STOMACH BASIN (Left side is down) */}
                  {/* On left lateral, the Greater Curvature is dependent at the bottom */}
                  {/* Esophagus enters from above right */}
                  <path d="M 175 160 L 210 178" stroke="#FDA4AF" strokeWidth="5" strokeLinecap="round" />

                  {/* Stomach contour: Big curvature sits down on bed side */}
                  <path d="M 210 178 Q 220 215 255 210 Q 275 195 245 175 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2" />

                  {/* Chyme fluid pooling at the deepest part of greater curvature (gravity sink) */}
                  <path d="M 220 200 Q 240 218 255 210 Q 260 200 230 195 Z" fill="#DC2626" opacity="0.9" />

                  {/* LES marker - ABOVE the pool */}
                  <circle cx="210" cy="178" r="5" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
                  <text x="175" y="195" fontSize="10" fontWeight="900" fill="#047857">LES is Higher ⬆</text>

                  {/* Graphic Arrow showing Gravity trapping acid */}
                  <line x1="240" y1="165" x2="240" y2="190" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow-red)" />
                  <text x="250" y="178" fontSize="9" fontWeight="900" fill="#B91C1C">Acid Pooled in Greater Curvature Sump</text>

                  <defs>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444" />
                    </marker>
                  </defs>
                </svg>
              </div>

              <div className="flex items-center gap-4 mt-2 text-[11px] font-bold text-violet-700">
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
                <span className="text-[11px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
                  Anatomical Science
                </span>
                <h4 className="text-base sm:text-lg font-black text-violet-950">
                  Why the Left Side Prevents Reflux & Nausea:
                </h4>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5">
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

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5">
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

                <div className="rounded-xl bg-white/90 p-3 shadow-clay-pill flex items-start gap-2.5">
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
        <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50/70 p-5 sm:p-7 clay-debossed space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-800 bg-rose-200/90 px-3 py-1 rounded-full">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Flat Supine */}
            <div className="rounded-2xl bg-white/95 p-4.5 shadow-clay-card border-2 border-rose-200 space-y-3">
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
            <div className="rounded-2xl bg-white/95 p-4.5 shadow-clay-card border-2 border-rose-200 space-y-3">
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
            <div className="rounded-2xl bg-white/95 p-4.5 shadow-clay-card border-2 border-rose-200 space-y-3">
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

          <div className="p-3.5 rounded-xl bg-rose-100/90 text-xs font-bold text-rose-950 flex items-center justify-between flex-wrap gap-2">
            <span>
              💡 <strong>Summary:</strong> Always choose <strong>Modified Fowler's (35°–45°)</strong> or <strong>Left-Side Recline</strong> until at least 90 minutes post-meal.
            </span>
            <button
              onClick={() => {
                sound.playPop(700);
                setSelectedPosture('fowlers');
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 shadow-sm flex items-center gap-1 transition-all"
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
