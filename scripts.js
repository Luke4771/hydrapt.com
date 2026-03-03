/* ============================================
   Hydra PT – Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Language Redirect ----
  initLanguageRedirect();

  // ---- Theme Toggle ----
  initTheme();

  // ---- Scroll-based header styling ----
  initNavScroll();

  // ---- Mobile menu ----
  initMobileMenu();

  // ---- Smooth scroll for anchor links ----
  initSmoothScroll();

  // ---- Scroll animations (IntersectionObserver) ----
  initScrollAnimations();

  // ---- Word-by-word text reveal ----
  initTextReveal();

  // ---- Scramble text rotation ----
  initScrambleText();

  // ---- Rotating hero images ----
  initRotatingImages();

  // ---- Hero image gallery (GSAP seamless loop) ----
  initHeroGallery();

  // ---- Feature scroll screen switching ----
  initFeatureScroll();

  // ---- Smooth FAQ toggle ----
  initFaqAnimations();

  // ---- Fetch App Store rating ----
  fetchAppStoreRating();

  // ---- Mobile carousels ----
  initFeaturesCarousel();
  initReviewsCarousel();

  // ---- Scroll to top button ----
  initScrollToTop();
});

/* =========================================
   THEME
   ========================================= */
function initTheme() {
  const stored = localStorage.getItem('theme');
  const theme = stored || 'light';
  applyTheme(theme);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/* =========================================
   LANGUAGE REDIRECT
   ========================================= */
function initLanguageRedirect() {
  const stored = localStorage.getItem('language-redirected');
  if (stored) return;

  const currentPath = window.location.pathname;
  const isEnPath = currentPath.includes('/en/');
  const isRootPath = currentPath === '/' || currentPath === '/index.html';

  if (isEnPath) return;

  const lang = navigator.language || navigator.userLanguage;
  const isGermanSpeaking = /^de(-|$)/.test(lang);

  if (isRootPath && !isGermanSpeaking) {
    localStorage.setItem('language-redirected', 'true');
    window.location.href = '/en/index.html';
  } else if (isRootPath && isGermanSpeaking) {
    localStorage.setItem('language-redirected', 'true');
  }
}

/* =========================================
   NAV SCROLL
   ========================================= */
function initNavScroll() {
  const inner = document.querySelector('.nav-inner');
  if (!inner) return;
  const check = () => {
    if (window.scrollY > 50) {
      inner.classList.add('scrolled');
    } else {
      inner.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', check, { passive: true });
  check();
}

/* =========================================
   MOBILE MENU
   ========================================= */
function closeMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const panel = document.querySelector('.nav-mobile-panel');
  if (btn) btn.classList.remove('active');
  if (panel) panel.classList.remove('open');
}

function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const panel = document.querySelector('.nav-mobile-panel');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    panel.classList.toggle('open');
    const nav = document.querySelector('nav.main-nav');
    if (nav) {
      nav.dataset.state = panel.classList.contains('open') ? 'active' : '';
    }
  });

  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* =========================================
   SMOOTH SCROLL
   ========================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.getElementById(href.substring(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
      }
    });
  });
}

/* =========================================
   SCROLL ANIMATIONS (IntersectionObserver)
   ========================================= */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  // Observe all elements with anim-hidden class
  document.querySelectorAll('.anim-hidden').forEach(el => {
    observer.observe(el);
  });

  // Also handle stagger-children containers
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.anim-hidden');
        // Add anim-visible to all children when container enters view
        children.forEach(child => {
          child.classList.add('anim-visible');
        });
        // Remove anim-hidden after animations finish so stagger
        // transition-delays no longer affect interactive transitions
        const maxDelay = children.length * 0.3;
        setTimeout(() => {
          children.forEach(child => {
            child.classList.remove('anim-hidden');
          });
        }, (maxDelay + 0.8) * 1000);
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  document.querySelectorAll('.stagger-children').forEach(el => {
    staggerObserver.observe(el);
  });

  // Auto-animate hero elements (no scroll needed – immediate)
  document.querySelectorAll('.hero-auto-animate').forEach(el => {
    setTimeout(() => {
      el.classList.add('anim-visible');
    }, 100);
  });
}

/* =========================================
   TEXT REVEAL (word-by-word or line-by-line)
   ========================================= */
function initTextReveal() {
  document.querySelectorAll('.text-reveal').forEach(el => {
    /* Preserve scramble-word data before innerHTML is cleared */
    const scrambleEl = el.querySelector('.scramble-word');
    let scrambleData = null;
    if (scrambleEl) {
      scrambleData = {
        words: scrambleEl.dataset.words,
        initial: scrambleEl.textContent.trim()
      };
    }

    const text = el.textContent.trim();
    const per = el.dataset.per || 'word';
    const delay = parseFloat(el.dataset.delay || '0');
    const speed = parseFloat(el.dataset.speed || '0.3');

    el.innerHTML = '';

    const segments = per === 'line' ? text.split(/(?<=\.)\s+/) : text.split(/\s+/);
    segments.forEach((seg, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = seg;
      span.style.transitionDelay = `${delay + i * speed}s`;

      if (scrambleData && seg === scrambleData.initial) {
        span.classList.add('scramble-word');
        span.dataset.words = scrambleData.words;
        scrambleData = null;
      }

      el.appendChild(span);
      if (i < segments.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });

    if (el.classList.contains('hero-auto-animate')) {
      setTimeout(() => el.classList.add('anim-visible'), 100);
    }
  });
}

/* =========================================
   FADE-BLUR TEXT ROTATION
   ========================================= */
function initScrambleText() {
  document.querySelectorAll('.scramble-word').forEach(el => {
    const words = JSON.parse(el.dataset.words);
    if (!words || words.length < 2) return;

    /* Find rotating icon next to scramble word */
    const rotatingIcon = el.nextElementSibling;
    const icons = rotatingIcon && rotatingIcon.classList.contains('rotating-icon')
      ? JSON.parse(rotatingIcon.dataset.icons || '[]')
      : [];

    let currentIndex = 0;

    function cycle() {
      /* Slide up + fade out (300ms, ease-in) */
      el.classList.add('fade-out');
      if (rotatingIcon) rotatingIcon.classList.add('icon-fade-out');

      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % words.length;

        /* Update word */
        currentIndex = nextIndex;
        el.textContent = words[currentIndex];
        el.classList.remove('fade-out');
        el.classList.add('fade-in-start');
        void el.offsetWidth;
        el.classList.remove('fade-in-start');

        /* Update icon */
        if (rotatingIcon && icons[nextIndex]) {
          rotatingIcon.classList.remove('icon-fade-out');
          rotatingIcon.classList.add('icon-fade-in-start');
          void rotatingIcon.offsetWidth;
          rotatingIcon.classList.remove('icon-fade-in-start');
          rotatingIcon.textContent = icons[nextIndex];
        }
      }, 300);
    }

    /* Wait for text-reveal animation, then start cycling */
    setTimeout(() => {
      /* Remove scroll-animation classes so they don't block cycling transitions */
      el.classList.remove('anim-hidden', 'anim-visible', 'fade-blur');
      setInterval(cycle, 4000);
    }, 2500);
  });
}

/* =========================================
   ROTATING HERO IMAGES
   ========================================= */
function initRotatingImages() {
  document.querySelectorAll('.hero-rotating-image').forEach(el => {
    const images = JSON.parse(el.dataset.images || '[]');
    if (!images || images.length < 2) return;

    let currentIndex = 0;

    function cycle() {
      el.classList.add('fade-out');

      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % images.length;

        currentIndex = nextIndex;
        el.src = images[currentIndex];
        el.classList.remove('fade-out');
        el.classList.add('fade-in-start');
        void el.offsetWidth;
        el.classList.remove('fade-in-start');
      }, 300);
    }

    setTimeout(() => {
      setInterval(cycle, 4000);
    }, 2500);
  });
}

/* =========================================
   SMOOTH FAQ TOGGLE
   ========================================= */
function initFaqAnimations() {
  document.querySelectorAll('.faq-item').forEach(details => {
    const summary = details.querySelector('summary');
    const p = details.querySelector('p');
    if (!summary || !p) return;

    // Wrap <p> in height-animatable wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'faq-content-wrapper';
    p.parentNode.insertBefore(wrapper, p);
    wrapper.appendChild(p);

    // Start all closed
    details.open = false;
    wrapper.style.height = '0';
    wrapper.style.opacity = '0';

    summary.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = details.open;

      if (!isOpen) {
        // Open: measure natural height, animate to it
        details.open = true;
        const targetH = wrapper.scrollHeight;
        wrapper.style.height = targetH + 'px';
        wrapper.style.opacity = '1';
        wrapper.addEventListener('transitionend', () => {
          wrapper.style.height = 'auto';
        }, { once: true });
        summary.classList.add('is-open');
      } else {
        // Close: pin current height first, then animate to 0
        wrapper.style.height = wrapper.scrollHeight + 'px';
        wrapper.offsetHeight; // force reflow
        wrapper.style.height = '0';
        wrapper.style.opacity = '0';
        wrapper.addEventListener('transitionend', () => {
          details.open = false;
        }, { once: true });
        summary.classList.remove('is-open');
      }
    });
  });
}

/* =========================================
   SHARED: Transition a phone screen image
   ========================================= */
function transitionScreen(screen, src) {
  if (!src || src === screen.getAttribute('src')) return;
  screen.style.opacity = '0';
  const reveal = () => { screen.style.opacity = '1'; };
  screen.addEventListener('load', reveal, { once: true });
  screen.addEventListener('error', reveal, { once: true });
  screen.src = src;
  if (screen.complete) reveal();
}

/* =========================================
   FEATURE CLICK – Card-driven Screen Swap
   ========================================= */
function initFeatureScroll() {
  const screen = document.querySelector('.phone-mockup .screen .feature-screen');
  const steps = document.querySelectorAll('.feature-step');
  if (!screen || !steps.length) return;

  screen.loading = 'eager';
  screen.decoding = 'async';

  function activateStep(step) {
    steps.forEach(s => s.classList.remove('is-active'));
    step.classList.add('is-active');
    transitionScreen(screen, step.dataset.screen);
  }

  steps.forEach(step => {
    step.addEventListener('click', () => activateStep(step));
  });

  if (steps[0]) {
    steps[0].classList.add('is-active');
  }
}

/* =========================================
   APP STORE RATING
   ========================================= */
async function fetchAppStoreRating() {
  const el = document.getElementById('appstore-rating');
  if (!el) return;
  try {
    const res = await fetch('https://itunes.apple.com/lookup?id=6754796903&country=at');
    if (!res.ok) return;
    const data = await res.json();
    const rating = data?.results?.[0]?.averageUserRating;
    const count = data?.results?.[0]?.userRatingCount;
    if (typeof rating === 'number' && typeof count === 'number') {
      el.innerHTML = `App Store Rating <span>${rating.toFixed(1)} ★ (${new Intl.NumberFormat('de-DE').format(count)})</span>`;
      el.style.display = '';
    }
  } catch {
    // silently fail
  }
}

/* =========================================
   GENERIC SCROLL-SNAP CAROUSEL WITH DOTS
   ========================================= */
function initSnapCarousel(scrollContainer, dotsContainer, onChange) {
  if (!scrollContainer || !dotsContainer) return;

  const items = Array.from(scrollContainer.children).filter(
    el => el.nodeType === 1 && !el.getAttribute('aria-hidden')
  );
  if (items.length === 0) return;

  // Create dots
  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => {
      items[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  // Observe which item is in the center
  let currentIndex = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = items.indexOf(entry.target);
        if (idx !== -1 && idx !== currentIndex) {
          currentIndex = idx;
          dots.forEach((d, i) => d.classList.toggle('active', i === idx));
          if (onChange) onChange(idx, items[idx]);
        }
      }
    });
  }, {
    root: scrollContainer,
    threshold: 0.6
  });

  items.forEach(item => observer.observe(item));
}

/* =========================================
   FEATURES CAROUSEL (mobile)
   ========================================= */
function initFeaturesCarousel() {
  if (!window.matchMedia('(max-width: 767px)').matches) return;

  const stepsCol = document.querySelector('.features-steps-col');
  const dotsContainer = document.querySelector('.features-carousel-dots');
  const screen = document.querySelector('.phone-mockup .screen .feature-screen');
  const steps = document.querySelectorAll('.feature-step');

  if (!stepsCol || !dotsContainer || !screen || !steps.length) return;

  initSnapCarousel(stepsCol, dotsContainer, (idx, item) => {
    steps.forEach(s => s.classList.remove('is-active'));
    item.classList.add('is-active');
    transitionScreen(screen, item.dataset.screen);
  });
}

/* =========================================
   REVIEWS CAROUSEL (mobile)
   ========================================= */
function initReviewsCarousel() {
  const grid = document.querySelector('.reviews-grid');
  const dotsContainer = document.querySelector('.reviews-carousel-dots');
  initSnapCarousel(grid, dotsContainer);
}

/* =========================================
   SCROLL TO TOP BUTTON
   ========================================= */
function initScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================
   HERO IMAGE GALLERY (GSAP seamless loop)
   Uses GSAP modifiers for pixel-perfect
   infinite scrolling without duplicating items.
   ========================================= */
function initHeroGallery() {
  const gallery = document.querySelector('.hero-gallery');
  const grid = document.querySelector('.gallery-grid');
  const items = gsap.utils.toArray('.gallery-item');
  if (!gallery || !grid || items.length === 0) return;

  const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.75;
  let tween;

  function setup() {
    if (tween) tween.kill();

    const galleryW = gallery.offsetWidth;
    const itemW = (galleryW - gap) / 2;
    const slot = itemW + gap;
    const totalW = items.length * slot;

    gsap.set(items, {
      width: itemW,
      x: (i) => i * slot
    });
    gsap.set(grid, { x: -slot });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 200);
  });
}
