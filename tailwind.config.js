/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      fontFamily: {
        bubble: ['"Plus Jakarta Sans"', '"Fredoka"', '"Nunito"', 'system-ui', 'sans-serif'],
        display: ['"Fredoka"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        clay: {
          bg: '#F5F3FF',
          lavender: '#DDD6FE',
          mint: '#6EE7B7',
          rose: '#F9A8D4',
          peach: '#FED7AA',
          butter: '#FEF08A',
          sky: '#BAE6FD',
          indigo: {
            DEFAULT: '#4C1D95',
            dark: '#3B0764',
            light: '#6B21A8',
          }
        }
      },
      boxShadow: {
        'clay-card': '0 16px 32px -4px rgba(109, 40, 217, 0.16), inset 8px 8px 16px 0px rgba(255, 255, 255, 0.85), inset -8px -8px 16px 0px rgba(109, 40, 217, 0.22)',
        'clay-card-hover': '0 22px 44px -4px rgba(109, 40, 217, 0.22), inset 8px 8px 16px 0px rgba(255, 255, 255, 0.95), inset -8px -8px 16px 0px rgba(109, 40, 217, 0.28)',
        'clay-rose': '0 14px 28px rgba(244,114,182,0.25), inset 6px 6px 12px rgba(255,255,255,0.9), inset -6px -6px 12px rgba(219,39,119,0.25)',
        'clay-rose-btn': '0 10px 20px rgba(236,72,153,0.3), inset 4px 4px 8px rgba(255,255,255,0.7), inset -4px -4px 8px rgba(190,24,93,0.3)',
        'clay-mint': '0 14px 28px rgba(5,150,105,0.2), inset 6px 6px 12px rgba(255,255,255,0.85), inset -6px -6px 12px rgba(5,150,105,0.28)',
        'clay-lavender': '0 14px 28px rgba(109,40,217,0.18), inset 6px 6px 14px rgba(255,255,255,0.85), inset -6px -6px 14px rgba(109,40,217,0.25)',
        'clay-peach': '0 14px 28px rgba(249,115,22,0.18), inset 6px 6px 14px rgba(255,255,255,0.85), inset -6px -6px 14px rgba(234,88,12,0.22)',
        'clay-sky': '0 14px 28px rgba(14,165,233,0.2), inset 6px 6px 14px rgba(255,255,255,0.85), inset -6px -6px 14px rgba(2,132,199,0.25)',
        'clay-debossed': 'inset 4px 4px 8px rgba(109,40,217,0.2), inset -4px -4px 8px rgba(255,255,255,0.9)',
        'clay-pill': '0 4px 10px rgba(244,114,182,0.25), inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(219,39,119,0.2)',
        'clay-pill-mint': '0 4px 10px rgba(5,150,105,0.2), inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(5,150,105,0.2)',
        'clay-pill-lavender': '0 4px 10px rgba(109,40,217,0.18), inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(109,40,217,0.2)',
        'clay-squish': '0 4px 8px rgba(109,40,217,0.12), inset 2px 2px 4px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 5s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
