# Hero Image Gallery (Karussell)

## Ueberblick

Die Hero Section enthaelt ein endlos scrollendes Bilder-Karussell auf der rechten Seite. Es zeigt immer 2 Bilder gleichzeitig und scrollt kontinuierlich horizontal nach links.

## Wie es funktioniert

### Nahtloses Looping

Die `.gallery-grid` enthaelt 10 `gallery-item` Elemente: 5 einzigartige Bilder + 5 identische Duplikate. Eine CSS `@keyframes` Animation (`carousel-scroll`) verschiebt die gesamte Grid-Row von `translateX(0)` nach `translateX(-50%)`. Da die zweite Haelfte identisch zur ersten ist, ist der Sprung zurueck zum Anfang unsichtbar.

### Gradient-Overlays

Die Fade-Effekte an den aeusseren Raendern liegen auf `.hero-gallery::before` (links) und `.hero-gallery::after` (rechts). Sie sind am Container fixiert, waehrend die Bilder dahinter durchscrollen. Die Gradienten passen sich automatisch an Light/Dark Mode an.

### Timing

- Animationsdauer: 20 Sekunden fuer einen vollen Durchlauf
- 5 einzigartige Bilder, 2 gleichzeitig sichtbar
- Ergibt ca. 8 Sekunden Sichtbarkeit pro Bildpaar
- `linear` easing fuer gleichmaessige Geschwindigkeit
- `infinite` fuer endlose Wiederholung

## Relevante CSS-Klassen

| Klasse | Zweck |
|--------|-------|
| `.hero-gallery` | Container mit `overflow: hidden`, traegt die Gradient-Overlays (::before/::after) |
| `.gallery-grid` | Flex-Row mit der Scroll-Animation |
| `.gallery-item` | Einzelnes Bild-Element, `flex: 0 0 calc(50% - 0.375rem)` fuer 2 sichtbare Bilder |
| `.gallery-item img` | Bild mit `aspect-ratio: 4/4`, `object-fit: cover` |

## Relevante Dateien

- `styles.css` - Zeilen ~425-537: Keyframes, Gallery-Styles, Gradient-Overlays, Responsive, Reduced Motion
- `index.html` - Zeilen ~381-416: Deutsche Gallery mit 10 Items
- `en/index.html` - Zeilen ~381-416: Englische Gallery mit 10 Items

## Bilder austauschen

Die Bilder liegen lokal unter `assets/hero gallery images/`. Um ein Bild zu aendern:

1. URL im entsprechenden `gallery-item` in **beiden** HTML-Dateien aendern (DE + EN)
2. Die gleiche URL auch im Duplikat-Set aendern (die Items mit `aria-hidden="true"`)
3. `alt`-Text anpassen (leer lassen bei Duplikaten)

## Accessibility

- Duplikate haben `aria-hidden="true"` und leere `alt`-Attribute
- `prefers-reduced-motion: reduce` pausiert die Animation
- Gallery ist nur auf Desktop sichtbar (ab 1024px)

## Layout-Parameter

- `.hero-right` Breite: `60%` (Desktop)
- `.hero-right` Position: `right: -5%` (ragt leicht ueber den Rand hinaus)
- Gap zwischen Bildern: `0.75rem`
- Bild-Seitenverhaeltnis: `4/4` (quadratisch)
