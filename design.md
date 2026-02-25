# Hydra Psychology Trainer – Design System

> Vollständige Dokumentation des visuellen und funktionalen Designsystems der hydrapt.com Landing Page.

---

## 1. Markenidentität

| Eigenschaft     | Wert                                       |
| --------------- | ------------------------------------------ |
| **Produktname** | Hydra Psychology Trainer (kurz: Hydra PT)  |
| **Zielgruppe**  | Bewerber für Polizei/Militär (Spezialeinheiten), leitende Beamte, Studienbewerber (Medizin, Psychologie) |
| **Tonalität**   | Professionell, ernst, technisch-präzise, vertrauenswürdig |
| **Plattform**   | iOS (App Store)                            |
| **Logo**        | `logo.svg` (64×64 in der Nav), monochrome Variante: `logo-mono.svg` |

---

## 2. Typografie

| Eigenschaft        | Wert                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **Primärfont**     | Geist (Google Fonts)                                                |
| **Fallback-Stack** | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| **Gewichte**       | 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold) |
| **Rendering**      | `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale` |
| **Zeilenhöhe**     | Body: `1.6`, Headings: `1.15`                                      |

### Schriftgrößen (Desktop → Mobile)

| Element              | Desktop            | Tablet (768px)  | Mobile           |
| -------------------- | ------------------ | --------------- | ---------------- |
| Hero H1              | `4.725rem`         | `4.05rem`       | `clamp(2rem, 8.5vw, 3.375rem)` |
| Section H2           | `3.75rem–4.375rem` | `3.75rem`       | `3rem`           |
| Feature H3           | `3rem`             | `2.25rem`       | `2.25rem`        |
| Body / Paragraphs    | `1.25rem`          | `1.125rem`      | `1.125rem`       |
| Small / Labels       | `0.875rem`         | `0.875rem`      | `0.875rem`       |
| Badge                | `0.75rem`          | `0.75rem`       | `0.75rem`        |

### Text-Styling

- **Headings**: `font-weight: 700`, `letter-spacing: -0.025em`
- **Dark-Mode Headings**: Gradient-Text mit `linear-gradient(to bottom, rgb(244 244 245 / 0.95), rgb(212 212 216 / 0.9), rgb(113 113 122 / 0.8))`
- **text-wrap: balance** für ausgewogene Zeilen bei Headings

---

## 3. Farbsystem (CSS Custom Properties mit OKLCH)

### Light Mode (`:root`)

| Token                  | OKLCH-Wert                   | Verwendung                      |
| ---------------------- | ---------------------------- | ------------------------------- |
| `--background`         | `oklch(1 0 0)`               | Seitenhintergrund (Weiß)       |
| `--foreground`         | `oklch(0.145 0 0)`           | Primärer Text (fast Schwarz)   |
| `--card`               | `oklch(1 0 0)`               | Card-Hintergrund               |
| `--card-foreground`    | `oklch(0.145 0 0)`           | Card-Text                      |
| `--primary`            | `oklch(0.205 0 0)`           | Button-BG, primäre Aktionen    |
| `--primary-foreground` | `oklch(0.985 0 0)`           | Text auf Primary               |
| `--secondary`          | `oklch(0.97 0 0)`            | Sekundäre Flächen              |
| `--secondary-foreground` | `oklch(0.205 0 0)`         | Text auf Secondary             |
| `--muted`              | `oklch(0.97 0 0)`            | Gedämpfte Hintergründe         |
| `--muted-foreground`   | `oklch(0.556 0 0)`           | Sekundärer Text                |
| `--accent`             | `oklch(0.97 0 0)`            | Hover-Hintergrund              |
| `--accent-foreground`  | `oklch(0.205 0 0)`           | Text auf Accent                |
| `--destructive`        | `oklch(0.577 0.245 27.325)`  | Fehlerzustände                 |
| `--border`             | `oklch(0.922 0 0)`           | Rahmenfarbe                    |
| `--input`              | `oklch(0.922 0 0)`           | Input-Rahmen                   |
| `--ring`               | `oklch(0.708 0 0)`           | Fokus-Ring                     |
| `--radius`             | `0.625rem`                   | Standard Border-Radius         |

### Dark Mode (`.dark`)

| Token                  | OKLCH-Wert                   | Veränderung                    |
| ---------------------- | ---------------------------- | ------------------------------ |
| `--background`         | `oklch(0.145 0 0)`           | Dunkelgrau                     |
| `--foreground`         | `oklch(0.985 0 0)`           | Hell (fast Weiß)              |
| `--card`               | `oklch(0.205 0 0)`           | Etwas heller als BG            |
| `--primary`            | `oklch(0.922 0 0)`           | Invertiert (hell)              |
| `--primary-foreground` | `oklch(0.205 0 0)`           | Dunkler Text auf Light-Primary |
| `--secondary`          | `oklch(0.269 0 0)`           | Dunkles Grau                   |
| `--muted`              | `oklch(0.269 0 0)`           | Gedämpftes Dunkelgrau          |
| `--muted-foreground`   | `oklch(0.9 0 0)`             | Heller sekundärer Text         |
| `--border`             | `oklch(1 0 0 / 10%)`         | Transparenter Rahmen           |
| `--input`              | `oklch(1 0 0 / 15%)`         | Transparenter Input            |

### Akzentfarben (nicht in Variablen, hardcoded)

| Farbe                          | Verwendung                              |
| ------------------------------ | --------------------------------------- |
| `rgba(59, 130, 246, *)`        | Glow-Effekte (Blue-500 equiv.)          |
| `rgba(56, 189, 248, *)`        | Pricing-Highlight-Gradient              |
| `#f59e0b`                      | Sternbewertungen (Amber-500)            |
| `rgba(100, 116, 139, *)`       | Reviews Background-Glow (Slate-500)     |

---

## 4. Spacing & Layout

### Grundsystem

| Token / Wert  | rem    | px   | Verwendung                       |
| ------------- | ------ | ---- | -------------------------------- |
| `0.25rem`     | 0.25   | 4    | Pill-Padding, minimale Abstände  |
| `0.5rem`      | 0.5    | 8    | Button sm, Card-Gaps             |
| `0.75rem`     | 0.75   | 12   | FAQ p margin-top, Feature-Gaps   |
| `1rem`        | 1      | 16   | Standard-Innenabstand            |
| `1.5rem`      | 1.5    | 24   | Card-Padding, Container-X        |
| `2rem`        | 2      | 32   | Section-Padding mobile           |
| `3rem`        | 3      | 48   | Footer-Padding, Nav-Padding-X    |
| `5rem`        | 5      | 80   | Hero padding-top, Feature-Gaps   |
| `7–10rem`     | 7–10   | 112–160 | Section-Padding Desktop       |

### Container

| Container             | Max-Width  | Padding-X  |
| --------------------- | ---------- | ---------- |
| Nav (default)         | `72rem`    | `3rem`     |
| Nav (scrolled)        | `56rem`    | `1.25rem`  |
| Hero                  | `80rem`    | `1.5rem`   |
| Features              | `80rem`    | `1.5rem`   |
| Privacy               | `64rem`    | `1.5rem`   |
| Reviews               | `72rem`    | `1.5rem`   |
| Pricing               | `72rem`    | `1.5rem`   |
| FAQ                   | `64rem`    | `1.5rem`   |
| Footer                | `64rem`    | `1.5rem`   |

### Breakpoints

| Name     | Min-Width | Wesentliche Änderungen                                  |
| -------- | --------- | ------------------------------------------------------- |
| sm       | `640px`   | Hero-Mockup größer, Phone-Mockup 320px                 |
| md       | `768px`   | Features 2-Spalten, Privacy 3-Spalten, Reviews 2-Spalten |
| lg       | `1024px`  | Desktop-Nav, BG-Dekor sichtbar, Feature-H3 → 3rem     |
| xl       | `1280px`  | Hero H1 4.725rem, Reviews 4-Spalten, Pricing 2-Spalten |

---

## 5. Komponenten

### 5.1 Navigation

- **Fixiert** oben, `z-index: 50`
- **Default**: Transparent, volle Breite (72rem)
- **Scrolled** (>50px): Glassmorphism-Stil mit `backdrop-filter: blur(16px)`, reduzierte Breite (56rem), `border-radius: 1rem`, Border + Semi-transparenter Hintergrund
- **Mobile**: Hamburger-Icon mit animiertem Übergang zu Close-Icon (Rotation + Scale)
- **Mobile Panel**: Dropdown mit Cards-Stil, Background, rounded corners
- **"Get Hydra" Button**: Zwei Varianten – Default (im Header) und Scrolled (kompakter) – via CSS-Toggle

### 5.2 Buttons

| Variante    | Hintergrund            | Text                    | Border              |
| ----------- | ---------------------- | ----------------------- | ------------------- |
| `btn-primary` | `var(--primary)`     | `var(--primary-foreground)` | keine           |
| `btn-outline` | `var(--background)`  | `var(--foreground)`     | `var(--border)`     |
| `btn-ghost`   | transparent          | `var(--foreground)`     | keine               |

| Größe     | Padding             | Height     |
| --------- | ------------------- | ---------- |
| `btn-sm`  | `0.5rem 0.75rem`    | `2rem`     |
| `btn-lg`  | `0.625rem 1rem`     | `2.5rem`   |
| `btn-icon`| `0` (square)        | `2.25rem`  |

### 5.3 Section Badges

```
Pill-Form: border-radius: 9999px
Border: 1px solid var(--border)
Padding: 0.25rem 1rem
Font: 0.75rem, 500 weight, uppercase, letter-spacing: 0.2em
Color: var(--muted-foreground)
```

### 5.4 Hero Pill

- Inline-flex, Pill-Form
- Enthält Text + Divider-Linie + animierter Pfeil (Doppel-SVG mit translateX-Hover)
- Hover: BG wechselt, Pfeil-Animation

### 5.5 Phone Mockup

- Wrapper: `position: relative`, `max-width: 280–380px` (responsive)
- **Screen**: Absolut positioniert innerhalb des Frames (`left/right: 5.33%, top/bottom: 2.5%`), `border-radius: 7%`
- **Frame**: SVG Overlay (`mockups/iPhone_mu.svg`)
- **Glow**: Radial-Gradient Kreis hinter dem Mockup (Blau in Light, Weiß in Dark)

### 5.6 Privacy Cards

- 3-Spalten Grid (Desktop), 1-Spalte (Mobile)
- Shared Border (nur die Grid-Container-Border sichtbar, Karten teilen sich die Trennlinien)
- Hover-Animation: Icon + Titel + Body bewegen sich nach oben
- Icon-Box: `backdrop-filter: blur(4px)`, Glassmorphism

### 5.7 Review Cards

- Grid: 4 Spalten (xl), 2 Spalten (md), 1 Spalte (Mobile)
- `border-radius: 1.5rem`, `border: 1px solid var(--border)`
- Glow-Spot oben rechts (Blue blur), verstärkt bei Hover
- Hover: `translateY(-4px)` + erhöhter Box-Shadow
- 5 Sterne (SVG, Amber-Gold fill)

### 5.8 Pricing Cards

- 2 Spalten (xl), 1 Spalte sonst
- **Free Card**: Standard-Card-Stil
- **Lifetime Card**: Umhüllt von `.pricing-card-highlight` mit Glow-Pseudo-Element (`::before`) und stärkerem Shadow
- Badges: Pill-Form, Free = Muted, Lifetime = Dunkel mit Sparkle-Icon

### 5.9 FAQ Items

- `<details>` + `<summary>` nativ
- Animierte Öffnung via JavaScript (Height + Opacity Transition)
- Alternierendes Slide-In (links/rechts via `slide-left-sm` / `slide-right-sm`)

---

## 6. Animationssystem

### Scroll-Animationen (IntersectionObserver)

| Klasse            | Effekt                                 | Duration   |
| ----------------- | -------------------------------------- | ---------- |
| `fade-up`         | `translateY(30px)` → 0                 | `0.8s`     |
| `fade-blur`       | `blur(12px) + translateY(12px)` → 0    | `0.8s`     |
| `slide-left`      | `translateX(-200px)` → 0               | `1s`       |
| `slide-right`     | `translateX(200px)` → 0                | `1s`       |
| `slide-left-sm`   | `translateX(-32px)` → 0                | `0.7s`     |
| `slide-right-sm`  | `translateX(32px)` → 0                 | `0.7s`     |
| `scale-up`        | `scale(0.8)` → 1                       | `1.2s`     |

- **Timing**: `ease-out` (standard), `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (slide)
- **Observer**: `threshold: 0.15`, `rootMargin: 0px 0px -80px 0px`
- **Once**: Elemente werden nach Animation `unobserve()`t

### Stagger-Children

- Container `.stagger-children` löst alle Kinder gleichzeitig aus
- Kinder bekommen `transition-delay`: 0s, 0.3s, 0.6s, 0.9s, 1.2s

### Text-Reveal (Word-by-Word)

- Jedes Wort als `<span class="word">` mit eigenem `transition-delay`
- Effekt: `opacity: 0 + blur(12px) + translateY(12px)` → sichtbar
- Konfigurierbar via `data-speed` (Standard: 0.3s), `data-delay`, `data-per` (word|line)

### Hero Auto-Animate

- Elemente mit `.hero-auto-animate` werden sofort (nach 100ms) sichtbar (kein Scroll nötig)

### FAQ Toggle

- JavaScript-gesteuerte Height-Animation mit `transitionend`-Events
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` für natürliches Öffnen/Schließen

---

## 7. Hintergrundeffekte

### Hero Background

- **Light**: `var(--background)` (weiß)
- **Dark**: `#000`
- **Decorative Blobs** (nur Desktop ≥1024px): 3 absolute radial-gradient Formen, gedreht, `opacity: 0.65`

### Features Section Gradient

- **Light**: `linear-gradient(180deg, #ffffff 0%, #CAD8DD 45%, #ffffff 100%)`
- **Dark**: `linear-gradient(180deg, #000000 0%, #0d1b2a 45%, #000000 100%)`

### Reviews Background Glows

- **Glow 1**: Oben zentriert, `blur(48px)`, Blau-Cyan Gradient
- **Glow 2**: Unten zentriert, `blur(48px)`, Slate-Grau

---

## 8. Dark Mode

- Umschaltung via `.dark` Klasse auf `<html>`
- Persistenz: `localStorage.getItem('theme')`, Fallback auf `prefers-color-scheme`
- Alle Farben über CSS Custom Properties gesteuert
- Zusätzliche Dark-spezifische Styles:
  - Gradient-Text für H1/H2 Headings
  - Hero-Hintergrund wird `#000` statt `var(--background)`
  - Angepasste Glow-Effekte (Weiß statt Blau bei Mockups)
  - Transparente Borders

---

## 9. Assets

### Bilder

| Datei                           | Format | Verwendung               |
| ------------------------------- | ------ | ------------------------ |
| `logo.svg`                      | SVG    | Navigationslogo          |
| `logo-mono.svg`                 | SVG    | Monochrome Variante      |
| `images/hydra-hero-mpckup.svg`  | SVG    | Hero-Mockup              |
| `images/social1200630.png`      | PNG    | OG / Twitter Card        |
| `mockups/iPhone_mu.svg`         | SVG    | Phone-Frame Overlay      |
| `screens/lmu_main.webp`         | WebP   | Feature 1: Übersicht     |
| `screens/lmu_anagram_sv.webp`   | WebP   | Feature 2: Anagramm-Test |
| `screens/lmu_score.webp`        | WebP   | Feature 3: Scoreboard    |
| `screens/lmu_memorytest.webp`   | WebP   | Feature 4: Memory-Test   |
| `images/soldiers.webp`          | WebP   | (Unused?)                |
| `images/soldiertp.webp`         | WebP   | (Unused?)                |

### Externe Ressourcen

| Ressource                       | URL / CDN                                          |
| ------------------------------- | -------------------------------------------------- |
| Google Fonts (Geist)            | `fonts.googleapis.com`                             |
| App Store Badge                 | `upload.wikimedia.org/wikipedia/commons/...`        |
| App Store Rating API            | `itunes.apple.com/lookup?id=6754796903&country=at` |

---

## 10. Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<details>`
- `aria-label` auf Nav, Buttons, Links ohne sichtbaren Text
- `aria-hidden="true"` auf dekorative Elemente (Blobs, Glows)
- `.sr-only` Utility-Klasse vorhanden
- `<details>/<summary>` für FAQ (native Keyboard-Unterstützung)
- Farbkontraste: OKLCH-basiertes System mit ausreichenden Kontrasten
- Fokusmanagement: Noch nicht explizit (kein `:focus-visible`-Styling)

---

## 11. SEO & Meta

- **JSON-LD**: Organization, MobileApplication, FAQPage
- **Open Graph**: Title, Description, Image, Type, Locale
- **Twitter Card**: `summary_large_image`
- **apple-itunes-app**: Smart Banner Meta-Tag
- **Canonical URL**: `https://hydrapt.com/`

---

## 12. Performance-Hinweise

- **Font-Loading**: `@import` (render-blocking) – sollte zu `<link rel="preload">` werden
- **Externe Bilder**: App Store Badge von Wikimedia (kein Self-Hosting)
- **Animations**: GPU-beschleunigt via `transform` und `filter`
- **Scroll-Events**: `{ passive: true }` für Scroll-Listener
- **Observer-basiert**: IntersectionObserver statt Scroll-Event für Animationen

---

## 13. Features Section – Design Review & Verbesserungsvorschläge

### Aktuelles Problem

Die Features Section folgt einem **strikten Ping-Pong-Layout**: Bild links / Text rechts, dann Bild rechts / Text links – über alle 4 Features hinweg. Dies erzeugt visuell ein **repetitives Muster**, da jedes Feature identisch strukturiert ist (Phone-Mockup + Textblock).

### Verbesserungsvorschläge

#### Option A: Variation im Layout (empfohlen)
Statt alle 4 Features gleich zu behandeln, verschiedene Darstellungsformen mischen:

1. **Feature 1** – Breites Intro: Vollbreiter Text mit 3 nebeneinanderliegenden Mini-Screens (Icons/Screenshots als Hero der Section)
2. **Feature 2+3** – Side-by-Side beibehalten (das bekannte Format, aber nur 2× statt 4×)
3. **Feature 4** – Abschluss-CTA: Zentrierter Screen mit Text darunter/darüber als Highlight mit Glow

#### Option B: Feature-Grid statt Zeilen
- Obere Reihe: Ein großes Featured-Element (Bild + Text) in voller Breite
- Untere Reihe: 3 kleinere Feature-Cards in einem Grid (wie die Privacy Cards), jeweils mit kleinem Screenshot, Icon und Kurztext

#### Option C: Scroll-Interaktivität
- Ein fixierter Phone-Mockup in der Mitte, dessen **Screen-Inhalt sich beim Scrollen wechselt** (Sticky + Scroll-triggered Image Swap)
- Textblöcke links/rechts erscheinen als "Steps" beim Scrollen
- Sehr modern, aber JavaScript-intensiver

#### Option D: Bento-Grid
- Verschiedene Kartengrößen in einem asymmetrischen Grid
- Feature 1: Große Karte (2×2), Feature 2-3: Medium (1×1), Feature 4: Wide (2×1)
- Jede Karte hat eigenen Mockup + Text als self-contained Unit

### Empfehlung

**Option A** bietet das beste Verhältnis aus visuellem Gewinn, Implementierungsaufwand und Beibehaltung der bestehenden Assets. Es bricht die Monotonie, ohne das bestehende Design komplett zu überarbeiten.
