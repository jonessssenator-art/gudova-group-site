/* Smooth wheel scrolling is isolated to the Liquid Glass test page. */
(() => {
  if (!window.Lenis) return; // Native scrolling remains available if the library fails.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let lenis;
  const blocked = () => !!document.querySelector('dialog[open],.lightbox.is-open,.mobile-menu.is-open');
  const syncOverlay = () => {
    if (!lenis) return;
    if (blocked()) lenis.stop(); else lenis.start();
  };
  const configure = () => {
    lenis?.destroy();
    lenis = undefined;
    if (reduced.matches) return;
    lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      stopInertiaOnNavigate: true,
      prevent: node => node.matches('dialog,.lightbox,.mobile-menu,.media-rail,textarea,select')
    });
    syncOverlay();
  };
  const observer = new MutationObserver(syncOverlay);
  document.querySelectorAll('dialog,.lightbox,.mobile-menu').forEach(node => {
    observer.observe(node, {attributes:true, attributeFilter:['open','class']});
  });
  // Replace the legacy native smooth-scroll handler only on this preview.
  document.querySelector('.back-to-top')?.addEventListener('click', event => {
    if (!lenis) return;
    event.stopImmediatePropagation();
    lenis.scrollTo(0);
  }, true);
  reduced.addEventListener('change', configure);
  configure();
})();
