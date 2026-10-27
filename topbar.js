// Exposes the sticky top bar's real height as --topbar-height, so jumping to a section
// leaves its title visible even when the menu wraps onto extra rows.
(function () {
  var bar = document.querySelector('.topbar');
  if (!bar) return;

  function update() {
    document.documentElement.style.setProperty('--topbar-height', bar.offsetHeight + 'px');
  }

  update();
  if (window.ResizeObserver) new ResizeObserver(update).observe(bar);
  else window.addEventListener('resize', update);
})();
