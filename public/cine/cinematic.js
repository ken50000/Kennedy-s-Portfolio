// Cinematic case study template: passcode → laptop flip → autoplay video → scrollable case study.
// Works with files made by scripts/lock-case.mjs. Nothing secret lives in this file or in the page:
// the case study and the video stay scrambled until the visitor enters the passcode.
(() => {
  const root = document.querySelector('.cine');
  if (!root) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? Math.min(ms, 60) : ms));
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  const stage = root.querySelector('.cine-stage');
  const form = root.querySelector('.lock-form');
  const msg = root.querySelector('.lock-msg');
  const btn = form.querySelector('button');
  const laptop = root.querySelector('.laptop');
  const screen = root.querySelector('.screen');
  const after = root.querySelector('.cine-after');
  const story = root.querySelector('.cine-story');
  const payloadUrl = new URL(root.dataset.payload, location.href);

  // Start downloading the scrambled files as soon as someone shows interest, so unlocking feels instant.
  let metaP, mediaP;
  const getMeta = () => (metaP ||= fetch(payloadUrl).then((r) => { if (!r.ok) throw new Error('missing'); return r.json(); }));
  const getMedia = (m) => (mediaP ||= fetch(new URL(m.media.file, payloadUrl)).then((r) => { if (!r.ok) throw new Error('missing'); return r.arrayBuffer(); }));
  const prefetch = () => getMeta().then((m) => m.media && getMedia(m)).catch(() => {});
  form.code.addEventListener('focus', prefetch, { once: true });
  form.code.addEventListener('input', prefetch, { once: true });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    msg.textContent = 'Checking…';
    try {
      const m = await getMeta();
      const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(form.code.value), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', hash: 'SHA-256', salt: b64(m.salt), iterations: m.iter },
        base, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
      );
      let body;
      try {
        body = JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(m.iv) }, key, b64(m.ct))));
      } catch {
        msg.textContent = "That passcode didn't work. Check it and try again.";
        form.code.select();
        return;
      }
      msg.textContent = 'Unlocking…';
      let media = null;
      if (m.media) {
        const bytes = await getMedia(m);
        media = { type: m.media.type, bytes: await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(m.media.iv) }, key, bytes) };
      }
      await reveal(body, media);
    } catch (err) {
      msg.textContent = "Couldn't load the project. Refresh the page and try again.";
    } finally {
      btn.disabled = false;
    }
  });

  async function reveal(body, media) {
    // 1. Put the media behind the closed lid, so it's ready the moment the screen faces the viewer.
    let player = null;
    if (media && media.type.startsWith('video/')) {
      player = document.createElement('video');
      player.src = URL.createObjectURL(new Blob([media.bytes], { type: media.type }));
      player.controls = true;
      player.playsInline = true;
      player.preload = 'auto';
      player.setAttribute('aria-label', `${root.dataset.title} video`);
    } else if (media) {
      player = document.createElement('iframe');
      player.title = `${root.dataset.title} walkthrough`;
      player.allow = 'fullscreen; autoplay';
      player.setAttribute('allowfullscreen', '');
      player.srcdoc = new TextDecoder().decode(media.bytes);
    }
    if (player) screen.prepend(player);

    // 2. Build the written case study.
    story.innerHTML = body.html;
    enhance();

    // 3. Bring the stage into view, then lock card out, laptop in, flip.
    const r = stage.getBoundingClientRect();
    if (r.top < 0 || r.bottom > innerHeight) {
      stage.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: r.height > innerHeight ? 'start' : 'center' });
      await wait(450);
    }
    stage.classList.add('is-leaving');
    await wait(480);
    form.hidden = true;
    laptop.hidden = false;
    void laptop.offsetWidth; // start the transition from the "back of the lid" pose
    stage.classList.add('is-open');
    story.hidden = false;
    after.hidden = false;
    observe();
    await wait(1950);
    stage.classList.add('is-live');
    await wait(350);

    // 4. Play.
    if (player) play(player);
  }

  async function play(p) {
    if (p.tagName === 'VIDEO') {
      try {
        await p.play();
      } catch {
        // Browser blocked sound: play muted and offer a sound button.
        p.muted = true;
        try { await p.play(); } catch { /* the visitor can press play */ }
        const unmute = after.querySelector('.cine-unmute');
        if (unmute) {
          unmute.hidden = false;
          unmute.onclick = () => { p.muted = false; unmute.hidden = true; p.focus(); };
        }
      }
      return;
    }
    // HTML film: press its own Play button.
    const go = () => { try { p.contentDocument.querySelector('#bStart')?.click(); } catch { /* ignore */ } };
    if (p.contentDocument && p.contentDocument.readyState === 'complete' && p.contentDocument.querySelector('#bStart')) go();
    else p.addEventListener('load', go, { once: true });
  }

  function enhance() {
    // Section index (01 Overview, 02 Goal…) built from the section headings.
    const secs = [...story.querySelectorAll('.cine-sec')];
    if (secs.length) {
      const nav = document.createElement('nav');
      nav.className = 'cine-index';
      nav.setAttribute('aria-label', 'Case study sections');
      nav.innerHTML = '<ol>' + secs.map((s, i) => {
        const n = String(i + 1).padStart(2, '0');
        const h = s.querySelector('h2');
        if (!s.id) s.id = 'sec-' + n;
        const num = s.querySelector('.cine-num');
        if (num) num.textContent = n;
        return `<li><a href="#${s.id}"><b>${n}</b>${h ? h.textContent : ''}</a></li>`;
      }).join('') + '</ol>';
      secs[0].before(nav);
    }

    // Click-to-enlarge screenshots.
    const dlg = document.createElement('dialog');
    dlg.className = 'cine-lightbox';
    dlg.innerHTML = '<div class="cine-lb-bar"><span class="mono"></span><button type="button">Close ✕</button></div><img alt="" />';
    document.body.append(dlg);
    dlg.querySelector('button').onclick = () => dlg.close();
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    story.querySelectorAll('.cine-fig img, .cine-card img').forEach((img) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cine-zoom';
      b.setAttribute('aria-label', `Enlarge image: ${img.alt}`);
      img.replaceWith(b);
      b.append(img);
      b.onclick = () => {
        const big = dlg.querySelector('img');
        big.src = img.src;
        big.alt = img.alt;
        dlg.querySelector('.mono').textContent = img.alt;
        dlg.showModal();
      };
    });

    // Things that animate in as you scroll.
    story.querySelectorAll('.cine-glance > div, .cine-sec > header, .cine-sec > div > *, .cine-sec > .cine-full, .cine-flow li, .cine-card, .cine-steps li')
      .forEach((el) => el.classList.add('cine-reveal'));
    story.querySelectorAll('.cine-glance, .cine-flow, .cine-cards, .cine-steps').forEach((group) => {
      [...group.children].forEach((c, i) => c.style.setProperty('--d', `${i * 90}ms`));
    });
  }

  function observe() {
    const els = story.querySelectorAll('.cine-reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      els.forEach((el) => io.observe(el));
    }

    // Highlight the section you're reading in the index.
    const links = new Map([...story.querySelectorAll('.cine-index a')].map((a) => [a.getAttribute('href').slice(1), a]));
    if ('IntersectionObserver' in window && links.size) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.removeAttribute('aria-current'));
          const a = links.get(en.target.id);
          if (a) {
            a.setAttribute('aria-current', 'true');
            const nav = a.closest('.cine-index');
            nav.scrollTo({ left: a.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
          }
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      story.querySelectorAll('.cine-sec').forEach((s) => spy.observe(s));
    }

    // Reading progress bar.
    const bar = root.querySelector('.cine-progress');
    if (bar) {
      const update = () => {
        const r = story.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
        bar.style.transform = `scaleX(${p})`;
      };
      addEventListener('scroll', update, { passive: true });
      update();
    }
  }
})();
