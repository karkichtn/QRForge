<div align="center">

# ⚡ QRFORGE

### Cinematic Physical-to-Digital Vector Matrix Generator

A modern, art-directed web application inspired by high-end creative tech and cinematic exhibition design. Pure client-side generation, architectural typography, and 100% privacy.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/karkichtn/QRForge/pulls)

</div>

---

## 🏛️ Design Philosophy

QRForge moves away from generic SaaS templates, excessive glassmorphism, and neon gradients. Instead, it embraces an **editorial, architectural, and cinematic aesthetic**:

- **Palette**: Deep void black (`#060608`), warm charcoal, titanium white, and restrained tungsten amber accents.
- **Typography**: Dramatic typographic scale featuring **Syne** for headlines, **Plus Jakarta Sans** for body text, and **JetBrains Mono** for technical metadata and optical viewfinder annotations.
- **Hero Exhibition**: Asymmetrical layout paired with an interactive 3D mouse-tracking sculptural QR matrix object.
- **Atmosphere**: Subtle 35mm film grain texture, architectural hairline borders, and top scroll progress indicator.

---

## 🌟 Key Features

- ⚡ **Zero-Click Live Generation**: Paste or type any link and the vector matrix generates **instantly in real-time** with zero clicks required.
- 📱 **Museum-Grade Scannability**: High-contrast matte presentation with optical corner registration brackets `[ + ]` for flawless scanning on all cameras.
- 🔒 **Zero Data Logging**: 100% client-side compilation via browser JavaScript. Your links are never sent to or logged on remote servers.
- 📐 **Technical Specifications**: Configurable export resolutions (Standard 400px, Hi-Res 800px, 4K Master 1200px) and Reed-Solomon error correction levels (H, Q, M).
- 🔗 **Intelligent Link Handling**: Automatically normalizes missing protocols (e.g. `google.com` → `https://google.com`), preserves deep query strings and UTM tracking parameters.
- 📥 **Export Actions**:
  - **Download PNG**: High-resolution image with domain-based file naming.
  - **Copy Link**: Copies original URL with architectural log toast feedback.
  - **Share**: Integrates with the native Web Share API with automatic clipboard fallback.
  - **Reset**: Instantly resets the engine.
- 🕒 **Recent Matrices Drawer**: Persists recent generations in `localStorage` for rapid re-access.

---

## 📸 Section Architecture

1. **Top Navigation**: Minimalist hairline header with live links, GitHub link, and responsive mobile drawer.
2. **Hero Cinematic**: Asymmetrical typography, technical eyebrows, CTA button, and interactive 3D tilted QR sculpture.
3. **The Generator**: Architectural input field with direct instant generation on paste, quick sample links, specification controls, and museum-quality framed QR result.
4. **How It Works**: 3-phase horizontal storytelling pipeline (`01 / INPUT`, `02 / COMPILATION`, `03 / RESOLUTION`).
5. **The Standard**: High-impact editorial statement typography (`NO ACCOUNT.`, `NO COMPLEXITY.`, `JUST A LINK.`).
6. **Built For Sharing**: Minimal conclusion with smooth scroll-to-top trigger.
7. **Footer**: Clean, unadorned professional colophon.

---

## 📂 Project Structure

```bash
tikka/
├── public/
│   └── favicon.svg           # Custom glowing QRForge SVG favicon
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx  # "Built for Sharing" conclusion & CTA
│   │   ├── Features.jsx      # High-impact typographic statements
│   │   ├── Footer.jsx        # Minimal professional footer
│   │   ├── HeroSection.jsx   # Asymmetrical hero with 3D tilt specimen
│   │   ├── HowItWorks.jsx    # 3-phase cinematic storytelling pipeline
│   │   ├── Navbar.jsx        # Responsive architectural navigation
│   │   ├── QRGenerator.jsx   # Core vector engine, input & matte display
│   │   └── Toast.jsx         # Minimal architectural toast logger
│   ├── App.jsx               # Main layout with Scroll Progress & Error Boundary
│   ├── index.css             # Architectural design system & film grain
│   └── main.jsx              # Application root entry point
├── index.html                # HTML template with Google Fonts (Syne, Jakarta, JetBrains)
├── package.json              # Project scripts and dependencies
├── vite.config.js            # Vite build configuration
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed.

### 1. Clone the Repository

```bash
git clone https://github.com/karkichtn/QRForge.git
cd QRForge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles optimized production bundle into the `dist/` directory. |
| `npm run preview` | Runs a local web server to preview the built production bundle. |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">
Crafted with ❤️ by <a href="https://github.com/karkichtn">karkichtn</a>
</div>
