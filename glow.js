// The hero's red glow follows the cursor and returns behind the logo when the cursor leaves.
// It stays off on touch screens and when the user has asked for reduced motion.
(function () {
  var hero = document.querySelector('.hero');
  var logo = document.querySelector('.hero-logo');
  if (!hero || !logo) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0;

  function setGlow(x, y) {
    hero.style.setProperty('--gx', x + 'px');
    hero.style.setProperty('--gy', y + 'px');
  }

  function resetToLogo() {
    var h = hero.getBoundingClientRect();
    var l = logo.getBoundingClientRect();
    hero.classList.remove('is-following');
    setGlow(l.left - h.left + l.width / 2, l.top - h.top + l.height / 2);
  }

  hero.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || reduceMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(function () {
      var h = hero.getBoundingClientRect();
      hero.classList.add('is-following');
      setGlow(e.clientX - h.left, e.clientY - h.top);
    });
  });

  hero.addEventListener('pointerleave', function () {
    cancelAnimationFrame(frame);
    resetToLogo();
  });

  window.addEventListener('resize', resetToLogo);
  if (logo.complete) resetToLogo(); else logo.addEventListener('load', resetToLogo);
})();
