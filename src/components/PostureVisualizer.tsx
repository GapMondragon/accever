import React, { useState } from 'react';
import { AlertTriangle, Check, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const PostureVisualizer: React.FC = () => {
  const [selectedPosture, setSelectedPosture] = useState<'fowlers' | 'left-lateral'>('fowlers');

  return (
    <div className="rounded-[32px] bg-white/90 p-6 sm:p-8 shadow-clay-card border-none space-y-6">
      {/* Critical Anti-Reflux Safety Warning Banner */}
      <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-amber-200 shadow-clay-peach flex items-center justify-center text-amber-900 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 text-amber-800" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
              Critical Safety Protocol
            </span>
            <span className="text-xs font-black text-rose-700">
              DO NOT LIE COMPLETELY FLAT ⛔
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
            Because of your recent heavy, acidic meal (sinigang, rice, chicken liver), lying flat will cause immediate gastric acid reflux and regurgitation. You must maintain a <span className="underline decoration-amber-500 font-extrabold">Semi-Reclined (30°–45°)</span> or <span className="underline decoration-amber-500 font-extrabold">Left-Lateral Recovery</span> position to relieve post-match dizziness safely.
          </p>
        </div>
      </div>

      {/* Posture Selector Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-black text-clay-indigo-dark">
            Recommended Recovery Postures
          </h3>
          <p className="text-xs font-bold text-violet-700/80">
            Select posture to inspect anatomical setup and pillow placement
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-2xl bg-violet-100/80 clay-debossed">
          <button
            onClick={() => {
              sound.playPop(700);
              setSelectedPosture('fowlers');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedPosture === 'fowlers'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            1. Modified Fowler's (30°–45°)
          </button>
          <button
            onClick={() => {
              sound.playPop(750);
              setSelectedPosture('left-lateral');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedPosture === 'left-lateral'
                ? 'bg-white text-violet-950 shadow-clay-pill'
                : 'text-violet-700 hover:text-violet-950'
            }`}
          >
            2. Left-Lateral Recline
          </button>
        </div>
      </div>

      {/* Anatomical Diagram Display */}
      {selectedPosture === 'fowlers' ? (
        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-emerald-50/60 p-5 sm:p-6 clay-debossed space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* SVG Anatomical Diagram: Modified Fowler's */}
            <div className="w-full md:w-1/2 flex justify-center">
              <svg viewBox="0 0 400 220" className="w-full max-w-sm h-auto drop-shadow-sm">
                {/* Bed Surface */}
                <path d="M 30 180 L 370 180" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                <path d="M 60 180 L 60 205 M 340 180 L 340 205" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />

                {/* Pillows stack under torso (30-45 degree angle) */}
                <path d="M 60 176 L 150 110 L 160 135 L 75 180 Z" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="2" rx="6" />
                <text x="75" y="145" fontSize="10" fontWeight="bold" fill="#5B21B6">2–3 Pillows</text>

                {/* Torso propped up 35 degrees */}
                {/* Head */}
                <circle cx="155" cy="85" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                {/* Torso */}
                <path d="M 160 100 L 220 155" stroke="#6D28D9" strokeWidth="16" strokeLinecap="round" />
                {/* Upper Leg slightly bent */}
                <path d="M 220 155 L 290 145" stroke="#6D28D9" strokeWidth="14" strokeLinecap="round" />
                {/* Pillows under calves */}
                <ellipse cx="285" cy="165" rx="30" ry="12" fill="#A7F3D0" stroke="#059669" strokeWidth="2" />
                <text x="260" y="195" fontSize="10" fontWeight="bold" fill="#047857">Calf Pillow</text>
                {/* Lower Leg / Feet */}
                <path d="M 290 145 L 345 158" stroke="#6D28D9" strokeWidth="12" strokeLinecap="round" />

                {/* Incline Angle Indicator */}
                <path d="M 120 180 A 50 50 0 0 1 155 140" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="3 3" />
                <text x="135" y="165" fontSize="12" fontWeight="900" fill="#DC2626">35°–45°</text>

                {/* Blood Flow & Gravity Arrows */}
                <path d="M 320 135 L 250 140" stroke="#10B981" strokeWidth="3" markerEnd="url(#arrow-green)" />
                <text x="250" y="125" fontSize="10" fontWeight="bold" fill="#059669">Venous Return ➔ Heart</text>

                {/* Stomach / Anti-reflux badge */}
                <circle cx="215" cy="140" r="10" fill="#F87171" opacity="0.85" />
                <text x="180" y="120" fontSize="10" fontWeight="bold" fill="#B91C1C">Acid Safe (Below LES)</text>
              </svg>
            </div>

            {/* Checklist details */}
            <div className="w-full md:w-1/2 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Primary Anti-Reflux Posture
              </span>
              <h4 className="text-base font-black text-violet-950">
                Modified Fowler's Posture Instructions:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-bold text-violet-900/90">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Torso Elevated:</strong> Stack 2 to 3 pillows behind head and thoracic spine to form a 35°–45° incline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Leg Support:</strong> Place a folded pillow under calves and knees. This drains pooled venous blood back to the central circulation to stop dizziness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Loose Clothing:</strong> Unbutton tennis waistband or wear loose lounge shorts to prevent intra-abdominal pressure on stomach.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-sky-50/60 p-5 sm:p-6 clay-debossed space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* SVG Diagram: Left Lateral Recovery */}
            <div className="w-full md:w-1/2 flex justify-center">
              <svg viewBox="0 0 400 220" className="w-full max-w-sm h-auto drop-shadow-sm">
                <path d="M 30 180 L 370 180" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                {/* Left side lying silhouette */}
                <ellipse cx="100" cy="130" rx="35" ry="20" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="2" />
                <text x="80" y="135" fontSize="10" fontWeight="bold" fill="#5B21B6">2x Pillows</text>

                {/* Head elevated on pillow */}
                <circle cx="110" cy="110" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
                {/* Body lying on left side */}
                <path d="M 125 125 L 260 150" stroke="#6D28D9" strokeWidth="16" strokeLinecap="round" />
                {/* Knees bent slightly forward */}
                <path d="M 260 150 L 310 165" stroke="#6D28D9" strokeWidth="13" strokeLinecap="round" />
                <ellipse cx="280" cy="165" rx="18" ry="10" fill="#A7F3D0" stroke="#059669" strokeWidth="2" />

                {/* Stomach anatomy callout */}
                <path d="M 180 140 Q 200 165 220 150 Q 230 130 195 125 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="1.5" />
                <text x="175" y="180" fontSize="10" fontWeight="bold" fill="#B91C1C">Stomach (Lower than esophagus)</text>

                <text x="80" y="55" fontSize="11" fontWeight="black" fill="#1E1B4B">Left-Lateral Recovery Posture</text>
                <text x="80" y="72" fontSize="9" fontWeight="bold" fill="#4B5563">Gravity traps sinigang acid safely in gastric reservoir</text>
              </svg>
            </div>

            {/* Checklist details */}
            <div className="w-full md:w-1/2 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
                Secondary Anti-Nausea Posture
              </span>
              <h4 className="text-base font-black text-violet-950">
                Left-Lateral Position Instructions:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-bold text-violet-900/90">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Lie on Left Side:</strong> Because of stomach anatomy (greater curvature), lying on your left side physically prevents acidic contents from splashing into the esophagus.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Head Still Elevated:</strong> Keep your head and upper shoulders raised on 2 pillows (never 0° horizontal).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bend Knees:</strong> Place a small cushion between knees to relieve pelvic tension and support circulation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
