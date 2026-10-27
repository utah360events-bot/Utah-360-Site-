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
    '.how-step'
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
