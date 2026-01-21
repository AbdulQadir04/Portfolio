/* =========================================================
   CORE ELEMENTS
========================================================= */
const html = document.documentElement;
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const themeToggle = document.getElementById('themeToggle');
const styleToggle = document.getElementById('styleToggle');
const yearEl = document.getElementById('year');
const visualWrap = document.getElementById('visualWrap');
const heroVisual = document.querySelector('.hero-visual');

/* =========================================================
   YEAR
========================================================= */
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================================
   MOBILE MENU (ROBUST)
========================================================= */
function toggleMenu(forceClose = false) {
  const isOpen = menu.classList.contains('open');

  if (forceClose || isOpen) {
    menu.style.display = 'none';
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  } else {
    menu.style.display = 'flex';
    menu.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
  }
}

menuBtn?.addEventListener('click', () => toggleMenu());

/* Close menu when clicking links */
menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) toggleMenu(true);
  });
});

/* Close menu when clicking outside */
document.addEventListener('click', e => {
  if (
    window.innerWidth <= 900 &&
    menu.classList.contains('open') &&
    !menu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    toggleMenu(true);
  }
});

/* =========================================================
   THEME TOGGLE (PERSISTENT + A11Y)
========================================================= */
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);
  updateThemeIcon();
}

function updateThemeIcon() {
  const dark = html.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = dark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-pressed', String(dark));
}

themeToggle?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
});

initTheme();

/* =========================================================
   SHOWCASE TOGGLE (FLASHY MODE)
========================================================= */
function initShowcase() {
  const saved = localStorage.getItem('showcase');
  if (saved !== null) html.setAttribute('data-showcase', saved);
  styleToggle.setAttribute(
    'aria-pressed',
    html.getAttribute('data-showcase') === '1'
  );
}

styleToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-showcase') === '1';
  const next = current ? '0' : '1';
  html.setAttribute('data-showcase', next);
  localStorage.setItem('showcase', next);
  styleToggle.setAttribute('aria-pressed', String(!current));
});

initShowcase();

/* =========================================================
   LAZY IMAGE HANDLING (SMOOTH)
========================================================= */
document.querySelectorAll('img.lazy').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'), {
      once: true
    });
  }
});

/* =========================================================
   HERO TILT (PERFORMANCE SAFE)
========================================================= */
if (
  visualWrap &&
  heroVisual &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches
) {
  let rafId = null;

  heroVisual.addEventListener('mousemove', e => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      const rect = visualWrap.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;

      visualWrap.style.transform = `
        rotateY(${dx * 6}deg)
        rotateX(${-dy * 6}deg)
        translateZ(6px)
      `;

      rafId = null;
    });
  });

  heroVisual.addEventListener('mouseleave', () => {
    visualWrap.style.transform = '';
  });
}

/* =========================================================
   SCROLL SPY (ACTIVE NAV LINK)
========================================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length && navLinks.length) {
  const spy = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          active?.classList.add('active');
        }
      });
    },
    { threshold: 0.55 }
  );

  sections.forEach(section => spy.observe(section));
}

/* =========================================================
   SECTION REVEAL (DETAIL-ORIENTED UX)
========================================================= */
const reveals = document.querySelectorAll('.section, .hero');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* =========================================================
   SCROLL-DOWN INDICATOR
========================================================= */
const scrollDown = document.querySelector('.scroll-down');

scrollDown?.addEventListener('click', () => {
  const next = document.querySelector('.section');
  next?.scrollIntoView({ behavior: 'smooth' });
});

/* =========================================================
   FINAL: PREVENT FOUC
========================================================= */
html.style.visibility = 'visible';
