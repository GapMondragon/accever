# Accever 👾 // Tactile Claymorphism Co-Op Hub & Recovery Protocol

A cute, tactile 3D Claymorphism website designed with care. Built using tactile clay aesthetic design tokens from [inspo.gapmondragon.dev](https://inspo.gapmondragon.dev). 

Live site: [https://accever.gapmondragon.dev](https://accever.gapmondragon.dev)

---

## 🩺 Active Clinical Mode: Acute Recovery Protocol

Created to support post-tennis recovery (addressing acute hypovolemia, dehydration, and postprandial splanchnic blood pooling after a heavy meal):

1. **Vitals Baseline & Target Alert Bar**: Resting Heart Rate (95–98 bpm ➔ &lt; 80 bpm), HRV (13 ms ➔ upward trend), Respiration Rate (21–23 brpm ➔ 12–16 brpm).
2. **Anatomical Recovery Posture Visualizer**:
   - **Modified Fowler's (35°–45° Incline)**: 3-pillow back ramp + sub-popliteal knee/calf cushion to elevate leg venous return while keeping the Lower Esophageal Sphincter (LES) elevated above acidic gastric chyme.
   - **Left-Lateral Decubitus**: Gravitational stomach sump keeping sinigang acid safely in the greater curvature.
   - **Contraindicated Postures**: Explains hazards of flat supine (0°), Trendelenburg, and right-lateral decubitus.
3. **Visual Recovery Workflow Roadmap**: 3-Phase structured stepper (Phase 1: Safe Position 0–45m, Phase 2: Osmotic Absorption 45–60m, Phase 3: Staged Mobilization 60+m) with raw Mermaid.js view toggle.
4. **Vagal Down-Regulation Breathing Coach**: Interactive 4s Inhale / 6s Exhale pacer with circular SVG progress animations, Web Audio calming chimes (432Hz/396Hz), and Zen mode.
5. **Phase 2 & 3 Mobilization Guide**: Pocari Sweat micro-sip pacing guidelines (20–30 mL every 3–5 min) and 3-step orthostatic stabilization protocol (15x ankle pumps, 60s edge-of-bed pause, slow rise).

---

## 🎨 Claymorphism Aesthetic & Design Tokens

- **Chassis & Surface Physics**: High-volume squircle surfaces (`rounded-[28px]` to `rounded-[36px]`, `rounded-3xl`) with no hard 1px borders.
- **Dual Inset Shadows**: Opposing inner bevels (crisp white specular top-left highlight + saturated pastel bottom-right shade) combined with an ambient pastel outer drop shadow.
- **Color Palette**:
  - Mist Backdrop: `#F5F3FF`
  - Pastel Clay Surfaces: Lavender (`#DDD6FE`), Mint (`#6EE7B7`), Bubblegum Rose (`#F9A8D4`), Butter Peach (`#FED7AA`), Sky Blue (`#BAE6FD`)
  - Typography: Deep Tinted Indigo (`#3B0764`) and Vivid Lilac (`#6B21A8`)
- **Tactile Sound Effects**: Synthesized Web Audio API 600Hz–900Hz bouncy bubble pops and chimes (zero external audio files).
- **Client-Side Only**: Entirely client-rendered and stateless in-memory (no database, no external tracking, no backend storage).
- **Mobile Responsive & Touch-First**:
  - Fluid SVG anatomical diagrams with dynamic inline rotation (`viewBox="0 0 520 290"`) that adapt down to 320px mobile screens without horizontal clipping.
  - Finger-friendly touch targets with responsive grids (`min-h-[42px]`) for angle presets and hotspot inspection pills.
  - Touch-optimized duration selectors and circular breathing progress rings.
  - Safe-area header pill layout with adaptive brand text for small mobile viewports.

---

## 🚀 Cloudflare Pages Setup (Subdomain)

1. Connected to GitHub repository **`GapMondragon/accever`**.
2. Build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
3. Custom Domain: `accever.gapmondragon.dev`.

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
