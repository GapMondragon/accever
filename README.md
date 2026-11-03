# Accever 👾 // Tactile Claymorphism Co-Op Hub & Recovery Protocol

A cute, tactile 3D Claymorphism website designed with care. Built using tactile clay aesthetic design tokens from [inspo.gapmondragon.dev](https://inspo.gapmondragon.dev).

Live site: [accever.gapmondragon.dev](https://accever.gapmondragon.dev)

---

## 🩺 Active Clinical Mode: Acute Recovery Protocol

Designed for post-tennis recovery, addressing acute hypovolemia, dehydration, and postprandial splanchnic blood pooling following a heavy meal.

### 1. Vitals Baseline & Target Alert Bar
- **Resting Heart Rate**: Initial 95–98 bpm ➔ Target `< 80 bpm` (alleviating compensatory tachycardia)
- **Heart Rate Variability (HRV)**: Initial 13 ms ➔ Target upward trend `> 30 ms` (recovering parasympathetic tone)
- **Respiration Rate**: Initial 21–23 brpm ➔ Target `12–16 brpm` (reversing mild post-match tachypnea)

### 2. Anatomical Recovery Posture Visualizer
- **Modified Fowler's (35°–45° Incline)**: Interactive 3-pillow stair-step back ramp with sub-popliteal knee/calf cushion. Elevates venous return while keeping the Lower Esophageal Sphincter (LES) safely above the gastric fluid level.
- **Left-Lateral Decubitus**: Harnesses the stomach's anatomical J-curve to trap hyperacidic postprandial gastric chyme (e.g., high-tamarind / acidic meal residue) securely in the dependent greater curvature sump.
- **Forbidden Postures**: Demonstrates clinical hazards of Flat Supine (0°), Trendelenburg (inversion aspiration risk), and Right-Lateral Decubitus.
- **Interactive Incline Simulator**: Real-time slider ($0^\circ \to 55^\circ$) showing dynamic anatomical rotation, acid barrier sealing, and live venous flow.

### 3. Visual Recovery Workflow Roadmap
- **Chronological 3-Phase Stepper**: Phase 1 (Safe Position 0–45m), Phase 2 (Osmotic Absorption 45–60m), and Phase 3 (Staged Mobilization 60+m).
- **Interactive Timeline Conduit**: Animated SVG connecting beam with live dash stream (`animate-flow-dash`).
- **Mermaid.js Technical Toggle**: One-click toggle between tactile visual cards and raw Mermaid graph source.

### 4. Vagal Down-Regulation Breathing Coach
- **4s Inhale / 6s Exhale Cycle**: Scientifically calibrated exhalation ratio stimulating the vagus nerve to reduce heart rate and elevate HRV.
- **Visual & Audio Guidance**: High-precision circular SVG timer ring, central breathing dough ball, synthesized soothing tones (432Hz inhale / 396Hz exhale), and immersive Zen mode.
- **Session Duration Presets**: Quick select for 2 Mins (12 cycles), 5 Mins (30 cycles), or 10 Mins (60 cycles).

### 5. Phase 2 & 3 Mobilization Protocol
- **Micro-Hydration Guidance**: Hypotonic electrolyte oral rehydration solution (e.g., Pocari Sweat at 288 mOsm) paced at small 20–30 mL sips every 3–5 minutes to avoid gastric distension.
- **Staged Orthostatic Transition**: 15x seated ankle pumps (activating the calf muscle pump), 60-second edge-of-bed pause, and gradual rise to stand.

---

## 🎨 Claymorphism Aesthetic & Mobile Architecture

### Chassis & Surface Physics
- High-volume squircle surfaces (`rounded-[28px]` to `rounded-[36px]`, `rounded-3xl`) with zero hard 1px borders.
- Opposing dual inset bevels (crisp white specular top-left highlight + saturated pastel bottom-right shade) combined with an ambient pastel outer drop shadow.

### Color Palette
- **Canvas Backdrop**: `#F5F3FF` with soft radial glow spots
- **Pastel Clay Surfaces**: Lavender (`#DDD6FE`), Mint (`#6EE7B7`), Bubblegum Rose (`#F9A8D4`), Butter Peach (`#FED7AA`), Sky Blue (`#BAE6FD`)
- **Typography**: Deep Tinted Indigo (`#3B0764`) and Vivid Lilac (`#6B21A8`)

### Audio Synthesis & Client Statelessness
- **Synthesized Web Audio**: 600Hz–900Hz bouncy bubble pops and chimes rendered entirely in-browser (zero external audio assets).
- **Stateless In-Memory Architecture**: Pure client-rendered React state without external tracking, databases, or local storage.

### Mobile Responsive & Touch-First Design
- **Fluid Scalable Vector Graphics**: Anatomical diagrams mapped across viewBox specifications (`viewBox="0 0 520 290"` and `viewBox="0 0 520 280"`) with dynamic coordinate transforms (`transform="rotate(...)"`) scaling cleanly down to 320px mobile screens without horizontal clipping.
- **Finger-Friendly Touch Targets**: Minimum 44px touch targets (`min-h-[44px]`) with responsive grid configurations on mobile viewports for angle presets and anatomical inspection pills.
- **Adaptive Breakpoints**: Configured `xs: '420px'` screen tier in Tailwind to deliver responsive header pill badges and timer controls across all phone sizes.

---

## 🚀 Cloudflare Pages Setup (Subdomain)

1. Connected to GitHub repository **`GapMondragon/accever`**.
2. Configure build settings:
   - **Framework Preset**: `Vite` (or `None`)
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
3. **Custom Domain**: `accever.gapmondragon.dev` (automated DNS CNAME and edge SSL provisioning).

---

## 🛠️ Local Development

### Tech Stack & Prerequisites
- **Runtime**: Node.js LTS $\ge 18.0.0$ or $\ge 20.0.0$
- **Package Manager**: npm $\ge 9.0.0$ (or pnpm / yarn)
- **Core Framework**: React 19, TypeScript 5.7, Vite 6, Tailwind CSS 3.4

### Quick Start
```bash
# Clone repository
git clone git@github.com:GapMondragon/accever.git
cd accever

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```
