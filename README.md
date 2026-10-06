<div align="center">

# ⚡ QRForge

### Turn Any Link Into a High-Resolution QR Code Instantly

A modern, production-grade URL-to-QR code generator built with a futuristic dark-first aesthetic, ambient glassmorphism cards, smooth animations, and 100% client-side privacy.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/karkichtn/QRForge/pulls)

</div>

---

## 🌟 Highlights

- ⚡ **Zero-Click Instant Generation**: Paste or type any link and your QR code appears **instantly** — no button click required!
- 📱 **100% Camera Scannable**: Rendered inside a high-contrast white card ensuring crisp readability for iOS Camera, Google Lens, and all barcode scanners.
- 🔒 **Zero Data Logging**: Your URLs never leave your browser. No tracking redirects, no analytics middlemen, no database storage.
- 🎨 **Style & Resolution Controls**: Customizable color themes (Classic Dark, Cyber Indigo, Neon Purple, Midnight Blue, Emerald, Crimson), error correction levels (H/Q/M), and HD exports up to 4K (1200×1200).
- 🔗 **Smart URL Normalization**: Intelligently handles inputs like `google.com` by automatically adding `https://`, supports UTM parameters, query strings, and hashes.
- 📥 **One-Click Actions**:
  - **Download PNG**: High-resolution image with domain-based file naming.
  - **Copy Link**: Copies original URL with animated toast feedback.
  - **Share**: Integrates with the native Web Share API with automatic clipboard fallback.
  - **New QR**: Resets input focus instantly.
- 🕒 **Recent History Drawer**: Remembers your recent QR generations locally in `localStorage` for fast re-access.
- ♿ **Accessible & Responsive**: Fully responsive from mobile devices to ultrawide displays, keyboard navigable, and respects `prefers-reduced-motion`.

---

## 📸 Overview & Sections

1. **Top Navigation**: Sleek glassmorphism header with live links and mobile drawer.
2. **Hero Generator**: Centered hero with floating ambient orbs, instant link input, sample chips, and live QR preview card.
3. **How It Works**: 3-step structured cards (`01 — Paste Your Link`, `02 — Generate QR`, `03 — Scan & Go`).
4. **Why QRForge**: 6 key SaaS feature cards highlighting speed, universal scannability, privacy, and high-definition exports.
5. **Privacy & Reliability**: Explains direct URL encoding and client-side benefits.
6. **Footer**: Clean footer with repository links and client-side status badge.

---

## 📂 Project Structure

```bash
tikka/
├── public/
│   └── favicon.svg           # Custom glowing QRForge SVG favicon
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx  # Privacy & architecture breakdown
│   │   ├── BackgroundOrbs.jsx# Ambient animated glowing mesh & grid
│   │   ├── Features.jsx      # 6 feature cards for SaaS credibility
│   │   ├── Footer.jsx        # Footer with links and system status
│   │   ├── GithubIcon.jsx    # Crisp SVG GitHub icon
│   │   ├── HowItWorks.jsx    # 3-step numbered workflow cards
│   │   ├── Navbar.jsx        # Responsive navigation bar & mobile drawer
│   │   ├── QRGenerator.jsx   # Core QR engine, validation & options
│   │   └── Toast.jsx         # Interactive toast notification system
│   ├── App.jsx               # Main application wrapper with Error Boundary
│   ├── index.css             # Complete design system & glassmorphism tokens
│   └── main.jsx              # Application root entry point
├── index.html                # HTML template with Google Fonts (Outfit & Plus Jakarta)
├── package.json              # Project scripts and dependencies
├── vite.config.js            # Vite build configuration
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your system.

```bash
node --version
npm --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/karkichtn/QRForge.git
cd QRForge
```

### 2. Install Dependencies

```bash
npm install
```

*(Or using yarn / pnpm)*
```bash
yarn install
# or
pnpm install
```

### 3. Run the Local Development Server

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

## 🧩 Technologies Used

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Code Engine**: [qrcode](https://www.npmjs.com/package/qrcode)
- **Delight & Animations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Styling**: Vanilla CSS (CSS Variables, Glassmorphism, Responsive Grid)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (`Outfit` & `Plus Jakarta Sans`)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/karkichtn/QRForge/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
Crafted with ❤️ by <a href="https://github.com/karkichtn">karkichtn</a>
</div>
