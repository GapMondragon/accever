# Accever 💕 // Tactile Claymorphism Website for My Girlfriend

A cute, interactive, tactile 3D Claymorphism website designed with love. Styled and built strictly using the aesthetic design tokens, prompts, and component anatomy from [inspo.gapmondragon.dev](https://inspo.gapmondragon.dev).

---

## ✨ Claymorphism Aesthetic & Features

- **Chassis & Surface Physics**: High-volume squircle surfaces (`rounded-[28px]` to `rounded-[36px]`, `rounded-3xl`) with no hard borders.
- **Dual Inset Shadows**: Opposing inner bevels (crisp white specular top-left highlight + saturated pastel bottom-right shade) combined with an ambient pastel outer drop shadow.
- **Color Palette**:
  - Mist Backdrop: `#F5F3FF`
  - Pastel Clay Surfaces: Lavender (`#DDD6FE`), Mint (`#6EE7B7`), Bubblegum Rose (`#F9A8D4`), Butter Peach (`#FED7AA`), Sky Blue (`#BAE6FD`)
  - Typography: Deep Tinted Indigo (`#3B0764`) and Vivid Lilac (`#6B21A8`)
- **Tactile Sound Effects**: Synthesized Web Audio API 600Hz–900Hz bouncy bubble pops and chime feedback on clicks and squishes (no external audio files needed).
- **Interactive Modules**:
  1. 🧸 **Tactile Header**: Live kiss counter, sound toggle, and heart confetti bursts.
  2. 🌸 **Appreciation Hero**: Dynamic squishy Love-O-Meter (overclockable past 9999%!) & Daily Compliment Capsule Dispenser.
  3. 💌 **"Open When..." Letter Box**: 6 tactile clay envelopes for different moods (stress, miss me, hungry, midnight thoughts, celebrations).
  4. 🍱 **Reasons Bento Grid**: Tactile squircle cards with interactive heart counters.
  5. 🎲 **Date Night Clay Roulette**: Eliminates decision fatigue with a single squishy spin.
  6. 📻 **Retro Clay Radio**: Real synthesized lo-fi chord playback with animated clay visualizer bars.
  7. 🏺 **Secret Wish Jar**: Recessed debossed input well with local storage persistence.

---

## 🚀 Cloudflare Pages Setup (Subdomain)

1. Open **[Cloudflare Dashboard](https://dash.cloudflare.com/)** > **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select the repository **`GapMondragon/accever`**.
4. Configure build settings:
   - **Framework Preset**: `Vite` (or `None`)
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
5. Click **Save and Deploy**.
6. Once deployed, go to **Custom domains** > **Set up a custom domain** (e.g. `accever.gapmondragon.dev`).
   - Cloudflare will configure the DNS CNAME and SSL certificate automatically!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```
