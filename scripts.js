/* ============================================
   Hydra PT – Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
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

  // ---- Feature scroll screen switching ----
  initFeatureScroll();

  // ---- Smooth FAQ toggle ----
  initFaqAnimations();

  // ---- Fetch App Store rating ----
  fetchAppStoreRating();
});

/* =========================================
   THEME
   ========================================= */
function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
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
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const panel = document.querySelector('.nav-mobile-panel');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    panel.classList.toggle('open');
    // Update nav data-state for proper styling
    const nav = document.querySelector('nav.main-nav');
    if (nav) {
      nav.dataset.state = panel.classList.contains('open') ? 'active' : '';
    }
  });

  // Close on link click
  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      panel.classList.remove('open');
    });
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
        // Close mobile menu if open
        const btn = document.querySelector('.mobile-menu-btn');
        const panel = document.querySelector('.nav-mobile-panel');
        if (btn && panel) {
          btn.classList.remove('active');
          panel.classList.remove('open');
        }
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
        // Add anim-visible to all children when container enters view
        entry.target.querySelectorAll('.anim-hidden').forEach(child => {
          child.classList.add('anim-visible');
        });
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
    const text = el.textContent.trim();
    const per = el.dataset.per || 'word'; // 'word' or 'line'
    const delay = parseFloat(el.dataset.delay || '0');
    const speed = parseFloat(el.dataset.speed || '0.3');

    el.innerHTML = '';

    if (per === 'line') {
      // For line-based: split on sentence boundaries or just treat whole text as one segment  
      const lines = text.split(/(?<=\.)\s+/);
      lines.forEach((line, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = line;
        span.style.transitionDelay = `${delay + i * speed}s`;
        el.appendChild(span);
        if (i < lines.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      });
    } else {
      // Word-by-word
      const words = text.split(/\s+/);
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.transitionDelay = `${delay + i * speed}s`;
        el.appendChild(span);
        if (i < words.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      });
    }

    // For hero text, auto-animate
    if (el.classList.contains('hero-auto-animate')) {
      setTimeout(() => {
        el.classList.add('anim-visible');
      }, 100);
    }
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
   FEATURE CLICK – Card-driven Screen Swap
   ========================================= */
function initFeatureScroll() {
  const screen = document.querySelector('.phone-mockup .screen .feature-screen');
  const steps = document.querySelectorAll('.feature-step');
  if (!screen || !steps.length) return;

  screen.loading = 'eager';
  screen.decoding = 'async';
  let current = screen.getAttribute('src') || '';

  function setScreen(src) {
    if (!src || src === current) return;

    screen.style.opacity = '0';

    const reveal = () => {
      screen.style.opacity = '1';
    };

    screen.addEventListener('load', reveal, { once: true });
    screen.addEventListener('error', reveal, { once: true });
    screen.src = src;
    current = src;

    // Fallback for cached images where load may not fire
    if (screen.complete) {
      reveal();
    }
  }

  function activateStep(step) {
    const src = step.dataset.screen;

    // Highlight active step
    steps.forEach((s) => s.classList.remove('is-active'));
    step.classList.add('is-active');

    setScreen(src);
  }

  // Click handler for each card
  steps.forEach((step) => {
    step.addEventListener('click', () => activateStep(step));
  });

  // Set first step active on load (don't call setScreen – image is already visible)
  if (steps[0]) {
    steps[0].classList.add('is-active');
    const firstSrc = steps[0].dataset.screen;
    if (firstSrc) {
      current = firstSrc;
    }
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
