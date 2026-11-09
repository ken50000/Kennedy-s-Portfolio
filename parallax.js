/*
 * Case study parallax: while someone reads a case study, layers move at slightly different speeds.
 *  - Images drift a little slower than the text inside their frame (frame stays put, picture shifts).
 *  - Phone screens in a row move at alternating speeds, so the row feels layered.
 *  - Section numbers and headings float a touch faster than the body.
 *  - The background waveform drifts slowly behind everything.
 *  - Standard case study sections fade up as they enter.
 * Uses the CSS `translate` and `scale` properties, so it never fights the page's own `transform` animations.
 * Nothing moves with prefers-reduced-motion, and motion is gentler on small screens. Never hijacks scrolling.
 */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const small = () => innerWidth < 760;
  const items = new Map(); // element -> { kind, speed }
  const live = new Set();  // items currently near the viewport

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? live.add(e.target) : live.delete(e.target);
    tick();
  }, { rootMargin: '25% 0px' });

  function add(el, kind, speed) {
    if (items.has(el)) return;
    // Cinematic pages put each picture in a zoom button first; wait for that so the button's border stays outside.
    if (kind === 'img' && el.closest('.cine') && !el.parentElement.classList.contains('cine-zoom')) return;
    items.set(el, { kind, speed });
    if (kind === 'img') {
      // Wrap the picture in its own clipping frame, so captions and borders around it stay put.
      const frame = document.createElement('span');
      frame.className = 'px-frame';
      el.parentNode.insertBefore(frame, el);
      frame.appendChild(el);
      el.classList.add('px-img');
    }
    io.observe(el);
  }

  // Fade-up reveal for standard case study sections (cinematic pages have their own).
  const reveal = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('px-in'); reveal.unobserve(e.target); }
  }, { rootMargin: '0px 0px -12% 0px' });

  function scan() {
    document.querySelectorAll('.cs-body .slot img, .cine-fig img').forEach((el) => add(el, 'img', 1));
    document.querySelectorAll('.cine-phones > figure').forEach((el, i) => add(el, 'float', i % 2 ? 0.55 : -0.35));
    document.querySelectorAll('.cine-sec .cine-num').forEach((el) => add(el, 'float', -0.5));
    document.querySelectorAll('.cs-body .cs-section > h2').forEach((el) => add(el, 'float', -0.3));
    document.querySelectorAll('.cs-body .cs-section:not(.px-seen)').forEach((el) => {
      el.classList.add('px-seen', 'px-rise');
      reveal.observe(el);
    });
  }

  const waves = document.querySelector('.sound-waves');
  let queued = false;
  function tick() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const vh = innerHeight;
      const k = small() ? 0.5 : 1;
      for (const el of live) {
        const { kind, speed } = items.get(el);
        const r = el.getBoundingClientRect();
        // -1 when the element's center is at the bottom of the screen, +1 at the top.
        const p = Math.max(-1.2, Math.min(1.2, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
        if (kind === 'img') {
          // The picture is scaled up 8% inside its frame, so it can shift up to ~3.5% of its height.
          const y = p * Math.min(48, r.height * 0.035) * k;
          el.style.translate = `0 ${y.toFixed(1)}px`;
        } else {
          el.style.translate = `0 ${(p * 40 * speed * k).toFixed(1)}px`;
        }
      }
      if (waves) waves.style.translate = `0 ${(-scrollY * 0.06 * k).toFixed(1)}px`;
    });
  }

  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick, { passive: true });

  const style = document.createElement('style');
  style.textContent = `
    .px-frame { display: block; overflow: hidden; }
    .px-img { scale: 1.08; will-change: translate; }
    .px-rise { opacity: 0; translate: 0 32px; transition: opacity .8s ease, translate .9s cubic-bezier(.2,.7,.2,1); }
    .px-rise.px-in { opacity: 1; translate: 0 0; }
    .sound-waves { will-change: translate; }
  `;
  document.head.appendChild(style);

  scan();
  tick();
  // Locked case studies add their content after the passcode, so look again when the page changes.
  let t;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => { scan(); tick(); }, 120); })
    .observe(document.body, { childList: true, subtree: true });
})();
