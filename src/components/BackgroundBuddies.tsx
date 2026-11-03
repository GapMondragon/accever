import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sound } from '../utils/audio';
import { ChevronUp, Sparkles, X, Megaphone, Cloud, Move } from 'lucide-react';

export type BuddyMode = 'all' | 'random' | 'anya' | 'bond' | 'totodile' | 'cinnamoroll' | 'none';

export interface BuddyConfig {
  id: string;
  name: string;
  actions: { [key: string]: string };
  phrases: string[];
  dragPhrases: string[];
  dragAction: string;
  landAction: string;
  isFlying?: boolean;
  walkSpeed: number; // px/sec
  runSpeed: number; // px/sec
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
    dragPhrases: [
      'Waku waku! Airborne Anya! ✨',
      'No dropping Anya! 🥜',
      'Heh, Anya is flying! 🚀',
    ],
    dragAction: 'shocked',
    landAction: 'victory',
    walkSpeed: 50,
    runSpeed: 90,
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
    dragPhrases: [
      'Borf?! Floating doggo! 🐾',
      'Where are we going? 🐶',
      'Careful with floof! 🔮',
    ],
    dragAction: 'barking',
    landAction: 'idle',
    walkSpeed: 38,
    runSpeed: 75,
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
    dragPhrases: [
      'Totodile jump! 🐊',
      'Gaooo! High in the sky! ⚡',
      'Wheee! 💦',
    ],
    dragAction: 'jump',
    landAction: 'happy_dance',
    walkSpeed: 55,
    runSpeed: 95,
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
    dragPhrases: [
      'Floating with you~ ☁️',
      'Up, up, and away! 🌸',
      'Wheeeee! ⭐',
    ],
    dragAction: 'fly',
    landAction: 'excited',
    isFlying: true,
    walkSpeed: 45,
    runSpeed: 75,
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

export interface Platform {
  id: string;
  name: string;
  top: number;
  left: number;
  right: number;
  width: number;
  height: number;
  type: 'section' | 'perch' | 'ground';
}

interface BuddyPhysicalState {
  id: string;
  x: number; // page coordinate X (px) - center
  y: number; // page coordinate Y (px) - bottom of feet
  vx: number; // px/sec
  vy: number; // px/sec
  facing: 1 | -1;
  isDragging: boolean;
  isGrounded: boolean;
  groundedPlatformId: string | null;
  currentAction: string;
  speechText: string | null;
  speechTimeout: number | null;
  sparkleUntil: number;
  dragTilt: number; // degrees
}

export const BackgroundBuddies: React.FC = () => {
  const [mode, setMode] = useState<BuddyMode>('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [randomBuddyId, setRandomBuddyId] = useState<string>('anya');
  const menuRef = useRef<HTMLDivElement>(null);

  // Cached platforms detected from DOM
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const platformsRef = useRef<Platform[]>([]);
  platformsRef.current = platforms;

  // Active dragged buddy ID and nearest platform below for landing indicator
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [candidatePlatform, setCandidatePlatform] = useState<Platform | null>(null);

  // Pointer drag tracking ref
  const dragTracker = useRef<{
    pointerId: number;
    buddyId: string;
    startX: number;
    startY: number;
    startTime: number;
    offsetX: number;
    offsetY: number;
    lastX: number;
    lastY: number;
    lastTime: number;
    vx: number;
    vy: number;
    hasMoved: boolean;
  } | null>(null);

  // Physical buddies state
  const [buddies, setBuddies] = useState<BuddyPhysicalState[]>([
    {
      id: 'anya',
      x: 180,
      y: 420,
      vx: 0,
      vy: 0,
      facing: 1,
      isDragging: false,
      isGrounded: true,
      groundedPlatformId: 'platform-vitals',
      currentAction: 'walk',
      speechText: null,
      speechTimeout: null,
      sparkleUntil: 0,
      dragTilt: 0,
    },
    {
      id: 'bond',
      x: 360,
      y: 420,
      vx: 0,
      vy: 0,
      facing: 1,
      isDragging: false,
      isGrounded: true,
      groundedPlatformId: 'platform-vitals',
      currentAction: 'idle',
      speechText: null,
      speechTimeout: null,
      sparkleUntil: 0,
      dragTilt: 0,
    },
    {
      id: 'totodile',
      x: 520,
      y: 780,
      vx: 0,
      vy: 0,
      facing: -1,
      isDragging: false,
      isGrounded: true,
      groundedPlatformId: 'platform-postures',
      currentAction: 'happy_dance',
      speechText: null,
      speechTimeout: null,
      sparkleUntil: 0,
      dragTilt: 0,
    },
    {
      id: 'cinnamoroll',
      x: 680,
      y: 460,
      vx: 0,
      vy: 0,
      facing: -1,
      isDragging: false,
      isGrounded: false,
      groundedPlatformId: null,
      currentAction: 'fly',
      speechText: null,
      speechTimeout: null,
      sparkleUntil: 0,
      dragTilt: 0,
    },
  ]);

  const buddiesRef = useRef<BuddyPhysicalState[]>(buddies);
  buddiesRef.current = buddies;

  // Platform Detection Scanner using page coordinates
  const scanPlatforms = useCallback((): Platform[] => {
    const list: Platform[] = [];
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Minimum allowed platform height: must be at or below Vitals Dashboard
    const vitalsEl = document.getElementById('platform-vitals');
    const minAllowedTop = vitalsEl
      ? vitalsEl.getBoundingClientRect().top + scrollY - 20
      : 350;

    // 1. Elements marked with data-buddy-platform or card classes
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-buddy-platform="true"], .shadow-clay-card'
    );

    elements.forEach((el, idx) => {
      // Exclude header, overview banner, menu, and buddy layers
      if (
        el.closest('header') ||
        el.closest('#buddy-menu-root') ||
        el.closest('#buddy-actors-layer') ||
        el.closest('#buddy-perch-decor') ||
        el.getAttribute('data-buddy-platform') === 'false' ||
        el.closest('[data-buddy-platform="false"]') ||
        el.id === 'clinical-overview-banner' ||
        el.id === 'platform-overview' ||
        el.id === 'platform-header'
      ) {
        return;
      }

      const rect = el.getBoundingClientRect();
      // Skip hidden, zero-sized, or too small elements
      if (rect.width < 80 || rect.height < 25) return;

      const platTop = rect.top + scrollY;
      const platLeft = rect.left + scrollX;

      // STRICT CHECK: Reject any platform positioned above the Vitals Dashboard
      if (platTop < minAllowedTop) {
        return;
      }

      list.push({
        id: el.id || `section-platform-${idx}`,
        name: el.getAttribute('data-platform-name') || 'Ledge',
        top: platTop,
        left: platLeft,
        right: platLeft + rect.width,
        width: rect.width,
        height: rect.height,
        type: el.dataset.platformType === 'perch' ? 'perch' : 'section',
      });
    });

    // 2. Document floor platform
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );
    const docWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      window.innerWidth
    );

    list.push({
      id: 'ground-floor',
      name: 'Ground Floor',
      top: docHeight - 35,
      left: 0,
      right: docWidth,
      width: docWidth,
      height: 40,
      type: 'ground',
    });

    return list;
  }, []);

  // Sync platforms on mount, resize, scroll, and periodic ticks
  useEffect(() => {
    const update = () => {
      const scanned = scanPlatforms();
      setPlatforms(scanned);
    };

    update();
    const handleResize = () => update();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Periodic check every 1.5 seconds to account for dynamic accordion toggles
    const interval = window.setInterval(update, 1500);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearInterval(interval);
    };
  }, [scanPlatforms]);

  // Initial snap to visible platforms once detected
  const hasInitializedPositions = useRef(false);
  useEffect(() => {
    if (hasInitializedPositions.current || platforms.length < 2) return;

    // Match buddies to appropriate initial platforms (excluding overview banner)
    const vitalsPlat = platforms.find((p) => p.id === 'platform-vitals') || platforms[0];
    const posturesPlat = platforms.find((p) => p.id === 'platform-postures') || vitalsPlat;
    const skyPerch = platforms.find((p) => p.id === 'perch-cloud');

    setBuddies((prev) =>
      prev.map((b) => {
        if (b.id === 'anya') {
          return {
            ...b,
            x: vitalsPlat.left + Math.min(120, vitalsPlat.width * 0.25),
            y: vitalsPlat.top,
            isGrounded: true,
            groundedPlatformId: vitalsPlat.id,
          };
        }
        if (b.id === 'bond') {
          return {
            ...b,
            x: vitalsPlat.left + Math.min(260, vitalsPlat.width * 0.55),
            y: vitalsPlat.top,
            isGrounded: true,
            groundedPlatformId: vitalsPlat.id,
          };
        }
        if (b.id === 'totodile') {
          return {
            ...b,
            x: posturesPlat.left + Math.min(180, posturesPlat.width * 0.4),
            y: posturesPlat.top,
            isGrounded: true,
            groundedPlatformId: posturesPlat.id,
          };
        }
        if (b.id === 'cinnamoroll') {
          const target = skyPerch || vitalsPlat;
          return {
            ...b,
            x: target.left + target.width * 0.5,
            y: target.top - 18,
            isGrounded: false,
            groundedPlatformId: null,
          };
        }
        return b;
      })
    );

    hasInitializedPositions.current = true;
  }, [platforms]);

  // Handle clicking outside menu to dismiss
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

  // Periodic random companion switcher when mode === 'random'
  useEffect(() => {
    if (mode !== 'random') return;

    const allIds = BUDDIES.map((b) => b.id);
    setRandomBuddyId(allIds[Math.floor(Math.random() * allIds.length)]);

    const interval = window.setInterval(() => {
      setRandomBuddyId((prev) => {
        const remaining = allIds.filter((id) => id !== prev);
        return remaining[Math.floor(Math.random() * remaining.length)];
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [mode]);

  // Random behavior and walk state switcher every 4 seconds
  useEffect(() => {
    if (mode === 'none') return;

    const interval = window.setInterval(() => {
      setBuddies((prev) =>
        prev.map((buddy) => {
          if (buddy.isDragging) return buddy;
          if (Math.random() > 0.45) return buddy;

          const cfg = BUDDIES.find((b) => b.id === buddy.id);
          if (!cfg) return buddy;

          const actionKeys = Object.keys(cfg.actions);
          const nextAction = actionKeys[Math.floor(Math.random() * actionKeys.length)];
          const flip = Math.random() > 0.65 ? ((buddy.facing * -1) as 1 | -1) : buddy.facing;

          return {
            ...buddy,
            currentAction: nextAction,
            facing: flip,
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [mode]);

  // Main 60fps Physics & Mathematics Simulation Loop
  const lastTimeRef = useRef<number>(performance.now());
  useEffect(() => {
    if (mode === 'none') return;

    let animId: number;

    const physicsLoop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05); // Cap to 50ms to prevent tunneling
      lastTimeRef.current = now;

      const currentPlatforms = platformsRef.current;
      const firstPlat = currentPlatforms[0];
      const minAllowedY = firstPlat ? firstPlat.top - 35 : 350;
      const docWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        window.innerWidth
      );

      setBuddies((prev) =>
        prev.map((buddy) => {
          if (buddy.isDragging) return buddy;

          const cfg = BUDDIES.find((b) => b.id === buddy.id);
          if (!cfg) return buddy;

          // 1. Case: Grounded on an active platform
          if (buddy.isGrounded && buddy.groundedPlatformId) {
            const platform = currentPlatforms.find((p) => p.id === buddy.groundedPlatformId);

            if (platform) {
              // Surface height lock (handles page accordion/layout changes)
              let newY = platform.top;
              let newX = buddy.x;
              let newFacing = buddy.facing;

              // Check if walking
              const isMoving =
                buddy.currentAction === 'walk' ||
                buddy.currentAction === 'run' ||
                buddy.currentAction === 'hop' ||
                buddy.currentAction === 'attack';

              if (isMoving) {
                const speed =
                  buddy.currentAction === 'run' ? cfg.runSpeed : cfg.walkSpeed;
                newX += speed * buddy.facing * dt;

                // Mathematical Edge Detection: bounce when reaching platform boundaries
                const minX = platform.left + 22;
                const maxX = platform.right - 22;

                if (newX <= minX) {
                  newX = minX;
                  newFacing = 1;
                } else if (newX >= maxX) {
                  newX = maxX;
                  newFacing = -1;
                }
              }

              // Subtle hovering for flying companions resting on perches
              if (cfg.isFlying && buddy.currentAction === 'fly') {
                newY = platform.top - 14 + Math.sin(now / 500) * 5;
              }

              return {
                ...buddy,
                x: newX,
                y: newY,
                vx: 0,
                vy: 0,
                facing: newFacing,
              };
            } else {
              // Platform removed or collapsed: drop character into physics
              return {
                ...buddy,
                isGrounded: false,
                groundedPlatformId: null,
              };
            }
          }

          // 2. Case: Flying buddy in open air (Cinnamoroll)
          if (cfg.isFlying) {
            let newX = buddy.x + buddy.facing * (cfg.walkSpeed * 0.7) * dt;
            let newFacing = buddy.facing;

            // Float smoothly in sine wave
            let newY = buddy.y + Math.sin(now / 700) * 0.75 + buddy.vy * dt;
            const newVy = buddy.vy * Math.pow(0.85, dt * 60);

            // Ceiling clamp: never float up into header or overview banner
            if (newY < minAllowedY) {
              newY = minAllowedY;
            }

            // Turn around at document edges
            if (newX < 35) {
              newX = 35;
              newFacing = 1;
            } else if (newX > docWidth - 35) {
              newX = docWidth - 35;
              newFacing = -1;
            }

            return {
              ...buddy,
              x: newX,
              y: newY,
              vy: newVy,
              facing: newFacing,
            };
          }

          // 3. Case: Airborne with Gravity (Continuous Collision Detection Math)
          const GRAVITY = 1150; // px/s²
          const newVy = buddy.vy + GRAVITY * dt;
          const airDrag = Math.pow(0.95, dt * 60);
          const newVx = buddy.vx * airDrag;

          const oldY = buddy.y;
          let proposedY = oldY + newVy * dt;
          let proposedX = buddy.x + newVx * dt;

          // Ceiling clamp: never fly up into header or overview banner
          if (proposedY < minAllowedY) {
            proposedY = minAllowedY;
          }

          // Screen horizontal clamping
          if (proposedX < 30) proposedX = 30;
          if (proposedX > docWidth - 30) proposedX = docWidth - 30;

          // Raycast / Segment intersection with all platform horizontal ledges
          let landedPlatform: Platform | null = null;

          for (const plat of currentPlatforms) {
            // Foot position within platform horizontal footprint
            const isHorizontallyOver =
              plat.left - 15 <= proposedX && proposedX <= plat.right + 15;

            // Vertical collision: old position above or at top, proposed position at or below top
            const didCrossSurface =
              oldY <= plat.top + 10 && proposedY >= plat.top;

            if (isHorizontallyOver && didCrossSurface && newVy >= 0) {
              if (!landedPlatform || plat.top < landedPlatform.top) {
                landedPlatform = plat;
              }
            }
          }

          if (landedPlatform) {
            // Touchdown on platform!
            sound.playSquish();
            return {
              ...buddy,
              x: proposedX,
              y: landedPlatform.top,
              vx: 0,
              vy: 0,
              isGrounded: true,
              groundedPlatformId: landedPlatform.id,
              currentAction: cfg.landAction,
              sparkleUntil: Date.now() + 800,
            };
          }

          return {
            ...buddy,
            x: proposedX,
            y: proposedY,
            vx: newVx,
            vy: newVy,
          };
        })
      );

      animId = requestAnimationFrame(physicsLoop);
    };

    animId = requestAnimationFrame(physicsLoop);
    return () => cancelAnimationFrame(animId);
  }, [mode]);

  // Pointer Down: Grab character
  const handlePointerDown = (buddyId: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const buddy = buddies.find((b) => b.id === buddyId);
    if (!buddy) return;

    sound.playSquish();

    const pageX = e.clientX + window.scrollX;
    const pageY = e.clientY + window.scrollY;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignored if capture unsupported
    }

    dragTracker.current = {
      pointerId: e.pointerId,
      buddyId,
      startX: pageX,
      startY: pageY,
      startTime: performance.now(),
      offsetX: pageX - buddy.x,
      offsetY: pageY - buddy.y,
      lastX: buddy.x,
      lastY: buddy.y,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
      hasMoved: false,
    };

    setActiveDragId(buddyId);

    const cfg = BUDDIES.find((b) => b.id === buddyId);
    const dragPhrase = cfg?.dragPhrases[Math.floor(Math.random() * cfg.dragPhrases.length)];

    setBuddies((prev) =>
      prev.map((b) => {
        if (b.id !== buddyId) return b;
        return {
          ...b,
          isDragging: true,
          isGrounded: false,
          groundedPlatformId: null,
          currentAction: cfg?.dragAction || 'shocked',
          speechText: dragPhrase || 'Wheee! ✨',
          dragTilt: 0,
        };
      })
    );
  };

  // Pointer Move: Drag with physics tracking and auto-scrolling
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const tracker = dragTracker.current;
    if (!tracker || tracker.pointerId !== e.pointerId) return;

    const pageX = e.clientX + window.scrollX;
    const pageY = e.clientY + window.scrollY;
    const now = performance.now();
    const dt = Math.max((now - tracker.lastTime) / 1000, 0.008);

    const distFromStart = Math.hypot(pageX - tracker.startX, pageY - tracker.startY);
    if (distFromStart > 5) {
      tracker.hasMoved = true;
    }

    const firstPlat = platformsRef.current[0];
    const minAllowedY = firstPlat ? firstPlat.top - 35 : 350;

    const currentX = pageX - tracker.offsetX;
    const currentY = Math.max(minAllowedY, pageY - tracker.offsetY);

    // Measure throw velocity with exponential smoothing
    const instVx = (currentX - tracker.lastX) / dt;
    const instVy = (currentY - tracker.lastY) / dt;
    tracker.vx = 0.5 * tracker.vx + 0.5 * instVx;
    tracker.vy = 0.5 * tracker.vy + 0.5 * instVy;
    tracker.lastX = currentX;
    tracker.lastY = currentY;
    tracker.lastTime = now;

    // Fluid drag tilt math
    const dragTilt = Math.max(-20, Math.min(20, tracker.vx * 0.035));

    // Responsive Edge Viewport Auto-Scroll (Mobile & Desktop)
    if (e.clientY < 75) {
      window.scrollBy({ top: -Math.min(16, (75 - e.clientY) / 3), behavior: 'auto' });
    } else if (e.clientY > window.innerHeight - 75) {
      window.scrollBy({
        top: Math.min(16, (e.clientY - (window.innerHeight - 75)) / 3),
        behavior: 'auto',
      });
    }

    // Raycast: calculate candidate platform directly beneath character
    const underPlatforms = platformsRef.current.filter(
      (p) => p.left - 15 <= currentX && currentX <= p.right + 15 && p.top >= currentY - 20
    );
    underPlatforms.sort((a, b) => a.top - b.top);
    setCandidatePlatform(underPlatforms[0] || null);

    setBuddies((prev) =>
      prev.map((b) => {
        if (b.id !== tracker.buddyId) return b;
        return {
          ...b,
          x: currentX,
          y: currentY,
          dragTilt,
        };
      })
    );
  };

  // Pointer Up: Drop or Pet
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const tracker = dragTracker.current;
    if (!tracker || tracker.pointerId !== e.pointerId) return;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    const duration = performance.now() - tracker.startTime;
    const wasClick = !tracker.hasMoved && duration < 380;
    const buddyId = tracker.buddyId;
    const cfg = BUDDIES.find((b) => b.id === buddyId);

    dragTracker.current = null;
    setActiveDragId(null);
    setCandidatePlatform(null);

    if (wasClick) {
      // It's a Pet / Tap interaction!
      handlePokeBuddy(buddyId);
      setBuddies((prev) =>
        prev.map((b) => (b.id === buddyId ? { ...b, isDragging: false, dragTilt: 0 } : b))
      );
      return;
    }

    // It was a drag & drop release!
    sound.playPop(850);

    const buddy = buddiesRef.current.find((b) => b.id === buddyId);
    if (!buddy) return;

    // Check if directly dropped onto a platform ledge (within 35px threshold)
    const candidates = platformsRef.current.filter(
      (p) =>
        p.left - 20 <= buddy.x &&
        buddy.x <= p.right + 20 &&
        Math.abs(buddy.y - p.top) <= 35
    );

    candidates.sort((a, b) => Math.abs(buddy.y - a.top) - Math.abs(buddy.y - b.top));
    const directSnap = candidates[0];

    if (directSnap) {
      // Immediate clean snap to platform
      sound.playSquish();
      setBuddies((prev) =>
        prev.map((b) => {
          if (b.id !== buddyId) return b;
          return {
            ...b,
            y: directSnap.top,
            vx: 0,
            vy: 0,
            isDragging: false,
            isGrounded: true,
            groundedPlatformId: directSnap.id,
            currentAction: cfg?.landAction || 'idle',
            speechText: `Landed on ${directSnap.name}! ✨`,
            sparkleUntil: Date.now() + 850,
            dragTilt: 0,
          };
        })
      );
    } else {
      // Release into ballistic parabolic physics
      const clampedVx = Math.max(-450, Math.min(450, tracker.vx));
      const clampedVy = Math.max(-350, Math.min(350, tracker.vy));

      setBuddies((prev) =>
        prev.map((b) => {
          if (b.id !== buddyId) return b;
          return {
            ...b,
            vx: clampedVx,
            vy: clampedVy,
            isDragging: false,
            isGrounded: false,
            groundedPlatformId: null,
            dragTilt: 0,
          };
        })
      );
    }
  };

  // Pet / Click interaction for speech & fun reactions
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

        const randomPhrase = cfg.phrases[Math.floor(Math.random() * cfg.phrases.length)];

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

  // "Call Buddies to Screen" (Whistle feature)
  const handleCallBuddies = () => {
    sound.playChime();

    const currentScrollY = window.scrollY;
    const viewBottom = currentScrollY + window.innerHeight;

    // Find platforms currently visible on screen
    const visiblePlatforms = platformsRef.current.filter(
      (p) => p.top >= currentScrollY + 40 && p.top <= viewBottom - 60
    );

    const targetPool =
      visiblePlatforms.length > 0 ? visiblePlatforms : platformsRef.current.slice(0, 3);

    setBuddies((prev) =>
      prev.map((b, index) => {
        const plat = targetPool[index % targetPool.length] || targetPool[0];
        const cfg = BUDDIES.find((item) => item.id === b.id);
        const offsetX = plat.left + Math.min(plat.width * 0.2 + index * 80, plat.width - 40);

        return {
          ...b,
          x: offsetX,
          y: plat.top - (cfg?.isFlying ? 15 : 0),
          vx: 0,
          vy: 0,
          isDragging: false,
          isGrounded: !cfg?.isFlying,
          groundedPlatformId: !cfg?.isFlying ? plat.id : null,
          currentAction: cfg?.landAction || 'victory',
          speechText: 'We are here! ✨',
          sparkleUntil: Date.now() + 1000,
        };
      })
    );

    setMenuOpen(false);
  };

  const visibleBuddies = buddies.filter((buddy) => {
    if (mode === 'none') return false;
    if (mode === 'all') return true;
    if (mode === 'random') return buddy.id === randomBuddyId;
    return buddy.id === mode;
  });

  const currentOption = MODE_OPTIONS.find((opt) => opt.id === mode);

  return (
    <>
      {/* Dedicated Floating Visual Perches / Platforms */}
      <div id="buddy-perch-decor" className="pointer-events-none select-none">
        {/* 1. Sky Cloud Perch (Alongside Postures / Mid-Page) */}
        <div
          id="perch-cloud"
          data-buddy-platform="true"
          data-platform-name="Sky Cloud Perch"
          data-platform-type="perch"
          style={{ top: '680px', right: '28px' }}
          className="absolute z-20 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-clay-pill border-2 border-sky-100/80 text-sky-950 font-black text-xs animate-wave-sway pointer-events-auto cursor-default"
          title="Drag a buddy here to perch on the cloud!"
        >
          <Cloud className="w-3.5 h-3.5 text-sky-500 fill-sky-200" />
          <span>☁️ Sky Perch</span>
        </div>

        {/* 2. Healing Rest Shelf (Mid Left) */}
        <div
          id="perch-shelf"
          data-buddy-platform="true"
          data-platform-name="Healing Rest Shelf"
          data-platform-type="perch"
          style={{ top: '1050px', left: '20px' }}
          className="absolute z-20 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-clay-pill border-2 border-emerald-100/80 text-emerald-950 font-black text-xs animate-wave-sway pointer-events-auto cursor-default"
          title="Drag a buddy here to rest!"
        >
          <span>🌸 Healing Shelf</span>
        </div>

        {/* 3. Star Ledge (Lower Right) */}
        <div
          id="perch-star"
          data-buddy-platform="true"
          data-platform-name="Star Ledge"
          data-platform-type="perch"
          style={{ top: '1750px', right: '24px' }}
          className="absolute z-20 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-clay-pill border-2 border-amber-100/80 text-amber-950 font-black text-xs animate-wave-sway pointer-events-auto cursor-default"
          title="Drag a buddy here!"
        >
          <span>⭐ Star Ledge</span>
        </div>
      </div>

      {/* Landing Target Visual Guide Ray while Dragging */}
      {activeDragId && candidatePlatform && (
        <div
          style={{
            position: 'absolute',
            left: `${candidatePlatform.left}px`,
            top: `${candidatePlatform.top - 4}px`,
            width: `${candidatePlatform.width}px`,
          }}
          className="h-1.5 bg-gradient-to-r from-rose-400 via-violet-400 to-sky-400 rounded-full shadow-[0_0_14px_rgba(244,63,94,0.7)] animate-pulse pointer-events-none z-40 transition-all duration-150"
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 text-rose-950 font-black text-[11px] px-3 py-0.5 rounded-full shadow-clay-pill border border-rose-200 whitespace-nowrap flex items-center gap-1.5">
            <span>🎯</span>
            <span>Drop onto {candidatePlatform.name}</span>
          </div>
        </div>
      )}

      {/* Main Draggable Character Layer (Page Coordinates) */}
      {mode !== 'none' && (
        <div
          id="buddy-actors-layer"
          className="absolute inset-0 pointer-events-none z-30 select-none overflow-visible"
        >
          {visibleBuddies.map((buddy) => {
            const cfg = BUDDIES.find((b) => b.id === buddy.id);
            if (!cfg) return null;

            const gifSrc = cfg.actions[buddy.currentAction] || cfg.actions.idle;
            const isSparkling = Date.now() < buddy.sparkleUntil;

            return (
              <div
                key={buddy.id}
                onPointerDown={(e) => handlePointerDown(buddy.id, e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  left: `${buddy.x}px`,
                  top: `${buddy.y}px`,
                  transform: `translate(-50%, -100%) rotate(${buddy.dragTilt}deg)`,
                  touchAction: 'none',
                }}
                className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-shadow group ${
                  buddy.isDragging ? 'z-50 scale-110' : 'z-30'
                }`}
                title={`Drag or click ${cfg.name}! Place on any card or platform.`}
              >
                {/* Landing Sparkle Puff Animation */}
                {isSparkling && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none animate-ping">
                    <span className="text-xl">✨</span>
                  </div>
                )}

                {/* Speech Bubble */}
                {buddy.speechText && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-violet-950 font-black text-[11px] sm:text-xs px-2.5 py-1 rounded-2xl shadow-clay-pill border border-violet-100 animate-bounce z-50 pointer-events-none">
                    {buddy.speechText}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/95" />
                  </div>
                )}

                {/* Drag Indicator Tooltip on Hover */}
                {!buddy.isDragging && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full pointer-events-none whitespace-nowrap flex items-center gap-1">
                    <Move className="w-2.5 h-2.5" />
                    <span>Drag me</span>
                  </div>
                )}

                {/* Character GIF Container */}
                <div
                  className="transition-transform duration-150 group-active:scale-95"
                  style={{
                    transform: `scaleX(${buddy.facing})`,
                  }}
                >
                  <img
                    src={gifSrc}
                    alt={`${cfg.name} (${buddy.currentAction})`}
                    className={`h-14 sm:h-20 w-auto max-w-[90px] sm:max-w-[125px] object-contain image-pixelated pointer-events-none ${
                      buddy.isDragging
                        ? 'drop-shadow-[0_16px_20px_rgba(0,0,0,0.22)]'
                        : 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]'
                    }`}
                    loading="eager"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Character Chooser & Physics Control Menu */}
      <div id="buddy-menu-root" ref={menuRef} className="fixed bottom-4 right-4 z-40 touch-manipulation">
        {/* Popover Selection Menu */}
        {menuOpen && (
          <div className="absolute bottom-14 sm:bottom-16 right-0 mb-2 w-64 sm:w-72 max-h-[80vh] overflow-y-auto rounded-[28px] bg-white/95 backdrop-blur-md p-3 shadow-clay-card border border-rose-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between px-2.5 py-1 mb-2 border-b border-rose-100/70">
              <span className="text-xs font-black uppercase tracking-wider text-rose-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Companion Buddies
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded-full text-violet-400 hover:text-violet-700 hover:bg-rose-50 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Physics Helper Note */}
            <div className="mb-2.5 px-2.5 py-1.5 rounded-xl bg-violet-50 text-[10px] font-bold text-violet-900 border border-violet-100/80 leading-relaxed flex items-center gap-1.5">
              <Move className="w-3 h-3 text-violet-600 shrink-0" />
              <span>
                <strong>Drag & Drop</strong> any character onto website cards and platforms!
              </span>
            </div>

            {/* Call Buddies to Screen Button */}
            {mode !== 'none' && (
              <button
                onClick={handleCallBuddies}
                className="w-full mb-2 min-h-[38px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-200 to-rose-200 hover:from-violet-300 hover:to-rose-300 text-violet-950 text-xs font-black shadow-clay-pill flex items-center justify-center gap-2 transition-all active:scale-95"
                title="Call all companions to land on platforms in your view"
              >
                <Megaphone className="w-3.5 h-3.5 text-rose-700" />
                <span>Call Buddies Here 📣</span>
              </button>
            )}

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
          title="Choose and interact with character companions"
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
