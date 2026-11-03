import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import { ChevronUp, Sparkles, X } from 'lucide-react';

export type BuddyMode = 'all' | 'random' | 'anya' | 'bond' | 'totodile' | 'cinnamoroll' | 'none';

interface BuddyConfig {
  id: string;
  name: string;
  actions: { [key: string]: string };
  phrases: string[];
  defaultY: number; // percentage from top (e.g. 88 for floor, 15 for sky)
  isFlying?: boolean;
}

const BUDDIES: BuddyConfig[] = [
  {
    id: 'anya',
    name: 'Anya',
    actions: {
      idle: '/characters/anya_idle.gif',
      walk: '/characters/anya_walk.gif',
      run: '/characters/anya_run.gif',
      shocked: '/characters/anya_shocked.gif',
      victory: '/characters/anya_victory.gif',
    },
    phrases: [
      'Waku waku! ✨',
      'No lying flat! 🚫',
      'Heh! 🥜',
      'Rest up well! 💖',
      'Chimera says hydrate! 🦁',
    ],
    defaultY: 86,
  },
  {
    id: 'bond',
    name: 'Bond',
    actions: {
      idle: '/characters/bond_idle.gif',
      walk: '/characters/bond_walk.gif',
      run: '/characters/bond_run.gif',
      barking: '/characters/bond_barking.gif',
      sleeping: '/characters/bond_sleeping.gif',
    },
    phrases: [
      'Borf! 🐾',
      'I foresee recovery! 🔮',
      'Nap time~ 💤',
      'Good doggo watch! 🐕',
      'Borf borf! ✨',
    ],
    defaultY: 88,
  },
  {
    id: 'totodile',
    name: 'Totodile',
    actions: {
      idle: '/characters/totodile_idle.gif',
      walk: '/characters/totodile_walk.gif',
      attack: '/characters/totodile_attack.gif',
      jump: '/characters/totodile_jump.gif',
      happy_dance: '/characters/totodile_happy_dance.gif',
    },
    phrases: [
      'Toto-dile! 🐊',
      'Sip that Pocari! 💧',
      'Happy dance! 🎵',
      'Ankle pumps! ⚡',
      'Bite the presyncope! 🦷',
    ],
    defaultY: 87,
  },
  {
    id: 'cinnamoroll',
    name: 'Cinnamoroll',
    actions: {
      idle: '/characters/cinnamoroll_idle.gif',
      hop: '/characters/cinnamoroll_hop.gif',
      fly: '/characters/cinnamoroll_fly.gif',
      excited: '/characters/cinnamoroll_excited.gif',
      sleep: '/characters/cinnamoroll_sleep.gif',
    },
    phrases: [
      'Float like a cloud~ ☁️',
      'Sweet dreams! 💤',
      'You got this! 🌸',
      'Healing vibes! 💖',
      'Yay yay! ⭐',
    ],
    defaultY: 18,
    isFlying: true,
  },
];

const MODE_OPTIONS: { id: BuddyMode; label: string; icon: string; preview: string }[] = [
  { id: 'all', label: 'All together', icon: '✨', preview: '/characters/anya_victory.gif' },
  { id: 'random', label: 'Random', icon: '🎲', preview: '/characters/totodile_happy_dance.gif' },
  { id: 'anya', label: 'Anya', icon: '🥜', preview: '/characters/anya_idle.gif' },
  { id: 'bond', label: 'Bond', icon: '🐶', preview: '/characters/bond_idle.gif' },
  { id: 'totodile', label: 'Totodile', icon: '🐊', preview: '/characters/totodile_idle.gif' },
  { id: 'cinnamoroll', label: 'Cinnamoroll', icon: '☁️', preview: '/characters/cinnamoroll_fly.gif' },
];

interface BuddyState {
  id: string;
  x: number; // percentage 0-95
  y: number; // percentage 0-95
  direction: 1 | -1; // 1 = right, -1 = left
  currentAction: string;
  speechText: string | null;
  speechTimeout: number | null;
}

export const BackgroundBuddies: React.FC = () => {
  const [mode, setMode] = useState<BuddyMode>('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [randomBuddyId, setRandomBuddyId] = useState<string>('anya');
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize buddies at varied spread positions
  const [buddies, setBuddies] = useState<BuddyState[]>([
    {
      id: 'anya',
      x: 10,
      y: 86,
      direction: 1,
      currentAction: 'walk',
      speechText: null,
      speechTimeout: null,
    },
    {
      id: 'bond',
      x: 35,
      y: 88,
      direction: 1,
      currentAction: 'idle',
      speechText: null,
      speechTimeout: null,
    },
    {
      id: 'totodile',
      x: 65,
      y: 87,
      direction: -1,
      currentAction: 'happy_dance',
      speechText: null,
      speechTimeout: null,
    },
    {
      id: 'cinnamoroll',
      x: 80,
      y: 16,
      direction: -1,
      currentAction: 'fly',
      speechText: null,
      speechTimeout: null,
    },
  ]);

  // Handle clicking outside of menu to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Periodic random buddy picker when in 'random' mode
  useEffect(() => {
    if (mode !== 'random') return;

    // Pick initial random buddy
    const allIds = BUDDIES.map((b) => b.id);
    setRandomBuddyId(allIds[Math.floor(Math.random() * allIds.length)]);

    // Rotate every 20 seconds
    const interval = window.setInterval(() => {
      setRandomBuddyId((prev) => {
        const remaining = allIds.filter((id) => id !== prev);
        return remaining[Math.floor(Math.random() * remaining.length)];
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [mode]);

  // Filter which buddies are visible
  const visibleBuddies = buddies.filter((buddy) => {
    if (mode === 'none') return false;
    if (mode === 'all') return true;
    if (mode === 'random') return buddy.id === randomBuddyId;
    return buddy.id === mode;
  });

  // Animation and wandering ticker
  useEffect(() => {
    if (mode === 'none') return;

    // Movement loop (runs every 60ms)
    const moveInterval = window.setInterval(() => {
      setBuddies((prev) =>
        prev.map((buddy) => {
          const cfg = BUDDIES.find((b) => b.id === buddy.id);
          if (!cfg) return buddy;

          const isMoving =
            buddy.currentAction === 'walk' ||
            buddy.currentAction === 'run' ||
            buddy.currentAction === 'hop' ||
            buddy.currentAction === 'fly';

          if (!isMoving) return buddy;

          const speed =
            buddy.currentAction === 'run'
              ? 0.4
              : buddy.currentAction === 'fly'
              ? 0.25
              : 0.15;

          let newX = buddy.x + speed * buddy.direction;
          let newDir = buddy.direction;

          // Turn around at viewport boundaries
          if (newX > 92) {
            newX = 92;
            newDir = -1;
          } else if (newX < 4) {
            newX = 4;
            newDir = 1;
          }

          // Subtle floating wave for flying buddies
          let newY = buddy.y;
          if (cfg.isFlying) {
            newY = cfg.defaultY + Math.sin(Date.now() / 800) * 4;
          }

          return {
            ...buddy,
            x: newX,
            y: newY,
            direction: newDir,
          };
        })
      );
    }, 60);

    // Random action switcher (every 4.5 seconds with 45% chance per buddy)
    const actionInterval = window.setInterval(() => {
      setBuddies((prev) =>
        prev.map((buddy) => {
          if (Math.random() > 0.45) return buddy;

          const cfg = BUDDIES.find((b) => b.id === buddy.id);
          if (!cfg) return buddy;

          const actionKeys = Object.keys(cfg.actions);
          const nextAction =
            actionKeys[Math.floor(Math.random() * actionKeys.length)];

          const reverseDir = Math.random() > 0.6 ? ((buddy.direction * -1) as 1 | -1) : buddy.direction;

          return {
            ...buddy,
            currentAction: nextAction,
            direction: reverseDir,
          };
        })
      );
    }, 4500);

    return () => {
      clearInterval(moveInterval);
      clearInterval(actionInterval);
    };
  }, [mode]);

  // Pet / Click interaction
  const handlePokeBuddy = (buddyId: string) => {
    sound.playPop(700 + Math.random() * 300);

    setBuddies((prev) =>
      prev.map((b) => {
        if (b.id !== buddyId) return b;
        const cfg = BUDDIES.find((item) => item.id === buddyId);
        if (!cfg) return b;

        let specialAction = 'victory';
        if (buddyId === 'bond') specialAction = 'barking';
        else if (buddyId === 'totodile') specialAction = 'happy_dance';
        else if (buddyId === 'cinnamoroll') specialAction = 'excited';

        const randomPhrase =
          cfg.phrases[Math.floor(Math.random() * cfg.phrases.length)];

        if (b.speechTimeout) {
          window.clearTimeout(b.speechTimeout);
        }

        const timeoutId = window.setTimeout(() => {
          setBuddies((current) =>
            current.map((item) =>
              item.id === buddyId ? { ...item, speechText: null, speechTimeout: null } : item
            )
          );
        }, 2800);

        return {
          ...b,
          currentAction: specialAction,
          speechText: randomPhrase,
          speechTimeout: timeoutId,
        };
      })
    );
  };

  const currentOption = MODE_OPTIONS.find((opt) => opt.id === mode);

  return (
    <>
      {/* Background Buddies Layer */}
      {mode !== 'none' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
          {visibleBuddies.map((buddy) => {
            const cfg = BUDDIES.find((b) => b.id === buddy.id);
            if (!cfg) return null;

            const gifSrc = cfg.actions[buddy.currentAction] || cfg.actions.idle;

            return (
              <div
                key={buddy.id}
                style={{
                  left: `${buddy.x}%`,
                  top: `${buddy.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute pointer-events-auto transition-transform duration-100 ease-linear cursor-pointer group"
                onClick={() => handlePokeBuddy(buddy.id)}
                title={`Click to pet ${cfg.name}!`}
              >
                {/* Speech Bubble */}
                {buddy.speechText && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-violet-950 font-black text-[11px] sm:text-xs px-2.5 py-1 rounded-2xl shadow-clay-pill border border-violet-100 animate-bounce z-50">
                    {buddy.speechText}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/95" />
                  </div>
                )}

                {/* Character GIF */}
                <div
                  className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95 touch-manipulation"
                  style={{
                    transform: `scaleX(${buddy.direction})`,
                    touchAction: 'pan-y',
                  }}
                >
                  <img
                    src={gifSrc}
                    alt={`${cfg.name} (${buddy.currentAction})`}
                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)] image-pixelated pointer-events-none"
                    loading="eager"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Character Chooser Button & Menu in Bottom Corner */}
      <div ref={menuRef} className="fixed bottom-4 right-4 z-40 touch-manipulation">
        {/* Popover Selection Menu */}
        {menuOpen && (
          <div className="absolute bottom-14 sm:bottom-16 right-0 mb-2 w-60 sm:w-68 max-h-[75vh] overflow-y-auto rounded-[28px] bg-white/95 backdrop-blur-md p-3 shadow-clay-card border border-rose-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between px-2.5 py-1 mb-2 border-b border-rose-100/70">
              <span className="text-xs font-black uppercase tracking-wider text-rose-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Choose Character
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded-full text-violet-400 hover:text-violet-700 hover:bg-rose-50 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Character Options List */}
            <div className="space-y-1.5">
              {MODE_OPTIONS.map((option) => {
                const isActive = mode === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      sound.playPop(800);
                      setMode(option.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full min-h-[44px] px-3 py-2 rounded-2xl flex items-center justify-between text-left text-xs font-black transition-all ${
                      isActive
                        ? 'bg-rose-200 text-rose-950 shadow-clay-pill ring-2 ring-rose-400'
                        : 'bg-rose-50/70 text-violet-950 hover:bg-rose-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] uppercase font-black tracking-wider text-rose-800 bg-rose-300/70 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Hide / Mute Option */}
              <div className="pt-1 border-t border-rose-100/70 mt-1">
                <button
                  onClick={() => {
                    sound.playPop(650);
                    setMode(mode === 'none' ? 'all' : 'none');
                    setMenuOpen(false);
                  }}
                  className={`w-full min-h-[40px] px-3 py-1.5 rounded-xl flex items-center justify-between text-left text-xs font-bold transition-all ${
                    mode === 'none'
                      ? 'bg-stone-200 text-stone-800 font-black'
                      : 'text-stone-500 hover:bg-stone-100'
                  }`}
                >
                  <span>{mode === 'none' ? '✓ Buddies Hidden' : 'Hide Buddies'}</span>
                  <span className="text-stone-400 text-[11px]">
                    {mode === 'none' ? 'Off' : 'Turn Off'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => {
            sound.playPop(850);
            setMenuOpen((prev) => !prev);
          }}
          className={`clay-btn min-h-[44px] px-3.5 py-2 text-xs font-black rounded-full flex items-center gap-2 shadow-clay-pill transition-all ${
            mode !== 'none'
              ? 'bg-rose-100 text-rose-950 hover:bg-rose-200'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
          title="Choose character companions"
        >
          <span className="text-sm">{currentOption?.icon || '🐾'}</span>
          <span className="font-extrabold">
            {mode === 'none' ? 'Buddies: Off' : currentOption?.label || 'All together'}
          </span>
          <ChevronUp
            className={`w-3.5 h-3.5 text-rose-800 transition-transform duration-200 ${
              menuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </>
  );
};
