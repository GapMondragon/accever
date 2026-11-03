import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

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
  const [enabled, setEnabled] = useState(true);

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

  const buddiesRef = useRef(buddies);
  buddiesRef.current = buddies;

  // Animation and wandering ticker
  useEffect(() => {
    if (!enabled) return;

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

    // Random action switcher (every 7 to 12 seconds per buddy)
    const actionInterval = window.setInterval(() => {
      setBuddies((prev) =>
        prev.map((buddy) => {
          // 40% chance to switch action on each tick
          if (Math.random() > 0.45) return buddy;

          const cfg = BUDDIES.find((b) => b.id === buddy.id);
          if (!cfg) return buddy;

          const actionKeys = Object.keys(cfg.actions);
          const nextAction =
            actionKeys[Math.floor(Math.random() * actionKeys.length)];

          // Optionally reverse direction when changing actions
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
  }, [enabled]);

  // Pet / Click interaction
  const handlePokeBuddy = (buddyId: string) => {
    sound.playPop(700 + Math.random() * 300);

    setBuddies((prev) =>
      prev.map((b) => {
        if (b.id !== buddyId) return b;
        const cfg = BUDDIES.find((item) => item.id === buddyId);
        if (!cfg) return b;

        // Choose special celebratory action
        let specialAction = 'victory';
        if (buddyId === 'bond') specialAction = 'barking';
        else if (buddyId === 'totodile') specialAction = 'happy_dance';
        else if (buddyId === 'cinnamoroll') specialAction = 'excited';

        const randomPhrase =
          cfg.phrases[Math.floor(Math.random() * cfg.phrases.length)];

        // Clear existing timeout
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

  return (
    <>
      {/* Background Buddies Layer */}
      {enabled && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
          {buddies.map((buddy) => {
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
                  className="transition-transform duration-200 group-hover:scale-115 group-active:scale-95"
                  style={{
                    transform: `scaleX(${buddy.direction})`,
                  }}
                >
                  <img
                    src={gifSrc}
                    alt={`${cfg.name} (${buddy.currentAction})`}
                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)] image-rendering-pixelated"
                    loading="eager"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Toggle Pill in Bottom Corner */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            sound.playPop(850);
            setEnabled((prev) => !prev);
          }}
          className={`clay-btn px-3 py-1.5 text-xs font-black rounded-full flex items-center gap-1.5 shadow-clay-pill transition-all ${
            enabled
              ? 'bg-rose-100 text-rose-950 hover:bg-rose-200'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
          title="Toggle wandering buddies on the background"
        >
          <span>🐾</span>
          <span className="hidden xs:inline">Buddies:</span>
          <span>{enabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </>
  );
};
