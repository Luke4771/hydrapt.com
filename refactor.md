# Refactoring-Plan: hydrapt.com static

> Ziel: Code eleganter, performanter und wartbarer machen, ohne das visuelle Ergebnis zu veraendern.
> Jede Phase ist eigenstaendig wertvoll und kann unabhaengig deployed werden.

---

## Bestandsaufnahme

| Datei | Zeilen | Hauptproblem |
|-------|--------|-------------|
| index.html | 843 | Grosse Einzeldatei, SVG Sprite, viele data-Attribute |
| en/index.html | 837 | Fast 1:1 Kopie von index.html |
| styles.css | 1.582 | Duplizierte Section-Header, verstreute Dark-Mode-Regeln, hardcodierte Farbwerte |
| scripts.js | 608 | 15+ globale Funktionen, Magic Numbers, doppelte IntersectionObserver |
| privacy-policy.html | 225 | Inline-Styles statt CSS-Klassen, ungenutzer SVG Sprite |
| impress.html | 177 | Inline-Styles, ungenutzter SVG Sprite |
| en/privacy-policy.html | 225 | Kopie der deutschen Version |
| en/impress.html | 177 | Kopie der deutschen Version |

**Gesamt: ca. 5.000 Zeilen Code, davon geschaetzt 600+ Zeilen Duplikation.**

---

## Phase 1: Totes Gewicht entfernen (Low Risk)

Einfache Aenderungen ohne Risiko, die sofort die Codebasis verkleinern.

### 1.1 Ungenutzten SVG Sprite aus Unterseiten entfernen
- `privacy-policy.html`, `impress.html`, `en/privacy-policy.html`, `en/impress.html` enthalten je 26 Zeilen SVG Sprite, der dort nicht verwendet wird
- **Ersparnis:** ~104 Zeilen

### 1.2 Tote CSS-Regeln entfernen
- `.section-title-icon` (display: none, Zeile 625) entfernen
- `.pricing-header .section-title-with-icon::before` (display: none, Zeile 665) entfernen
- `.hero-bg-decor` (display: none, Zeile 325) entfernen
- Pruefen ob weitere unused Regeln existieren
- **Ersparnis:** ~20-30 Zeilen

### 1.3 Inline-Styles in Unterseiten durch CSS-Klassen ersetzen
- `privacy-policy.html` und `impress.html` nutzen extensive Inline-Styles
- Neue wiederverwendbare Klassen in styles.css anlegen (z.B. `.legal-page`, `.legal-header`, `.legal-section`)
- Inline-Styles durch Klassen ersetzen
- Gleiche Klassen fuer DE und EN Versionen nutzen
- **Ersparnis:** ~200 Zeilen Inline-CSS, bessere Wartbarkeit

**Geschaetzter Aufwand:** Klein
**Risiko:** Minimal (kein Einfluss auf Hauptseite)

---

## Phase 2: CSS aufraemen und konsolidieren

### 2.1 Duplizierte Section-Header zu einer Klasse zusammenfuehren
- `.features-header`, `.privacy-header`, `.reviews-header`, `.pricing-header`, `.faq-header` sind nahezu identisch
- Eine generische `.section-header` Klasse erstellen
- Nur tatsaechliche Abweichungen per spezifischer Klasse ueberschreiben
- **Ersparnis:** ~60-80 Zeilen

### 2.2 Hardcodierte RGBA-Farben in CSS-Variablen umwandeln
- `rgba(59,130,246,0.3)` kommt 10+ mal vor
- `rgba(255,255,255,0.05)` kommt 8+ mal vor
- `rgba(0,0,0,0.1)` kommt 5+ mal vor
- Neue Variablen: `--glow-blue`, `--overlay-light`, `--shadow-subtle` o.ae.
- **Vorteil:** Eine Stelle zum Aendern statt 20+

### 2.3 Animations-Timing zentralisieren
- Aktuell verstreut: `0.5s`, `0.3s`, `0.35s`, `0.8s` mit verschiedenen Easings
- CSS-Variablen definieren: `--duration-fast`, `--duration-default`, `--duration-slow`, `--ease-default`
- In CSS und ggf. JS referenzieren
- **Vorteil:** Konsistente Animationen, einfach anpassbar

### 2.4 Dark-Mode-Regeln gruppieren
- Aktuell: `.dark`-Overrides verstreut in der gesamten Datei
- Besser: Pro Sektion die Dark-Mode-Regeln direkt unter die Light-Regeln setzen
- Nicht in einen einzigen Block verschieben (das erschwert den Kontext), sondern nah an die zugehoerige Komponente

**Geschaetzter Aufwand:** Mittel
**Risiko:** Niedrig (rein kosmetisch, visuell identisch)

---

## Phase 3: JavaScript vereinfachen

### 3.1 Magic Numbers durch benannte Konstanten ersetzen
- `4000` (Scramble-Interval), `2500` (Text-Reveal-Wartezeit), `0.3` / `0.8` (FAQ-Delays) etc.
- Am Anfang von scripts.js ein `const TIMING = { ... }` Objekt definieren
- Alle Magic Numbers referenzieren
- **Vorteil:** Selbstdokumentierend, leicht anpassbar

### 3.2 Doppelte IntersectionObserver zusammenfuehren
- Aktuell: Einer fuer `.anim-hidden`, einer fuer `.stagger-children`
- Beide haben aehnliche Config und koennten zu einem Observer zusammengefasst werden, der per Klasse entscheidet was passiert
- **Ersparnis:** ~20 Zeilen, ein Observer statt zwei

### 3.3 Carousel-Logik deduplizieren
- `initFeaturesCarousel()` und `initReviewsCarousel()` rufen beide `initSnapCarousel()` auf
- Pruefen ob die Wrapper-Funktionen ueberhaupt noetig sind oder direkte Aufrufe reichen
- **Ersparnis:** ~10-15 Zeilen

### 3.4 GSAP-Abhaengigkeit evaluieren
- `initHeroGallery()` nutzt GSAP fuer die Endlos-Galerie
- Pruefen ob CSS `@keyframes` + `animation-iteration-count: infinite` das gleiche Ergebnis liefert
- Falls ja: GSAP entfernen, externe Abhaengigkeit eliminieren
- Falls nein: GSAP behalten, aber dokumentieren warum

**Geschaetzter Aufwand:** Mittel
**Risiko:** Niedrig bis Mittel (Animationen muessen getestet werden)

---

## Phase 4: HTML-Duplikation reduzieren

### 4.1 SVG Sprite auslagern
- Aktuell: SVG Sprite (6 Symbole) inline in index.html und en/index.html
- In eine externe `assets/icons.svg` Datei auslagern
- Per `<use href="assets/icons.svg#icon-name">` referenzieren
- **Vorteil:** Eine Quelle, einfach erweiterbar

### 4.2 Gemeinsame Strukturen zwischen DE/EN dokumentieren
- index.html und en/index.html teilen ~95% identische Struktur
- Da es eine statische Seite ohne Build-Step ist, koennen wir keine Templating-Engine nutzen
- Stattdessen: Klare Kommentare in beiden Dateien, die markieren wo sich Inhalte unterscheiden
- Alternativ: Einfaches Build-Script (z.B. ein kleines Node/Shell-Script) evaluieren, das aus einer Template-Datei beide Versionen generiert

### 4.3 Header/Footer Konsistenz sicherstellen
- Header (~70 Zeilen) und Footer (~20 Zeilen) in allen 6 Dateien identisch (bis auf Sprachlinks)
- Klare `<!-- BEGIN HEADER -->` / `<!-- END HEADER -->` Kommentare setzen
- Erleichtert manuelles Synchronisieren bei Aenderungen

**Geschaetzter Aufwand:** Klein bis Mittel
**Risiko:** Niedrig

---

## Phase 5: Performance-Optimierungen

### 5.1 Font-Loading optimieren
- Google Fonts laedt 8 Gewichte (300-800)
- Pruefen welche Gewichte tatsaechlich genutzt werden, ungenutzte entfernen
- `font-display: swap` sicherstellen (verhindert unsichtbaren Text waehrend Laden)

### 5.2 Bild-Loading verbessern
- Hero-Gallery-Bilder mit `loading="eager"` pruefen
- Bilder unterhalb des Viewports auf `loading="lazy"` umstellen
- `fetchpriority="high"` nur fuer das erste sichtbare Bild
- Fehlende `width`/`height` Attribute ergaenzen (verhindert Layout Shift)

### 5.3 CSS-Effizienz
- Ungenutzte Media-Query-Regeln identifizieren und entfernen
- `backdrop-filter: blur()` sparsam einsetzen (GPU-intensiv)
- `will-change` nur dort wo noetig und nach Animation entfernen

**Geschaetzter Aufwand:** Klein
**Risiko:** Niedrig

---

## Zusammenfassung

| Phase | Aufwand | Risiko | Geschaetzte Ersparnis |
|-------|---------|--------|----------------------|
| 1: Totes Gewicht | Klein | Minimal | ~330 Zeilen |
| 2: CSS konsolidieren | Mittel | Niedrig | ~100 Zeilen + bessere Struktur |
| 3: JS vereinfachen | Mittel | Niedrig-Mittel | ~50 Zeilen + Lesbarkeit |
| 4: HTML-Duplikation | Klein-Mittel | Niedrig | Bessere Wartbarkeit |
| 5: Performance | Klein | Niedrig | Schnellere Ladezeit |

### Reihenfolge und Abhaengigkeiten

```
Phase 1 (Totes Gewicht)
   |
   v
Phase 2 (CSS) -----> Phase 3 (JS)     <- unabhaengig voneinander
   |                    |
   v                    v
Phase 4 (HTML-Duplikation)
   |
   v
Phase 5 (Performance)
```

Phase 1 sollte immer zuerst kommen. Phase 2 und 3 sind voneinander unabhaengig. Phase 4 profitiert davon, dass CSS und JS vorher aufgeraeumt sind. Phase 5 ist jederzeit machbar.

### Prinzipien

- **Kein visueller Unterschied** nach dem Refactoring
- **Jede Phase einzeln testbar** und deploybar
- **Einfachheit vor Cleverness:** Lieber drei klare Zeilen als eine abstrakte Hilfsfunktion
- **Kein Build-Tool erforderlich** (bleibt statische Seite, es sei denn Phase 4.2 wird mit Build-Script umgesetzt)
