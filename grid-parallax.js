// Moves the page-wide grid against the scroll direction while the page scrolls, so it
// reads as a separate layer behind the panels. It stays still when the user has asked
// for reduced motion.
(function () {
  var grid = document.querySelector('.grid-backdrop');
  if (!grid) return;

  var SPEED = -0.6; // 0 = stays fixed, 1 = scrolls with the content, below 0 = moves the other way
  var TILE = 128;   // grid pattern repeat in px, must match background-size in styles.css
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ticking = false;

  function update() {
    ticking = false;
    // The grid repeats every TILE px, so wrapping the shift into 0..TILE keeps it
    // seamless (also for the negative speed) while the layer needs only one extra tile.
    var shift = reduceMotion.matches ? 0 : ((window.scrollY * SPEED) % TILE + TILE) % TILE;
    grid.style.transform = 'translate3d(0, ' + (-shift) + 'px, 0)';
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
})();
