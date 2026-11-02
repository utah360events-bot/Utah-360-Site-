/* Utah 360 Events — shared motion scripts
   No libraries. IntersectionObserver only.
   ─────────────────────────────────────── */
(function () {
  'use strict';

  /* Skip all motion if the user has asked for reduced motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  /* ── SCROLL FADE-INS ──────────────────────────────────────────
     Automatically finds the elements below, adds .fade-in,
     and staggers siblings that share the same parent.          */

  var selectors = [
    '.service-tile',
    '.proof-main',
    '.proof-mini',
    '.diff-item',
    '.faq-item',
    '.price-card',
    '.home-form-inner > *',
    '.about-split',
    '.service-detail-grid',
    '.feature-card',
    '.how-step',
    '.city-card',
    '.choice-card',
    '.landing-quote'
  ].join(', ');

  var targets = Array.prototype.slice.call(document.querySelectorAll(selectors));
  if (!targets.length) return;

  /* Tag every target with .fade-in */
  targets.forEach(function (el) { el.classList.add('fade-in'); });

  /* Add stagger delay to siblings that are both animated and share a parent */
  var seen = [];
  targets.forEach(function (el) {
    var parent = el.parentElement;
    if (seen.indexOf(parent) !== -1) return;
    seen.push(parent);

    var animated = Array.prototype.filter.call(parent.children, function (c) {
      return c.classList.contains('fade-in');
    });
    if (animated.length > 1) {
      animated.forEach(function (sib, i) {
        sib.style.transitionDelay = (i * 0.11) + 's';
      });
    }
  });

  /* Observer — once visible, stays visible (unobserve after trigger) */
  var fadeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(function (el) { fadeObs.observe(el); });

})();

/* Events menu — not tied to scroll motion */
(function () {
  'use strict';

  var drops = document.querySelectorAll('.nav-dropdown');
  if (!drops.length) return;

  drops.forEach(function (drop) {
    var btn = drop.querySelector('.nav-dropdown-label');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var open = drop.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (event) {
    drops.forEach(function (drop) {
      if (drop.contains(event.target)) return;
      drop.classList.remove('is-open');
      var btn = drop.querySelector('.nav-dropdown-label');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    drops.forEach(function (drop) {
      drop.classList.remove('is-open');
      var btn = drop.querySelector('.nav-dropdown-label');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
})();
