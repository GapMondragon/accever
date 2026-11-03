import React, { useState, useEffect, useRef } from 'react';
import { Radio, Play, Pause, SkipForward, Disc } from 'lucide-react';
import { sound } from '../utils/audio';

const TRACKS = [
  { id: 1, title: 'You & Me on a Rainy Afternoon', mood: 'Cozy • Nostalgic', duration: '2:45' },
  { id: 2, title: '3 AM Car Rides & Midnight Boba', mood: 'Dreamy • Sweet', duration: '3:12' },
  { id: 3, title: 'Sunflowers, Laughs & Warm Tea', mood: 'Peaceful • Tender', duration: '2:58' },
  { id: 4, title: 'Every Song Reminds Me of You', mood: 'Warm • In Love', duration: '3:30' },
];

export const ClayRadio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const chordLoopRef = useRef<number | null>(null);
  const chordStepRef = useRef(0);

  const togglePlay = () => {
    sound.playPop(700);
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    sound.playPop(850);
    setTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  // Play gentle lofi chords rhythmically when active
  useEffect(() => {
    if (isPlaying && sound.enabled) {
      sound.playLofiChord(chordStepRef.current);
      chordLoopRef.current = window.setInterval(() => {
        chordStepRef.current = (chordStepRef.current + 1) % 4;
        sound.playLofiChord(chordStepRef.current);
      }, 1600);
    } else {
      if (chordLoopRef.current) {
        clearInterval(chordLoopRef.current);
        chordLoopRef.current = null;
      }
    }

    return () => {
      if (chordLoopRef.current) {
        clearInterval(chordLoopRef.current);
      }
    };
  }, [isPlaying]);

  const currentTrack = TRACKS[trackIndex];

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16">
      <div className="rounded-[36px] bg-pink-200/90 shadow-clay-card p-6 sm:p-10 border-none relative overflow-hidden">
        {/* Top Tag */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-300 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-pink-950 shadow-clay-pill">
            <Radio className="w-3.5 h-3.5 text-pink-700" />
            Tactile Clay Soundtrack
          </div>
          <span className="text-xs font-bold text-pink-900/70 hidden sm:inline">
            Synthesized live in your browser 🎧
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Radio Controls Chassis */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-clay-indigo-dark tracking-tight">
              Our Little Clay Radio 📻🎶
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-pink-950/80 leading-relaxed">
              Soft harmonic lo-fi chords tuned for cuddles, studying together, or relaxing after a long day.
            </p>

            {/* Recessed Track Display (Debossed Screen) */}
            <div className="rounded-2xl bg-pink-100/90 p-4 clay-debossed flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-pink-300 shadow-clay-rose flex items-center justify-center text-pink-900 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
                  <Disc className="w-5 h-5 text-pink-800" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-700">
                    {currentTrack.mood}
                  </span>
                  <p className="text-xs sm:text-sm font-black text-violet-950 truncate max-w-[200px] sm:max-w-xs">
                    {currentTrack.title}
                  </p>
                </div>
              </div>

              {/* Animated Clay Equalizer Bars */}
              <div className="flex items-end gap-1 h-6">
                <span className={`w-1.5 rounded-full bg-pink-500 transition-all duration-300 ${isPlaying ? 'h-6 animate-pulse' : 'h-2'}`} />
                <span className={`w-1.5 rounded-full bg-violet-500 transition-all duration-200 ${isPlaying ? 'h-4 animate-bounce' : 'h-2'}`} />
                <span className={`w-1.5 rounded-full bg-emerald-500 transition-all duration-300 ${isPlaying ? 'h-5 animate-pulse' : 'h-2'}`} />
                <span className={`w-1.5 rounded-full bg-pink-600 transition-all duration-250 ${isPlaying ? 'h-3 animate-bounce' : 'h-2'}`} />
              </div>
            </div>

            {/* Clay Control Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={togglePlay}
                className="clay-btn bg-pink-400 hover:bg-pink-300 text-pink-950 px-6 py-3 text-xs sm:text-sm shadow-clay-rose-btn flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-pink-950" />
                    <span>Pause Radio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-pink-950" />
                    <span>Play Lo-Fi Chords</span>
                  </>
                )}
              </button>

              <button
                onClick={nextTrack}
                className="clay-btn bg-white/80 hover:bg-white text-violet-950 px-4 py-3 text-xs sm:text-sm shadow-clay-pill flex items-center gap-1.5"
              >
                <SkipForward className="w-4 h-4 text-violet-700" />
                <span>Next Track</span>
              </button>
            </div>
          </div>

          {/* Right Visual Clay Vinyl Player Graphic */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-violet-200 via-pink-200 to-amber-100 shadow-clay-card p-4 relative flex items-center justify-center">
              {/* Outer Grooves */}
              <div className="w-44 h-44 rounded-full bg-violet-900/10 clay-debossed flex items-center justify-center">
                {/* Vinyl Center */}
                <div className={`w-24 h-24 rounded-full bg-pink-300 shadow-clay-rose flex flex-col items-center justify-center text-center p-2 transition-transform duration-700 ${isPlaying ? 'rotate-180 scale-105' : 'rotate-0'}`}>
                  <span className="text-xl">🌸</span>
                  <span className="text-[9px] font-black uppercase text-pink-950 tracking-wider">
                    Accever FM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
