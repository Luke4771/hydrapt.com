# Hero Image Gallery (Karussell)

## Ueberblick

Die Hero Section enthaelt ein endlos scrollendes Bilder-Karussell auf der rechten Seite. Es zeigt immer 2 Bilder gleichzeitig und scrollt kontinuierlich horizontal nach links. Die Animation wird mit GSAP realisiert, nicht mit CSS-Keyframes. Es werden keine Duplikate im HTML benoetigt.

## Wie es funktioniert

### GSAP Seamless Loop (keine Duplikate)

Die `.gallery-grid` enthaelt nur 5 einzigartige `gallery-item` Elemente. GSAP positioniert jedes Item absolut und animiert die `x`-Position. Der `modifiers`-Callback nutzt Modulo-Arithmetik, um Items am Ende der Reihe nahtlos an den Anfang zurueckzusetzen. Dadurch entsteht ein endloses Karussell ohne HTML-Duplikate.

### Gradient-Overlays

Fade-Effekte an den Raendern liegen auf `.hero-gallery::before` (links) und `.hero-gallery::after` (rechts). Sie sind am Container fixiert, waehrend die Bilder dahinter durchscrollen. Die Gradienten passen sich automatisch an Light/Dark Mode an.

### Timing

- Animationsdauer: 40 Sekunden fuer einen vollen Durchlauf
- 5 einzigartige Bilder, 2 gleichzeitig sichtbar
- `ease: 'none'` fuer gleichmaessige Geschwindigkeit
- `repeat: -1` fuer endlose Wiederholung
- Initiales Offset: `-1 slot` (damit das erste Bild nicht am linken Rand klebt)

### Responsive

- Die Gallery ist nur auf Desktop sichtbar (ab 1024px, `.hero-right` ist darunter `display: none`)
- Bei Resize wird die Animation neu berechnet (debounced, 200ms)
- `prefers-reduced-motion: reduce` verhindert die Animation komplett

## Relevante CSS-Klassen

| Klasse | Zweck |
|--------|-------|
| `.hero-right` | Aeusserer Wrapper, `display: none` auf Mobile, `position: absolute` auf Desktop |
| `.hero-gallery` | Container mit `overflow: hidden`, traegt die Gradient-Overlays (::before/::after) |
| `.gallery-grid` | Container fuer die absolut positionierten Items |
| `.gallery-item` | Absolut positioniertes Bild-Element, Breite wird per JS gesetzt |
| `.gallery-item img` | Bild mit `aspect-ratio: 3/4`, `object-fit: cover`, `border-radius` |

## Relevante Dateien

- `styles.css` - Zeilen ~422-521: Gallery-Styles, Gradient-Overlays, Responsive
- `scripts.js` - Zeilen ~563-608: `initHeroGallery()` GSAP-Animation
- `index.html` - Zeilen ~378-398: Deutsche Gallery mit 5 Items
- `en/index.html` - Zeilen ~378-398: Englische Gallery mit 5 Items

## Bilder austauschen

Die Bilder liegen lokal unter `assets/hero gallery images/`. Um ein Bild zu aendern:

1. URL im entsprechenden `gallery-item` in **beiden** HTML-Dateien aendern (DE + EN)
2. `alt`-Text anpassen
3. `width`/`height` Attribute bei Bedarf anpassen

## Accessibility

- `prefers-reduced-motion: reduce` verhindert die Animation
- Gallery ist nur auf Desktop sichtbar (ab 1024px)
- Alle Bilder haben beschreibende `alt`-Texte

## Abhaengigkeiten

- GSAP 3 (via CDN: `https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js`)

---

## Reproduzierbarer Code

### HTML

```html
<!-- Right Column - Image Gallery -->
<div class="hero-right">
  <div class="hero-gallery">
    <div class="gallery-grid">
      <div class="gallery-item">
        <img src="assets/hero gallery images/soldier.webp" alt="Militaer" width="240" height="320" loading="eager">
      </div>
      <div class="gallery-item">
        <img src="assets/hero gallery images/pilot.webp" alt="Piloten" width="240" height="320" loading="eager">
      </div>
      <div class="gallery-item">
        <img src="assets/hero gallery images/special forces.webp" alt="Spezialeinheiten" width="240" height="320" loading="eager">
      </div>
      <div class="gallery-item">
        <img src="assets/hero gallery images/airtraffic controller.webp" alt="Fluglotsen" width="240" height="320" loading="eager">
      </div>
      <div class="gallery-item">
        <img src="assets/hero gallery images/police officer.webp" alt="Polizei" width="240" height="320" loading="eager">
      </div>
    </div>
  </div>
</div>
```

### CSS

```css
.hero-right {
  display: none;
}

.hero-gallery {
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 3 / 2;
}

.gallery-grid {
  position: relative;
  width: 100%;
  height: 100%;
}

.gallery-item {
  position: absolute;
  top: 0;
  height: 100%;
}

.gallery-item img {
  width: 100%;
  max-width: 456px;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  position: relative;
  z-index: 1;
}

/* Gradient fade overlays on gallery edges */
.hero-gallery::before,
.hero-gallery::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25%;
  z-index: 2;
  pointer-events: none;
}

.hero-gallery::before {
  left: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.5) 50%, transparent);
}
.hero-gallery::after {
  right: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.5) 50%, transparent);
}

/* Dark mode overrides */
.dark .hero-gallery::before {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4) 50%, transparent);
}
.dark .hero-gallery::after {
  background: linear-gradient(to left, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4) 50%, transparent);
}

/* Desktop: show gallery */
@media (min-width: 1024px) {
  .hero-right {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -3%;
    width: 50%;
  }
}
```

### JavaScript (GSAP 3 erforderlich)

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
```

```js
function initHeroGallery() {
  const gallery = document.querySelector('.hero-gallery');
  const grid = document.querySelector('.gallery-grid');
  const items = gsap.utils.toArray('.gallery-item');
  if (!gallery || !grid || items.length === 0) return;

  // Gap between images (0.75rem converted to px)
  const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.75;
  let tween;

  function setup() {
    if (tween) tween.kill();

    const galleryW = gallery.offsetWidth;
    // Two images visible at a time
    const itemW = (galleryW - gap) / 2;
    const slot = itemW + gap;
    const totalW = items.length * slot;

    // Position each item absolutely along the x-axis
    gsap.set(items, {
      width: itemW,
      x: (i) => i * slot
    });
    // Offset so first image is not flush with left edge
    gsap.set(grid, { x: -slot });

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Animate all items leftward, modulo wraps them back to the right
    tween = gsap.to(items, {
      duration: 40,
      ease: 'none',
      x: '-=' + totalW,
      modifiers: {
        x: gsap.utils.unitize(function (x) {
          return ((parseFloat(x) % totalW) + totalW) % totalW;
        })
      },
      repeat: -1
    });
  }

  setup();

  // Recalculate on resize (debounced)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 200);
  });
}

// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  initHeroGallery();
});
```

## Layout-Parameter

- `.hero-right` Breite: `50%` (Desktop)
- `.hero-right` Position: `right: -3%` (ragt leicht ueber den Rand hinaus)
- `.hero-gallery` Seitenverhaeltnis: `3/2`
- Gap zwischen Bildern: `0.75rem`
- Bild-Seitenverhaeltnis: `3/4` (Hochformat)
- Max Bildbreite: `456px`
